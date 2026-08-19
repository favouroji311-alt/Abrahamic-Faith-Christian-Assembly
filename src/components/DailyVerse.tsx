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
      viewport={{ once: true }}
      className="max-w-4xl mx-auto px-4 sm:px-6 mb-16 sm:mb-24"
    >
      <div className="liquid-glass p-6 sm:p-10 md:p-12 rounded-3xl sm:rounded-[2.5rem] relative overflow-hidden group liquid-sheen">
        <div className="flex flex-col md:flex-row gap-6 sm:gap-10 md:gap-12 items-start md:items-center relative z-10">
          <div className="flex-1 w-full">
            <span className="caption-mono mb-3 sm:mb-6 block text-blue-600 dark:text-neon-green flex items-center gap-2">
              <Sparkles size={12} className="animate-pulse" /> Inspiration / Daily Scripture
            </span>
            <p className="text-xl sm:text-2xl md:text-3xl font-black text-slate-900 dark:text-white leading-snug md:leading-tight tracking-tight mb-6 sm:mb-8 italic uppercase">
              "{verse.text}"
            </p>
            <div className="flex flex-wrap items-center gap-3 sm:gap-6">
              <span className="text-base sm:text-xl font-bold text-slate-900 dark:text-white border-l-4 border-neon-green pl-3 sm:pl-4">
                {verse.reference}
              </span>
              <span className="liquid-inset px-3.5 py-1.5 rounded-full caption-mono text-[9px] sm:text-[10px] text-slate-700 dark:text-slate-300 font-bold">
                Theme: {verse.theme}
              </span>
            </div>
          </div>
          <div className="hidden md:flex flex-col items-center justify-center p-6 md:p-8 liquid-inset rounded-3xl shrink-0">
            <Quote size={36} className="text-blue-600/60 dark:text-neon-green/60 mb-2" />
            <span className="caption-mono text-[8px] text-slate-500">Meditation</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
