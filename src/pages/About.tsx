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
    <div className="pt-24 min-h-screen bg-white dark:bg-zinc-950">
      {/* Header */}
      <section className="bg-zinc-950 py-32 text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <span className="caption-mono mb-8 block">Legacy / Vol 01</span>
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="huge-title mb-12"
          >
            OUR <span className="text-neon-green italic underline decoration-white/10">JOURNEY.</span>
          </motion.h1>
          <p className="text-2xl text-white/60 max-w-2xl leading-relaxed font-light">
            Discover the heart behind Abrahamic Faith Christian Assembly and our commitment to the Kingdom.
          </p>
        </div>
      </section>

      {/* History */}
      <section className="py-24 max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-20 items-center">
          <div className="space-y-8 leading-relaxed text-xl text-gray-600 dark:text-gray-400">
            <p>
              Since our inception in 1995, Abrahamic Faith Christian Assembly( formerly known as Faith In Action Ministries aka Triumph Christian Center) has been a cornerstone for believers 
              looking for authentic worship and deep community. We believe in the power of the Word to transform 
              lives and the call to serve as the hands and feet of Jesus.
            </p>
            <p>
              Our assembly was birthed from a vision to create a space where the ancient truths of the Bible 
              meet the modern needs of believers. Today, we stand as a diverse multi-generational family 
              dedicated to spiritual growth and community empowerment.
            </p>
            <div className="p-10 rounded-[3rem] bg-gray-100 dark:bg-gray-800 border-l-8 border-neon-green">
              <h3 className="text-3xl font-black text-blue-700 dark:text-neon-green mb-4 italic">"And they continued steadfastly in the apostles' doctrine and fellowship..."</h3>
              <p className="text-sm font-bold uppercase tracking-widest">– Acts 2:42</p>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -top-12 -right-12 w-64 h-64 bg-blue-700/10 rounded-full blur-3xl"></div>
            <img 
              src="https://images.unsplash.com/photo-1544427928-c49cdfebf494?auto=format&fit=crop&w=1000&q=80" 
              className="rounded-3xl shadow-2xl relative z-10 w-full object-cover aspect-[3/4]" 
              alt="Church History" 
            />
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-32 bg-gray-50 dark:bg-zinc-900/40 border-t border-gray-100 dark:border-zinc-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-20">
            <span className="caption-mono mb-4 block text-blue-700 dark:text-neon-green">The 6 P's / Foundational</span>
            <h2 className="text-5xl md:text-7xl font-black dark:text-white tracking-tighter leading-none mb-6">
              OUR CORE <span className="text-gray-300 dark:text-zinc-800 italic">VALUES.</span>
            </h2>
            <p className="text-xl text-gray-500 dark:text-zinc-400 font-light max-w-xl">
              The spiritual pillars that steer our faith, guide our fellowship, and define the heartbeat of other actions.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((v, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ y: -5 }}
                className="card-clean p-10 flex flex-col justify-between h-full group cursor-pointer relative overflow-hidden"
              >
                <div>
                  <div className="flex justify-between items-center mb-10">
                    <div className="w-14 h-14 bg-blue-50 dark:bg-zinc-800 rounded-2xl flex items-center justify-center text-blue-700 dark:text-neon-green group-hover:scale-110 transition-transform duration-500">
                      <v.icon size={26} />
                    </div>
                    <span className="caption-mono text-xl font-bold text-gray-200 dark:text-zinc-800 group-hover:text-neon-green transition-colors">{v.number}</span>
                  </div>
                  
                  <h3 className="text-2xl font-black mb-4 dark:text-white leading-none tracking-tight uppercase">
                    {v.title}
                  </h3>
                  
                  <p className="text-gray-500 dark:text-zinc-400 leading-relaxed font-light mb-4">
                    {v.desc}
                  </p>
                </div>
                
                <div className="pt-6 border-t border-gray-100 dark:border-zinc-800/60 mt-auto">
                  <span className="caption-mono !text-[8.5px] tracking-widest text-blue-700 dark:text-neon-green opacity-80 uppercase">
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
