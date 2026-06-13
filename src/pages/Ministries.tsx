import { motion } from 'motion/react';
import { Shield, Music, Heart, Zap, Globe, BookOpen } from 'lucide-react';

export function Ministries() {
  const ministries = [
    { title: 'Youth Impact', icon: Zap, color: 'text-yellow-500', bg: 'bg-yellow-50', desc: 'Equipping teens (ages 10-19) with the tools to navigate a modern world through faith.', time: 'Every Second Sunday' },
    { title: 'Worship & Arts', icon: Music, color: 'text-purple-600', bg: 'bg-purple-50', desc: 'Bringing glory to God through music, dance, and technical production.', time: 'Saturdays @ 10AM' },
    { title: 'Women of Grace', icon: Heart, color: 'text-blue-600', bg: 'bg-blue-50', desc: 'Building strong women of faith and purpose through fellowship and prayer.', time: 'First Saturdays @ 8AM' },
    { title: 'Global Outreach', icon: Globe, color: 'text-green-600', bg: 'bg-green-50', desc: 'Fulfilling the great commission through local and international missions.', time: 'Monthly outreaches' },
    { title: 'Men\'s Fellowship', icon: Shield, color: 'text-slate-700', bg: 'bg-slate-100', desc: 'Strengthening men to lead their families and communities for Christ.', time: 'Bi-weekly Fridays' },
    { title: 'Bible Institute', icon: BookOpen, color: 'text-blue-900', bg: 'bg-blue-100', desc: 'Deep theological training for those hungry for the meat of the Word.', time: 'Contact for schedule' },
  ];

  return (
    <div className="pt-24 min-h-screen bg-gray-50 dark:bg-zinc-950">
      <section className="bg-zinc-950 py-32 text-white">
        <div className="max-w-7xl mx-auto px-6">
          <span className="caption-mono mb-8 block">Commitment / Vol 01</span>
          <motion.h1 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="huge-title mb-12"
          >
            ACTIVE <span className="text-neon-green">MINISTRIES.</span>
          </motion.h1>
          <p className="text-2xl text-white/60 max-w-2xl leading-relaxed font-light">
            Find your place in our community. There's a ministry for everyone to serve and be served.
          </p>
        </div>
      </section>

      <section className="py-24 max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {ministries.map((m, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ y: -5 }}
              className="card-clean p-10 flex flex-col h-full group cursor-pointer"
            >
              <div className={`w-16 h-16 ${m.bg} dark:bg-zinc-800 rounded-2xl flex items-center justify-center ${m.color} dark:text-neon-green mb-8 group-hover:scale-110 transition-transform duration-500`}>
                <m.icon size={28} />
              </div>
              <h3 className="text-3xl font-black mb-4 dark:text-white leading-tight tracking-tighter">{m.title}</h3>
              <p className="text-gray-500 dark:text-zinc-400 text-lg mb-8 flex-grow leading-relaxed font-light">
                {m.desc}
              </p>
              <div className="pt-8 border-t border-gray-50 dark:border-zinc-800">
                <span className="caption-mono !text-[8px] opacity-40">Frequency</span>
                <p className="nav-label mt-1 dark:text-white">{m.time}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Volunteers CTA */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto bg-neon-green rounded-[4rem] p-12 md:p-20 text-blue-900 relative overflow-hidden flex flex-col md:flex-row items-center gap-12">
          <div className="relative z-10 flex-grow">
            <h2 className="text-5xl md:text-7xl font-black mb-6 tracking-tighter leading-none">
              CALLED TO <br /> <span className="italic">SERVE?</span>
            </h2>
            <p className="text-xl font-bold opacity-80 max-w-lg mb-10">
              Your talents and gifts are uniquely designed by God for His purpose. 
              Join a team today and make an impact.
            </p>
            <button className="bg-blue-900 text-white px-12 py-5 rounded-2xl font-black text-xl hover:scale-105 transition-transform shadow-2xl">
              VOLUNTEER NOW
            </button>
          </div>
          <div className="hidden md:block absolute -right-20 -bottom-20 w-80 h-80 bg-blue-900/10 rounded-full blur-3xl"></div>
        </div>
      </section>
    </div>
  );
}
