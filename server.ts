import express from 'express';
import { GoogleGenAI } from '@google/genai';
import path from 'path';
import { Readable } from 'node:stream';
import { createServer as createViteServer } from 'vite';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

let aiClient: GoogleGenAI | null = null;
let geminiCooldownUntil = 0;

function getAiClient(): GoogleGenAI | null {
  // If in quota cooldown period, don't attempt external API requests
  if (Date.now() < geminiCooldownUntil) {
    return null;
  }
  if (!aiClient && process.env.GEMINI_API_KEY) {
    aiClient = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return aiClient;
}

// Curated daily scripture catalog for all days of the month / year
const FALLBACK_VERSES = [
  {
    reference: "Philippians 4:13",
    text: "I can do all things through Christ who strengthens me.",
    theme: "Strength"
  },
  {
    reference: "Jeremiah 29:11",
    text: "For I know the plans I have for you, declares the Lord, plans to prosper you and not to harm you, plans to give you hope and a future.",
    theme: "Hope"
  },
  {
    reference: "Isaiah 40:31",
    text: "Those who hope in the Lord will renew their strength. They will soar on wings like eagles; they will run and not grow weary.",
    theme: "Renewal"
  },
  {
    reference: "Proverbs 3:5-6",
    text: "Trust in the Lord with all your heart and lean not on your own understanding; in all your ways submit to him, and he will make your paths straight.",
    theme: "Trust"
  },
  {
    reference: "Joshua 1:9",
    text: "Be strong and courageous. Do not be afraid; do not be discouraged, for the Lord your God will be with you wherever you go.",
    theme: "Courage"
  },
  {
    reference: "Romans 8:28",
    text: "And we know that in all things God works for the good of those who love him, who have been called according to his purpose.",
    theme: "Purpose"
  },
  {
    reference: "Psalm 23:1",
    text: "The Lord is my shepherd; I lack nothing.",
    theme: "Provision"
  },
  {
    reference: "2 Timothy 1:7",
    text: "For God has not given us a spirit of fear, but of power, and of love, and of a sound mind.",
    theme: "Confidence"
  },
  {
    reference: "Psalm 46:1",
    text: "God is our refuge and strength, an ever-present help in trouble.",
    theme: "Refuge"
  },
  {
    reference: "Matthew 11:28",
    text: "Come to me, all you who are weary and burdened, and I will give you rest.",
    theme: "Rest"
  },
  {
    reference: "Hebrews 11:1",
    text: "Now faith is confidence in what we hope for and assurance about what we do not see.",
    theme: "Faith"
  },
  {
    reference: "Romans 12:2",
    text: "Do not conform to the pattern of this world, but be transformed by the renewing of your mind.",
    theme: "Transformation"
  },
  {
    reference: "Psalm 119:105",
    text: "Your word is a lamp for my feet, a light on my path.",
    theme: "Guidance"
  },
  {
    reference: "1 Peter 5:7",
    text: "Cast all your anxiety on him because he cares for you.",
    theme: "Peace"
  },
  {
    reference: "Ephesians 3:20",
    text: "Now to him who is able to do immeasurably more than all we ask or imagine, according to his power that is at work within us.",
    theme: "Victory"
  },
  {
    reference: "Psalm 103:2-3",
    text: "Praise the Lord, my soul, and forget not all his benefits—who forgives all your sins and heals all your diseases.",
    theme: "Praise"
  },
  {
    reference: "Galatians 5:22-23",
    text: "The fruit of the Spirit is love, joy, peace, forbearance, kindness, goodness, faithfulness, gentleness and self-control.",
    theme: "Spiritual Fruit"
  },
  {
    reference: "Psalm 91:1-2",
    text: "Whoever dwells in the shelter of the Most High will rest in the shadow of the Almighty. I will say of the Lord, 'He is my refuge and my fortress, my God, in whom I trust.'",
    theme: "Divine Protection"
  },
  {
    reference: "Zechariah 4:6",
    text: "Not by might nor by power, but by my Spirit, says the Lord Almighty.",
    theme: "Holy Spirit Power"
  },
  {
    reference: "Philippians 4:6-7",
    text: "Do not be anxious about anything, but in every situation, by prayer and petition, with thanksgiving, present your requests to God.",
    theme: "Prayer"
  },
  {
    reference: "2 Corinthians 5:17",
    text: "Therefore, if anyone is in Christ, the new creation has come: The old has gone, the new is here!",
    theme: "New Life"
  },
  {
    reference: "John 14:27",
    text: "Peace I leave with you; my peace I give you. I do not give to you as the world gives. Do not let your hearts be troubled and do not be afraid.",
    theme: "Inner Peace"
  },
  {
    reference: "Deuteronomy 31:6",
    text: "Be strong and bold; have no fear or dread of them, because it is the Lord your God who goes with you; he will not fail you or forsake you.",
    theme: "Steadfastness"
  },
  {
    reference: "Psalm 121:1-2",
    text: "I lift up my eyes to the mountains—where does my help come from? My help comes from the Lord, the Maker of heaven and earth.",
    theme: "Divine Help"
  },
  {
    reference: "Romans 15:13",
    text: "May the God of hope fill you with all joy and peace as you trust in him, so that you may overflow with hope by the power of the Holy Spirit.",
    theme: "Abounding Hope"
  },
  {
    reference: "Colossians 3:14",
    text: "And over all these virtues put on love, which binds them all together in perfect unity.",
    theme: "Love"
  },
  {
    reference: "Isaiah 26:3",
    text: "You will keep in perfect peace those whose minds are steadfast, because they trust in you.",
    theme: "Steadfast Peace"
  },
  {
    reference: "1 John 4:18",
    text: "There is no fear in love. But perfect love drives out fear.",
    theme: "Overcoming Fear"
  },
  {
    reference: "Psalm 37:4",
    text: "Take delight in the Lord, and he will give you the desires of your heart.",
    theme: "Joy"
  },
  {
    reference: "Proverbs 18:10",
    text: "The name of the Lord is a fortified tower; the righteous run to it and are safe.",
    theme: "Security"
  },
  {
    reference: "Matthew 6:33",
    text: "Seek first his kingdom and his righteousness, and all these things will be given to you as well.",
    theme: "Kingdom First"
  }
];

let cachedDailyVerse: { date: string; data: { reference: string; text: string; theme: string } } | null = null;

function getFallbackVerse(): { reference: string; text: string; theme: string } {
  const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000);
  return FALLBACK_VERSES[dayOfYear % FALLBACK_VERSES.length];
}

// API Route for Daily Verse
app.get('/api/daily-verse', async (req, res) => {
  const todayStr = new Date().toISOString().slice(0, 10);

  // Return cached verse if already fetched today
  if (cachedDailyVerse && cachedDailyVerse.date === todayStr) {
    return res.json(cachedDailyVerse.data);
  }

  // If in quota cooldown or no API key, seamlessly serve the curated daily scripture
  if (Date.now() < geminiCooldownUntil || !process.env.GEMINI_API_KEY) {
    const fallback = getFallbackVerse();
    cachedDailyVerse = { date: todayStr, data: fallback };
    return res.json(fallback);
  }

  try {
    const ai = getAiClient();
    if (!ai) {
      const fallback = getFallbackVerse();
      cachedDailyVerse = { date: todayStr, data: fallback };
      return res.json(fallback);
    }

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: "Provide a single, short, uplifting Bible verse for today. Return JSON with keys: reference (e.g. John 3:16), text (the scripture text), and theme (e.g. Hope, Faith, Love).",
      config: {
        responseMimeType: "application/json",
      },
    });
    
    const text = response.text;
    if (!text) throw new Error('Empty response from Gemini');
    
    // Clean JSON from possible markdown wrapping
    const jsonStr = text.replace(/```json|```/g, '').trim();
    const parsed = JSON.parse(jsonStr);

    if (parsed.reference && parsed.text && parsed.theme) {
      cachedDailyVerse = { date: todayStr, data: parsed };
      return res.json(parsed);
    }

    const fallback = getFallbackVerse();
    cachedDailyVerse = { date: todayStr, data: fallback };
    res.json(fallback);
  } catch (error: any) {
    const isQuotaOrDemand = 
      error?.status === 'RESOURCE_EXHAUSTED' || 
      error?.code === 429 || 
      error?.code === 503 ||
      error?.message?.includes('429') ||
      error?.message?.includes('quota') ||
      error?.message?.includes('RESOURCE_EXHAUSTED') ||
      error?.message?.includes('503');

    if (isQuotaOrDemand) {
      // Cooldown Gemini API calls to respect free tier rate limits
      geminiCooldownUntil = Date.now() + 60 * 60 * 1000;
    }

    const fallback = getFallbackVerse();
    cachedDailyVerse = { date: todayStr, data: fallback };
    res.json(fallback);
  }
});

// Audio proxy endpoint for streaming audio reliably through backend with byte ranges
app.all(['/api/audio-proxy', '/api/audio-proxy/:filename'], async (req, res) => {
  const audioUrl = (req.query.url as string) || (req.body?.url as string);
  if (!audioUrl) {
    return res.status(400).send('Missing audio url parameter');
  }

  // Preflight CORS support
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, HEAD, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Range, Content-Type, Accept');
    return res.sendStatus(204);
  }

  try {
    const headers: Record<string, string> = {};
    if (req.headers.range) {
      headers['Range'] = req.headers.range;
    }

    const isHead = req.method === 'HEAD';
    const upstreamRes = await fetch(audioUrl, {
      method: isHead ? 'HEAD' : 'GET',
      headers
    });

    res.status(upstreamRes.status);

    // Forward safe headers
    upstreamRes.headers.forEach((val, key) => {
      const lower = key.toLowerCase();
      // Drop hop-by-hop and compression headers since fetch handles decoding
      if (!['transfer-encoding', 'connection', 'host', 'content-encoding', 'content-security-policy', 'set-cookie'].includes(lower)) {
        res.setHeader(key, val);
      }
    });

    // Ensure audio mime type
    const contentType = res.getHeader('content-type') as string;
    if (!contentType || contentType.includes('octet-stream') || contentType.includes('text/plain')) {
      res.setHeader('Content-Type', 'audio/mpeg');
    }

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Range, Content-Type, Accept');
    res.setHeader('Access-Control-Expose-Headers', 'Content-Range, Content-Length, Accept-Ranges');
    res.setHeader('Accept-Ranges', 'bytes');

    if (isHead || !upstreamRes.body) {
      return res.end();
    }

    const nodeStream = Readable.fromWeb(upstreamRes.body as any);

    // Handle client abort / disconnect gracefully
    req.on('close', () => {
      nodeStream.destroy();
    });

    nodeStream.on('error', (streamErr) => {
      console.warn('Audio proxy stream warning:', streamErr.message);
    });

    nodeStream.pipe(res);
  } catch (err: any) {
    console.warn('Audio proxy streaming warning:', err?.message || err);
    if (!res.headersSent) {
      res.status(500).send('Audio streaming error');
    }
  }
});

// Dedicated audio download endpoint that forces attachment Content-Disposition
app.all('/api/download', async (req, res) => {
  const fileUrl = (req.query.url as string) || (req.body?.url as string);
  let rawFilename = (req.query.filename as string) || (req.body?.filename as string) || 'sermon.mp3';

  if (!fileUrl) {
    return res.status(400).send('Missing audio url parameter');
  }

  // Handle CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, HEAD, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Accept');
  res.setHeader('Access-Control-Expose-Headers', 'Content-Disposition, Content-Length');

  if (req.method === 'OPTIONS') {
    return res.sendStatus(204);
  }

  // Ensure clean filename ending with .mp3
  let cleanFilename = rawFilename.trim().replace(/[/\\?%*:|"<>]/g, '_');
  if (!cleanFilename.toLowerCase().endsWith('.mp3')) {
    cleanFilename += '.mp3';
  }

  // File path mapping: resolve relative local paths or external URLs
  let targetUrl = fileUrl.trim();
  if (targetUrl.startsWith('/')) {
    targetUrl = `http://127.0.0.1:${PORT}${targetUrl}`;
  } else if (!targetUrl.startsWith('http://') && !targetUrl.startsWith('https://')) {
    targetUrl = `http://127.0.0.1:${PORT}/${targetUrl}`;
  }

  try {
    const isHead = req.method === 'HEAD';
    const upstreamRes = await fetch(targetUrl, {
      method: isHead ? 'HEAD' : 'GET',
    });

    if (!upstreamRes.ok) {
      return res.status(upstreamRes.status).send(`Failed fetching audio file: ${upstreamRes.statusText}`);
    }

    res.status(200);
    res.setHeader('Content-Type', 'audio/mpeg');
    res.setHeader('Cache-Control', 'public, max-age=86400');
    // Set attachment header with both ASCII fallback and UTF-8 encoded filename
    res.setHeader(
      'Content-Disposition',
      `attachment; filename="${cleanFilename.replace(/"/g, '')}"; filename*=UTF-8''${encodeURIComponent(cleanFilename)}`
    );

    const contentLength = upstreamRes.headers.get('content-length');
    if (contentLength) {
      res.setHeader('Content-Length', contentLength);
    }

    if (isHead || !upstreamRes.body) {
      return res.end();
    }

    const nodeStream = Readable.fromWeb(upstreamRes.body as any);

    req.on('close', () => {
      nodeStream.destroy();
    });

    nodeStream.on('error', (err) => {
      console.warn('Download stream error:', err.message);
    });

    nodeStream.pipe(res);
  } catch (err: any) {
    console.error('Audio download error:', err?.message || err);
    if (!res.headersSent) {
      res.status(500).send('Download error');
    }
  }
});

// Sermons API: fetches from Supabase if key configured, otherwise serves local JSON data
const DATA_FILE = path.join(process.cwd(), 'src', 'data', 'sermons.json');
const DEFAULT_SUPABASE_URL = 'https://lduxhzivaczcwxephfwx.supabase.co';

// In-memory description cache
const descriptionCache = new Map<string, string>();

async function generateSermonDescription(title: string, speaker?: string, tag?: string): Promise<string> {
  if (!title || typeof title !== 'string' || !title.trim()) {
    return 'A powerful sermon exploring biblical truth and spiritual principles for daily life.';
  }

  const cleanTitle = title.trim();
  const cacheKey = cleanTitle.toLowerCase();
  if (descriptionCache.has(cacheKey)) {
    return descriptionCache.get(cacheKey)!;
  }

  // Pre-generate an inspiring, tailored smart description based on the sermon's spiritual theme
  const lower = cleanTitle.toLowerCase();
  let smartFallback = `A transformative teaching on "${cleanTitle}", uncovering biblical principles for spiritual breakthrough, kingdom purpose, and supernatural provision.`;
  if (lower.includes('holy spirit') || lower.includes('hs')) {
    smartFallback = `A revelatory teaching uncovering biblical principles for supernatural empowerment, walking in the gifts, and experiencing the deeper ministry of the Holy Spirit.`;
  } else if (lower.includes('wealth') || lower.includes('financ') || lower.includes('money')) {
    smartFallback = `Biblical principles for kingdom wealth, financial dominion, and unlocking divine covenant prosperity for generational impact.`;
  } else if (lower.includes('covenant')) {
    smartFallback = `Discover the unfailing covenant promises available to the believer in Christ for victory, dominion, and supernatural living.`;
  } else if (lower.includes('prayer') || lower.includes('consecrat') || lower.includes('fasting')) {
    smartFallback = `Deep spiritual insights on cultivating intimacy with God through earnest prayer, intercession, and apostolic devotion.`;
  } else if (lower.includes('faith')) {
    smartFallback = `An inspiring discourse on activating relentless faith, overcoming obstacles, and claiming God's promises in every season of life.`;
  }

  // If not on cooldown and Gemini is configured, attempt AI summary
  if (Date.now() >= geminiCooldownUntil) {
    const ai = getAiClient();
    if (ai) {
      try {
        const response = await ai.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: `Write an engaging, uplifting 1-to-2 sentence sermon summary (25-35 words) for a church audio archive based on this title: "${cleanTitle}". Preacher: ${speaker || 'Pastor'}. Topic: ${tag || 'Faith & Spiritual Growth'}. Do not include quotes, markdown bolding, or intro text like "Here is a summary:". Return only the clean description text.`,
          config: {
            systemInstruction: "You are an inspiring Christian church media minister. Produce concise, faith-filled, and doctrinally sound sermon descriptions that capture spiritual essence based directly on the sermon title.",
            temperature: 0.7,
          }
        });

        const text = response.text?.trim()?.replace(/^["']|["']$/g, '');
        if (text && text.length > 10) {
          descriptionCache.set(cacheKey, text);
          return text;
        }
      } catch (err: any) {
        const isQuotaOrDemand = 
          err?.status === 'RESOURCE_EXHAUSTED' || 
          err?.code === 429 || 
          err?.code === 503 ||
          err?.message?.includes('429') ||
          err?.message?.includes('quota') ||
          err?.message?.includes('RESOURCE_EXHAUSTED');
        if (isQuotaOrDemand) {
          geminiCooldownUntil = Date.now() + 60 * 60 * 1000;
        }
      }
    }
  }

  descriptionCache.set(cacheKey, smartFallback);
  return smartFallback;
}

// Dedicated endpoint to generate a description for any sermon title on demand
app.post('/api/sermons/generate-description', async (req, res) => {
  const { title, speaker, tag, force } = req.body;
  if (!title) {
    return res.status(400).json({ error: 'Title is required' });
  }

  if (force) {
    descriptionCache.delete(title.trim().toLowerCase());
  }

  try {
    const description = await generateSermonDescription(title, speaker, tag);
    res.json({ title, description, generated: true });
  } catch (err: any) {
    res.status(500).json({ error: err.message || 'Failed generating description' });
  }
});

app.get('/api/sermons', async (req, res) => {
  const supabaseKey = process.env.SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY || process.env.SUPABASE_KEY;
  const supabaseUrl = process.env.SUPABASE_URL || DEFAULT_SUPABASE_URL;

  let loadedSermons: any[] = [];
  let source = 'empty';

  // If Supabase key is configured, query Supabase rest API
  if (supabaseKey) {
    try {
      const sbRes = await fetch(`${supabaseUrl}/rest/v1/sermons?select=*&order=created_at.desc`, {
        headers: {
          'apikey': supabaseKey,
          'Authorization': `Bearer ${supabaseKey}`,
          'Accept': 'application/json'
        }
      });

      if (sbRes.ok) {
        const data = await sbRes.json();
        if (Array.isArray(data) && data.length > 0) {
          loadedSermons = data
            .filter((row: any) => {
              const url = row.audio_file_url || row.audio_url || row.audio || row.file_url || row.url || '';
              return !url.includes('soundhelix.com');
            })
            .map((row: any) => ({
            id: String(row.id || row.sermon_id || Math.random().toString(36).substring(7)),
            title: row.title || row.sermon_title || 'Untitled Sermon',
            speaker: row.speaker || row.preacher || row.pastor || 'Pastor Benwuk',
            date: row.date || row.sermon_date || new Date(row.created_at || Date.now()).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
            tag: row.tag || row.topic || row.series || 'General',
            description: row.description || row.desc || row.summary || '',
            audio_file_url: row.audio_file_url || row.audio_url || row.audio || row.file_url || row.url || '',
            duration: row.duration || 'Audio',
            created_at: row.created_at
          }));
          source = 'supabase';
        }
      }
    } catch (err) {
      console.warn('Failed querying Supabase sermons from server:', err);
    }
  }

  // Fallback to local sermons.json if Supabase returned nothing
  if (loadedSermons.length === 0) {
    try {
      const fs = await import('fs');
      if (fs.existsSync(DATA_FILE)) {
        const content = fs.readFileSync(DATA_FILE, 'utf8');
        const parsed = JSON.parse(content);
        if (Array.isArray(parsed) && parsed.length > 0) {
          loadedSermons = parsed;
          source = 'local';
        }
      }
    } catch (fsErr) {
      console.warn('Error reading local sermons.json:', fsErr);
    }
  }

  // Automatically generate description for any sermons that lack one or have placeholder descriptions
  if (loadedSermons.length > 0) {
    for (const sermon of loadedSermons) {
      if (!sermon.description || sermon.description.trim().length === 0) {
        sermon.description = await generateSermonDescription(sermon.title, sermon.speaker, sermon.tag);
      }
    }
    return res.json({ sermons: loadedSermons, source, count: loadedSermons.length });
  }

  res.json({ 
    sermons: [], 
    source: 'empty', 
    count: 0,
    configuredWithSupabase: Boolean(supabaseKey) 
  });
});

app.post('/api/sermons', async (req, res) => {
  try {
    const fs = await import('fs');
    const { sermons } = req.body;
    if (!Array.isArray(sermons)) {
      return res.status(400).json({ error: 'Expected { sermons: Sermon[] }' });
    }

    const dir = path.dirname(DATA_FILE);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    fs.writeFileSync(DATA_FILE, JSON.stringify(sermons, null, 2), 'utf8');
    res.json({ success: true, count: sermons.length });
  } catch (err: any) {
    res.status(500).json({ error: err.message || 'Failed saving sermons' });
  }
});

async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
