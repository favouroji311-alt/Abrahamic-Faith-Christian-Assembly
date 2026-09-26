import { useState, useRef, type MouseEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  RotateCw, 
  Volume2, 
  VolumeX, 
  Volume1, 
  Download, 
  X, 
  Radio, 
  Loader2,
  Share2,
  Check
} from 'lucide-react';
import { useAudio } from '../context/AudioContext';

export function AudioPlayer() {
  const {
    currentTrack,
    isPlaying,
    isLoading,
    currentTime,
    duration,
    volume,
    isMuted,
    playbackRate,
    togglePlay,
    seek,
    skipTime,
    setVolume,
    toggleMute,
    setPlaybackRate,
    formatTime,
    pauseTrack
  } = useAudio();

  const [isCopied, setIsCopied] = useState(false);
  const [showSpeedMenu, setShowSpeedMenu] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const progressBarRef = useRef<HTMLDivElement | null>(null);

  if (!currentTrack) return null;

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  const handleSeekClick = (e: MouseEvent<HTMLDivElement>) => {
    if (!progressBarRef.current || duration === 0) return;
    const rect = progressBarRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const width = rect.width;
    const newPercent = Math.max(0, Math.min(1, clickX / width));
    seek(newPercent * duration);
  };

  const handleCopyLink = () => {
    if (currentTrack.audio_file_url) {
      navigator.clipboard.writeText(currentTrack.audio_file_url);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2500);
    }
  };

  const speedOptions = [0.75, 1, 1.25, 1.5, 1.75, 2];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="fixed bottom-3 sm:bottom-6 left-3 sm:left-6 right-3 sm:right-6 z-50 max-w-5xl mx-auto"
      >
        <div className="liquid-glass-lg rounded-2xl sm:rounded-3xl p-3 sm:p-4 md:p-5 shadow-2xl border border-white/60 dark:border-white/10 backdrop-blur-2xl liquid-sheen">
          {/* Top Row: Track details & quick actions */}
          <div className="flex items-center justify-between gap-3 mb-2 sm:mb-3">
            <div className="flex items-center gap-3 min-w-0">
              {/* Visualizer Icon */}
              <div className="relative w-10 h-10 sm:w-12 sm:h-12 rounded-xl liquid-inset flex items-center justify-center shrink-0 overflow-hidden text-blue-600 dark:text-neon-green">
                {isPlaying ? (
                  <div className="flex items-end gap-1 h-5">
                    <span className="w-1 bg-blue-600 dark:bg-neon-green rounded-full animate-bounce [animation-duration:800ms]" style={{ height: '70%' }} />
                    <span className="w-1 bg-blue-600 dark:bg-neon-green rounded-full animate-bounce [animation-duration:500ms]" style={{ height: '100%' }} />
                    <span className="w-1 bg-blue-600 dark:bg-neon-green rounded-full animate-bounce [animation-duration:1100ms]" style={{ height: '40%' }} />
                    <span className="w-1 bg-blue-600 dark:bg-neon-green rounded-full animate-bounce [animation-duration:650ms]" style={{ height: '90%' }} />
                  </div>
                ) : (
                  <Radio size={20} className="opacity-70" />
                )}
              </div>

              {/* Title & metadata */}
              <div className="min-w-0 truncate">
                <div className="flex items-center gap-2">
                  <span className="caption-mono !text-[8px] px-2 py-0.5 liquid-inset rounded-full text-blue-600 dark:text-neon-green font-bold">
                    {currentTrack.tag || 'Sermon Audio'}
                  </span>
                  <span className="caption-mono !text-[8px] text-slate-500 hidden sm:inline">
                    {currentTrack.date}
                  </span>
                </div>
                <h4 className="text-xs sm:text-sm md:text-base font-black text-slate-900 dark:text-white truncate">
                  {currentTrack.title}
                </h4>
                <p className="caption-mono !text-[8px] text-slate-600 dark:text-slate-400 truncate">
                  {currentTrack.speaker}
                </p>
              </div>
            </div>

            {/* Right Quick Controls */}
            <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
              {/* Speed selector */}
              <div className="relative">
                <button
                  onClick={() => setShowSpeedMenu(!showSpeedMenu)}
                  className="px-2 sm:px-2.5 py-1 rounded-full liquid-glass-button text-[10px] sm:text-xs font-mono font-bold text-slate-700 dark:text-slate-200 cursor-pointer"
                  title="Playback Speed"
                >
                  {playbackRate}x
                </button>
                {showSpeedMenu && (
                  <div className="absolute right-0 bottom-full mb-2 bg-[#edf2f7] dark:bg-[#151a24] border border-slate-300 dark:border-slate-800 rounded-xl p-1 shadow-xl flex flex-col gap-0.5 z-50 min-w-[70px]">
                    {speedOptions.map(rate => (
                      <button
                        key={rate}
                        onClick={() => {
                          setPlaybackRate(rate);
                          setShowSpeedMenu(false);
                        }}
                        className={`px-2.5 py-1 text-xs font-mono rounded-lg text-left transition-colors cursor-pointer ${
                          playbackRate === rate 
                            ? 'bg-blue-600 dark:bg-neon-green text-white dark:text-slate-950 font-bold' 
                            : 'text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800'
                        }`}
                      >
                        {rate}x
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Share link button */}
              <button
                onClick={handleCopyLink}
                className="p-1.5 sm:p-2 rounded-full liquid-glass-button text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-neon-green cursor-pointer"
                title="Copy Audio Link"
                aria-label="Copy audio link"
              >
                {isCopied ? <Check size={14} className="text-emerald-500" /> : <Share2 size={14} />}
              </button>

              {/* Direct Download */}
              {currentTrack.audio_file_url && (
                <a
                  href={currentTrack.audio_file_url}
                  download={`${currentTrack.title}.mp3`}
                  target="_blank"
                  rel="noreferrer"
                  className="p-1.5 sm:p-2 rounded-full liquid-glass-button text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-neon-green cursor-pointer"
                  title="Download MP3"
                  aria-label="Download sermon MP3"
                >
                  <Download size={14} />
                </a>
              )}

              {/* Dismiss / Stop */}
              <button
                onClick={pauseTrack}
                className="p-1.5 sm:p-2 rounded-full liquid-glass-button text-slate-500 hover:text-red-500 cursor-pointer"
                title="Pause & Close Player"
                aria-label="Close audio player"
              >
                <X size={14} />
              </button>
            </div>
          </div>

          {/* Scrubber Progress Bar */}
          <div className="space-y-1 my-1 sm:my-2">
            <div
              ref={progressBarRef}
              onClick={handleSeekClick}
              className="relative h-2 sm:h-2.5 w-full liquid-inset rounded-full cursor-pointer group overflow-hidden"
              role="slider"
              aria-valuenow={currentTime}
              aria-valuemin={0}
              aria-valuemax={duration || 100}
            >
              {/* Elapsed Fill */}
              <div
                className="absolute left-0 top-0 bottom-0 bg-gradient-to-r from-blue-600 to-cyan-400 dark:from-emerald-500 dark:to-neon-green rounded-full transition-[width] duration-100"
                style={{ width: `${progressPercent}%` }}
              />
              {/* Scrub Handle dot */}
              <div 
                className="absolute top-1/2 -translate-y-1/2 w-3.5 h-3.5 bg-white dark:bg-slate-900 border-2 border-blue-600 dark:border-neon-green rounded-full shadow-md -ml-1.5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                style={{ left: `${progressPercent}%` }}
              />
            </div>

            {/* Time stamps */}
            <div className="flex justify-between items-center text-[10px] sm:text-xs font-mono text-slate-500 dark:text-slate-400 px-0.5">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>

          {/* Primary Controls Row: Skip back, Play/Pause, Skip fwd, Volume */}
          <div className="flex items-center justify-between pt-1">
            {/* Left: Volume control */}
            <div className="hidden sm:flex items-center gap-2 w-32">
              <button 
                onClick={toggleMute}
                className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white cursor-pointer"
                aria-label="Toggle mute"
              >
                {isMuted || volume === 0 ? (
                  <VolumeX size={16} />
                ) : volume < 0.5 ? (
                  <Volume1 size={16} />
                ) : (
                  <Volume2 size={16} />
                )}
              </button>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={isMuted ? 0 : volume}
                onChange={(e) => setVolume(parseFloat(e.target.value))}
                className="w-20 h-1.5 accent-blue-600 dark:accent-neon-green bg-slate-300 dark:bg-slate-700 rounded-lg cursor-pointer"
              />
            </div>

            {/* Center: Playback Controls */}
            <div className="flex items-center gap-3 sm:gap-4 mx-auto">
              {/* Skip -10s */}
              <button
                onClick={() => skipTime(-10)}
                className="p-2 rounded-full liquid-glass-button text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-neon-green cursor-pointer flex items-center justify-center relative group"
                title="Rewind 10 seconds"
                aria-label="Rewind 10 seconds"
              >
                <RotateCcw size={16} />
                <span className="absolute -bottom-3 text-[7px] font-mono opacity-0 group-hover:opacity-100 transition-opacity font-bold">10s</span>
              </button>

              {/* Main Play / Pause Button */}
              <button
                onClick={togglePlay}
                disabled={isLoading}
                className="w-12 h-12 sm:w-14 sm:h-14 rounded-full liquid-glass-accent flex items-center justify-center text-slate-950 shadow-xl cursor-pointer hover:scale-105 active:scale-95 transition-all"
                title={isPlaying ? 'Pause' : 'Play'}
                aria-label={isPlaying ? 'Pause' : 'Play'}
              >
                {isLoading ? (
                  <Loader2 size={20} className="animate-spin text-slate-950" />
                ) : isPlaying ? (
                  <Pause size={20} fill="currentColor" />
                ) : (
                  <Play size={20} fill="currentColor" className="ml-0.5" />
                )}
              </button>

              {/* Skip +10s */}
              <button
                onClick={() => skipTime(10)}
                className="p-2 rounded-full liquid-glass-button text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-neon-green cursor-pointer flex items-center justify-center relative group"
                title="Forward 10 seconds"
                aria-label="Forward 10 seconds"
              >
                <RotateCw size={16} />
                <span className="absolute -bottom-3 text-[7px] font-mono opacity-0 group-hover:opacity-100 transition-opacity font-bold">10s</span>
              </button>
            </div>

            {/* Right: Audio file label */}
            <div className="hidden sm:flex items-center justify-end w-32">
              <span className="caption-mono !text-[8px] text-blue-600 dark:text-neon-green flex items-center gap-1.5 font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-neon-green animate-ping" />
                HIGH FIDELITY MP3
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
