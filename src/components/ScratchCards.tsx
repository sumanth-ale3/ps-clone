import React, { useState } from "react";
import { Gift, Heart } from "lucide-react";

interface ScratchCardsProps {
  onNext: () => void;
}

interface Card {
  id: number;
  title: string;
  content: string;
  emoji: string;
  scratched: boolean;
}

const ScratchCards: React.FC<ScratchCardsProps> = ({ onNext }) => {
  const [cards, setCards] = useState<Card[]>([
    {
      id: 1,
      title: "Warm Hugs",
      content: "Unlimited hugs whenever you need comfort 🤍",
      emoji: "🫂",
      scratched: false,
    },
    {
      id: 2,
      title: "Sweet Date",
      content: "Ice cream / coffee date  my treat 🍦",
      emoji: "🍨",
      scratched: false,
    },
    {
      id: 3,
      title: "Hoodie Claim",
      content: "You officially own my hoodie now 😌",
      emoji: "👕",
      scratched: false,
    },
    {
      id: 4,
      title: "Movie Night",
      content: "Your pick. Even if I pretend not to be scared 🎬",
      emoji: "🎥",
      scratched: false,
    },
    {
      id: 5,
      title: "Late-Night Talk",
      content: "One no-sleep conversation just us 🌙",
      emoji: "🌙",
      scratched: false,
    },
    {
      id: 6,
      title: "Forever Pass",
      content: "You get my time, attention & heart  always 💕",
      emoji: "💖",
      scratched: false,
    },
  ]);

  const scratchCard = (id: number) => {
    setCards((prev) =>
      prev.map((card) =>
        card.id === id ? { ...card, scratched: true } : card
      )
    );
  };

  const allScratched = cards.every((c) => c.scratched);

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-rose-50 via-pink-50 to-rose-100">
      <div className="w-full max-w-sm text-center">
        {/* Header */}
        <h2 className="text-2xl font-bold text-rose-600 mb-1 font-dancing">
          Scratch & Reveal 💖
        </h2>
        <p className="text-sm text-rose-500 mb-6">
          Tiny surprises, made just for you ✨
        </p>

        {/* Cards */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          {cards.map((card) => (
            <div
              key={card.id}
              onClick={() => !card.scratched && scratchCard(card.id)}
              className="relative h-32 rounded-2xl overflow-hidden cursor-pointer shadow-md active:scale-[0.98] transition"
            >
              {/* Revealed */}
              <div className="absolute inset-0 bg-gradient-to-br from-rose-100 to-pink-200 flex flex-col items-center justify-center px-3 text-center">
                <span className="text-2xl mb-1">{card.emoji}</span>
                <h4 className="text-xs font-semibold text-rose-700 mb-0.5">
                  {card.title}
                </h4>
                <p className="text-[11px] text-rose-600 leading-snug">
                  {card.content}
                </p>
              </div>

              {/* Scratch Layer */}
              {!card.scratched && (
                <div className="absolute inset-0 bg-gradient-to-br from-rose-400 to-pink-500 backdrop-blur-md flex items-center justify-center">
                  <Gift className="w-8 h-8 text-white opacity-90" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Instruction */}
        {!allScratched && (
          <p className="text-xs text-rose-500 mb-4">
            Tap each card to reveal a little love 💌
          </p>
        )}

        {/* Completion */}
        {allScratched && (
          <div className="animate-fade-in-up">
            <div className="bg-white/80 backdrop-blur rounded-2xl p-5 shadow-lg border border-rose-200 mb-5">
              <Heart className="mx-auto text-rose-500 mb-2" />
              <p className="text-rose-600 font-dancing text-lg leading-snug">
                “Every little surprise is just a reminder 
                <br />you mean everything to me 💕”
              </p>
            </div>

            <button
              onClick={onNext}
              className="w-full bg-rose-500 hover:bg-rose-600 text-white py-3 rounded-full font-semibold shadow-lg transition active:scale-[0.98]"
            >
              Continue our story → 🌸
            </button>
          </div>
        )}

        {/* Progress Dots */}
        <div className="flex justify-center gap-2 mt-4">
          {cards.map((c) => (
            <span
              key={c.id}
              className={`w-2.5 h-2.5 rounded-full transition ${
                c.scratched ? "bg-rose-500" : "bg-rose-200"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ScratchCards;
