import React, { useState, useRef, useEffect } from "react";
import { Play, Pause, Volume2, Heart, Sparkles } from "lucide-react";

interface VoiceNoteProps {
  onNext: () => void;
}

const VoiceNote: React.FC<VoiceNoteProps> = ({ onNext }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = new Audio(
      "https://res.cloudinary.com/dcnl1eovc/video/upload/v1755153187/mine_uw7gyw.mp3"
    );

    const audio = audioRef.current;

    audio.addEventListener("loadedmetadata", () => {
      setDuration(audio.duration || 0);
    });

    audio.addEventListener("timeupdate", () => {
      if (duration > 0) {
        setProgress((audio.currentTime / duration) * 100);
      }
    });

    audio.addEventListener("ended", () => {
      setIsPlaying(false);
      setProgress(100);
    });

    return () => {
      audio.pause();
      audio.src = "";
    };
  }, [duration]);

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      if (progress >= 100) {
        audioRef.current.currentTime = 0;
        setProgress(0);
      }
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const formatTime = (time: number) => {
    const m = Math.floor(time / 60);
    const s = Math.floor(time % 60);
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 bg-gradient-to-br from-pink-100 via-rose-50 to-purple-100">
      <div className="max-w-sm w-full text-center">
        {/* Title */}
        <h2 className="text-4xl font-pacifico text-pink-600 mb-2 animate-fade-in">
          A Voice Note 💌
        </h2>
        <p className="text-pink-500 italic mb-8 animate-fade-in delay-200">
          Something I wanted you to hear… just you 💗
        </p>

        {/* Player Card */}
        <div className="relative bg-white/80 backdrop-blur-md rounded-3xl p-8 shadow-xl overflow-hidden">
          {/* Soft Glow */}
          <div className="absolute inset-0 bg-gradient-to-tr from-pink-200 via-white to-purple-100 opacity-40 pointer-events-none" />

          {/* Speaker */}
          <div className="relative mb-6">
            <div className="w-32 h-32 rounded-full bg-gradient-to-b from-pink-400 to-pink-500 mx-auto flex items-center justify-center shadow-lg">
              <div className="w-24 h-24 rounded-full bg-gradient-to-b from-pink-600 to-pink-700 flex items-center justify-center">
                <Volume2
                  className={`w-10 h-10 text-white ${
                    isPlaying ? "animate-pulse" : ""
                  }`}
                />
              </div>
            </div>
          </div>

          {/* Progress */}
          <div className="mb-6 relative z-10">
            <div className="h-2 rounded-full bg-pink-100 overflow-hidden">
              <div
                className="h-2 bg-gradient-to-r from-pink-400 to-purple-400 transition-all duration-100"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="flex justify-between text-xs text-pink-500 mt-1">
              <span>{formatTime(audioRef.current?.currentTime || 0)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>

          {/* Play Button */}
          <button
            onClick={togglePlay}
            className="w-16 h-16 mx-auto mb-4 rounded-full bg-pink-400 hover:bg-pink-500
            flex items-center justify-center text-white shadow-lg transition-transform hover:scale-105"
          >
            {isPlaying ? (
              <Pause className="w-8 h-8" />
            ) : (
              <Play className="w-8 h-8 ml-1" />
            )}
          </button>

          {/* Timed Messages */}
          <div className="min-h-[28px] text-sm text-pink-600 italic transition-opacity">
            {!isPlaying && progress === 0 && "Tap play… I’m right here 💞"}
            {isPlaying && progress < 20 && "Hey… 💗"}
            {progress >= 20 && progress < 45 && "I hope you’re smiling right now"}
            {progress >= 45 && progress < 75 && "That smile is my favorite thing"}
            {progress >= 75 && progress < 100 && "I mean every word I say to you 💙"}
          </div>
        </div>

        {/* Floating Love */}
        {isPlaying && (
          <div className="relative h-16 mt-6">
            {[...Array(4)].map((_, i) => (
              <Heart
                key={i}
                className="absolute w-4 h-4 text-pink-400 animate-float"
                style={{
                  left: `${25 + i * 15}%`,
                  animationDelay: `${i * 0.6}s`,
                }}
              />
            ))}
            {[...Array(2)].map((_, i) => (
              <Sparkles
                key={i}
                className="absolute w-3 h-3 text-yellow-300 animate-float"
                style={{
                  left: `${35 + i * 25}%`,
                  animationDelay: `${i * 0.8}s`,
                }}
              />
            ))}
          </div>
        )}

        {/* Ending */}
        {progress >= 100 && (
          <div className="mt-8 animate-fade-in-up">
            <div className="bg-pink-50 rounded-2xl p-4 shadow-inner mb-6">
              <p className="text-pink-700 font-dancing text-lg leading-relaxed">
                “With you, even silence feels warm 💕”
              </p>
            </div>

            <button
              onClick={onNext}
              className="w-full bg-gradient-to-r from-pink-500 to-purple-500
              text-white py-3 rounded-full font-semibold shadow-lg
              transition-transform hover:scale-105"
            >
              Stay with me a little longer → ✨
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default VoiceNote;
