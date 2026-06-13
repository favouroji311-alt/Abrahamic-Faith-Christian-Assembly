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
    <div className="pt-24 min-h-screen bg-white dark:bg-zinc-950">
      <section className="bg-zinc-950 py-32 text-white relative">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <span className="caption-mono mb-8 block">Teachings / Vol 04</span>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="huge-title mb-12"
          >
            MEDIA <span className="text-neon-green italic underline decoration-white/10 uppercase">Vault.</span>
          </motion.h1>
          <p className="text-2xl text-white/60 max-w-2xl leading-relaxed font-light">
            Deepen your walk with Christ through our library of teachings and worship sessions.
          </p>
        </div>
      </section>

      {/* Filter Bar */}
      <section className="sticky top-[72px] z-40 bg-zinc-50/80 dark:bg-zinc-950/80 backdrop-blur-md border-b border-gray-100 dark:border-zinc-900 py-6">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-wrap gap-3">
            {['All Topics', 'Faith', 'Prayer', 'Love', 'Prophecy', 'Grace'].map((f, i) => (
              <button 
                key={i}
                className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${i === 0 ? 'bg-blue-700 text-white shadow-lg shadow-blue-500/20' : 'bg-gray-100 dark:bg-gray-800 text-gray-500 hover:bg-neon-green hover:text-blue-900'}`}
              >
                {f}
              </button>
            ))}
          </div>
          <div className="relative w-full md:w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Search sermons..."
              className="w-full bg-gray-100 dark:bg-gray-800 border-none rounded-full py-3 pl-12 pr-6 text-sm font-medium focus:ring-2 focus:ring-blue-700"
            />
          </div>
        </div>
      </section>

      <section className="py-20 max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sermons.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ y: -5 }}
              className="card-clean overflow-hidden group cursor-pointer"
            >
              <div className="aspect-video relative bg-zinc-950 flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-blue-700/10 group-hover:bg-blue-700/30 transition-all duration-500"></div>
                <div className="w-16 h-16 bg-white dark:bg-neon-green rounded-full flex items-center justify-center text-zinc-950 shadow-2xl scale-90 group-hover:scale-100 transition-transform duration-500">
                  <Play size={20} fill="currentColor" strokeWidth={0} />
                </div>
                <div className="absolute top-6 left-6">
                  <span className="caption-mono !text-[8px] px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-white border border-white/10">
                    {s.tag}
                  </span>
                </div>
              </div>
              
              <div className="p-8">
                <span className="caption-mono !text-[8px] text-blue-700 dark:text-neon-green mb-2 block">{s.date}</span>
                <h3 className="text-2xl font-black mb-4 dark:text-white leading-tight">{s.title}</h3>
                <p className="text-gray-500 dark:text-gray-400 mb-8 leading-relaxed font-light line-clamp-2">
                  {s.desc}
                </p>
                <div className="flex justify-between items-center pt-6 border-t border-gray-50 dark:border-zinc-800">
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-blue-100 dark:bg-zinc-800 flex items-center justify-center text-blue-700 dark:text-neon-green">
                      <Mic size={10} />
                    </div>
                    <span className="nav-label !text-[8px] dark:text-white opacity-60">{s.speaker}</span>
                  </div>
                  <button className="nav-label !text-[8px] text-blue-700 dark:text-neon-green hover:underline">
                    AUDIO ONLY
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Archive Section */}
      <section className="py-32 bg-gray-50 dark:bg-zinc-950 border-t border-gray-100 dark:border-zinc-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-20">
            <span className="caption-mono mb-4 block text-blue-700 dark:text-neon-green">History / Vault</span>
            <h2 className="text-5xl md:text-7xl font-black dark:text-white tracking-tighter leading-none uppercase">
              SERMON <span className="text-gray-300 dark:text-zinc-800 italic">ARCHIVE.</span>
            </h2>
          </div>

          <div className="grid gap-24">
            {[2026, 2025, 2024].map((year) => (
              <div key={year} className="grid grid-cols-1 md:grid-cols-12 gap-12 border-b border-gray-200 dark:border-zinc-800 pb-20">
                <div className="md:col-span-4 self-start">
                  <h3 className="text-8xl md:text-[120px] font-black dark:text-zinc-800 text-gray-100 leading-none tracking-tighter">{year}</h3>
                </div>
                <div className="md:col-span-8">
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
                    {['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
                      .reverse()
                      .map((month) => (
                      <button 
                        key={month}
                        className="group flex flex-col items-start text-left p-6 hover:bg-white dark:hover:bg-zinc-900 transition-all rounded-2xl"
                      >
                        <span className="caption-mono !text-[8px] opacity-40 mb-2">Month</span>
                        <span className="text-2xl font-black dark:text-white group-hover:text-neon-green transition-colors uppercase tracking-tight">{month}</span>
                        <span className="nav-label !text-[8px] mt-4 opacity-0 group-hover:opacity-100 transition-all flex items-center gap-2 text-blue-700 dark:text-neon-green">
                          Browse Series <Play size={8} fill="currentColor" strokeWidth={0} />
                        </span>
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
