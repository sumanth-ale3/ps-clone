import React, { useState, useRef, useEffect } from "react";
import { Play, Pause, SkipBack, SkipForward, Volume2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Song {
  id: number;
  title: string;
  artist?: string;
  audioSrc: string;
  dedication?: string;
}

const CassettePlayer: React.FC = () => {
  const [currentSong, setCurrentSong] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isFading, setIsFading] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fadeIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const songs: Song[] = [
    {
      id: 1,
      title: "Morning Coffee Thoughts",
      audioSrc: "https://res.cloudinary.com/dcnl1eovc/video/upload/v1755153190/perfect_fbbzyy.mp3",
      dedication: "When I think of you waking up"
    },
    {
      id: 2,
      title: "Sunset Drive",
      audioSrc: "https://res.cloudinary.com/dcnl1eovc/video/upload/v1755153091/beautiful_lwxln1.mp3",
      dedication: "Our imaginary road trips"
    },
    {
      id: 3,
      title: "Rainy Window",
      audioSrc: "https://res.cloudinary.com/dcnl1eovc/video/upload/v1755153187/chirunama_pdvldu.mp3",
      dedication: "Cozy days with you"
    },
    {
      id: 4,
      title: "Stargazing",
      audioSrc: "https://res.cloudinary.com/dcnl1eovc/video/upload/v1755153187/choosi_ex7eig.mp3",
      dedication: "Under the night sky together"
    },
    {
      id: 5,
      title: "Slow Dance",
      audioSrc: "https://res.cloudinary.com/dcnl1eovc/video/upload/v1755153185/jabilli_n4gkre.mp3",
      dedication: "In the kitchen, just us"
    },
    {
      id: 6,
      title: "Whispered Dreams",
      audioSrc: "https://res.cloudinary.com/dcnl1eovc/video/upload/v1755153190/naakosam_y1krrk.mp3",
      dedication: "Late night conversations"
    },
    {
      id: 7,
      title: "Golden Hour",
      audioSrc: "https://res.cloudinary.com/dcnl1eovc/video/upload/v1755153187/neeve_pc5cfy.mp3",
      dedication: "When the light hits just right"
    },
    {
      id: 8,
      title: "Heart Speaks",
      audioSrc: "https://res.cloudinary.com/dcnl1eovc/video/upload/v1755153195/ninnuchudagane_lvepgx.mp3",
      dedication: "Everything I wanted to say"
    },
    {
      id: 9,
      title: "Sunday Morning",
      audioSrc: "https://res.cloudinary.com/dcnl1eovc/video/upload/v1755153190/perfect_fbbzyy.mp3",
      dedication: "Lazy days, warm blankets"
    },
    {
      id: 10,
      title: "Moonlit Walk",
      audioSrc: "https://res.cloudinary.com/dcnl1eovc/video/upload/v1755153091/beautiful_lwxln1.mp3",
      dedication: "Hand in hand, no words needed"
    },
    {
      id: 11,
      title: "First Hello",
      audioSrc: "https://res.cloudinary.com/dcnl1eovc/video/upload/v1755153187/chirunama_pdvldu.mp3",
      dedication: "The moment we met"
    },
    {
      id: 12,
      title: "Quiet Joy",
      audioSrc: "https://res.cloudinary.com/dcnl1eovc/video/upload/v1755153187/choosi_ex7eig.mp3",
      dedication: "Your smile in my mind"
    },
    {
      id: 13,
      title: "Warm Embrace",
      audioSrc: "https://res.cloudinary.com/dcnl1eovc/video/upload/v1755153185/jabilli_n4gkre.mp3",
      dedication: "Safe in your arms"
    },
    {
      id: 14,
      title: "Tomorrow's Promise",
      audioSrc: "https://res.cloudinary.com/dcnl1eovc/video/upload/v1755153190/naakosam_y1krrk.mp3",
      dedication: "All our tomorrows together"
    },
    {
      id: 15,
      title: "Gentle Rain",
      audioSrc: "https://res.cloudinary.com/dcnl1eovc/video/upload/v1755153187/neeve_pc5cfy.mp3",
      dedication: "Peace in every moment"
    },
    {
      id: 16,
      title: "Afternoon Light",
      audioSrc: "https://res.cloudinary.com/dcnl1eovc/video/upload/v1755153195/ninnuchudagane_lvepgx.mp3",
      dedication: "The way you glow"
    },
    {
      id: 17,
      title: "Forever Starts Now",
      audioSrc: "https://res.cloudinary.com/dcnl1eovc/video/upload/v1755153190/perfect_fbbzyy.mp3",
      dedication: "This is just the beginning"
    },
    {
      id: 18,
      title: "Home in You",
      audioSrc: "https://res.cloudinary.com/dcnl1eovc/video/upload/v1755153091/beautiful_lwxln1.mp3",
      dedication: "Wherever you are"
    },
    {
      id: 19,
      title: "Sweet Silence",
      audioSrc: "https://res.cloudinary.com/dcnl1eovc/video/upload/v1755153187/chirunama_pdvldu.mp3",
      dedication: "Comfortable quiet with you"
    },
    {
      id: 20,
      title: "Love Letter",
      audioSrc: "https://res.cloudinary.com/dcnl1eovc/video/upload/v1755153187/choosi_ex7eig.mp3",
      dedication: "Written in melodies"
    }
  ];

  const fadeOut = (callback: () => void) => {
    if (!audioRef.current) return;

    setIsFading(true);
    let volume = audioRef.current.volume;

    fadeIntervalRef.current = setInterval(() => {
      if (volume > 0.05) {
        volume -= 0.05;
        if (audioRef.current) audioRef.current.volume = Math.max(0, volume);
      } else {
        if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);
        if (audioRef.current) audioRef.current.volume = 0;
        callback();
        setIsFading(false);
      }
    }, 50);
  };

  const fadeIn = () => {
    if (!audioRef.current) return;

    audioRef.current.volume = 0;
    let volume = 0;

    const interval = setInterval(() => {
      if (volume < 0.95) {
        volume += 0.05;
        if (audioRef.current) audioRef.current.volume = Math.min(1, volume);
      } else {
        if (audioRef.current) audioRef.current.volume = 1;
        clearInterval(interval);
      }
    }, 50);
  };

  const playSong = (songId: number) => {
    if (currentSong === songId && isPlaying) {
      fadeOut(() => {
        audioRef.current?.pause();
        setIsPlaying(false);
      });
      return;
    }

    if (isPlaying) {
      fadeOut(() => {
        loadAndPlay(songId);
      });
    } else {
      loadAndPlay(songId);
    }
  };

  const loadAndPlay = (songId: number) => {
    const song = songs.find(s => s.id === songId);
    if (!song || !audioRef.current) return;

    setCurrentSong(songId);
    audioRef.current.src = song.audioSrc;
    audioRef.current.load();

    audioRef.current.play().then(() => {
      setIsPlaying(true);
      fadeIn();
    });
  };

  const togglePlayPause = () => {
    if (!audioRef.current || currentSong === null) return;

    if (isPlaying) {
      fadeOut(() => {
        audioRef.current?.pause();
        setIsPlaying(false);
      });
    } else {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
        fadeIn();
      });
    }
  };

  const skipSong = (direction: 'prev' | 'next') => {
    if (currentSong === null) return;

    const currentIndex = songs.findIndex(s => s.id === currentSong);
    let newIndex;

    if (direction === 'prev') {
      newIndex = currentIndex > 0 ? currentIndex - 1 : songs.length - 1;
    } else {
      newIndex = currentIndex < songs.length - 1 ? currentIndex + 1 : 0;
    }

    playSong(songs[newIndex].id);
  };

  const handleTimeUpdate = () => {
    if (!audioRef.current) return;
    const current = audioRef.current.currentTime;
    const total = audioRef.current.duration;
    setCurrentTime(current);
    setProgress((current / total) * 100 || 0);
  };

  const handleLoadedMetadata = () => {
    if (!audioRef.current) return;
    setDuration(audioRef.current.duration);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    audioRef.current = new Audio();
    audioRef.current.addEventListener('timeupdate', handleTimeUpdate);
    audioRef.current.addEventListener('loadedmetadata', handleLoadedMetadata);
    audioRef.current.addEventListener('ended', () => {
      skipSong('next');
    });

    return () => {
      if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = '';
      }
    };
  }, []);

  const currentSongData = songs.find(s => s.id === currentSong);

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 via-orange-50/30 to-rose-50 relative overflow-hidden">
      {/* Vintage texture overlay */}
      <div className="fixed inset-0 opacity-[0.15] pointer-events-none"
           style={{
             backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' /%3E%3C/svg%3E")`,
             backgroundRepeat: 'repeat',
             backgroundSize: '200px 200px'
           }}
      />

      {/* Floating dust particles */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-amber-300/20 rounded-full"
            initial={{
              x: `${Math.random() * 100}vw`,
              y: `${Math.random() * 100}vh`
            }}
            animate={{
              y: [`${Math.random() * 100}vh`, `${Math.random() * 100}vh`],
              x: [`${Math.random() * 100}vw`, `${Math.random() * 100}vw`],
            }}
            transition={{
              duration: 20 + Math.random() * 20,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        ))}
      </div>

      {/* Header */}
      <motion.div
        className="relative z-10 text-center pt-8 pb-6 px-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2 }}
      >
        <h1 className="text-4xl sm:text-5xl font-dancing text-amber-900 mb-3 drop-shadow-sm">
          Our Little Cassette Collection
        </h1>
        <p className="text-amber-700/80 text-lg font-dancing italic">
          Every song here was made thinking of you
        </p>
      </motion.div>

      {/* Main Cassette Player */}
      <div className="relative z-10 px-4 max-w-md mx-auto mb-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="relative"
        >
          {/* Cassette shadow */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/10 rounded-lg transform translate-y-2 blur-md" />

          {/* Main cassette body */}
          <div className="relative bg-gradient-to-b from-amber-100 to-amber-200 rounded-2xl p-6 shadow-xl border-4 border-amber-300/50">
            {/* Top edge highlight */}
            <div className="absolute top-0 left-0 right-0 h-4 bg-gradient-to-b from-white/40 to-transparent rounded-t-2xl" />

            {/* Cassette label area */}
            <div className="bg-gradient-to-br from-cream-100 to-amber-50 rounded-xl p-4 mb-6 border-2 border-amber-200/50 shadow-inner">
              <div className="text-center mb-2">
                <div className="inline-block bg-amber-900/10 px-3 py-1 rounded-full mb-2">
                  <span className="text-xs text-amber-900 font-mono">Side A</span>
                </div>
              </div>

              {currentSongData ? (
                <div>
                  <h3 className="font-dancing text-xl text-amber-900 mb-1 truncate">
                    {currentSongData.title}
                  </h3>
                  {currentSongData.dedication && (
                    <p className="text-sm text-amber-700/70 italic font-dancing">
                      {currentSongData.dedication}
                    </p>
                  )}
                </div>
              ) : (
                <div className="text-center">
                  <p className="font-dancing text-lg text-amber-700/50 italic">
                    Press play on any song below
                  </p>
                </div>
              )}

              {/* Time display */}
              {currentSongData && (
                <div className="mt-3 flex justify-between items-center text-xs font-mono text-amber-800/60">
                  <span>{formatTime(currentTime)}</span>
                  <span>{formatTime(duration)}</span>
                </div>
              )}
            </div>

            {/* Cassette window with reels */}
            <div className="bg-gradient-to-b from-gray-800 to-gray-900 rounded-lg p-4 mb-4 shadow-inner border-2 border-gray-700">
              <div className="flex items-center justify-between mb-2">
                {/* Left reel */}
                <motion.div
                  animate={isPlaying ? { rotate: 360 } : { rotate: 0 }}
                  transition={{
                    repeat: isPlaying ? Infinity : 0,
                    duration: 2,
                    ease: "linear"
                  }}
                  className="relative"
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-gray-400 to-gray-600 rounded-full shadow-lg border-4 border-gray-500 flex items-center justify-center">
                    <div className="w-12 h-12 bg-gradient-to-br from-gray-300 to-gray-500 rounded-full flex items-center justify-center">
                      <div className="w-4 h-4 bg-black rounded-full" />
                    </div>
                    {/* Reel spokes */}
                    {[...Array(6)].map((_, i) => (
                      <div
                        key={i}
                        className="absolute w-0.5 h-6 bg-gray-600"
                        style={{
                          transform: `rotate(${i * 60}deg)`,
                          transformOrigin: 'center'
                        }}
                      />
                    ))}
                  </div>
                  {/* Tape on reel */}
                  <div
                    className="absolute inset-2 rounded-full border-4 border-amber-900/40"
                    style={{
                      borderWidth: `${Math.max(2, (100 - progress) / 20)}px`
                    }}
                  />
                </motion.div>

                {/* Tape path */}
                <div className="flex-1 mx-3 relative">
                  <div className="h-1 bg-amber-900/80 rounded-full relative overflow-hidden">
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-amber-700 to-amber-500"
                      animate={isPlaying ? { x: ["0%", "100%"] } : { x: "0%" }}
                      transition={{
                        repeat: isPlaying ? Infinity : 0,
                        duration: 1.5,
                        ease: "linear"
                      }}
                    />
                  </div>
                  <div className="h-1 bg-amber-900/80 rounded-full mt-1 relative overflow-hidden">
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-amber-700 to-amber-500"
                      animate={isPlaying ? { x: ["100%", "0%"] } : { x: "0%" }}
                      transition={{
                        repeat: isPlaying ? Infinity : 0,
                        duration: 1.5,
                        ease: "linear"
                      }}
                    />
                  </div>
                </div>

                {/* Right reel */}
                <motion.div
                  animate={isPlaying ? { rotate: -360 } : { rotate: 0 }}
                  transition={{
                    repeat: isPlaying ? Infinity : 0,
                    duration: 2,
                    ease: "linear"
                  }}
                  className="relative"
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-gray-400 to-gray-600 rounded-full shadow-lg border-4 border-gray-500 flex items-center justify-center">
                    <div className="w-12 h-12 bg-gradient-to-br from-gray-300 to-gray-500 rounded-full flex items-center justify-center">
                      <div className="w-4 h-4 bg-black rounded-full" />
                    </div>
                    {/* Reel spokes */}
                    {[...Array(6)].map((_, i) => (
                      <div
                        key={i}
                        className="absolute w-0.5 h-6 bg-gray-600"
                        style={{
                          transform: `rotate(${i * 60}deg)`,
                          transformOrigin: 'center'
                        }}
                      />
                    ))}
                  </div>
                  {/* Tape on reel */}
                  <div
                    className="absolute inset-2 rounded-full border-4 border-amber-900/40"
                    style={{
                      borderWidth: `${Math.max(2, progress / 20)}px`
                    }}
                  />
                </motion.div>
              </div>

              {/* Progress bar */}
              <div className="mt-3 h-1 bg-gray-700 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-amber-500 to-rose-400"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-center gap-4">
              <button
                onClick={() => skipSong('prev')}
                disabled={!currentSong}
                className="w-10 h-10 rounded-full bg-amber-800/80 hover:bg-amber-700 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center text-amber-50 transition-all hover:scale-105 active:scale-95 shadow-md"
              >
                <SkipBack className="w-5 h-5" />
              </button>

              <button
                onClick={togglePlayPause}
                disabled={!currentSong || isFading}
                className="w-16 h-16 rounded-full bg-gradient-to-b from-amber-700 to-amber-800 hover:from-amber-600 hover:to-amber-700 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center text-amber-50 transition-all hover:scale-110 active:scale-95 shadow-lg border-4 border-amber-600/50"
              >
                {isPlaying ? (
                  <Pause className="w-7 h-7" />
                ) : (
                  <Play className="w-7 h-7 ml-1" />
                )}
              </button>

              <button
                onClick={() => skipSong('next')}
                disabled={!currentSong}
                className="w-10 h-10 rounded-full bg-amber-800/80 hover:bg-amber-700 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center text-amber-50 transition-all hover:scale-105 active:scale-95 shadow-md"
              >
                <SkipForward className="w-5 h-5" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Song List */}
      <div className="relative z-10 px-4 pb-12 max-w-md mx-auto">
        <h2 className="text-2xl font-dancing text-amber-900 text-center mb-6">
          Choose a Memory
        </h2>

        <div className="space-y-2">
          {songs.map((song, index) => (
            <motion.button
              key={song.id}
              onClick={() => playSong(song.id)}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.03 }}
              whileTap={{ scale: 0.98 }}
              className={`w-full text-left p-4 rounded-xl transition-all duration-300 ${
                currentSong === song.id
                  ? 'bg-gradient-to-r from-amber-200 to-rose-200 shadow-lg border-2 border-amber-400/50'
                  : 'bg-white/60 hover:bg-white/80 border-2 border-amber-200/30'
              }`}
            >
              <div className="flex items-center gap-3">
                {/* Mini cassette icon */}
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all ${
                  currentSong === song.id
                    ? 'bg-amber-800/20'
                    : 'bg-amber-100'
                }`}>
                  {currentSong === song.id && isPlaying ? (
                    <Volume2 className="w-5 h-5 text-amber-800 animate-pulse" />
                  ) : (
                    <div className="text-lg">🎵</div>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-amber-700/60">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <h3 className={`font-dancing truncate ${
                      currentSong === song.id
                        ? 'text-amber-900 font-semibold'
                        : 'text-amber-800'
                    }`}>
                      {song.title}
                    </h3>
                  </div>
                  {song.dedication && (
                    <p className="text-xs text-amber-700/60 italic truncate font-dancing">
                      {song.dedication}
                    </p>
                  )}
                </div>

                {currentSong === song.id && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-2 h-2 rounded-full bg-rose-500 animate-pulse"
                  />
                )}
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Footer message */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="relative z-10 text-center pb-8 px-6"
      >
        <p className="text-amber-800/70 font-dancing text-lg italic max-w-sm mx-auto">
          Press play and listen the way my heart sounds
        </p>
      </motion.div>
    </div>
  );
};

export default CassettePlayer;
