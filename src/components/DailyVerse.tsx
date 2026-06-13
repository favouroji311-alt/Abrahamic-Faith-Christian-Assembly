import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Sparkles, Quote } from 'lucide-react';

interface Verse {
  reference: string;
  text: string;
  theme: string;
}

export function DailyVerse() {
  const [verse, setVerse] = useState<Verse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/daily-verse')
      .then(res => res.json())
      .then(data => {
        setVerse(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) return null;
  if (!verse) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      className="max-w-4xl mx-auto px-6 mb-24"
    >
      <div className="bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 p-12 rounded-[2rem] shadow-2xl shadow-blue-500/5 relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-64 h-64 bg-neon-green/5 blur-3xl -mr-20 -mt-20 group-hover:bg-neon-green/10 transition-colors"></div>
        
        <div className="flex flex-col md:flex-row gap-12 items-center">
          <div className="flex-1">
            <span className="caption-mono mb-6 block text-blue-700 dark:text-neon-green">Inspiration / Daily</span>
            <p className="text-3xl md:text-4xl font-black text-zinc-800 dark:text-white leading-tight tracking-tighter mb-8 italic uppercase">
              "{verse.text}"
            </p>
            <div className="flex items-center gap-6">
              <span className="text-xl font-bold dark:text-white border-l-4 border-neon-green pl-4">
                {verse.reference}
              </span>
              <span className="nav-label opacity-40">
                Theme: {verse.theme}
              </span>
            </div>
          </div>
          <div className="hidden md:flex flex-col items-center justify-center p-8 border-l border-gray-100 dark:border-zinc-800 ml-8">
            <Quote size={48} className="text-neon-green/20 mb-4" />
            <span className="caption-mono text-[8px] text-gray-300">Meditation</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
