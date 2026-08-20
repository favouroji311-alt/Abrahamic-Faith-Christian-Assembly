import { motion } from 'motion/react';
import { BookOpen, Flame, Sparkles, Music, TrendingUp, Zap } from 'lucide-react';

export function About() {
  const values = [
    { 
      number: '01', 
      title: 'Passion for the Word', 
      icon: BookOpen, 
      desc: 'An unrelenting hunger for biblical truth. We are devoted to the study, preaching, and active live demonstration of the Holy Scriptures as our final authority.' 
    },
    { 
      number: '02', 
      title: 'Prayer', 
      icon: Flame, 
      desc: 'The divine power source and breath of our assembly. We engage in bold, explosive, faith-filled prayer to align our lives with God’s eternal destiny.' 
    },
    { 
      number: '03', 
      title: 'Purity', 
      icon: Sparkles, 
      desc: 'A calling to true sanctification. We pursue holiness in our character, relationships, and service, maintaining an uncompromising standard of structural integrity.' 
    },
    { 
      number: '04', 
      title: 'Perfected Praise', 
      icon: Music, 
      desc: 'Elevating our worship to a spiritual standard. We offer magnificent, heartfelt praise and creative expression that hosts the manifest presence of God.' 
    },
    { 
      number: '05', 
      title: 'Prosperity', 
      icon: TrendingUp, 
      desc: 'Abundance in its fullness—spiritual, mental, physical, and financial. We believe God empowers His children to thrive so they can be massive conduits of blessing.' 
    },
    { 
      number: '06', 
      title: 'Power', 
      icon: Zap, 
      desc: 'The dynamic demonstration of the Holy Ghost. We expect and cultivate signs, wonders, healings, and the supernatural flow of apostolic authority.' 
    }
  ];

  return (
    <div className="pt-20 sm:pt-24 min-h-screen overflow-hidden">
      {/* Header */}
      <section className="py-16 sm:py-24 md:py-28 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="huge-title mb-6 text-slate-900 dark:text-white"
          >
            OUR <span className="text-neon-green italic underline decoration-slate-300 dark:decoration-slate-700">JOURNEY.</span>
          </motion.h1>
          <p className="text-base sm:text-xl md:text-2xl text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed font-light">
            Discover the heart behind Abrahamic Faith Christian Assembly and our commitment to the Kingdom.
          </p>
        </div>
      </section>

      {/* History */}
      <section className="py-12 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">
          <div className="space-y-6 leading-relaxed text-sm sm:text-base md:text-lg text-slate-600 dark:text-slate-300">
            <p>
              Since our inception in 1995, Abrahamic Faith Christian Assembly (formerly known as Faith In Action Ministries aka Triumph Christian Center) has been a cornerstone for believers 
              looking for authentic worship and deep community. We believe in the power of the Word to transform 
              lives and the call to serve as the hands and feet of Jesus.
            </p>
            <p>
              Our assembly was birthed from a vision to create a space where the ancient truths of the Bible 
              meet the modern needs of believers. Today, we stand as a diverse multi-generational family 
              dedicated to spiritual growth and community empowerment.
            </p>
            <div className="p-6 sm:p-8 rounded-3xl liquid-inset border-l-4 border-neon-green">
              <h3 className="text-lg sm:text-2xl font-black text-blue-600 dark:text-neon-green mb-3 italic">
                "And they continued steadfastly in the apostles' doctrine and fellowship..."
              </h3>
              <p className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">– Acts 2:42</p>
            </div>
          </div>
          <div className="relative">
            <div className="liquid-glass p-3 sm:p-4 rounded-3xl sm:rounded-[2.5rem] liquid-sheen">
              <img 
                src="https://images.unsplash.com/photo-1544427928-c49cdfebf494?auto=format&fit=crop&w=1000&q=80" 
                className="rounded-2xl sm:rounded-[2rem] w-full object-cover aspect-[4/3] sm:aspect-[3/4]" 
                alt="Church History" 
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 sm:py-24 md:py-32 border-t border-slate-300/40 dark:border-slate-800/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-5xl md:text-7xl font-black text-slate-900 dark:text-white tracking-tight leading-none mb-4">
              OUR CORE <span className="text-slate-400 dark:text-slate-600 italic">VALUES.</span>
            </h2>
            <p className="text-base sm:text-xl text-slate-600 dark:text-slate-400 font-light max-w-xl">
              The spiritual pillars that steer our faith, guide our fellowship, and define the heartbeat of other actions.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {values.map((v, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ y: -4 }}
                className="liquid-glass p-6 sm:p-8 rounded-3xl flex flex-col justify-between h-full group cursor-pointer relative overflow-hidden liquid-sheen"
              >
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 liquid-inset rounded-2xl flex items-center justify-center text-blue-600 dark:text-neon-green group-hover:scale-105 transition-transform duration-300">
                      <v.icon size={24} />
                    </div>
                    <span className="caption-mono text-lg sm:text-xl font-bold text-slate-400 dark:text-slate-500 group-hover:text-neon-green transition-colors">{v.number}</span>
                  </div>
                  
                  <h3 className="text-xl sm:text-2xl font-black mb-3 text-slate-900 dark:text-white leading-tight tracking-tight uppercase">
                    {v.title}
                  </h3>
                  
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-light mb-4">
                    {v.desc}
                  </p>
                </div>
                
                <div className="pt-4 border-t border-slate-300/40 dark:border-slate-800/60 mt-auto">
                  <span className="caption-mono !text-[8.5px] tracking-widest text-blue-600 dark:text-neon-green uppercase font-bold">
                    Pillar / {v.title.split(' ')[0]}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
