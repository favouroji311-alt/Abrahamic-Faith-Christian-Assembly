import { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { 
  Home, 
  Headphones, 
  Users, 
  BookOpen, 
  Search, 
  ArrowRight, 
  Compass, 
  HeartHandshake,
  Sparkles,
  ChevronRight,
  Radio
} from 'lucide-react';
import { SEO } from '../components/common/SEO';
import type { MessageType } from '../components/ConnectModal';

interface NotFoundProps {
  onOpenConnect?: (type?: MessageType) => void;
}

interface DestinationItem {
  title: string;
  category: string;
  description: string;
  path?: string;
  action?: 'connect-prayer' | 'connect-general' | 'connect-volunteer';
  icon: typeof Home;
}

const DESTINATIONS: DestinationItem[] = [
  {
    title: 'Home Sanctuary',
    category: 'Main Hub',
    description: 'Service timings, welcome from our pastors, and upcoming worship gatherings.',
    path: '/',
    icon: Home,
  },
  {
    title: 'Sermons & Media Vault',
    category: 'Audio Teachings',
    description: 'Stream spirit-filled sermons and apostolic teachings directly in the audio player.',
    path: '/sermons',
    icon: Headphones,
  },
  {
    title: 'Ministries & Fellowships',
    category: 'Community',
    description: 'Youth ministry, Women of Faith, Men of Valor, and children fellowship groups.',
    path: '/ministries',
    icon: Users,
  },
  {
    title: 'About AFCA',
    category: 'Our Assembly',
    description: 'Discover our six core apostolic values, church history, and ministerial vision.',
    path: '/about',
    icon: BookOpen,
  },
  {
    title: 'Submit a Prayer Request',
    category: 'Spiritual Care',
    description: 'Our intercessory prayer team stands ready to join faith with you in prayer.',
    action: 'connect-prayer',
    icon: HeartHandshake,
  },
  {
    title: 'Volunteer & Serve',
    category: 'Service',
    description: 'Join a ministry department, choir, ushering team, or media production crew.',
    action: 'connect-volunteer',
    icon: Sparkles,
  },
];

export function NotFound({ onOpenConnect }: NotFoundProps) {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredDestinations = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return DESTINATIONS;
    return DESTINATIONS.filter(item => 
      item.title.toLowerCase().includes(q) ||
      item.category.toLowerCase().includes(q) ||
      item.description.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  const handleDestinationClick = (dest: DestinationItem) => {
    if (dest.action === 'connect-prayer') {
      onOpenConnect?.('Prayer Request');
    } else if (dest.action === 'connect-volunteer') {
      onOpenConnect?.('Volunteer Interest');
    } else if (dest.action === 'connect-general') {
      onOpenConnect?.('General Inquiry');
    } else if (dest.path) {
      navigate(dest.path);
    }
  };

  return (
    <div className="pt-24 sm:pt-28 min-h-[calc(100vh-80px)] overflow-hidden">
      <SEO 
        title="404 – Page Not Found | Abrahamic Faith Christian Assembly"
        description="The page you are looking for does not exist or has moved. Explore our sermons, ministries, and worship family at Abrahamic Faith Christian Assembly."
        url="/404"
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
        {/* Top Breadcrumb & Status */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-slate-500 dark:text-slate-400 mb-6"
        >
          <Compass size={15} className="text-neon-green" />
          <span>Error 404</span>
          <span aria-hidden="true" className="text-slate-400">·</span>
          <span>Page Not Located</span>
        </motion.div>

        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-12 sm:mb-16">
          <div className="lg:col-span-8">
            <motion.h1 
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="huge-title mb-5 text-slate-900 dark:text-white"
            >
              LOST YOUR <span className="text-neon-green italic underline decoration-slate-300 dark:decoration-slate-700">WAY?</span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed mb-6"
            >
              The page you are searching for might have been relocated, renamed, or is temporarily unavailable. 
              Even when the road takes an unexpected turn, guidance and fellowship are always near.
            </motion.p>

            {/* Primary Action Buttons */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="flex flex-wrap items-center gap-3"
            >
              <Link
                to="/"
                className="liquid-glass-accent px-6 py-3.5 rounded-full text-xs font-bold text-slate-950 flex items-center gap-2 cursor-pointer shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                <Home size={15} />
                <span>Return to Sanctuary</span>
              </Link>

              <Link
                to="/sermons"
                className="liquid-glass-button px-6 py-3.5 rounded-full text-xs font-bold text-slate-800 dark:text-slate-200 hover:text-blue-600 dark:hover:text-neon-green flex items-center gap-2 cursor-pointer transition-all"
              >
                <Headphones size={15} />
                <span>Stream Sermons</span>
              </Link>

              {onOpenConnect && (
                <button
                  type="button"
                  onClick={() => onOpenConnect('Prayer Request')}
                  className="liquid-glass-button px-6 py-3.5 rounded-full text-xs font-bold text-slate-800 dark:text-slate-200 hover:text-blue-600 dark:hover:text-neon-green flex items-center gap-2 cursor-pointer transition-all"
                >
                  <HeartHandshake size={15} />
                  <span>Request Prayer</span>
                </button>
              )}
            </motion.div>
          </div>

          {/* Scripture Accent Card */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="lg:col-span-4"
          >
            <div className="liquid-glass rounded-2xl p-6 sm:p-7 relative overflow-hidden border border-white/20 dark:border-white/10 shadow-lg">
              <div className="w-10 h-10 rounded-xl liquid-glass-accent flex items-center justify-center text-slate-950 mb-4 shadow-sm">
                <Radio size={18} />
              </div>
              <p className="text-xs uppercase tracking-widest text-slate-500 dark:text-slate-400 font-semibold mb-2">
                Guiding Word
              </p>
              <blockquote className="text-sm italic font-serif text-slate-800 dark:text-slate-200 mb-3 leading-relaxed">
                &ldquo;Thy word is a lamp unto my feet, and a light unto my path.&rdquo;
              </blockquote>
              <div className="text-xs font-bold text-blue-600 dark:text-neon-green">
                Psalm 119:105
              </div>
            </div>
          </motion.div>
        </div>

        {/* Search & Directory Section */}
        <section className="mt-8 pt-8 border-t border-slate-200/60 dark:border-slate-800/60">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                Find Where You Need to Go
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                Explore our main media vault, ministries, beliefs, or connect with our pastoral team.
              </p>
            </div>

            {/* Quick Live Search Input */}
            <div className="relative w-full md:w-72">
              <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search destinations..."
                className="w-full pl-10 pr-4 py-2.5 rounded-full liquid-glass text-xs text-slate-800 dark:text-slate-200 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-neon-green transition-all"
                aria-label="Search destinations"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          {/* Destinations Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredDestinations.map((dest, idx) => {
              const IconComponent = dest.icon;
              return (
                <motion.div
                  key={dest.title}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: idx * 0.05 }}
                  onClick={() => handleDestinationClick(dest)}
                  className="liquid-glass rounded-2xl p-5 hover:border-blue-400/40 dark:hover:border-neon-green/40 transition-all duration-200 cursor-pointer group flex flex-col justify-between"
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handleDestinationClick(dest);
                    }
                  }}
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <div className="w-8 h-8 rounded-lg liquid-glass flex items-center justify-center text-blue-600 dark:text-neon-green group-hover:scale-110 transition-transform">
                        <IconComponent size={16} />
                      </div>
                      <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400">
                        {dest.category}
                      </span>
                    </div>

                    <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-1 group-hover:text-blue-600 dark:group-hover:text-neon-green transition-colors">
                      {dest.title}
                    </h3>
                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                      {dest.description}
                    </p>
                  </div>

                  <div className="flex items-center gap-1.5 text-xs font-semibold text-blue-600 dark:text-neon-green mt-auto">
                    <span>Visit</span>
                    <ChevronRight size={13} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </motion.div>
              );
            })}
          </div>

          {filteredDestinations.length === 0 && (
            <div className="liquid-glass rounded-2xl p-8 text-center my-4">
              <p className="text-sm font-semibold text-slate-800 dark:text-slate-200 mb-2">
                No matching destination found for &ldquo;{searchQuery}&rdquo;
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
                Try searching for sermons, prayer, youth, giving, or return to our homepage.
              </p>
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="liquid-glass-button px-4 py-2 rounded-full text-xs font-bold text-blue-600 dark:text-neon-green cursor-pointer"
              >
                Reset Search
              </button>
            </div>
          )}
        </section>

        {/* Need Assistance Bottom Banner */}
        <section className="mt-12 liquid-inset rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-5">
          <div className="max-w-xl">
            <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white mb-1">
              Need Direct Assistance or Prayer?
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
              Our pastoral leadership and intercessors are always here to answer questions, pray with you, and help you get connected.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            {onOpenConnect && (
              <button
                type="button"
                onClick={() => onOpenConnect('General Inquiry')}
                className="liquid-glass-button px-5 py-3 rounded-full text-xs font-bold text-slate-800 dark:text-slate-200 hover:text-blue-600 dark:hover:text-neon-green flex items-center gap-2 cursor-pointer shadow-sm"
              >
                <span>Contact Office</span>
                <ArrowRight size={14} />
              </button>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
