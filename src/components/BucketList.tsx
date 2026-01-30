import React, { useState, useEffect } from "react";
import {
  MapPin,
  Coffee,
  Camera,
  Utensils,
  Plane,
  Star,
  Heart,
} from "lucide-react";

interface BucketListProps {
  onNext: () => void;
}

const STORAGE_KEY = "herBucketListChoices";

const BucketList: React.FC<BucketListProps> = ({ onNext }) => {
  const [selected, setSelected] = useState<number[]>([]);

  const items= [
    { id: 1, icon: MapPin, title: "Late-night Walks", description: "Wander under the stars 🌙", color: "bg-indigo-100 text-indigo-600" },
    { id: 2, icon: Plane, title: "Spontaneous Road Trip", description: "No plan, just us 🚗💨", color: "bg-green-100 text-green-600" },
    { id: 3, icon: Coffee, title: "Coffee Dates", description: "Find our favorite café ☕", color: "bg-amber-100 text-amber-600" },
    { id: 4, icon: Star, title: "Stargazing", description: "Make wishes together ✨", color: "bg-purple-100 text-purple-600" },
    { id: 5, icon: Camera, title: "Cute Photos", description: "Capture silly memories 📸", color: "bg-pink-100 text-pink-600" },
    { id: 6, icon: Utensils, title: "Cook Together", description: "Our favorite comfort food 🍝", color: "bg-red-100 text-red-600" },

    { id: 7, icon: Heart, title: "Slow Dance at Home", description: "No music needed 💃🕺", color: "bg-rose-100 text-rose-600" },
    { id: 8, icon: Coffee, title: "Rainy-day Chai Talks", description: "Warm cups & deep talks ☔", color: "bg-yellow-100 text-yellow-600" },
    { id: 9, icon: MapPin, title: "Get Lost on Purpose", description: "Discover new places 🗺️", color: "bg-blue-100 text-blue-600" },
    { id: 10, icon: Star, title: "Fall Asleep on Call", description: "Goodnight whispers 🌙📞", color: "bg-purple-100 text-purple-600" },
    { id: 11, icon: Camera, title: "Sunset Hand-Holding", description: "Watch the sky glow 🌅", color: "bg-pink-100 text-pink-600" },
    { id: 12, icon: Utensils, title: "Ice Cream Crawl", description: "Every flavor counts 🍦", color: "bg-red-100 text-red-600" },

    { id: 13, icon: Heart, title: "Letters to Future Us", description: "Open them someday 💌", color: "bg-rose-100 text-rose-600" },
    { id: 14, icon: Coffee, title: "Shared Playlist", description: "Songs that feel like us 🎶", color: "bg-amber-100 text-amber-600" },
    { id: 15, icon: Star, title: "Celebrate Small Wins", description: "Every moment matters 🎉", color: "bg-purple-100 text-purple-600" },
    { id: 16, icon: Heart, title: "Random Forehead Kisses", description: "Just because ❤️", color: "bg-pink-100 text-pink-600" },
    { id: 17, icon: Camera, title: "Laugh Till It Hurts", description: "Stomach-aching laughs 😂", color: "bg-indigo-100 text-indigo-600" },
  ];


  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) setSelected(JSON.parse(saved));
  }, []);

  useEffect(() => {
    if (selected.length) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(selected));
    }
  }, [selected]);

  const toggle = (id: number) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const canContinue = selected.length >= 5;

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-b from-rose-50 via-pink-50 to-white">
      <div className="w-full max-w-sm text-center">

        {/* Header */}
        <div className="my-6">
          <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent mb-3">
            What moments matter to you? 💭
          </h2>
          <p className="text-sm text-gray-600 leading-relaxed">
            Pick at least <span className="font-semibold text-rose-600">5 things</span> you'd love to do together ✨
          </p>
        </div>

        {/* Cards */}
        <div className="space-y-2.5 mb-5">
          {items.map((item, i) => {
            const Icon = item.icon;
            const active = selected.includes(item.id);

            return (
              <div
                key={item.id}
                onClick={() => toggle(item.id)}
                className={`flex items-center gap-3 p-3 rounded-xl bg-white cursor-pointer transition
                  active:scale-[0.97]
                  ${active
                    ? "ring-2 ring-rose-300 shadow-[0_0_18px_rgba(244,63,94,0.35)]"
                    : "shadow-sm"
                  }`}
                style={{
                  animation: `fadeIn 0.25s ease ${i * 0.04}s both`,
                }}
              >
                <div className="w-9 h-9 rounded-lg bg-rose-100 text-rose-600 flex items-center justify-center">
                  <Icon className="w-4.5 h-4.5" />
                </div>

                <div className="flex-1 text-left">
                  <p className="text-sm font-medium text-gray-800">
                    {item.title}
                  </p>
                  <p className="text-xs text-gray-500">
                    {item.description}
                  </p>
                </div>

                {active && <span className="text-rose-500 text-base">💗</span>}
              </div>
            );
          })}
        </div>

        {/* Helper text */}
        {!canContinue && (
          <p className="text-xs text-gray-400 mb-4">
            Pick at least <span className="font-medium">5 moments</span> 💕
          </p>
        )}

        {/* CTA */}
        {canContinue && (
          <button
            onClick={onNext}
            className="w-full bg-gradient-to-r from-rose-400 to-pink-400 text-white py-2.5 rounded-full text-sm font-semibold transition active:scale-[0.97] shadow-md"
          >
            I want to do these with you → 💌
          </button>
        )}

        {/* Count */}
        <p className="my-3 text-xs text-gray-400">
          {selected.length} moments you chose
        </p>
      </div>
    </div>
  );
};

export default BucketList;
