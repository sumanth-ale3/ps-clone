import React, { useState, useRef, useEffect } from "react";
import { Heart, Play, Pause, Volume2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface SongDedicationProps {
  onNext: () => void;
}

interface Song {
  id: number;
  message: string;
  title: string;
  artist: string;
  audioSrc: string;
  color: string;
  emoji: string;
  duration?: string;
}

const SongDedication: React.FC<SongDedicationProps> = ({ onNext }) => {
  const [currentPlaying, setCurrentPlaying] = useState<number | null>(null);
  const [allSongsPlayed, setAllSongsPlayed] = useState<number[]>([]);
  const audioRefs = useRef<{ [key: number]: HTMLAudioElement | null }>({});
  const [progress, setProgress] = useState<{ [key: number]: number }>({});
  const [currentTime, setCurrentTime] = useState<{ [key: number]: number }>({});
  const [isInserting, setIsInserting] = useState<number | null>(null);

  const songs: Song[] = [
    {
      id: 1,
      message: "When I listen to this, I imagine us dancing under the stars, lost in our own world 💖",
      title: "Perfect",
      artist: "Ed Sheeran",
      audioSrc: "https://res.cloudinary.com/dcnl1eovc/video/upload/v1755153190/perfect_fbbzyy.mp3",
      color: "from-pink-400 to-rose-500",
      emoji: "💕",
      duration: "4:23"
    },
    {
      id: 2,
      message: "Every time you smile, I feel like the luckiest person alive ☀️",
      title: "What Makes You Beautiful",
      artist: "One Direction",
      audioSrc: "https://res.cloudinary.com/dcnl1eovc/video/upload/v1755153091/beautiful_lwxln1.mp3",
      color: "from-yellow-400 to-orange-500",
      emoji: "😊",
      duration: "3:18"
    },
    {
      id: 3,
      message: "No matter where life takes us, I want you in every tomorrow 🕰️❤️",
      title: "Chirunama Thana Chirunama",
      artist: "Yazin Nizar",
      audioSrc: "https://res.cloudinary.com/dcnl1eovc/video/upload/v1755153187/chirunama_pdvldu.mp3",
      color: "from-blue-400 to-indigo-500",
      emoji: "⏰",
      duration: "4:45"
    },
    {
      id: 4,
      message: "You are the tune my heart hums, even in silence 🎶",
      title: "Choosi Chudangane",
      artist: "Anurag Kulakarni",
      audioSrc: "https://res.cloudinary.com/dcnl1eovc/video/upload/v1755153187/choosi_ex7eig.mp3",
      color: "from-green-400 to-teal-500",
      emoji: "🎵",
      duration: "3:52"
    },
    {
      id: 5,
      message: "Your love is the rhythm that keeps my heart beating 💓",
      title: "Jabilli Kosam",
      artist: "S. P. Balasubrahmanyam",
      audioSrc: "https://res.cloudinary.com/dcnl1eovc/video/upload/v1755153185/jabilli_n4gkre.mp3",
      color: "from-purple-400 to-violet-500",
      emoji: "💖",
    },
    {
      id: 6,
      message: "Every day with you is a love song I never want to end 🎤",
      title: "Naa Kosam",
      artist: "Sid Sriram",
      audioSrc:
        "https://res.cloudinary.com/dcnl1eovc/video/upload/v1755153190/naakosam_y1krrk.mp3",
      color: "from-pink-200 to-red-300",
      emoji: "🎤",
    },
    {
      id: 7,
      message: "You are my music, my heartbeat, and my forever ❤️🎶",
      title: "Neeve Neeve",
      artist: "G. V. Prakash Kumar",
      audioSrc:
        "https://res.cloudinary.com/dcnl1eovc/video/upload/v1755153187/neeve_pc5cfy.mp3",
      color: "from-yellow-200 to-orange-300",
      emoji: "❤️",
    },
    {
      id: 8,
      message:
        "This is the final note in my heart's playlist… I can't say more than this, you are everything 🎼💞",
      title: "Ninnu Chudagane",
      artist: "Devi Sri Prasad (DSP)",
      audioSrc:
        "https://res.cloudinary.com/dcnl1eovc/video/upload/v1755153195/ninnuchudagane_lvepgx.mp3",
      color: "from-blue-200 to-indigo-300",
      emoji: "🎼",
    },
  ];

  const togglePlay = async (songId: number) => {
    const audio = audioRefs.current[songId];
    if (!audio) return;

    if (currentPlaying === songId) {
      audio.pause();
      setCurrentPlaying(null);
    } else {
      // Animate cassette insertion
      setIsInserting(songId);
      
      // Pause any currently playing audio
      Object.values(audioRefs.current).forEach((a) => a?.pause());
      
      // Wait for insertion animation
      await new Promise(resolve => setTimeout(resolve, 800));
      
      audio.play();
      setCurrentPlaying(songId);
      setIsInserting(null);

      if (!allSongsPlayed.includes(songId)) {
        setAllSongsPlayed((prev) => [...prev, songId]);
      }
    }
  };

  const handleTimeUpdate = (songId: number) => {
    const audio = audioRefs.current[songId];
    if (!audio) return;
    
    const progressPercent = (audio.currentTime / audio.duration) * 100 || 0;
    setProgress((prev) => ({ ...prev, [songId]: progressPercent }));
    setCurrentTime((prev) => ({ ...prev, [songId]: audio.currentTime }));
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    return () => {
      Object.values(audioRefs.current).forEach((a) => a?.pause());
    };
  }, []);

  const allPlayed = allSongsPlayed.length === songs.length;

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 via-orange-50 to-red-50 relative overflow-hidden">
      {/* Vintage Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, rgba(0,0,0,0.15) 1px, transparent 0)`,
          backgroundSize: '20px 20px'
        }} />
      </div>

      {/* Floating Musical Notes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-2xl opacity-20"
            initial={{ y: "100vh", x: `${Math.random() * 100}%` }}
            animate={{ y: "-10vh" }}
            transition={{
              duration: 15 + Math.random() * 10,
              repeat: Infinity,
              ease: "linear",
              delay: Math.random() * 10
            }}
          >
            {['🎵', '🎶', '♪', '♫'][Math.floor(Math.random() * 4)]}
          </motion.div>
        ))}
      </div>

      {/* Header */}
      <motion.div
        className="text-center pt-8 pb-6 px-6 relative z-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <div className="mb-4">
          <motion.div
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="text-6xl mb-2"
          >
            📼
          </motion.div>
        </div>
        <h1 className="text-3xl font-bold text-amber-800 mb-3 font-pacifico drop-shadow-lg">
          My Vintage Love Mixtape 💙
        </h1>
        <p className="text-amber-700 font-dancing text-lg px-4 max-w-sm mx-auto">
          Each cassette holds a piece of my heart, recorded just for you
        </p>
      </motion.div>

      {/* Cassette Collection */}
      <div className="px-4 pb-8 space-y-8 max-w-sm mx-auto relative z-10">
        {songs.map((song, index) => (
          <motion.div
            key={song.id}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="relative"
          >
            {/* Cassette Shadow */}
            <div className="absolute inset-0 bg-black/20 rounded-lg transform translate-x-1 translate-y-2 blur-sm" />
            
            {/* Main Cassette Body */}
            <div
              onClick={() => togglePlay(song.id)}
              className="relative bg-gradient-to-b from-gray-800 to-gray-900 rounded-lg overflow-hidden cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
              style={{ aspectRatio: '1.6/1' }}
            >
              {/* Cassette Shell with Realistic Gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-gray-700 via-gray-800 to-gray-900 rounded-lg">
                {/* Top Highlight */}
                <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-b from-white/20 to-transparent rounded-t-lg" />
                
                {/* Side Highlights */}
                <div className="absolute top-0 left-0 w-2 bottom-0 bg-gradient-to-r from-white/15 to-transparent rounded-l-lg" />
                <div className="absolute top-0 right-0 w-2 bottom-0 bg-gradient-to-l from-black/30 to-transparent rounded-r-lg" />
                
                {/* Bottom Shadow */}
                <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-t from-black/40 to-transparent rounded-b-lg" />
              </div>

              {/* Corner Screws */}
              {[
                "top-2 left-2",
                "top-2 right-2", 
                "bottom-2 left-2",
                "bottom-2 right-2"
              ].map((pos, i) => (
                <div key={i} className={`absolute ${pos} z-20`}>
                  <div className="w-3 h-3 rounded-full bg-gradient-to-br from-gray-400 to-gray-600 shadow-inner border border-gray-500">
                    <div className="w-full h-full rounded-full bg-gradient-to-br from-gray-300 to-gray-500 flex items-center justify-center">
                      <div className="w-1.5 h-0.5 bg-gray-700 rounded-full" />
                    </div>
                  </div>
                </div>
              ))}

              {/* Label Area */}
              <div className="absolute top-4 left-4 right-4 bg-gradient-to-br from-cream-100 to-cream-200 rounded-md p-3 shadow-inner border border-cream-300">
                <div className="text-xs text-gray-800 font-dancing italic leading-tight mb-2 min-h-[32px]">
                  {song.message}
                </div>
                <div className="border-t border-cream-400 pt-2">
                  <div className="text-sm font-bold text-gray-900 truncate">{song.title}</div>
                  <div className="text-xs text-gray-600 truncate">{song.artist}</div>
                </div>
              </div>

              {/* Cassette Window */}
              <div className="absolute bottom-4 left-4 right-4 bg-black/95 rounded-lg p-3 shadow-inner border border-gray-600">
                {/* Tape Reels */}
                <div className="flex items-center justify-between mb-2">
                  {/* Left Reel */}
                  <motion.div
                    animate={currentPlaying === song.id ? { rotate: 360 } : { rotate: 0 }}
                    transition={{
                      repeat: currentPlaying === song.id ? Infinity : 0,
                      duration: 2,
                      ease: "linear"
                    }}
                    className="relative"
                  >
                    <div className="w-8 h-8 bg-gradient-to-br from-gray-400 to-gray-600 rounded-full shadow-lg border-2 border-gray-500">
                      <div className="absolute inset-1 bg-gradient-to-br from-gray-300 to-gray-500 rounded-full">
                        <div className="absolute inset-2 bg-black rounded-full flex items-center justify-center">
                          <Heart className="w-2 h-2 text-red-400 fill-current" />
                        </div>
                      </div>
                    </div>
                    {/* Tape on reel */}
                    <div className="absolute inset-1 rounded-full border-2 border-amber-800/50" 
                         style={{ 
                           borderWidth: `${Math.max(1, (progress[song.id] || 0) / 25)}px`
                         }} />
                  </motion.div>

                  {/* Tape Path */}
                  <div className="flex-1 mx-2 relative">
                    <div className="h-0.5 bg-amber-800 rounded-full relative overflow-hidden">
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-amber-600 to-amber-400"
                        animate={currentPlaying === song.id ? { x: ["0%", "100%"] } : { x: "0%" }}
                        transition={{
                          repeat: currentPlaying === song.id ? Infinity : 0,
                          duration: 1,
                          ease: "linear"
                        }}
                      />
                    </div>
                  </div>

                  {/* Right Reel */}
                  <motion.div
                    animate={currentPlaying === song.id ? { rotate: -360 } : { rotate: 0 }}
                    transition={{
                      repeat: currentPlaying === song.id ? Infinity : 0,
                      duration: 2,
                      ease: "linear"
                    }}
                    className="relative"
                  >
                    <div className="w-8 h-8 bg-gradient-to-br from-gray-400 to-gray-600 rounded-full shadow-lg border-2 border-gray-500">
                      <div className="absolute inset-1 bg-gradient-to-br from-gray-300 to-gray-500 rounded-full">
                        <div className="absolute inset-2 bg-black rounded-full flex items-center justify-center">
                          <Heart className="w-2 h-2 text-red-400 fill-current" />
                        </div>
                      </div>
                    </div>
                    {/* Tape on reel */}
                    <div className="absolute inset-1 rounded-full border-2 border-amber-800/50"
                         style={{ 
                           borderWidth: `${Math.max(1, (100 - (progress[song.id] || 0)) / 25)}px`
                         }} />
                  </motion.div>
                </div>

                {/* Digital Display */}
                <div className="bg-green-900 rounded px-2 py-1 font-mono text-xs text-green-400 text-center border border-green-700 shadow-inner">
                  {currentPlaying === song.id ? (
                    <div className="flex items-center justify-between">
                      <span>{formatTime(currentTime[song.id] || 0)}</span>
                      <div className="flex space-x-1">
                        {[...Array(3)].map((_, i) => (
                          <motion.div
                            key={i}
                            className="w-1 h-2 bg-green-400 rounded-full"
                            animate={{ scaleY: [0.5, 1, 0.5] }}
                            transition={{
                              repeat: Infinity,
                              duration: 0.8,
                              delay: i * 0.1
                            }}
                          />
                        ))}
                      </div>
                      <span>{song.duration}</span>
                    </div>
                  ) : (
                    <span>00:00 ⏸️ {song.duration}</span>
                  )}
                </div>
              </div>

              {/* Play/Pause Indicator */}
              <div className="absolute top-2 right-12 z-20">
                <AnimatePresence>
                  {currentPlaying === song.id && (
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0, opacity: 0 }}
                      className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center shadow-lg border-2 border-white"
                    >
                      <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Insertion Animation Overlay */}
              <AnimatePresence>
                {isInserting === song.id && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg flex items-center justify-center"
                  >
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="text-white font-bold text-sm bg-black/50 px-3 py-1 rounded-full"
                    >
                      Inserting... 📼
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Played Badge */}
              {allSongsPlayed.includes(song.id) && currentPlaying !== song.id && (
                <div className="absolute bottom-2 right-2 z-20">
                  <div className="bg-pink-500 text-white px-2 py-1 rounded-full text-xs font-bold shadow-lg border border-white flex items-center gap-1">
                    <Heart className="w-3 h-3 fill-current" />
                    <span>Played</span>
                  </div>
                </div>
              )}

              {/* Wear Marks for Authenticity */}
              <div className="absolute top-1 left-8 w-4 h-0.5 bg-gray-600/30 rounded-full" />
              <div className="absolute bottom-1 right-8 w-6 h-0.5 bg-gray-600/20 rounded-full" />
            </div>

            {/* Hidden Audio Element */}
            <audio
              ref={(el) => (audioRefs.current[song.id] = el)}
              src={song.audioSrc}
              onTimeUpdate={() => handleTimeUpdate(song.id)}
              onEnded={() => setCurrentPlaying(null)}
            />
          </motion.div>
        ))}
      </div>

      {/* Completion Message */}
      {allPlayed && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="px-4 pb-6 max-w-sm mx-auto relative z-10"
        >
          <div className="bg-gradient-to-br from-amber-100 to-orange-100 rounded-2xl p-6 text-center shadow-xl border border-amber-200">
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-4xl mb-4"
            >
              🎵
            </motion.div>
            <h3 className="text-xl font-bold text-amber-800 mb-2 font-pacifico">
              Our Love Mixtape Complete! 💕
            </h3>
            <p className="text-amber-700 font-dancing text-lg mb-4">
              Every song was chosen with you in mind... now let's make our own love story
            </p>
            <button
              onClick={onNext}
              className="bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 text-white px-8 py-3 rounded-full font-semibold transition-all transform hover:scale-105 shadow-lg"
            >
              Continue Our Journey →
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default SongDedication;