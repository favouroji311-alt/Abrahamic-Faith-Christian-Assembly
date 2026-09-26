import express from 'express';
import { GoogleGenAI } from '@google/genai';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

let aiClient: GoogleGenAI | null = null;

function getAiClient(): GoogleGenAI | null {
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

// Curated fallback verses for offline or high-demand periods
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

  try {
    const ai = getAiClient();
    if (!ai) {
      const fallback = getFallbackVerse();
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
    res.json(fallback);
  } catch (error: any) {
    const isHighDemand = error?.message?.includes('503') || error?.status === 'UNAVAILABLE' || error?.code === 503;
    if (isHighDemand) {
      console.warn('Gemini API is currently experiencing high demand (503). Serving curated scripture fallback.');
    } else {
      console.warn('Unable to retrieve verse from Gemini API, serving fallback scripture:', error?.message || error);
    }
    
    const fallback = getFallbackVerse();
    res.json(fallback);
  }
});

// Audio proxy endpoint for streaming audio reliably through backend with byte ranges
app.get('/api/audio-proxy', async (req, res) => {
  const audioUrl = req.query.url as string;
  if (!audioUrl) {
    return res.status(400).send('Missing audio url parameter');
  }

  try {
    const headers: Record<string, string> = {};
    if (req.headers.range) {
      headers['Range'] = req.headers.range;
    }

    const upstreamRes = await fetch(audioUrl, { headers });

    res.status(upstreamRes.status);
    upstreamRes.headers.forEach((val, key) => {
      const lower = key.toLowerCase();
      if (!['transfer-encoding', 'connection', 'host'].includes(lower)) {
        res.setHeader(key, val);
      }
    });

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Accept-Ranges', 'bytes');

    if (upstreamRes.body) {
      const reader = upstreamRes.body.getReader();
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        res.write(Buffer.from(value));
      }
      res.end();
    } else {
      res.end();
    }
  } catch (err: any) {
    console.error('Audio proxy streaming error:', err);
    if (!res.headersSent) {
      res.status(500).send('Audio streaming error');
    }
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
