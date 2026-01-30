import React, { useState, useEffect } from "react";
import { Calendar, Clock, Heart } from "lucide-react";

interface TripSinceMetProps {
  onNext: () => void;
}

const TripSinceMet: React.FC<TripSinceMetProps> = ({ onNext }) => {
  // 💞 The moment everything changed
  const metDate = new Date("2025-11-29T13:30:00");

  const calculateTimePassed = () => {
    const now = new Date();
    const diff = now.getTime() - metDate.getTime();

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    return {
      days: Math.max(0, days),
      hours: Math.max(0, hours),
      minutes: Math.max(0, minutes),
      seconds: Math.max(0, seconds),
    };
  };

  const [timePassed, setTimePassed] = useState(calculateTimePassed());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimePassed(calculateTimePassed());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-b from-pink-50 via-rose-50 to-blue-50 relative overflow-hidden">
      {/* Floating hearts */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(14)].map((_, i) => (
          <Heart
            key={i}
            className="absolute text-pink-300 opacity-30 animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${12 + Math.random() * 18}px`,
              height: `${12 + Math.random() * 18}px`,
              animationDelay: `${Math.random() * 6}s`,
              animationDuration: `${6 + Math.random() * 6}s`,
            }}
          />
        ))}
      </div>

      <div className="max-w-sm w-full text-center relative z-10">
        <h2 className="text-3xl font-bold text-rose-600 mb-3 font-dancing">
          Since the moment we met 💖
        </h2>

        <p className="text-gray-600 mb-2">
          One meeting… and everything felt different.
        </p>

        <p className="text-sm text-pink-500 italic mb-8">
          29th November 2025 • 1:30 PM ✨
        </p>

        {/* Time Passed Card */}
        <div className="bg-white rounded-3xl p-8 shadow-lg mb-8 border border-pink-100">
          <div className="flex items-center justify-center mb-6">
            <Calendar className="w-8 h-8 text-pink-400 mr-3" />
            <span className="text-lg font-semibold text-gray-700">
              Time we've shared so far
            </span>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            {[
              {
                label: "Days",
                value: timePassed.days,
                colors: "from-pink-100 to-pink-200",
                text: "text-pink-600",
              },
              {
                label: "Hours",
                value: timePassed.hours,
                colors: "from-rose-100 to-rose-200",
                text: "text-rose-600",
              },
              {
                label: "Minutes",
                value: timePassed.minutes,
                colors: "from-purple-100 to-purple-200",
                text: "text-purple-600",
              },
              {
                label: "Seconds",
                value: timePassed.seconds,
                colors: "from-blue-100 to-blue-200",
                text: "text-blue-600",
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className={`bg-gradient-to-br ${item.colors} rounded-2xl p-4`}
              >
                <div className={`text-3xl font-bold ${item.text}`}>
                  {item.value}
                </div>
                <div className={`${item.text.replace("600", "800")} text-sm`}>
                  {item.label}
                </div>
              </div>
            ))}
          </div>

          {/* Soft pulsing hearts */}
          <div className="flex justify-center space-x-2 mb-4">
            {[...Array(5)].map((_, i) => (
              <Heart
                key={i}
                className="w-5 h-5 text-pink-400 animate-pulse"
                style={{ animationDelay: `${i * 0.25}s` }}
              />
            ))}
          </div>

          <p className="text-gray-600 text-sm">
  Every second here is just a reminder of how much you mean to me.
          </p>
        </div>

        {/* Heartfelt Message */}
        <div className="bg-gradient-to-r from-pink-50 to-blue-50 rounded-2xl p-6 shadow-lg mb-8 border border-pink-100">
          <Clock className="w-6 h-6 text-pink-400 mx-auto mb-3" />
          <p className="text-gray-700 font-dancing text-lg mb-4 italic">
            “I didn't know that one ordinary moment could turn into something
            I'd count forever. But meeting you did.”
          </p>

          <div className="text-sm text-gray-500 text-left">
            <p>Since that day, I've loved:</p>
            <ul className="mt-2 space-y-1">
              <li>• The way you slowly became my favorite thought 💭</li>
              <li>• How even small moments feel special with you ✨</li>
              <li>• Smiling for no reason because of you 😊</li>
              <li>• Feeling calm, safe, and happy with you 💗</li>
              <li>• Dreaming about all the days still waiting for us 🌸</li>
            </ul>
          </div>
        </div>

        <button
          onClick={onNext}
          className="bg-gradient-to-r from-pink-400 to-rose-400 hover:from-pink-500 hover:to-rose-500 text-white px-8 py-3 rounded-full font-semibold transition-transform transform hover:scale-105 w-full shadow-md"
        >
          And this is just the beginning → 💞
        </button>
      </div>
    </div>
  );
};

export default TripSinceMet;
