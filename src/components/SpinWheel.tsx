import React, { useState } from "react";
import { RotateCcw } from "lucide-react";

interface SpinWheelProps {
  onNext: () => void;
}

const SpinWheel: React.FC<SpinWheelProps> = ({ onNext }) => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [resultIndex, setResultIndex] = useState<number | null>(null);
  const [rotation, setRotation] = useState(0);

  const prizes = [
    {
      text: "Warm Hug",
      emoji: "🤗",
      color: "#f9a8d4",
      description:
        "A long hug where I hold you a little tighter than usual… and don’t let go first.",
    },
    {
      text: "Whisper Something",
      emoji: "💋",
      color: "#f472b6",
      description:
        "I lean in close and whisper something that makes you smile (or blush).",
    },
    {
      text: "Forehead Kiss",
      emoji: "😘",
      color: "#fb7185",
      description:
        "Soft, slow, reassuring — the kind that makes you feel safe instantly.",
    },
    {
      text: "Coffee Date",
      emoji: "☕",
      color: "#fde68a",
      description:
        "Coffee, eye contact, teasing smiles, and losing track of time.",
    },
    {
      text: "Slow Dance",
      emoji: "💃",
      color: "#e879f9",
      description:
        "No music needed. Just sway, breathe, and forget the world exists.",
    },
    {
      text: "Playful Dare",
      emoji: "🔥",
      color: "#fb923c",
      description: "A harmless but flirty dare… you choose how bold it gets 😏",
    },
    {
      text: "Movie + Cuddle",
      emoji: "🎬",
      color: "#c4b5fd",
      description:
        "Your movie, my shoulder, shared blanket — zero interruptions.",
    },
    {
      text: "Surprise Kiss",
      emoji: "💖",
      color: "#f87171",
      description: "Unexpected, gentle, and right when you least expect it.",
    },
  ];

  const SEGMENT = 360 / prizes.length;

  const spinWheel = () => {
    if (isSpinning) return;

    setIsSpinning(true);
    setResultIndex(null);

    const spins = 4 + Math.random() * 3;
    const randomIndex = Math.floor(Math.random() * prizes.length);
    const targetAngle = randomIndex * SEGMENT + SEGMENT / 2;

    const totalRotation = rotation + spins * 360 + targetAngle;
    setRotation(totalRotation);

    setTimeout(() => {
      setIsSpinning(false);
      setResultIndex(randomIndex);
    }, 3200);
  };

  const resetWheel = () => {
    setResultIndex(null);
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center px-4 bg-gradient-to-b from-rose-100 via-pink-50 to-white overflow-hidden">
      {/* Decorative images (LOCKED BEHIND) */}
      <div className="absolute inset-0 flex justify-between px-4 pointer-events-none z-0">
        <img
          src="https://res.cloudinary.com/defswxqkw/image/upload/v1769776493/pngwing.com_p9s0iy.png"
          alt="decoration"
          className="w-28 h-28 object-cover opacity-80"
        />
        <img
          src="https://res.cloudinary.com/defswxqkw/image/upload/v1769776751/pngwing.com_1_lvxvru.png"
          alt="decoration"
          className="w-28 h-28 object-cover opacity-80"
        />
      </div>

      {/* Main Content */}

      <div className="relative w-full max-w-sm text-center z-10">
        {/* Header */}
      {resultIndex !== null && <div className="mt-16" />}
        <h2 className="text-[22px] font-bold text-rose-600 mb-1 font-pacifico">
          Spin & See What I Owe You 💞
        </h2>
        <p className="text-sm text-rose-400 mb-6 italic">
          One spin… one little moment just for you.
        </p>

        {/* Wheel (ISOLATED = NO SHAKE) */}
        <div className="relative w-64 h-64 mx-auto mb-6 isolate">
          <div
            className="absolute inset-0 rounded-full transition-transform duration-[3200ms] ease-[cubic-bezier(0.22,1,0.36,1)]
                       shadow-[0_0_25px_rgba(244,63,94,0.25)]"
            style={{ transform: `rotate(${rotation}deg)` }}
          >
            {/* Gradient */}
            <div
              className="absolute inset-0 rounded-full"
              style={{
                background: `conic-gradient(
      from -90deg,
      ${prizes
        .map((p, i) => `${p.color} ${i * SEGMENT}deg ${(i + 1) * SEGMENT}deg`)
        .join(",")}
    )`,
              }}
            />

            {/* Labels */}
            {prizes.map((p, i) => {
              const angle = i * SEGMENT + SEGMENT / 2;
              const rad = (angle * Math.PI) / 180;
              const x = 128 + 80 * Math.cos(rad - Math.PI / 2);
              const y = 128 + 80 * Math.sin(rad - Math.PI / 2);

              return (
                <div
                  key={i}
                  className="absolute text-center text-[10px] font-semibold text-rose-900"
                  style={{
                    left: x,
                    top: y,
                    transform: "translate(-50%, -50%)",
                  }}
                >
                  <div className="text-base">{p.emoji}</div>
                  <div>{p.text}</div>
                </div>
              );
            })}
          </div>

          {/* Pointer */}
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-20 text-2xl animate-pulse">
            ❤️
          </div>

          {/* Center */}
          <div className="absolute inset-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 bg-white rounded-full shadow-lg flex items-center justify-center border-2 border-pink-300 z-10">
            💘
          </div>
        </div>

        {/* Controls */}
        <div className="space-y-3">
          <button
            onClick={spinWheel}
            disabled={isSpinning}
            className="w-full bg-gradient-to-r from-pink-400 to-rose-500 text-white py-3 rounded-full font-semibold shadow-md transition active:scale-[0.97] disabled:opacity-60"
          >
            {isSpinning ? "Spinning…" : "Spin the Wheel"}
          </button>

          {resultIndex !== null && !isSpinning && (
            <button
              onClick={resetWheel}
              className="mx-auto flex items-center gap-2 text-sm text-rose-500 bg-white px-4 py-2 rounded-full shadow border border-rose-200"
            >
              <RotateCcw className="w-4 h-4" />
              Spin Again
            </button>
          )}
        </div>

        {/* Result */}
        {resultIndex !== null && (
          <div className="mt-6 animate-fade-in-up">
            <div className="bg-white/85 backdrop-blur rounded-2xl p-5 shadow-lg border border-rose-200">
              <h3 className="text-lg font-bold text-rose-600 mb-1">
                You get… 💝
              </h3>
              <div className="text-4xl mb-1">{prizes[resultIndex].emoji}</div>
              <p className="text-rose-600 font-semibold">
                {prizes[resultIndex].text}
              </p>
              <p className="text-sm text-gray-700 mt-2">
                {prizes[resultIndex].description}
              </p>
              <p className="text-xs text-gray-500 mt-2 italic">
                We’ll redeem this when we meet 😌
              </p>
            </div>

            <button
              onClick={onNext}
              className="mt-4 w-full bg-gradient-to-r from-rose-400 to-pink-500 text-white py-2.5 rounded-full font-semibold shadow-md transition active:scale-[0.97]"
            >
              Continue → 💌
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SpinWheel;
