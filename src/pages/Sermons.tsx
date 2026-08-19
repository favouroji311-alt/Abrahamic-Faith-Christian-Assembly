import { motion } from 'motion/react';
import { Play, Mic, Search, Filter } from 'lucide-react';

export function Sermons() {
  const sermons = [
    { title: 'Faith That Moves Mountains', date: 'April 20, 2026', speaker: 'Rev. Abraham', tag: 'Faith', desc: 'Discover how to activate the mustard-seed faith that overcomes every obstacle in your path.' },
    { title: 'The Power of Prayer', date: 'April 13, 2026', speaker: 'Pst. Sarah', tag: 'Prayer', desc: 'Understanding the spiritual mechanics of dynamic communication with our Heavenly Father.' },
    { title: 'Walking in Love', date: 'April 06, 2026', speaker: 'Rev. Abraham', tag: 'Love', desc: 'A deep dive into the true meaning of Agape love and how it transforms our relationships.' },
    { title: 'Living a Life of Purpose', date: 'March 30, 2026', speaker: 'Pst. David', tag: 'Purpose', desc: 'Uncovering the divine assignment God has placed on your life for this generation.' },
    { title: 'Overcoming Fear with Faith', date: 'March 23, 2026', speaker: 'Rev. Abraham', tag: 'Faith', desc: 'Strategies for standing firm when anxiety and fear try to cloud your vision.' },
    { title: 'The Joy of Salvation', date: 'March 16, 2026', speaker: 'Pst. Sarah', tag: 'Salvation', desc: 'Reclaiming the wonder and excitement of our first encounter with the Grace of God.' },
  ];

  return (
    <div className="pt-20 sm:pt-24 min-h-screen overflow-hidden">
      <section className="py-16 sm:py-24 md:py-28 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <span className="caption-mono mb-4 block text-blue-600 dark:text-neon-green">Teachings / Vol 04</span>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="huge-title mb-6 text-slate-900 dark:text-white"
          >
            MEDIA <span className="text-neon-green italic underline decoration-slate-300 dark:decoration-slate-700 uppercase">Vault.</span>
          </motion.h1>
          <p className="text-base sm:text-xl md:text-2xl text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed font-light">
            Deepen your walk with Christ through our library of teachings and worship sessions.
          </p>
        </div>
      </section>

      {/* Filter Bar */}
      <section className="sticky top-[58px] sm:top-[72px] z-40 py-4 sm:py-5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="liquid-glass rounded-full p-2 sm:p-3 flex flex-col md:flex-row justify-between items-center gap-3 sm:gap-4 liquid-sheen">
            <div className="flex overflow-x-auto w-full md:w-auto pb-1 md:pb-0 gap-2 no-scrollbar shrink-0 px-2">
              {['All Topics', 'Faith', 'Prayer', 'Love', 'Prophecy', 'Grace'].map((f, i) => (
                <button 
                  key={i}
                  className={`px-4 sm:px-5 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                    i === 0 
                      ? 'liquid-inset text-blue-600 dark:text-neon-green font-black shadow-inner' 
                      : 'liquid-glass-button text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
            <div className="relative w-full md:w-80 px-2 md:px-0">
              <Search className="absolute left-6 md:left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input 
                type="text" 
                placeholder="Search sermons..."
                className="w-full liquid-inset rounded-full py-2 sm:py-2.5 pl-11 pr-5 text-xs font-medium outline-none focus:ring-1 focus:ring-blue-600 dark:focus:ring-neon-green text-slate-900 dark:text-white placeholder:text-slate-400"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {sermons.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ y: -4 }}
              className="liquid-glass rounded-3xl overflow-hidden group cursor-pointer flex flex-col justify-between liquid-sheen"
            >
              <div>
                <div className="aspect-video relative bg-slate-950 flex items-center justify-center overflow-hidden">
                  <div className="absolute inset-0 bg-blue-900/20 group-hover:bg-blue-900/40 transition-all duration-500"></div>
                  <div className="w-14 h-14 liquid-glass-button rounded-full flex items-center justify-center text-slate-900 dark:text-neon-green shadow-xl scale-95 group-hover:scale-110 transition-transform duration-300">
                    <Play size={18} fill="currentColor" strokeWidth={0} />
                  </div>
                  <div className="absolute top-4 left-4">
                    <span className="caption-mono !text-[8px] px-3 py-1 liquid-inset rounded-full text-slate-200 font-bold border border-white/10">
                      {s.tag}
                    </span>
                  </div>
                </div>
                
                <div className="p-6 sm:p-8">
                  <span className="caption-mono !text-[8px] text-blue-600 dark:text-neon-green mb-2 block font-bold">{s.date}</span>
                  <h3 className="text-lg sm:text-xl font-black mb-3 text-slate-900 dark:text-white leading-snug group-hover:text-blue-600 dark:group-hover:text-neon-green transition-colors">{s.title}</h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mb-6 leading-relaxed font-light line-clamp-2">
                    {s.desc}
                  </p>
                </div>
              </div>

              <div className="p-6 sm:p-8 pt-0">
                <div className="flex justify-between items-center pt-4 border-t border-slate-300/40 dark:border-slate-800/60">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full liquid-inset flex items-center justify-center text-blue-600 dark:text-neon-green">
                      <Mic size={10} />
                    </div>
                    <span className="nav-label !text-[8px] text-slate-600 dark:text-slate-400">{s.speaker}</span>
                  </div>
                  <button className="liquid-glass-button px-3.5 py-1.5 rounded-full nav-label !text-[8px] text-blue-600 dark:text-neon-green hover:underline cursor-pointer">
                    AUDIO ONLY
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Archive Section */}
      <section className="py-16 sm:py-24 md:py-32 border-t border-slate-300/40 dark:border-slate-800/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="mb-12 sm:mb-16">
            <span className="caption-mono mb-3 block text-blue-600 dark:text-neon-green">History / Vault</span>
            <h2 className="text-3xl sm:text-5xl md:text-7xl font-black text-slate-900 dark:text-white tracking-tight leading-none uppercase">
              SERMON <span className="text-slate-400 dark:text-slate-600 italic">ARCHIVE.</span>
            </h2>
          </div>

          <div className="grid gap-10 sm:gap-16">
            {[2026, 2025, 2024].map((year) => (
              <div key={year} className="liquid-glass p-6 sm:p-10 rounded-3xl grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-10 items-center liquid-sheen">
                <div className="md:col-span-4 self-center">
                  <h3 className="text-5xl sm:text-7xl md:text-8xl font-black text-slate-400 dark:text-slate-600 leading-none tracking-tight">{year}</h3>
                </div>
                <div className="md:col-span-8">
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
                      .reverse()
                      .map((month) => (
                      <button 
                        key={month}
                        className="group flex flex-col items-start text-left p-3.5 sm:p-4 liquid-glass-button hover:liquid-inset transition-all rounded-2xl cursor-pointer"
                      >
                        <span className="caption-mono !text-[8px] opacity-60 mb-1">Month</span>
                        <span className="text-sm sm:text-base font-black text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-neon-green transition-colors uppercase tracking-tight">{month}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
