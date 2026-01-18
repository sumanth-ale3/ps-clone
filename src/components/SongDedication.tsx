import React, { useState, useRef, useEffect } from "react";
import { Heart } from "lucide-react";
import { motion } from "framer-motion";

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
}

const SongDedication: React.FC<SongDedicationProps> = ({ onNext }) => {
  const [currentPlaying, setCurrentPlaying] = useState<number | null>(null);
  const [allSongsPlayed, setAllSongsPlayed] = useState<number[]>([]);
  const audioRefs = useRef<{ [key: number]: HTMLAudioElement | null }>({});
  const [progress, setProgress] = useState<{ [key: number]: number }>({});

  const songs: Song[] = [
    {
      id: 1,
      message:
        "When I listen to this, I imagine us dancing under the stars, lost in our own world 💖",
      title: "Perfect",
      artist: "Ed Sheeran",
      audioSrc:
        "https://res.cloudinary.com/dcnl1eovc/video/upload/v1755153190/perfect_fbbzyy.mp3",
      color: "from-pink-100 to-rose-200",
      emoji: "💕",
    },
    {
      id: 3,
      message:
        "No matter where life takes us, I want you in every tomorrow 🕰️❤️",
      title: "Chirunama Thana Chirunama",
      artist: "Yazin Nizar",
      audioSrc:
        "https://res.cloudinary.com/dcnl1eovc/video/upload/v1755153187/chirunama_pdvldu.mp3",
      color: "from-blue-100 to-indigo-200",
      emoji: "⏰",
    },
    {
      id: 4,
      message: "You are the tune my heart hums, even in silence 🎶",
      title: "Choosi Chudangane",
      artist: "Anurag Kulakarni",
      audioSrc:
        "https://res.cloudinary.com/dcnl1eovc/video/upload/v1755153187/choosi_ex7eig.mp3",
      color: "from-green-100 to-teal-200",
      emoji: "🎵",
    },
    {
      id: 2,
      message: "Every time you smile, I feel like the luckiest person alive ☀️",
      title: "What Makes You Beautiful",
      artist: "One Direction",
      audioSrc:
        "https://res.cloudinary.com/dcnl1eovc/video/upload/v1755153091/beautiful_lwxln1.mp3",
      color: "from-yellow-100 to-orange-200",
      emoji: "😊",
    },

    {
      id: 5,
      message: "Your love is the rhythm that keeps my heart beating 💓",
      title: "Jabilli Kosam",
      artist: "S. P. Balasubrahmanyam",
      audioSrc:
        "https://res.cloudinary.com/dcnl1eovc/video/upload/v1755153185/jabilli_n4gkre.mp3",
      color: "from-purple-100 to-violet-200",
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

  const togglePlay = (songId: number) => {
    const audio = audioRefs.current[songId];
    if (!audio) return;

    if (currentPlaying === songId) {
      audio.pause();
      setCurrentPlaying(null);
    } else {
      // Pause any currently playing audio
      Object.values(audioRefs.current).forEach((a) => a?.pause());
      audio.play();
      setCurrentPlaying(songId);

      if (!allSongsPlayed.includes(songId)) {
        setAllSongsPlayed((prev) => [...prev, songId]);
      }
    }
  };

  const handleTimeUpdate = (songId: number) => {
    const audio = audioRefs.current[songId];
    if (!audio) return;
    setProgress((prev) => ({
      ...prev,
      [songId]: (audio.currentTime / audio.duration) * 100 || 0,
    }));
  };

  useEffect(() => {
    // Stop all audio when component unmounts
    return () => {
      Object.values(audioRefs.current).forEach((a) => a?.pause());
    };
  }, []);

  const allPlayed = allSongsPlayed.length === songs.length;

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-pink-50 relative overflow-hidden">
      {/* Header */}
      <motion.div
        className="text-center pt-8 pb-6 px-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <h1 className="text-3xl font-bold text-blue-600 mb-3 font-pacifico">
          Every song reminds me of you 💙
        </h1>
        <p className="text-gray-600 font-dancing text-lg px-4">
          These are my little love notes to you, in the form of music
        </p>
      </motion.div>

      {/* Songs */}
      <div className="px-4 pb-8 space-y-6 max-w-sm mx-auto">
        {songs.map((song) => (
          <div
            onClick={() => togglePlay(song.id)}
            key={song.id}
            className="relative bg-black rounded-xl shadow-lg overflow-hidden"
          >
            {/* Cassette body */}
            <div className="bg-gradient-to-b from-orange-500 to-orange-600 border-t-4 border-b-4 border-orange-700 rounded-lg p-4 relative">
              {/* Screws */}
              {[
                "top-2 left-2",
                "top-2 right-2",
                "bottom-2 left-2",
                "bottom-2 right-2",
              ].map((pos, i) => (
                <div
                  key={i}
                  className={`absolute ${pos} w-3 h-3 rounded-full bg-gray-300 border border-gray-500`}
                />
              ))}

              {/* Label */}
              <div className="bg-[#fff9e6] rounded-t-md px-3 py-1 border-b border-gray-300 text-center">
                <p className="text-xs italic font-dancing text-gray-700 truncate">
                  {song.message}
                </p>
              </div>

              {/* Window with reels */}
              <div className="bg-black/90 rounded-lg px-4 py-2 flex items-center justify-between mt-2 shadow-inner relative">
                {/* Left reel */}
                <motion.div
                  animate={
                    currentPlaying === song.id ? { rotate: 360 } : { rotate: 0 }
                  }
                  transition={{
                    repeat: currentPlaying === song.id ? Infinity : 0,
                    duration: 3,
                    ease: "linear",
                  }}
                  className="w-12 h-12 bg-gradient-to-b from-gray-400 to-gray-500 rounded-full border-4 border-gray-600 shadow-inner relative"
                >
                  <div className="absolute inset-2 rounded-full bg-gray-200 flex items-center justify-center">
                    <Heart className="w-4 h-4 text-pink-500" />
                  </div>
                </motion.div>

                {/* Tape track name */}
                <div className="flex flex-col items-center justify-center flex-1">
                  <div className="text-[0.65rem] text-gray-300 font-mono uppercase tracking-wider px-2 text-center">
                    {song.title || "Untitled"}
                  </div>
                  <span className="text-[0.6rem] text-gray-400 italic mt-1 text-center">
                    (click to
                    {currentPlaying === song.id ? " pause" : " play"})
                  </span>
                </div>

                {/* Right reel */}
                <motion.div
                  animate={
                    currentPlaying === song.id
                      ? { rotate: -360 }
                      : { rotate: 0 }
                  }
                  transition={{
                    repeat: currentPlaying === song.id ? Infinity : 0,
                    duration: 3,
                    ease: "linear",
                  }}
                  className="w-12 h-12 bg-gradient-to-b from-gray-400 to-gray-500 rounded-full border-4 border-gray-600 shadow-inner relative"
                >
                  <div className="absolute inset-2 rounded-full bg-gray-200 flex items-center justify-center">
                    <Heart className="w-4 h-4 text-pink-500" />
                  </div>
                </motion.div>
              </div>

              {/* Now playing indicator */}
              <div className="flex flex-col items-center justify-center mt-2 min-h-[24px]">
                {currentPlaying === song.id ? (
                  <div className="text-xs text-white font-semibold flex items-center gap-1">
                    <span role="img" aria-label="playing">
                      🔊
                    </span>
                    <span>Now Playing...</span>
                  </div>
                ) : (
                  allSongsPlayed.includes(song.id) && (
                    <div className="flex items-center justify-center">
                      <div className="bg-pink-100 text-pink-600 px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 shadow-sm border border-pink-200">
                        <Heart className="w-3 h-3 fill-current" />
                        <span>Played with love</span>
                      </div>
                    </div>
                  )
                )}
              </div>

              {/* Played with love badge */}
            </div>

            {/* Floating Play/Pause button */}

            {/* Hidden audio */}
            <audio
              ref={(el) => (audioRefs.current[song.id] = el)}
              src={song.audioSrc}
              onTimeUpdate={() => handleTimeUpdate(song.id)}
              onEnded={() => setCurrentPlaying(null)}
            />
          </div>
        ))}
      </div>

      {/* Unlock Button */}
      {allPlayed && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="px-4 pb-6 max-w-sm mx-auto"
        >
          <div className="bg-gradient-to-r from-pink-100 to-blue-100 rounded-2xl p-6 text-center shadow-lg border border-white/50">
            <h3 className="text-xl font-bold text-gray-800 mb-2 font-pacifico">
              Now let's make our own love story ❤️
            </h3>
            <p className="text-gray-600 font-dancing text-lg mb-4">
              Every melody was chosen with you in mind
            </p>
            <button
              onClick={onNext}
              className="bg-gradient-to-r from-pink-400 to-blue-400 hover:from-pink-500 hover:to-blue-500 text-white px-8 py-3 rounded-full font-semibold transition-all transform hover:scale-105 shadow-lg"
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