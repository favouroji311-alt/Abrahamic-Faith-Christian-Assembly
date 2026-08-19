import { motion } from 'motion/react';
import { Shield, Music, Heart, Zap, Globe, BookOpen } from 'lucide-react';

export function Ministries() {
  const ministries = [
    { title: 'Youth Impact', icon: Zap, color: 'text-amber-500', desc: 'Equipping teens (ages 10-19) with the tools to navigate a modern world through faith.', time: 'Every Second Sunday' },
    { title: 'Worship & Arts', icon: Music, color: 'text-blue-600 dark:text-neon-green', desc: 'Bringing glory to God through music, dance, and technical production.', time: 'Saturdays @ 10AM' },
    { title: 'Women of Grace', icon: Heart, color: 'text-rose-500', desc: 'Building strong women of faith and purpose through fellowship and prayer.', time: 'First Saturdays @ 8AM' },
    { title: 'Global Outreach', icon: Globe, color: 'text-emerald-500', desc: 'Fulfilling the great commission through local and international missions.', time: 'Monthly outreaches' },
    { title: 'Men\'s Fellowship', icon: Shield, color: 'text-indigo-500', desc: 'Strengthening men to lead their families and communities for Christ.', time: 'Bi-weekly Fridays' },
    { title: 'Bible Institute', icon: BookOpen, color: 'text-cyan-500', desc: 'Deep theological training for those hungry for the meat of the Word.', time: 'Contact for schedule' },
  ];

  return (
    <div className="pt-20 sm:pt-24 min-h-screen overflow-hidden">
      <section className="py-16 sm:py-24 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <span className="caption-mono mb-4 block text-blue-600 dark:text-neon-green">Commitment / Vol 01</span>
          <motion.h1 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="huge-title mb-6 text-slate-900 dark:text-white"
          >
            ACTIVE <span className="text-neon-green italic underline decoration-slate-300 dark:decoration-slate-700">MINISTRIES.</span>
          </motion.h1>
          <p className="text-base sm:text-xl md:text-2xl text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed font-light">
            Find your place in our community. There's a ministry for everyone to serve and be served.
          </p>
        </div>
      </section>

      <section className="py-12 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {ministries.map((m, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ y: -4 }}
              className="liquid-glass p-6 sm:p-8 rounded-3xl flex flex-col h-full group cursor-pointer liquid-sheen"
            >
              <div className={`w-14 h-14 liquid-inset rounded-2xl flex items-center justify-center ${m.color} mb-6 group-hover:scale-105 transition-transform duration-300`}>
                <m.icon size={26} />
              </div>
              <h3 className="text-xl sm:text-2xl font-black mb-3 text-slate-900 dark:text-white leading-tight tracking-tight">{m.title}</h3>
              <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm mb-6 flex-grow leading-relaxed font-light">
                {m.desc}
              </p>
              <div className="pt-4 border-t border-slate-300/40 dark:border-slate-800/60">
                <span className="caption-mono !text-[8px] opacity-60">Frequency</span>
                <p className="nav-label mt-1 text-slate-900 dark:text-white">{m.time}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Volunteers CTA */}
      <section className="py-12 sm:py-20 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto liquid-glass-lg rounded-3xl sm:rounded-[3rem] p-8 sm:p-12 md:p-16 relative overflow-hidden flex flex-col md:flex-row items-center gap-8 md:gap-12 liquid-sheen">
          <div className="relative z-10 flex-grow w-full md:w-auto">
            <span className="caption-mono mb-3 block text-blue-600 dark:text-neon-green">Get Involved</span>
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-black mb-4 tracking-tight leading-none text-slate-900 dark:text-white">
              CALLED TO <br /> <span className="italic text-neon-green underline decoration-slate-300 dark:decoration-slate-700">SERVE?</span>
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-slate-600 dark:text-slate-300 font-light max-w-lg mb-8">
              Your talents and gifts are uniquely designed by God for His purpose. 
              Join a team today and make an impact.
            </p>
            <button className="liquid-glass-accent text-slate-950 px-8 sm:px-12 py-4 rounded-2xl font-black text-sm sm:text-base uppercase tracking-wider cursor-pointer">
              VOLUNTEER NOW
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
