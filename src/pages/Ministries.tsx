import { motion } from 'motion/react';
import { Music, Heart, Clock, ArrowRight } from 'lucide-react';
import { SEO } from '../components/common/SEO';
import type { MessageType } from '../components/ConnectModal';

interface MinistriesProps {
  onOpenConnect?: (type: MessageType) => void;
}

export function Ministries({ onOpenConnect }: MinistriesProps) {
  const ministries = [
    {
      title: 'Worship & Art',
      type: 'Midweek Service',
      schedule: 'Wednesday @ 5:30pm',
      icon: Music,
      accentColor: 'text-blue-600 dark:text-neon-green',
      badgeBg: 'border-blue-500/30 text-blue-600 dark:text-neon-green',
      desc: 'Bringing glory to God through authentic worship, creative expression, sound, and word in our uplifting midweek service.',
      highlights: [
        'Apostolic Praise & Adoration',
        'Midweek Spiritual Refreshing',
        'Creative Expression & Production'
      ]
    },
    {
      title: 'Women of Grace',
      type: 'Women\'s Fellowship',
      schedule: 'Bi-weekly Sunday 11:45am',
      icon: Heart,
      accentColor: 'text-rose-500',
      badgeBg: 'border-rose-500/30 text-rose-500',
      desc: 'Empowering and building strong women of faith, character, and divine purpose through fellowship, mutual support, and prayer.',
      highlights: [
        'Sisterhood & Mutual Uplifting',
        'Biblical Leadership & Character',
        'Focused Intercession & Prayer'
      ]
    },
  ];

  return (
    <div className="pt-20 sm:pt-24 min-h-screen overflow-hidden">
      <SEO 
        title="Ministries & Community | Abrahamic Faith Christian Assembly"
        description="Explore active ministries at AFCA — Worship & Art, Women of Grace, Men's Brotherhood, Youth, and Outreach teams walking in apostolic faith."
        url="/ministries"
      />
      <section className="py-16 sm:py-24 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.h1 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="huge-title mb-6 text-slate-900 dark:text-white"
          >
            ACTIVE <span className="text-neon-green italic underline decoration-slate-300 dark:decoration-slate-700">MINISTRIES.</span>
          </motion.h1>
          <p className="text-base sm:text-xl md:text-2xl text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed font-light">
            Connect with our vibrant ministry branches. Find your spiritual home to grow, worship, and build meaningful relationships in Christ.
          </p>
        </div>
      </section>

      {/* Ministries Grid */}
      <section className="py-8 sm:py-16 max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10">
          {ministries.map((m, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.4 }}
              whileHover={{ y: -6 }}
              className="liquid-glass-lg p-8 sm:p-10 rounded-3xl sm:rounded-[2.5rem] flex flex-col justify-between group cursor-pointer liquid-sheen relative overflow-hidden"
            >
              <div>
                <div className="flex items-center justify-between gap-4 mb-6">
                  <div className={`w-16 h-16 liquid-inset rounded-2xl flex items-center justify-center ${m.accentColor} group-hover:scale-110 transition-transform duration-300`}>
                    <m.icon size={30} strokeWidth={1.75} />
                  </div>
                  <span className={`caption-mono text-[9px] sm:text-[10px] px-3.5 py-1.5 rounded-full liquid-inset border ${m.badgeBg}`}>
                    {m.type}
                  </span>
                </div>

                <h3 className="text-2xl sm:text-3xl md:text-4xl font-black mb-3 text-slate-900 dark:text-white leading-tight tracking-tight">
                  {m.title}
                </h3>
                
                <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base mb-8 leading-relaxed font-light">
                  {m.desc}
                </p>

                {/* Key Focus Points */}
                <div className="space-y-2.5 mb-8">
                  {m.highlights.map((point, idx) => (
                    <div key={idx} className="flex items-center gap-3 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-neon-green shrink-0"></div>
                      <span>{point}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Schedule Info Box */}
              <div className="pt-6 border-t border-slate-300/40 dark:border-slate-800/60 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <span className="caption-mono !text-[8px] opacity-60 flex items-center gap-1.5">
                    <Clock size={11} /> SCHEDULE / GATHERING
                  </span>
                  <p className="nav-label mt-1 text-base sm:text-lg text-slate-900 dark:text-white font-bold tracking-wide">
                    {m.schedule}
                  </p>
                </div>

                <button 
                  onClick={() => onOpenConnect?.('Volunteer Interest')}
                  className="flex items-center gap-2 text-xs font-bold text-blue-600 dark:text-neon-green group-hover:translate-x-1 transition-transform self-start sm:self-auto cursor-pointer"
                >
                  <span>Get Involved</span>
                  <ArrowRight size={14} strokeWidth={2.5} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Volunteers CTA */}
      <section className="py-12 sm:py-20 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto liquid-glass-lg rounded-3xl sm:rounded-[3rem] p-8 sm:p-12 md:p-16 relative overflow-hidden flex flex-col md:flex-row items-center gap-8 md:gap-12 liquid-sheen">
          <div className="relative z-10 flex-grow w-full md:w-auto">
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-black mb-4 tracking-tight leading-none text-slate-900 dark:text-white">
              CALLED TO <br /> <span className="italic text-neon-green underline decoration-slate-300 dark:decoration-slate-700">SERVE?</span>
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-slate-600 dark:text-slate-300 font-light max-w-lg mb-8">
              Your talents and gifts are uniquely designed by God for His purpose. 
              Join a team today and make an eternal impact.
            </p>
            <button 
              onClick={() => onOpenConnect?.('Volunteer Interest')}
              className="inline-flex items-center gap-2 liquid-glass-accent text-slate-950 px-8 sm:px-12 py-4 rounded-2xl font-black text-sm sm:text-base uppercase tracking-wider cursor-pointer hover:scale-[1.02] active:scale-[0.98] transition-transform"
            >
              VOLUNTEER NOW <ArrowRight size={16} strokeWidth={2.5} />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

