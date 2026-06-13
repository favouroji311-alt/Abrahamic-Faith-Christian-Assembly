import express from 'express';
import { GoogleGenAI } from '@google/genai';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    }
  }
});

// API Route for Daily Verse
app.get('/api/daily-verse', async (req, res) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: "Provide a single, short, encouraging Bible verse for today. Return it in JSON format like this: { \"reference\": \"John 3:16\", \"text\": \"For God so loved the world...\", \"theme\": \"Love\" }. Only return the JSON."
    });
    
    const text = response.text;
    if (!text) throw new Error('No response from Gemini');
    
    // Clean JSON from possible markdown wrapping
    const jsonStr = text.replace(/```json|```/g, '').trim();
    res.json(JSON.parse(jsonStr));
  } catch (error) {
    console.error('Error fetching verse:', error);
    // Fallback verse so the UI doesn't break when Gemini is unavailable
    res.json({
      reference: "Philippians 4:13",
      text: "I can do all things through Christ who strengthens me.",
      theme: "Strength"
    });
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
