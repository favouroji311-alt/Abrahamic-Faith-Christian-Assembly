import { motion } from 'motion/react';
import { ArrowRight, Calendar, Users, Music, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { UpcomingEvents } from '../components/UpcomingEvents';

export function Home() {
  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="relative h-screen flex items-end overflow-hidden pb-20">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?auto=format&fit=crop&w=1500&q=80"
            alt="Hero Background"
            className="w-full h-full object-cover brightness-[0.35] grayscale"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/90 via-zinc-950/20 to-transparent"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="caption-mono mb-8 block text-white/50">
              EST. 1995 / APOSTOLIC ASSEMBLY
            </span>
            <h1 className="huge-title text-white mb-12">
              AUTHENTIC<br />
              <span className="text-zinc-800 dark:text-zinc-700">WORSHIP.</span><br />
              ACTIVE <span className="text-neon-green italic">FAITH.</span>
            </h1>
            
            <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-12 border-t border-white/10 pt-12">
              <p className="text-xl md:text-2xl text-white/60 max-w-xl leading-relaxed font-light">
                Join a vibrant community dedicated to spreading the transformative love of Christ.
                Stripping away the noise to prioritize high-impact spiritual growth.
              </p>
              <div className="flex gap-4 w-full md:w-auto">
                <button className="bg-neon-green text-zinc-950 px-10 py-6 rounded-none font-black text-xs uppercase tracking-widest hover:brightness-110 transition-all shadow-xl neon-shadow flex items-center justify-center gap-2">
                  JOIN US SUNDAY <ArrowRight size={16} strokeWidth={3} />
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Quick Stats/Features - Marquee style */}
      <section className="py-8 bg-zinc-950 border-y border-white/5 overflow-hidden whitespace-nowrap">
        <div className="flex animate-marquee gap-24 items-center">
          {[1, 2, 3].map((set) => (
            <div key={set} className="flex gap-24 items-center font-black text-white/20 text-4xl md:text-7xl uppercase tracking-tighter italic">
              <span>Radical Faith</span>
              <span>Deep Fellowship</span>
              <span>Global Outreach</span>
              <span>Unceasing Prayer</span>
            </div>
          ))}
        </div>
      </section>

      {/* About Preview - Split grid style */}
      <section className="py-32 bg-white dark:bg-zinc-950">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-12 gap-12">
          <div className="col-span-12 lg:col-span-8">
            <h2 className="caption-mono mb-8 text-blue-700 dark:text-neon-green">Selected Mission / Vol 01</h2>
            <h3 className="text-6xl md:text-8xl font-black mb-12 leading-none tracking-tighter dark:text-white">
              TO SET THE CAPTIVES<br/><span className="text-gray-200 dark:text-zinc-800 italic">FREE</span>
            </h3>
            <div className="grid md:grid-cols-2 gap-12">
              <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed font-light">
                We've built more than just a sanctuary; we've built a family. 
                Our mission is to empower believers through authentic worship, deep community engagement, 
                and a relentless pursuit of the Word.
              </p>
              <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed font-light">
                Since our inception, we have prioritized high-impact visual and spiritual communication, 
                ensuring that every generation finds a place to belong and a purpose to fulfill.
              </p>
            </div>
            <Link to="/about" className="nav-label mt-12 inline-flex items-center gap-4 text-blue-700 dark:text-neon-green hover:gap-6 transition-all border-b-2 border-current pb-2">
              Discover Our Story <ArrowRight size={14} strokeWidth={3} />
            </Link>
          </div>

          <div className="col-span-12 lg:col-span-4 border-l border-gray-100 dark:border-zinc-900 pl-8 hidden lg:flex flex-col justify-between">
            <div className="space-y-12">
              <div>
                <h4 className="caption-mono mb-4 text-blue-700 dark:text-neon-green">Metrics</h4>
                <div className="grid grid-cols-2 gap-8">
                  <div className="flex flex-col">
                    <span className="text-4xl font-black dark:text-white">30+</span>
                    <span className="caption-mono text-[8px] opacity-50">Years</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-4xl font-black dark:text-white">1k+</span>
                    <span className="caption-mono text-[8px] opacity-50">Members</span>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 dark:bg-zinc-900 p-8 rounded-none border border-gray-100 dark:border-zinc-800">
                <span className="caption-mono block mb-4">Latest Sermon</span>
                <h4 className="text-xl font-black mb-4 dark:text-white">PROJECT ZENITH: Faith Reimagined</h4>
                <Link to="/sermons" className="nav-label text-blue-700 dark:text-neon-green flex items-center gap-2">
                  View Series <ArrowRight size={12} strokeWidth={3} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bento Grid Ministries Section */}
      <section className="py-32 bg-gray-50 dark:bg-zinc-900/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-20">
            <h2 className="caption-mono mb-4 text-blue-700 dark:text-neon-green">Commitment / Active</h2>
            <h3 className="text-5xl md:text-7xl font-black mb-6 dark:text-white tracking-tighter leading-none">
              ACTIVE <span className="text-gray-300 dark:text-zinc-800 italic">MINISTRIES.</span>
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 h-auto md:h-[800px]">
            {/* Main Featured Card */}
            <motion.div 
              whileHover={{ y: -5 }}
              className="md:col-span-8 md:row-span-2 bg-white dark:bg-zinc-950 border border-gray-100 dark:border-zinc-800 p-12 rounded-[2.5rem] relative overflow-hidden group cursor-pointer"
            >
              <div className="absolute inset-0 z-0">
                <img 
                  src="https://images.unsplash.com/photo-1544427928-c49cdfebf494?auto=format&fit=crop&w=1000&q=80" 
                  className="w-full h-full object-cover opacity-10 grayscale group-hover:scale-110 transition-transform duration-700" 
                  alt="Worship" 
                />
              </div>
              <div className="relative z-10 h-full flex flex-col justify-between">
                <div>
                  <Music className="text-neon-green mb-8" size={64} strokeWidth={1} />
                  <h4 className="text-5xl font-black mb-6 dark:text-white tracking-tighter">WORSHIP & <br/>ARTS.</h4>
                  <p className="text-xl text-gray-500 max-w-md leading-relaxed font-light">
                    Bringing glory to God through high-impact music, dance, and technical production excellence.
                  </p>
                </div>
                <div className="flex gap-4 items-center">
                  <span className="caption-mono p-4 border border-gray-100 dark:border-zinc-800 rounded-full">Saturdays @ 10AM</span>
                  <button className="bg-neon-green text-zinc-950 p-4 rounded-full">
                    <ArrowRight size={24} />
                  </button>
                </div>
              </div>
            </motion.div>

            {/* Youth Impact */}
            <motion.div 
              whileHover={{ y: -5 }}
              className="md:col-span-4 bg-blue-700 p-10 rounded-[2.5rem] text-white flex flex-col justify-between"
            >
              <div>
                <Heart className="text-neon-green mb-6" size={32} />
                <h4 className="text-3xl font-black mb-4 leading-tight">YOUTH <br/>IMPACT.</h4>
                <p className="text-white/70 font-light leading-relaxed">
                  Equipping teens to navigate a modern world through deep faith.
                </p>
              </div>
              <span className="caption-mono text-white/50">Every 2nd Sunday</span>
            </motion.div>

            {/* outreach */}
            <motion.div 
              whileHover={{ y: -5 }}
              className="md:col-span-4 bg-zinc-100 dark:bg-zinc-800 p-10 rounded-[2.5rem] flex flex-col justify-between"
            >
              <div>
                <Calendar className="text-blue-700 dark:text-neon-green mb-6" size={32} />
                <h4 className="text-3xl font-black mb-4 leading-tight dark:text-white">SUNDAY <br/>SERVICE.</h4>
                <p className="text-gray-500 font-light leading-relaxed">
                  Join our main apostolic gathering for a life-altering experience.
                </p>
              </div>
              <span className="caption-mono">09:00 AM</span>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Upcoming Events Section */}
      <UpcomingEvents />

      {/* Call to Action */}
      <section className="bg-blue-700 py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
          <h2 className="text-5xl md:text-7xl font-black text-white mb-8 tracking-tighter">
            READY TO JOIN THE <span className="text-neon-green italic underline decoration-white/20">FAMILY?</span>
          </h2>
          <p className="text-2xl text-white/80 mb-12 max-w-2xl mx-auto leading-relaxed">
            We can't wait to meet you. Whether you're a lifelong believer or just curious, 
            there's a seat waiting for you at AFCA.
          </p>
          <button className="bg-white text-blue-900 px-12 py-6 rounded-[2rem] font-black text-2xl hover:scale-105 transition-transform shadow-2xl">
            GET CONNECTED TODAY
          </button>
        </div>
      </section>
    </div>
  );
}
