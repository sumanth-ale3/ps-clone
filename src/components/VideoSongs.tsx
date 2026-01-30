import React, { useState, useRef, useEffect } from "react";
import { Play, X, Volume2, VolumeX } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface VideoSong {
  id: number;
  title: string;
  artist: string;
  videoSrc: string;
  thumbnail: string;
  emotion: string;
}

const VideoSongs: React.FC<{ onNext?: () => void }> = ({ onNext }) => {
  const [selectedVideo, setSelectedVideo] = useState<number | null>(null);
  const [isMuted, setIsMuted] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const songs: VideoSong[] = [
    {
      id: 1,
      title: "Every Moment With You",
      artist: "Sung by my heart",
      videoSrc: "https://res.cloudinary.com/dcnl1eovc/video/upload/v1755153590/romance_1_hcb8qa.mp4",
      thumbnail: "https://images.pexels.com/photos/355321/pexels-photo-355321.jpeg?auto=compress&cs=tinysrgb&w=600",
      emotion: "This is how you make me feel — cherished, safe, and completely seen."
    },
    {
      id: 2,
      title: "In Your Eyes",
      artist: "A love song for you",
      videoSrc: "https://res.cloudinary.com/dcnl1eovc/video/upload/v1755153590/romance_1_hcb8qa.mp4",
      thumbnail: "https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=600",
      emotion: "Every time you look at me, I understand what forever means."
    },
    {
      id: 3,
      title: "When You Smile",
      artist: "The world stops",
      videoSrc: "https://res.cloudinary.com/dcnl1eovc/video/upload/v1755153590/romance_1_hcb8qa.mp4",
      thumbnail: "https://images.pexels.com/photos/1444080/pexels-photo-1444080.jpeg?auto=compress&cs=tinysrgb&w=600",
      emotion: "That quiet moment when you smile — that's when I know this is real."
    },
    {
      id: 4,
      title: "Hold Me Close",
      artist: "A whisper in the night",
      videoSrc: "https://res.cloudinary.com/dcnl1eovc/video/upload/v1755153590/romance_1_hcb8qa.mp4",
      thumbnail: "https://images.pexels.com/photos/1179804/pexels-photo-1179804.jpeg?auto=compress&cs=tinysrgb&w=600",
      emotion: "In your arms is the only place I want to be."
    },
    {
      id: 5,
      title: "A Future With You",
      artist: "Tomorrow's promise",
      videoSrc: "https://res.cloudinary.com/dcnl1eovc/video/upload/v1755153590/romance_1_hcb8qa.mp4",
      thumbnail: "https://images.pexels.com/photos/1590301/pexels-photo-1590301.jpeg?auto=compress&cs=tinysrgb&w=600",
      emotion: "I can see it so clearly — a lifetime of moments just like this."
    },
    {
      id: 6,
      title: "All of Me",
      artist: "For you, always",
      videoSrc: "https://res.cloudinary.com/dcnl1eovc/video/upload/v1755153590/romance_1_hcb8qa.mp4",
      thumbnail: "https://images.pexels.com/photos/1040881/pexels-photo-1040881.jpeg?auto=compress&cs=tinysrgb&w=600",
      emotion: "Every part of me, everything I am — it all belongs to you."
    },
    {
      id: 7,
      title: "Forever Starts Now",
      artist: "The beginning of us",
      videoSrc: "https://res.cloudinary.com/dcnl1eovc/video/upload/v1755153590/romance_1_hcb8qa.mp4",
      thumbnail: "https://images.pexels.com/photos/1566837/pexels-photo-1566837.jpeg?auto=compress&cs=tinysrgb&w=600",
      emotion: "This moment, right here, is the start of everything beautiful."
    }
  ];

  const selectedSong = songs.find(s => s.id === selectedVideo);

  useEffect(() => {
    if (selectedVideo && videoRef.current) {
      videoRef.current.play();
    }
  }, [selectedVideo]);

  const closeVideo = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
    setSelectedVideo(null);
  };

  const playNext = () => {
    if (!selectedVideo) return;
    const currentIndex = songs.findIndex(s => s.id === selectedVideo);
    const nextIndex = currentIndex < songs.length - 1 ? currentIndex + 1 : 0;
    setSelectedVideo(songs[nextIndex].id);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50 via-pink-50/40 to-blue-50 relative overflow-hidden">
      {/* Ambient floating hearts */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-rose-200/30 text-2xl"
            initial={{
              x: `${Math.random() * 100}vw`,
              y: `${Math.random() * 100}vh`
            }}
            animate={{
              y: [`${Math.random() * 100}vh`, `${Math.random() * -50}vh`],
              x: [`${Math.random() * 100}vw`, `${Math.random() * 100}vw`],
            }}
            transition={{
              duration: 15 + Math.random() * 15,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            ♡
          </motion.div>
        ))}
      </div>

      {/* Soft glowing orbs */}
      <div className="fixed inset-0 pointer-events-none">
        <motion.div
          className="absolute top-20 right-10 w-72 h-72 bg-rose-200/20 rounded-full filter blur-3xl"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-20 left-10 w-96 h-96 bg-blue-200/20 rounded-full filter blur-3xl"
          animate={{ scale: [1.1, 1, 1.1] }}
          transition={{ duration: 10, repeat: Infinity }}
        />
      </div>

      {/* Header */}
      <motion.div
        className="relative z-10 text-center pt-10 pb-8 px-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2 }}
      >
        <h1 className="text-4xl sm:text-5xl font-dancing text-rose-900 mb-4 drop-shadow-sm">
          These Songs Look the Way My Heart Feels About You
        </h1>
        <p className="text-rose-700/80 text-lg font-dancing italic max-w-2xl mx-auto leading-relaxed">
          Some moments are meant to be seen, heard, and felt—<br />
          not rushed, not skipped, just experienced with you.
        </p>
      </motion.div>

      {/* Video Cards Grid */}
      <div className="relative z-10 px-4 max-w-6xl mx-auto pb-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {songs.map((song, index) => (
            <motion.button
              key={song.id}
              onClick={() => setSelectedVideo(song.id)}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="relative group text-left focus:outline-none"
            >
              {/* Card container */}
              <div className="relative bg-white/60 backdrop-blur-md rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-white/40 hover:border-rose-200/60">
                {/* Thumbnail */}
                <div className="relative h-52 sm:h-64 overflow-hidden bg-gradient-to-br from-rose-100 to-pink-100">
                  <img
                    src={song.thumbnail}
                    alt={song.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />

                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Play button */}
                  <motion.div
                    className="absolute inset-0 flex items-center justify-center"
                    initial={{ scale: 0.8, opacity: 0 }}
                    whileHover={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="w-16 h-16 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-lg">
                      <Play className="w-7 h-7 text-rose-600 ml-1" />
                    </div>
                  </motion.div>

                  {/* Glow effect */}
                  <motion.div
                    className="absolute inset-0 rounded-3xl border-2 border-rose-300/0 group-hover:border-rose-300/50"
                    animate={{ boxShadow: ["0 0 0 0 rgba(244,114,182,0)", "0 0 20px 0 rgba(244,114,182,0.3)"] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </div>

                {/* Content */}
                <div className="p-4 sm:p-5">
                  <h3 className="text-lg sm:text-xl font-dancing text-rose-900 mb-1 line-clamp-2">
                    {song.title}
                  </h3>
                  <p className="text-sm text-rose-600/70 font-dancing italic mb-3">
                    {song.artist}
                  </p>
                  <p className="text-sm text-rose-700/80 leading-relaxed font-serif line-clamp-2">
                    {song.emotion}
                  </p>
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Footer Message */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="relative z-10 text-center pb-16 px-6"
      >
        <p className="text-rose-800/70 font-dancing text-lg italic max-w-2xl mx-auto">
          Each of these songs carries a piece of what I feel for you.
        </p>
      </motion.div>

      {/* Navigation Button */}
      {onNext && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="relative z-10 text-center pb-8 px-6"
        >
          <button
            onClick={onNext}
            className="inline-block px-8 py-3 rounded-full bg-gradient-to-r from-rose-400 to-pink-400 hover:from-rose-500 hover:to-pink-500 text-white font-dancing text-lg transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg"
          >
            Next → There's something I've been waiting to ask you
          </button>
        </motion.div>
      )}

      {/* Video Modal */}
      <AnimatePresence>
        {selectedVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={closeVideo}
          >
            {/* Close button background click */}
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-4xl"
            >
              {/* Close button */}
              <button
                onClick={closeVideo}
                className="absolute -top-12 right-0 text-white hover:text-rose-200 transition-colors z-10 p-2 rounded-full hover:bg-white/10 backdrop-blur-sm"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Video container */}
              <div className="relative bg-black rounded-2xl overflow-hidden shadow-2xl">
                {/* Song info */}
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="absolute top-0 left-0 right-0 z-20 bg-gradient-to-b from-black/60 to-transparent p-6 text-white"
                >
                  <h2 className="text-2xl sm:text-3xl font-dancing mb-2">
                    {selectedSong?.title}
                  </h2>
                  <p className="text-rose-200 font-dancing italic">
                    {selectedSong?.artist}
                  </p>
                </motion.div>

                {/* Video player */}
                <video
                  ref={videoRef}
                  src={selectedSong?.videoSrc}
                  className="w-full h-auto max-h-[70vh] object-contain"
                  controls
                  autoPlay
                  onEnded={playNext}
                  controlsList="nodownload"
                />

                {/* Emotion message */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 text-white"
                >
                  <p className="text-lg font-dancing italic text-rose-100">
                    {selectedSong?.emotion}
                  </p>
                </motion.div>

                {/* Volume toggle (optional enhancement) */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsMuted(!isMuted);
                    if (videoRef.current) {
                      videoRef.current.muted = !isMuted;
                    }
                  }}
                  className="absolute top-6 right-6 z-20 text-white hover:text-rose-200 transition-colors p-2 rounded-full hover:bg-white/10 backdrop-blur-sm"
                >
                  {isMuted ? (
                    <VolumeX className="w-6 h-6" />
                  ) : (
                    <Volume2 className="w-6 h-6" />
                  )}
                </button>
              </div>

              {/* Navigation hints */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="text-center mt-6 text-white/70 text-sm"
              >
                <p>Video will auto-play next song when finished</p>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default VideoSongs;
