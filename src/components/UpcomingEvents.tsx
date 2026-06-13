import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Calendar, Clock, MapPin, Check, Users, ArrowRight, Bell, Sparkles } from 'lucide-react';

interface ChurchEvent {
  id: string;
  title: string;
  category: 'Worship' | 'Youth' | 'Outreach' | 'Conference' | 'Revival';
  date: string; // e.g. "June 14, 2026"
  day: string;  // e.g. "14"
  month: string; // e.g. "JUN"
  time: string; // e.g. "10:00 AM"
  location: string;
  desc: string;
  baseAttendees: number;
}

const EVENTS_DATA: ChurchEvent[] = [
  {
    id: 'evt-01',
    title: 'THE OUTPOUR WORSHIP NIGHT',
    category: 'Worship',
    date: 'June 14, 2026',
    day: '14',
    month: 'JUN',
    time: '6:00 PM',
    location: 'Main Sanctuary & Live',
    desc: 'An immersive night of perfected raw worship, heavy prayer, and encountering the supernatural presence of God.',
    baseAttendees: 342,
  },
  {
    id: 'evt-02',
    title: 'DIVINE SHIFT CONFERENCE',
    category: 'Conference',
    date: 'June 28, 2026',
    day: '28',
    month: 'JUN',
    time: '10:00 AM',
    location: 'Faith Assembly Hall',
    desc: 'An apostolic gathering focusing on building active modern faith, empowerment, and strategic spiritual transition.',
    baseAttendees: 512,
  },
  {
    id: 'evt-03',
    title: 'PURITY & PURPOSE YOUTH RALLY',
    category: 'Youth',
    date: 'July 12, 2026',
    day: '12',
    month: 'JUL',
    time: '4:00 PM',
    location: 'The Youth Loft',
    desc: 'Equipping emerging generations to stand unwavering in purity and unlock their divine mandate in a noisy generation.',
    baseAttendees: 185,
  },
  {
    id: 'evt-04',
    title: 'GLOBAL OUTREACH & CARING DAY',
    category: 'Outreach',
    date: 'July 26, 2026',
    day: '26',
    month: 'JUL',
    time: '8:00 AM',
    location: 'Central City Square',
    desc: 'Demonstrating the active hands of Christ through selfless local service, distribution of materials, and direct evangelism.',
    baseAttendees: 220,
  },
  {
    id: 'evt-05',
    title: 'WORD EXPLOSION REVIVAL WEEK',
    category: 'Revival',
    date: 'August 05, 2026',
    day: '05',
    month: 'AUG',
    time: '7:00 PM',
    location: 'Apostolic Main Ground',
    desc: 'A powerful week long conference dedicated to intense study of the word, prophetic revelation, and supernatural signs.',
    baseAttendees: 680,
  },
];

export function UpcomingEvents() {
  const [rsvpedIds, setRsvpedIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('afca_rsvp_events');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [filter, setFilter] = useState<string>('All');

  useEffect(() => {
    try {
      localStorage.setItem('afca_rsvp_events', JSON.stringify(rsvpedIds));
    } catch (e) {
      console.error('Failed to preserve RSVPs:', e);
    }
  }, [rsvpedIds]);

  const toggleRsvp = (eventId: string) => {
    setRsvpedIds((prev) => {
      if (prev.includes(eventId)) {
        return prev.filter((id) => id !== eventId);
      } else {
        return [...prev, eventId];
      }
    });
  };

  const categories = ['All', 'Worship', 'Conference', 'Youth', 'Outreach', 'Revival'];

  const filteredEvents = EVENTS_DATA.filter(
    (evt) => filter === 'All' || evt.category === filter
  );

  return (
    <section className="py-32 bg-zinc-50 dark:bg-zinc-950 border-t border-gray-100 dark:border-zinc-900 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header Block */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-12 mb-20">
          <div>
            <span className="caption-mono mb-4 block text-blue-700 dark:text-neon-green flex items-center gap-2">
              <Sparkles size={12} className="animate-pulse" /> Chronicles / Live Calendar
            </span>
            <h2 className="text-5xl md:text-7xl font-black dark:text-white tracking-tighter leading-none uppercase">
              UPCOMING <span className="text-gray-300 dark:text-zinc-800 italic">ACTIVITIES.</span>
            </h2>
          </div>
          
          {/* Categories Tab Selector */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-5 py-2.5 text-[10px] font-mono tracking-widest uppercase transition-all duration-300 ${
                  filter === cat
                    ? 'bg-zinc-950 dark:bg-neon-green text-white dark:text-zinc-950 font-black'
                    : 'bg-white dark:bg-zinc-900 text-gray-500 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white border border-gray-100 dark:border-zinc-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Event Grid */}
        {filteredEvents.length === 0 ? (
          <div className="text-center py-24 bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 rounded-[2rem]">
            <Bell className="mx-auto text-gray-300 dark:text-zinc-700 mb-6" size={48} />
            <p className="text-xl text-gray-500 dark:text-zinc-400 font-light">No gatherings scheduled this season under this category.</p>
            <button 
              onClick={() => setFilter('All')} 
              className="mt-6 text-xs font-mono text-blue-700 dark:text-neon-green tracking-widest uppercase border-b border-current pb-1"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filteredEvents.map((evt, index) => {
              const isRegistered = rsvpedIds.includes(evt.id);
              const attendeesCount = evt.baseAttendees + (isRegistered ? 1 : 0);

              return (
                <motion.div
                  key={evt.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  viewport={{ once: true }}
                  className="card-clean p-8 flex flex-col justify-between h-full group cursor-pointer relative overflow-hidden"
                >
                  <div>
                    {/* Event Type & Date Block */}
                    <div className="flex justify-between items-start mb-8">
                      {/* Date Badge */}
                      <div className="flex flex-col items-center justify-center w-16 h-16 bg-zinc-950 dark:bg-zinc-800 text-white rounded-2xl p-2 select-none group-hover:scale-105 transition-transform duration-500">
                        <span className="text-[9px] font-mono tracking-wider text-gray-400 dark:text-zinc-400 leading-none mb-1">{evt.month}</span>
                        <span className="text-2xl font-black font-display tracking-tight leading-none">{evt.day}</span>
                      </div>

                      {/* Category Pill */}
                      <span className={`px-4 py-1.5 rounded-full text-[9px] font-mono tracking-widest uppercase font-black ${
                        isRegistered 
                          ? 'bg-blue-50 dark:bg-neon-green/10 text-blue-800 dark:text-neon-green border border-blue-100 dark:border-neon-green/20'
                          : 'bg-gray-100 dark:bg-zinc-800 text-gray-500 dark:text-zinc-400'
                      }`}>
                        {isRegistered ? 'REGISTERED' : evt.category}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-2xl font-black mb-4 dark:text-white group-hover:text-blue-700 dark:group-hover:text-neon-green transition-colors leading-tight tracking-tight uppercase">
                      {evt.title}
                    </h3>

                    {/* Details (Time / Location) */}
                    <div className="space-y-2 mb-6">
                      <div className="flex items-center gap-2.5 text-xs text-gray-500 dark:text-zinc-400 font-light">
                        <Clock size={13} className="shrink-0 text-blue-700 dark:text-neon-green" />
                        <span>{evt.time}</span>
                      </div>
                      <div className="flex items-center gap-2.5 text-xs text-gray-500 dark:text-zinc-400 font-light">
                        <MapPin size={13} className="shrink-0 text-gray-400 dark:text-zinc-500" />
                        <span className="truncate">{evt.location}</span>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-sm text-gray-500 dark:text-zinc-400 leading-relaxed font-light mb-8">
                      {evt.desc}
                    </p>
                  </div>

                  {/* Attendance & RSVP Toggle Section */}
                  <div className="mt-auto pt-6 border-t border-gray-100 dark:border-zinc-800/60 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-2 text-[10px] font-mono text-gray-400 dark:text-zinc-500">
                      <Users size={12} className="shrink-0" />
                      <span>{attendeesCount} ATTENDING</span>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleRsvp(evt.id);
                      }}
                      className={`px-5 py-2.5 font-black text-[9px] tracking-widest uppercase transition-all duration-300 rounded-none flex items-center gap-2 h-10 ${
                        isRegistered
                          ? 'bg-blue-50 dark:bg-neon-green/10 text-blue-700 dark:text-neon-green border border-blue-200 dark:border-neon-green/20'
                          : 'bg-zinc-950 dark:bg-neon-green text-white dark:text-zinc-950 hover:scale-[1.03]'
                      }`}
                    >
                      {isRegistered ? (
                        <>
                          <Check size={10} strokeWidth={4} />
                          <span>CANCEL RSVP</span>
                        </>
                      ) : (
                        <>
                          <span>RSVP</span>
                          <ArrowRight size={10} strokeWidth={3} className="group-hover:translate-x-1 transition-transform" />
                        </>
                      )}
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
