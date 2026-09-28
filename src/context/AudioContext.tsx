import { createContext, useContext, useState, useRef, useEffect, ReactNode } from 'react';
import { Sermon, INITIAL_SERMONS } from '../lib/sermons';

interface AudioContextType {
  currentTrack: Sermon | null;
  isPlaying: boolean;
  isLoading: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  isMuted: boolean;
  playbackRate: number;
  playbackError: string | null;
  isDockedPlayerOpen: boolean;
  setIsDockedPlayerOpen: (open: boolean) => void;
  toggleDockedPlayer: () => void;
  playTrack: (track: Sermon, openDocked?: boolean) => void;
  togglePlay: () => void;
  pauseTrack: () => void;
  seek: (time: number) => void;
  skipTime: (seconds: number) => void;
  setVolume: (volume: number) => void;
  toggleMute: () => void;
  setPlaybackRate: (rate: number) => void;
  formatTime: (seconds: number) => string;
  retryPlayback: () => void;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export function AudioProvider({ children }: { children: ReactNode }) {
  const [currentTrack, setCurrentTrack] = useState<Sermon | null>(INITIAL_SERMONS[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(3320); // 55:20 in seconds initial estimate
  const [volume, setVolumeState] = useState(0.9);
  const [isMuted, setIsMuted] = useState(false);
  const [playbackRate, setPlaybackRateState] = useState(1);
  const [playbackError, setPlaybackError] = useState<string | null>(null);

  // The docked player is CLOSED by default on arrival.
  // The user explicitly chooses whether to dock the player or play in background.
  const [isDockedPlayerOpen, setIsDockedPlayerOpen] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const isRetryingWithProxy = useRef<boolean>(false);

  // Sync volume with audio element
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  // Sync playback rate
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.playbackRate = playbackRate;
    }
  }, [playbackRate]);

  // Initialize track src when first mounting
  useEffect(() => {
    if (audioRef.current && currentTrack?.audio_file_url) {
      if (!audioRef.current.src || audioRef.current.src === window.location.href) {
        audioRef.current.src = currentTrack.audio_file_url;
      }
    }
  }, [currentTrack]);

  const playTrack = (track: Sermon, openDocked = false) => {
    const audio = audioRef.current;
    if (!audio) return;

    if (!track.audio_file_url) {
      setPlaybackError('No audio URL found for this sermon.');
      return;
    }

    setPlaybackError(null);
    isRetryingWithProxy.current = false;

    if (openDocked) {
      setIsDockedPlayerOpen(true);
    }

    // If it's already the loaded track
    if (currentTrack?.id === track.id && audio.src && audio.src !== window.location.href) {
      if (isPlaying) {
        audio.pause();
      } else {
        setIsLoading(true);
        audio.play().catch((err) => handlePlayError(err, track));
      }
      return;
    }

    // New track selection
    setCurrentTrack(track);
    setIsLoading(true);
    setCurrentTime(0);

    audio.src = track.audio_file_url;
    audio.load();
    audio.play().catch((err) => handlePlayError(err, track));
  };

  const handlePlayError = (err: any, trackToUse?: Sermon | null) => {
    const activeTrack = trackToUse || currentTrack;
    if (err?.name === 'AbortError') {
      setIsLoading(false);
      return;
    }

    console.warn('Direct audio play error:', err?.message || err);

    // Try fallback proxy if direct streaming failed (e.g. CORS or adblock in iframe)
    if (!isRetryingWithProxy.current && activeTrack?.audio_file_url) {
      isRetryingWithProxy.current = true;
      const proxyUrl = `/api/audio-proxy/sermon.mp3?url=${encodeURIComponent(activeTrack.audio_file_url)}`;
      if (audioRef.current) {
        audioRef.current.src = proxyUrl;
        audioRef.current.load();
        audioRef.current.play().catch((proxyErr) => {
          if (proxyErr?.name === 'AbortError') {
            setIsLoading(false);
            return;
          }
          console.warn('Proxy fallback play error:', proxyErr?.message || proxyErr);
          setIsLoading(false);
          setIsPlaying(false);
          setPlaybackError('Unable to stream audio. Please click retry.');
        });
        return;
      }
    }

    setIsLoading(false);
    setIsPlaying(false);
    setPlaybackError('Playback error. Click retry to try again.');
  };

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio || !currentTrack) return;

    if (isPlaying) {
      audio.pause();
    } else {
      setIsLoading(true);
      setPlaybackError(null);
      if (!audio.src || audio.src === window.location.href) {
        if (currentTrack.audio_file_url) {
          audio.src = currentTrack.audio_file_url;
          audio.load();
        }
      }
      audio.play().catch((err) => handlePlayError(err, currentTrack));
    }
  };

  const pauseTrack = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const seek = (time: number) => {
    if (audioRef.current) {
      const clamped = Math.max(0, Math.min(time, duration || 0));
      audioRef.current.currentTime = clamped;
      setCurrentTime(clamped);
    }
  };

  const skipTime = (seconds: number) => {
    if (audioRef.current) {
      const newTime = Math.max(0, Math.min(audioRef.current.currentTime + seconds, duration || 0));
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const setVolume = (v: number) => {
    const clamped = Math.max(0, Math.min(1, v));
    setVolumeState(clamped);
    if (clamped > 0 && isMuted) {
      setIsMuted(false);
    }
  };

  const toggleMute = () => {
    setIsMuted(prev => !prev);
  };

  const setPlaybackRate = (rate: number) => {
    setPlaybackRateState(rate);
  };

  const toggleDockedPlayer = () => {
    setIsDockedPlayerOpen(prev => !prev);
  };

  const retryPlayback = () => {
    setPlaybackError(null);
    if (currentTrack) {
      playTrack(currentTrack);
    }
  };

  const formatTime = (seconds: number) => {
    if (isNaN(seconds) || seconds < 0) return '0:00';
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);

    if (hrs > 0) {
      return `${hrs}:${mins < 10 ? '0' : ''}${mins}:${secs < 10 ? '0' : ''}${secs}`;
    }
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <AudioContext.Provider
      value={{
        currentTrack,
        isPlaying,
        isLoading,
        currentTime,
        duration,
        volume,
        isMuted,
        playbackRate,
        playbackError,
        isDockedPlayerOpen,
        setIsDockedPlayerOpen,
        toggleDockedPlayer,
        playTrack,
        togglePlay,
        pauseTrack,
        seek,
        skipTime,
        setVolume,
        toggleMute,
        setPlaybackRate,
        formatTime,
        retryPlayback,
      }}
    >
      {/* Real HTML5 Audio Element in DOM */}
      <audio
        ref={audioRef}
        preload="none"
        playsInline
        onTimeUpdate={() => {
          if (audioRef.current) {
            setCurrentTime(audioRef.current.currentTime);
          }
        }}
        onDurationChange={() => {
          if (audioRef.current && audioRef.current.duration && !isNaN(audioRef.current.duration)) {
            setDuration(audioRef.current.duration);
          }
        }}
        onLoadedMetadata={() => {
          if (audioRef.current && audioRef.current.duration && !isNaN(audioRef.current.duration)) {
            setDuration(audioRef.current.duration);
          }
          setIsLoading(false);
        }}
        onWaiting={() => setIsLoading(true)}
        onCanPlay={() => setIsLoading(false)}
        onPlaying={() => {
          setIsPlaying(true);
          setIsLoading(false);
          setPlaybackError(null);
        }}
        onPause={() => setIsPlaying(false)}
        onEnded={() => {
          setIsPlaying(false);
          setCurrentTime(0);
        }}
        onError={() => {
          // Only trigger error fallback if the player was actively trying to load or play
          if (isLoading || isPlaying) {
            console.warn('Native audio element error during active playback');
            handlePlayError(new Error('Audio stream error'), currentTrack);
          }
        }}
      />
      {children}
    </AudioContext.Provider>
  );
}

export function useAudio() {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error('useAudio must be used within an AudioProvider');
  }
  return context;
}
