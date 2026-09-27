import { motion } from 'motion/react';
import { ArrowRight, Calendar, Users, Music, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { UpcomingEvents } from '../components/UpcomingEvents';
import { SEO } from '../components/common/SEO';
import type { MessageType } from '../components/ConnectModal';

interface HomeProps {
  onOpenConnect?: (type: MessageType) => void;
}

export function Home({ onOpenConnect }: HomeProps) {
  return (
    <div className="relative overflow-hidden">
      <SEO 
        title="AFCA – Abrahamic Faith Christian Assembly | Authentic Faith"
        description="Experience authentic worship, transformative sermons, and vibrant community at Abrahamic Faith Christian Assembly (AFCA). Join our worship family today!"
        url="/"
      />
      {/* Hero Section */}
      <section className="relative min-h-[100dvh] pt-28 sm:pt-36 pb-12 sm:pb-20 flex items-end overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?auto=format&fit=crop&w=1500&q=80"
            alt="Hero Background"
            className="w-full h-full object-cover brightness-[0.3] grayscale"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#151921] via-[#151921]/40 to-transparent"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 w-full">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full liquid-inset text-slate-300 mb-6 sm:mb-8 border border-white/10">
              <span className="w-2 h-2 rounded-full bg-neon-green shadow-[0_0_8px_#39ff14] animate-pulse"></span>
              <span className="caption-mono text-slate-200">EST. 1995 / APOSTOLIC ASSEMBLY</span>
            </div>

            <h1 className="huge-title text-white mb-6 sm:mb-10 text-shadow-sm">
              AUTHENTIC<br />
              <span className="text-slate-400 dark:text-slate-500">WORSHIP.</span><br />
              ACTIVE <span className="text-neon-green italic underline decoration-neon-green/30">FAITH.</span>
            </h1>
            
            <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 sm:gap-12 border-t border-white/10 pt-6 sm:pt-10">
              <p className="text-base sm:text-xl md:text-2xl text-slate-300 max-w-xl leading-relaxed font-light">
                Join a vibrant community dedicated to spreading the transformative love of Christ.
                Stripping away the noise to prioritize high-impact spiritual growth.
              </p>
              <div className="flex gap-4 w-full md:w-auto">
                <button className="w-full md:w-auto liquid-glass-accent text-slate-950 px-8 sm:px-10 py-4 sm:py-5 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2.5 cursor-pointer">
                  JOIN US SUNDAY <ArrowRight size={16} strokeWidth={3} />
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Quick Stats/Features - Liquid Glass Inset Marquee */}
      <section className="py-5 sm:py-7 liquid-inset border-y border-slate-300/40 dark:border-slate-800/60 overflow-hidden whitespace-nowrap">
        <div className="flex animate-marquee gap-12 sm:gap-24 items-center">
          {[1, 2, 3].map((set) => (
            <div key={set} className="flex gap-12 sm:gap-24 items-center font-black text-slate-400 dark:text-slate-500 text-xl sm:text-3xl md:text-5xl uppercase tracking-tight italic">
              <span className="hover:text-blue-600 dark:hover:text-neon-green transition-colors">Radical Faith</span>
              <span className="w-2.5 h-2.5 rounded-full bg-neon-green/60 shadow-[0_0_8px_#39ff14]"></span>
              <span className="hover:text-blue-600 dark:hover:text-neon-green transition-colors">Deep Fellowship</span>
              <span className="w-2.5 h-2.5 rounded-full bg-neon-green/60 shadow-[0_0_8px_#39ff14]"></span>
              <span className="hover:text-blue-600 dark:hover:text-neon-green transition-colors">Global Outreach</span>
              <span className="w-2.5 h-2.5 rounded-full bg-neon-green/60 shadow-[0_0_8px_#39ff14]"></span>
              <span className="hover:text-blue-600 dark:hover:text-neon-green transition-colors">Unceasing Prayer</span>
              <span className="w-2.5 h-2.5 rounded-full bg-neon-green/60 shadow-[0_0_8px_#39ff14]"></span>
            </div>
          ))}
        </div>
      </section>

      {/* About Preview - Liquid Glass + Neumorphic Split Layout */}
      <section className="py-16 sm:py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-12 gap-8 lg:gap-12">
          <div className="col-span-12 lg:col-span-8 liquid-glass p-6 sm:p-10 md:p-12 rounded-3xl sm:rounded-[2.5rem] liquid-sheen">
            <h3 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-6 sm:mb-8 leading-none tracking-tight text-slate-900 dark:text-white">
              TO SET THE CAPTIVES<br/><span className="text-slate-400 dark:text-slate-600 italic">FREE</span>
            </h3>
            <div className="grid md:grid-cols-2 gap-6 sm:gap-10">
              <p className="text-sm sm:text-base md:text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                We've built more than just a sanctuary; we've built a family. 
                Our mission is to empower believers through authentic worship, deep community engagement, 
                and a relentless pursuit of the Word.
              </p>
              <p className="text-sm sm:text-base md:text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                Since our inception, we have prioritized high-impact spiritual transformation, 
                ensuring that every generation finds a place to belong and a purpose to fulfill.
              </p>
            </div>
            <div className="mt-8 sm:mt-10">
              <Link to="/about" className="liquid-glass-button px-6 py-3 rounded-full inline-flex items-center gap-3 text-blue-600 dark:text-neon-green font-bold text-xs sm:text-sm uppercase tracking-wider">
                Discover Our Story <ArrowRight size={14} strokeWidth={3} />
              </Link>
            </div>
          </div>

          <div className="col-span-12 lg:col-span-4 flex flex-col justify-between gap-6">
            <div className="liquid-glass p-6 sm:p-8 rounded-3xl liquid-sheen">
              <div className="grid grid-cols-2 gap-4">
                <div className="liquid-inset p-4 rounded-2xl flex flex-col items-center justify-center text-center">
                  <span className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white">30+</span>
                  <span className="caption-mono text-[8px] opacity-70 mt-1">Years Active</span>
                </div>
                <div className="liquid-inset p-4 rounded-2xl flex flex-col items-center justify-center text-center">
                  <span className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white">200+</span>
                  <span className="caption-mono text-[8px] opacity-70 mt-1">Members</span>
                </div>
              </div>
            </div>

            <div className="liquid-glass p-6 sm:p-8 rounded-3xl flex-1 flex flex-col justify-between liquid-sheen">
              <div>
                <h4 className="text-lg sm:text-xl font-black mb-3 text-slate-900 dark:text-white leading-snug">PROJECT ZENITH: Faith Reimagined</h4>
                <p className="text-xs text-slate-600 dark:text-slate-400 font-light leading-relaxed mb-4">
                  Experience apostolic revelation and actionable spiritual insights.
                </p>
              </div>
              <Link to="/sermons" className="liquid-glass-button px-5 py-2.5 rounded-full self-start nav-label text-blue-600 dark:text-neon-green inline-flex items-center gap-2 text-xs">
                View Series <ArrowRight size={12} strokeWidth={3} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Bento Grid Ministries Section */}
      <section className="py-16 sm:py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="mb-12 sm:mb-16">
            <h3 className="text-3xl sm:text-5xl md:text-7xl font-black text-slate-900 dark:text-white tracking-tight leading-none">
              ACTIVE <span className="text-slate-400 dark:text-slate-600 italic">MINISTRIES.</span>
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 h-auto">
            {/* Main Featured Card - Worship & Art */}
            <motion.div 
              whileHover={{ y: -4 }}
              className="md:col-span-8 md:row-span-2 liquid-glass-lg p-6 sm:p-10 md:p-12 rounded-3xl sm:rounded-[2.5rem] relative overflow-hidden group cursor-pointer liquid-sheen"
            >
              <Link to="/ministries" className="relative z-10 h-full flex flex-col justify-between block">
                <div>
                  <div className="flex items-center justify-between gap-4 mb-6 sm:mb-8">
                    <div className="liquid-inset p-4 rounded-2xl w-fit text-blue-600 dark:text-neon-green">
                      <Music size={36} strokeWidth={1.5} />
                    </div>
                    <span className="caption-mono text-[9px] sm:text-[10px] px-3.5 py-1.5 rounded-full liquid-inset border border-blue-500/30 text-blue-600 dark:text-neon-green">
                      Midweek Service
                    </span>
                  </div>
                  <h4 className="text-2xl sm:text-4xl md:text-5xl font-black mb-4 text-slate-900 dark:text-white tracking-tight">WORSHIP & ART.</h4>
                  <p className="text-sm sm:text-base md:text-lg text-slate-600 dark:text-slate-300 max-w-md leading-relaxed font-light mb-8">
                    Bringing glory to God through inspiring worship, creative arts, and spiritual renewal in our midweek assembly.
                  </p>
                </div>
                <div className="flex gap-4 items-center flex-wrap">
                  <span className="liquid-inset px-4 py-2 rounded-full caption-mono text-[9px] sm:text-[10px] text-slate-700 dark:text-slate-300 font-bold">
                    Wednesday @ 5:30pm
                  </span>
                  <div className="liquid-glass-button p-3 sm:p-3.5 rounded-full text-blue-600 dark:text-neon-green" aria-label="Learn More">
                    <ArrowRight size={18} strokeWidth={2.5} />
                  </div>
                </div>
              </Link>
            </motion.div>

            {/* Women of Grace */}
            <motion.div 
              whileHover={{ y: -4 }}
              className="md:col-span-4 liquid-glass p-6 sm:p-8 rounded-3xl text-slate-900 dark:text-white flex flex-col justify-between min-h-[220px] liquid-sheen"
            >
              <Link to="/ministries" className="flex flex-col justify-between h-full">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="liquid-inset p-3 rounded-2xl w-fit text-rose-500">
                      <Heart size={22} />
                    </div>
                    <span className="caption-mono text-[8px] px-2.5 py-1 rounded-full liquid-inset border border-rose-500/30 text-rose-500">
                      Fellowship
                    </span>
                  </div>
                  <h4 className="text-xl sm:text-2xl font-black mb-2 leading-tight">WOMEN OF GRACE.</h4>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-light leading-relaxed mb-4">
                    Empowering and building strong women of faith, character, and divine purpose.
                  </p>
                </div>
                <span className="caption-mono text-blue-600 dark:text-neon-green font-bold">Bi-weekly Sun 11:45am</span>
              </Link>
            </motion.div>

            {/* Sunday Service */}
            <motion.div 
              whileHover={{ y: -4 }}
              className="md:col-span-4 liquid-glass p-6 sm:p-8 rounded-3xl flex flex-col justify-between min-h-[220px] liquid-sheen"
            >
              <Link to="/sermons" className="flex flex-col justify-between h-full">
                <div>
                  <div className="liquid-inset p-3 rounded-2xl w-fit mb-4 text-blue-600 dark:text-neon-green">
                    <Calendar size={22} />
                  </div>
                  <h4 className="text-xl sm:text-2xl font-black mb-2 leading-tight text-slate-900 dark:text-white">SUNDAY SERVICE.</h4>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-light leading-relaxed mb-4">
                    Join our apostolic gathering for a transformative worship and teaching experience.
                  </p>
                </div>
                <span className="caption-mono text-blue-600 dark:text-neon-green font-bold">Sundays @ 09:00 AM</span>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Upcoming Events Section */}
      <UpcomingEvents />

      {/* Call to Action */}
      <section className="py-16 sm:py-24 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto liquid-glass-lg rounded-3xl sm:rounded-[3rem] p-8 sm:p-14 md:p-20 text-center relative overflow-hidden liquid-sheen">
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-black text-slate-900 dark:text-white mb-6 tracking-tight leading-tight">
            READY TO JOIN THE <span className="text-neon-green italic underline decoration-slate-300 dark:decoration-slate-700">FAMILY?</span>
          </h2>
          <p className="text-base sm:text-xl text-slate-600 dark:text-slate-300 mb-8 sm:mb-12 max-w-2xl mx-auto leading-relaxed font-light">
            We can't wait to meet you. Whether you're a lifelong believer or just curious, 
            there's a seat waiting for you at AFCA.
          </p>
          <button 
            onClick={() => onOpenConnect?.('General Inquiry')}
            className="liquid-glass-accent text-slate-950 px-8 sm:px-14 py-4 sm:py-6 rounded-2xl font-black text-sm sm:text-lg uppercase tracking-wider cursor-pointer hover:scale-[1.02] active:scale-[0.98] transition-transform"
          >
            GET CONNECTED TODAY
          </button>
        </div>
      </section>
    </div>
  );
}
