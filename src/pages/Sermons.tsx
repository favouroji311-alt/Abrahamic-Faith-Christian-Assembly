import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Play, 
  Pause, 
  Mic, 
  Search, 
  Volume2, 
  Download, 
  Sparkles,
  Radio,
  FileAudio,
  Calendar,
  RotateCcw,
  RotateCw,
  Loader2,
  Headphones,
  Maximize2,
  Minimize2
} from 'lucide-react';
import { useAudio } from '../context/AudioContext';
import { 
  fetchSermons, 
  Sermon, 
  INITIAL_SERMONS 
} from '../lib/sermons';

export function Sermons() {
  const { 
    currentTrack, 
    isPlaying, 
    isLoading: isAudioLoading, 
    currentTime, 
    duration, 
    playTrack, 
    togglePlay, 
    seek, 
    skipTime, 
    formatTime,
    playbackError,
    retryPlayback,
    isDockedPlayerOpen,
    setIsDockedPlayerOpen,
    toggleDockedPlayer
  } = useAudio();
  const [sermons, setSermons] = useState<Sermon[]>(INITIAL_SERMONS);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTopic, setSelectedTopic] = useState('All Topics');

  // Load sermons on mount
  const loadSermons = async () => {
    setIsLoading(true);
    try {
      const result = await fetchSermons();
      setSermons(result.sermons);
    } catch (err) {
      console.warn('Failed to fetch sermons:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadSermons();
  }, []);

  // Find the primary featured sermon (School of Wealth Vol 1 Part 11)
  const featuredSermon = 
    sermons.find(s => s.title.toLowerCase().includes('school of wealth')) || 
    sermons[0] || 
    INITIAL_SERMONS[0];

  const isFeaturedPlaying = currentTrack?.id === featuredSermon.id && isPlaying;

  // Filter sermons
  const topics = ['All Topics', 'Wealth & Finances', 'Faith', 'Prayer', 'Love', 'Purpose', 'Salvation'];

  const filteredSermons = sermons.filter(s => {
    const matchesTopic = selectedTopic === 'All Topics' || s.tag.toLowerCase().includes(selectedTopic.toLowerCase());
    const matchesSearch = 
      s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.speaker.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.tag.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTopic && matchesSearch;
  });

  return (
    <div className="pt-20 sm:pt-24 min-h-screen overflow-hidden pb-32">
      {/* Header Section */}
      <section className="py-12 sm:py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="caption-mono !text-[9px] px-3 py-1 liquid-inset rounded-full text-blue-600 dark:text-neon-green font-bold flex items-center gap-1.5">
                  <Radio size={12} className="text-blue-600 dark:text-neon-green animate-pulse" />
                  AUDIO TEACHINGS ARCHIVE
                </span>
              </div>
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="huge-title text-slate-900 dark:text-white"
              >
                SERMON <span className="text-blue-600 dark:text-neon-green italic underline decoration-slate-300 dark:decoration-slate-700 uppercase">Vault.</span>
              </motion.h1>
              <p className="text-base sm:text-xl text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed font-light mt-3">
                Stream spirit-filled audio messages and sermons directly from our media vault.
              </p>
            </div>
          </div>

          {/* FEATURED SERMON HERO PLAYER: School of Wealth Vol 1 Part 11 */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="liquid-glass-lg rounded-3xl p-6 sm:p-10 relative overflow-hidden liquid-sheen border border-white/60 dark:border-white/10 shadow-2xl"
          >
            {/* Ambient background glow */}
            <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 rounded-full bg-blue-500/10 dark:bg-neon-green/10 blur-3xl pointer-events-none" />

            <div className="grid lg:grid-cols-12 gap-8 items-center relative z-10">
              {/* Left Column: Sermon Meta & Description */}
              <div className="lg:col-span-7 space-y-4">
                <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                  <span className="caption-mono !text-[9px] px-3 py-1 liquid-glass-accent rounded-full text-slate-950 font-black flex items-center gap-1.5">
                    <Sparkles size={12} /> FEATURED AUDIO MESSAGE
                  </span>
                  <span className="caption-mono !text-[9px] px-3 py-1 liquid-inset rounded-full text-blue-600 dark:text-neon-green font-bold">
                    {featuredSermon.tag}
                  </span>
                  <span className="caption-mono !text-[9px] text-slate-500 dark:text-slate-400 flex items-center gap-1">
                    <Calendar size={12} /> {featuredSermon.date}
                  </span>
                </div>

                <h2 className="text-2xl sm:text-4xl md:text-5xl font-black text-slate-900 dark:text-white leading-[1.05] uppercase tracking-tight">
                  {featuredSermon.title}
                </h2>

                <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed font-light">
                  {featuredSermon.description}
                </p>

                <div className="flex items-center gap-3 pt-2">
                  <div className="w-8 h-8 rounded-full liquid-inset flex items-center justify-center text-blue-600 dark:text-neon-green">
                    <Mic size={14} />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-900 dark:text-white block">{featuredSermon.speaker}</span>
                    <span className="caption-mono !text-[8px] text-slate-500">Senior Minister</span>
                  </div>
                </div>

                {/* Inline Progress Bar for Featured Track */}
                <div className="pt-2 space-y-1.5">
                  {playbackError && currentTrack?.id === featuredSermon.id && (
                    <div className="text-[11px] text-amber-500 bg-amber-500/10 border border-amber-500/20 rounded-xl px-3 py-1.5 flex items-center justify-between">
                      <span>{playbackError}</span>
                      <button
                        onClick={retryPlayback}
                        className="font-bold underline cursor-pointer text-blue-600 dark:text-neon-green ml-2"
                      >
                        Retry
                      </button>
                    </div>
                  )}

                  <div 
                    onClick={(e) => {
                      const rect = e.currentTarget.getBoundingClientRect();
                      const clickX = e.clientX - rect.left;
                      const newPercent = Math.max(0, Math.min(1, clickX / rect.width));
                      if (currentTrack?.id !== featuredSermon.id) {
                        playTrack(featuredSermon);
                      }
                      seek(newPercent * (duration || 3320));
                    }}
                    className="h-2 w-full liquid-inset rounded-full cursor-pointer relative overflow-hidden group"
                    role="slider"
                    aria-label="Seek timeline"
                  >
                    <div 
                      className="absolute left-0 top-0 bottom-0 bg-gradient-to-r from-blue-600 to-cyan-400 dark:from-emerald-500 dark:to-neon-green rounded-full transition-[width] duration-100"
                      style={{ 
                        width: `${currentTrack?.id === featuredSermon.id && duration > 0 ? (currentTime / duration) * 100 : 0}%` 
                      }}
                    />
                  </div>
                  <div className="flex justify-between text-[10px] font-mono text-slate-500 dark:text-slate-400">
                    <span>{currentTrack?.id === featuredSermon.id ? formatTime(currentTime) : '0:00'}</span>
                    <span>{currentTrack?.id === featuredSermon.id && duration > 0 ? formatTime(duration) : '55:20'}</span>
                  </div>
                </div>

                {/* Main Action Buttons */}
                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <button
                    onClick={() => {
                      if (currentTrack?.id === featuredSermon.id) {
                        togglePlay();
                      } else {
                        playTrack(featuredSermon, false);
                      }
                    }}
                    className="liquid-glass-accent text-slate-950 px-6 sm:px-8 py-3.5 sm:py-4 rounded-full font-black text-xs uppercase tracking-widest flex items-center gap-3 cursor-pointer hover:scale-105 active:scale-95 transition-all shadow-xl"
                  >
                    {isAudioLoading && currentTrack?.id === featuredSermon.id ? (
                      <>
                        <Loader2 size={18} className="animate-spin" /> LOADING...
                      </>
                    ) : isFeaturedPlaying ? (
                      <>
                        <Pause size={18} fill="currentColor" /> PAUSE
                      </>
                    ) : (
                      <>
                        <Play size={18} fill="currentColor" /> PLAY
                      </>
                    )}
                  </button>

                  {/* Toggle Docked Player Button */}
                  <button
                    onClick={() => {
                      if (currentTrack?.id !== featuredSermon.id) {
                        playTrack(featuredSermon, true);
                      } else {
                        toggleDockedPlayer();
                      }
                    }}
                    className="liquid-glass-button px-4 py-3.5 rounded-full text-xs font-bold text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-neon-green flex items-center gap-2 cursor-pointer shadow-sm"
                    title={isDockedPlayerOpen ? "Minimize to background playback" : "Open persistent docked player bar"}
                  >
                    {isDockedPlayerOpen ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
                    <span>{isDockedPlayerOpen ? 'Undock Player' : 'Dock Player'}</span>
                  </button>

                  {/* 10s Rewind & Forward */}
                  <button
                    onClick={() => skipTime(-10)}
                    className="p-3.5 rounded-full liquid-glass-button text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-neon-green cursor-pointer"
                    title="Rewind 10 seconds"
                    aria-label="Rewind 10 seconds"
                  >
                    <RotateCcw size={16} />
                  </button>

                  <button
                    onClick={() => skipTime(10)}
                    className="p-3.5 rounded-full liquid-glass-button text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-neon-green cursor-pointer"
                    title="Forward 10 seconds"
                    aria-label="Forward 10 seconds"
                  >
                    <RotateCw size={16} />
                  </button>

                  {featuredSermon.audio_file_url && (
                    <a
                      href={featuredSermon.audio_file_url}
                      download="School of Wealth vol 1 prt11.mp3"
                      target="_blank"
                      rel="noreferrer"
                      className="liquid-glass-button px-5 py-3.5 rounded-full text-xs font-bold text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-neon-green flex items-center gap-2 cursor-pointer ml-auto sm:ml-0"
                    >
                      <Download size={15} /> Download MP3
                    </a>
                  )}
                </div>
              </div>

              {/* Right Column: Audio Cassette / Disc Visualizer Card */}
              <div className="lg:col-span-5 flex justify-center">
                <div className="w-full max-w-sm liquid-inset rounded-3xl p-6 sm:p-8 flex flex-col items-center justify-center text-center relative overflow-hidden group">
                  {/* Rotating Vinyl / Disc Graphic */}
                  <div className={`relative w-44 h-44 sm:w-52 sm:h-52 rounded-full liquid-glass flex items-center justify-center shadow-2xl transition-all duration-700 ${
                    isFeaturedPlaying ? 'animate-[spin_8s_linear_infinite]' : ''
                  }`}>
                    {/* Vinyl grooves */}
                    <div className="absolute inset-3 rounded-full border border-slate-400/20 dark:border-white/10" />
                    <div className="absolute inset-7 rounded-full border border-slate-400/20 dark:border-white/10" />
                    <div className="absolute inset-12 rounded-full border border-slate-400/20 dark:border-white/10" />
                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full liquid-glass-accent flex items-center justify-center text-slate-950 shadow-inner">
                      {isFeaturedPlaying ? (
                        <Volume2 size={24} className="animate-pulse" />
                      ) : (
                        <FileAudio size={24} />
                      )}
                    </div>
                  </div>

                  {/* Sound Wave equalizer animation */}
                  <div className="flex items-end justify-center gap-1.5 h-8 mt-6">
                    {[40, 75, 55, 90, 65, 85, 45, 95, 60, 80, 50, 70].map((height, idx) => (
                      <span
                        key={idx}
                        className={`w-1 rounded-full transition-all duration-300 ${
                          isFeaturedPlaying
                            ? 'bg-blue-600 dark:bg-neon-green animate-pulse'
                            : 'bg-slate-400/40 dark:bg-slate-700'
                        }`}
                        style={{
                          height: isFeaturedPlaying ? `${height}%` : '20%',
                          animationDelay: `${idx * 0.1}s`,
                          animationDuration: '0.8s'
                        }}
                      />
                    ))}
                  </div>

                  <span className="caption-mono !text-[8px] text-slate-500 dark:text-slate-400 mt-4 flex items-center gap-1 font-bold">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping inline-block mr-1" />
                    DIGITAL AUDIO ARCHIVE
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Filter and Search Bar */}
      <section className="sticky top-[58px] sm:top-[72px] z-40 py-4 sm:py-5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="liquid-glass rounded-full p-2 sm:p-3 flex flex-col md:flex-row justify-between items-center gap-3 sm:gap-4 liquid-sheen">
            {/* Filter buttons */}
            <div className="flex overflow-x-auto w-full md:w-auto pb-1 md:pb-0 gap-2 no-scrollbar shrink-0 px-2">
              {topics.map((t) => (
                <button 
                  key={t}
                  onClick={() => setSelectedTopic(t)}
                  className={`px-4 sm:px-5 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                    selectedTopic === t 
                      ? 'liquid-inset text-blue-600 dark:text-neon-green font-black shadow-inner' 
                      : 'liquid-glass-button text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="relative w-full md:w-80 px-2 md:px-0">
              <Search className="absolute left-6 md:left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by title, speaker, topic..."
                className="w-full liquid-inset rounded-full py-2 sm:py-2.5 pl-11 pr-5 text-xs font-medium outline-none focus:ring-1 focus:ring-blue-600 dark:focus:ring-neon-green text-slate-900 dark:text-white placeholder:text-slate-400"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Sermons Audio Catalog Grid */}
      <section className="py-10 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tight">
              ALL RECORDINGS ({filteredSermons.length})
            </h3>
            <p className="text-xs text-slate-500 font-light mt-0.5">
              Click any sermon to stream instantly in the high-fidelity player
            </p>
          </div>
        </div>

        {filteredSermons.length === 0 ? (
          <div className="liquid-glass rounded-3xl p-12 text-center max-w-lg mx-auto space-y-3">
            <Radio size={36} className="text-slate-400 mx-auto opacity-60" />
            <h4 className="text-lg font-bold text-slate-900 dark:text-white">No sermons found</h4>
            <p className="text-xs text-slate-500">
              Try adjusting your search query or topic filter.
            </p>
            <button
              onClick={() => { setSelectedTopic('All Topics'); setSearchQuery(''); }}
              className="liquid-glass-button px-4 py-2 rounded-full text-xs font-bold text-blue-600 dark:text-neon-green cursor-pointer mt-2"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredSermons.map((s, i) => {
              const isThisTrackPlaying = currentTrack?.id === s.id && isPlaying;
              const isThisTrackActive = currentTrack?.id === s.id;

              return (
                <motion.div
                  key={s.id || i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.04 }}
                  whileHover={{ y: -4 }}
                  className={`liquid-glass rounded-3xl overflow-hidden group cursor-pointer flex flex-col justify-between liquid-sheen transition-all ${
                    isThisTrackActive ? 'ring-2 ring-blue-600 dark:ring-neon-green shadow-xl' : ''
                  }`}
                  onClick={() => playTrack(s)}
                >
                  <div>
                    {/* Media Thumbnail Card */}
                    <div className="aspect-video relative bg-slate-950 flex items-center justify-center overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-950/60 to-slate-950 group-hover:opacity-80 transition-all duration-500"></div>

                      {/* Equalizer overlay when playing */}
                      {isThisTrackPlaying && (
                        <div className="absolute inset-0 flex items-center justify-center gap-1.5 bg-blue-950/70 z-10">
                          <span className="w-1.5 h-8 bg-neon-green rounded-full animate-bounce [animation-duration:600ms]" />
                          <span className="w-1.5 h-12 bg-neon-green rounded-full animate-bounce [animation-duration:450ms]" />
                          <span className="w-1.5 h-6 bg-neon-green rounded-full animate-bounce [animation-duration:800ms]" />
                          <span className="w-1.5 h-10 bg-neon-green rounded-full animate-bounce [animation-duration:550ms]" />
                        </div>
                      )}

                      {/* Floating Play Button */}
                      {!isThisTrackPlaying && (
                        <div className="w-14 h-14 liquid-glass-button rounded-full flex items-center justify-center text-slate-900 dark:text-neon-green shadow-xl scale-95 group-hover:scale-110 transition-transform duration-300 z-10">
                          <Play size={20} fill="currentColor" className="ml-0.5" />
                        </div>
                      )}

                      {/* Top Badges */}
                      <div className="absolute top-4 left-4 z-20 flex gap-2">
                        <span className="caption-mono !text-[8px] px-3 py-1 liquid-inset rounded-full text-slate-200 font-bold border border-white/10">
                          {s.tag}
                        </span>
                      </div>

                      {s.audio_file_url && (
                        <div className="absolute top-4 right-4 z-20">
                          <span className="caption-mono !text-[7px] px-2.5 py-0.5 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 rounded-full font-bold flex items-center gap-1">
                            <FileAudio size={9} /> AUDIO READY
                          </span>
                        </div>
                      )}
                    </div>
                    
                    <div className="p-6 sm:p-8">
                      <div className="flex items-center justify-between mb-2">
                        <span className="caption-mono !text-[8px] text-blue-600 dark:text-neon-green font-bold">
                          {s.date}
                        </span>
                        {s.duration && (
                          <span className="caption-mono !text-[8px] text-slate-400">
                            {s.duration}
                          </span>
                        )}
                      </div>

                      <h3 className="text-lg sm:text-xl font-black mb-3 text-slate-900 dark:text-white leading-snug group-hover:text-blue-600 dark:group-hover:text-neon-green transition-colors">
                        {s.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mb-4 leading-relaxed font-light line-clamp-2">
                        {s.description}
                      </p>
                    </div>
                  </div>

                  <div className="p-6 sm:p-8 pt-0">
                    <div className="flex justify-between items-center pt-4 border-t border-slate-300/40 dark:border-slate-800/60">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full liquid-inset flex items-center justify-center text-blue-600 dark:text-neon-green">
                          <Mic size={10} />
                        </div>
                        <span className="nav-label !text-[8px] text-slate-600 dark:text-slate-400">{s.speaker}</span>
                      </div>
                      
                      <div className="flex items-center gap-1.5">
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            playTrack(s, false);
                          }}
                          className="liquid-glass-button px-3 py-1.5 rounded-full nav-label !text-[8px] text-blue-600 dark:text-neon-green hover:underline cursor-pointer flex items-center gap-1.5"
                          title="Play in background"
                        >
                          {isThisTrackPlaying ? <Pause size={10} fill="currentColor" /> : <Play size={10} fill="currentColor" />}
                          {isThisTrackPlaying ? 'PAUSE' : 'PLAY'}
                        </button>

                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            playTrack(s, true);
                          }}
                          className="liquid-glass-button p-1.5 rounded-full text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-neon-green cursor-pointer"
                          title="Dock player to bottom"
                          aria-label="Dock player to bottom"
                        >
                          <Maximize2 size={11} />
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </section>

      {/* Archive Section */}
      <section className="py-16 sm:py-24 border-t border-slate-300/40 dark:border-slate-800/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-5xl md:text-7xl font-black text-slate-900 dark:text-white tracking-tight leading-none uppercase">
              SERMON <span className="text-slate-400 dark:text-slate-600 italic">ARCHIVE.</span>
            </h2>
          </div>

          <div className="grid gap-10 sm:gap-16">
            {[2026, 2025, 2024].map((year) => (
              <div key={year} className="liquid-glass p-6 sm:p-10 rounded-3xl grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-10 items-center liquid-sheen">
                <div className="md:col-span-4 self-center">
                  <h3 className="text-5xl sm:text-7xl md:text-8xl font-black text-slate-400 dark:text-slate-600 leading-none tracking-tight">{year}</h3>
                </div>
                <div className="md:col-span-8">
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
                      .reverse()
                      .map((month) => (
                      <button 
                        key={month}
                        onClick={() => {
                          setSearchQuery(month);
                          window.scrollTo({ top: 400, behavior: 'smooth' });
                        }}
                        className="group flex flex-col items-start text-left p-3.5 sm:p-4 liquid-glass-button hover:liquid-inset transition-all rounded-2xl cursor-pointer"
                      >
                        <span className="caption-mono !text-[8px] opacity-60 mb-1">Month</span>
                        <span className="text-sm sm:text-base font-black text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-neon-green transition-colors uppercase tracking-tight">{month}</span>
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
