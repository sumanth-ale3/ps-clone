import React, { useState, useEffect } from "react";
import { RotateCcw } from "lucide-react";

interface SpinWheelProps {
  onNext: () => void;
}

const STORAGE_KEY = "spinWheelResults_v2";

type Prize = {
  id: string;
  text: string;
  emoji: string;
  color: string;
  description: string;
};

const prizes: Prize[] = [
  {
    id: "warm_hug",
    text: "Warm Hug",
    emoji: "🤗",
    color: "#f9a8d4",
    description:
      "A long hug where I hold you a little tighter than usual… and don’t let go first.",
  },
  {
    id: "whisper",
    text: "Whisper Something",
    emoji: "💋",
    color: "#f472b6",
    description:
      "I lean in close and whisper something that makes you smile (or blush).",
  },
  {
    id: "forehead_kiss",
    text: "Forehead Kiss",
    emoji: "😘",
    color: "#fb7185",
    description:
      "Soft, slow, reassuring — the kind that makes you feel safe instantly.",
  },
  {
    id: "coffee_date",
    text: "Coffee Date",
    emoji: "☕",
    color: "#fde68a",
    description:
      "Coffee, eye contact, teasing smiles, and losing track of time.",
  },
  {
    id: "slow_dance",
    text: "Slow Dance",
    emoji: "💃",
    color: "#e879f9",
    description:
      "No music needed. Just sway, breathe, and forget the world exists.",
  },
  {
    id: "playful_dare",
    text: "Playful Dare",
    emoji: "🔥",
    color: "#fb923c",
    description: "A harmless but flirty dare… you choose how bold it gets 😏",
  },
  {
    id: "movie_cuddle",
    text: "Movie + Cuddle",
    emoji: "🎬",
    color: "#c4b5fd",
    description:
      "Your movie, my shoulder, shared blanket — zero interruptions.",
  },
  {
    id: "surprise_kiss",
    text: "Surprise Kiss",
    emoji: "💖",
    color: "#f87171",
    description: "Unexpected, gentle, and right when you least expect it.",
  },
];

const SEGMENT = 360 / prizes.length;

const SpinWheel: React.FC<SpinWheelProps> = ({ onNext }) => {
  const [rotation, setRotation] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const [currentPrizeId, setCurrentPrizeId] = useState<string | null>(null);
  const [results, setResults] = useState<string[]>([]);

  const spinsLeft = 3 - results.length;

  /* ---------- Load stored results ---------- */
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) setResults(JSON.parse(saved));
  }, []);

  /* ---------- Persist results ---------- */
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(results));
  }, [results]);

  const spinWheel = () => {
    if (isSpinning || spinsLeft <= 0) return;

    setIsSpinning(true);
    setCurrentPrizeId(null);

    // 1️⃣ Pick prize FIRST
    const prizeIndex = Math.floor(Math.random() * prizes.length);
    const prize = prizes[prizeIndex];

    // 2️⃣ Calculate exact angle for that prize
    // Pointer is at top (0deg)
    // conic-gradient starts at -90deg
    const prizeAngle = prizeIndex * SEGMENT + SEGMENT / 2;

    const spins = 4 + Math.random() * 2;

    const totalRotation = rotation + spins * 360 - prizeAngle;

    setRotation(totalRotation);

    // 3️⃣ After animation, show SAME prize
    setTimeout(() => {
      setIsSpinning(false);
      setCurrentPrizeId(prize.id);
      setResults((prev) => [...prev, prize.id]);
    }, 3200);
  };
  const resetAll = () => {
    localStorage.removeItem(STORAGE_KEY);
    setRotation(0);
    setResults([]);
    setCurrentPrizeId(null);
  };

  const getPrize = (id: string) => prizes.find((p) => p.id === id)!;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-rose-100 via-pink-50 to-white px-4">
      <div className="w-full max-w-sm text-center">
        {/* Header */}
        <h2 className="text-[22px] font-bold text-rose-600 mb-1 font-pacifico">
          Spin & See What I Owe You 💞
        </h2>
        <p className="text-sm text-rose-400 mb-5 italic">
          {spinsLeft > 0
            ? `You have ${spinsLeft} spin${spinsLeft > 1 ? "s" : ""} left ✨`
            : "Your moments are decided 💖"}
        </p>

        {/* Wheel */}
        <div className="relative w-64 h-64 mx-auto mb-6 isolate">
          <div
            className="absolute inset-0 rounded-full transition-transform duration-[3200ms]
            ease-[cubic-bezier(0.22,1,0.36,1)]
            shadow-[0_0_25px_rgba(244,63,94,0.25)]"
            style={{ transform: `rotate(${rotation}deg)` }}
          >
            <div
              className="absolute inset-0 rounded-full"
              style={{
                background: `conic-gradient(
                  from -90deg,
                  ${prizes
                    .map(
                      (p, i) =>
                        `${p.color} ${i * SEGMENT}deg ${(i + 1) * SEGMENT}deg`,
                    )
                    .join(",")}
                )`,
              }}
            />

            {prizes.map((p, i) => {
              const angle = i * SEGMENT + SEGMENT / 2;
              const rad = (angle * Math.PI) / 180;
              const x = 128 + 80 * Math.cos(rad - Math.PI / 2);
              const y = 128 + 80 * Math.sin(rad - Math.PI / 2);

              return (
                <div
                  key={p.id}
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

          {/* <div className="absolute -top-3 left-1/2 -translate-x-1/2 text-2xl animate-pulse">
          </div> */}

          <div className="absolute inset-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 bg-white rounded-full shadow-lg flex items-center justify-center border-2 border-pink-300">
            💘
          </div>
        </div>

        {/* Spin Button */}
        {spinsLeft > 0 && (
          <button
            onClick={spinWheel}
            disabled={isSpinning}
            className="w-full bg-gradient-to-r from-pink-400 to-rose-500
            text-white py-3 rounded-full font-semibold shadow-md
            transition active:scale-[0.97] disabled:opacity-60"
          >
            {isSpinning ? "Spinning…" : "Spin"}
          </button>
        )}

        {/* Current Spin Result */}
        {currentPrizeId && (
          <div className="mt-5 bg-white/85 rounded-xl p-4 shadow border border-rose-200">
            <div className="text-3xl">{getPrize(currentPrizeId).emoji}</div>
            <p className="font-semibold text-rose-600">
              {getPrize(currentPrizeId).text}
            </p>
            <p className="text-xs text-gray-600 mt-1">
              {getPrize(currentPrizeId).description}
            </p>
          </div>
        )}

        {/* Previous Spins */}
        {results.length > 0 && (
          <div className="mt-4">
            <p className="text-xs text-gray-400 mb-2">Your spins so far</p>
            <div className="flex justify-center gap-3">
              {results.map((id, idx) => {
                const p = getPrize(id);
                return (
                  <div key={idx} className="text-center">
                    <div className="text-2xl">{p.emoji}</div>
                    <p className="text-[10px] text-gray-600">{p.text}</p>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Final Screen */}
        {results.length === 3 && (
          <div className="mt-6 bg-white/90 rounded-xl p-5 shadow-lg border border-rose-200">
            <p className="text-sm text-rose-500 font-medium mb-2">
              These are your moments 💖
            </p>

            <div className="flex justify-center gap-4 mb-3">
              {results.map((id, idx) => {
                const p = getPrize(id);
                return (
                  <div key={idx} className="text-center">
                    <div className="text-3xl">{p.emoji}</div>
                    <p className="text-xs text-gray-600">{p.text}</p>
                  </div>
                );
              })}
            </div>

            <p className="text-xs text-gray-500 italic mb-4">
              Take a screenshot if you want to keep this ✨
            </p>

            <div className="flex gap-3">
              <button
                onClick={resetAll}
                className="flex-1 bg-white text-rose-500 border border-rose-300
                py-2 rounded-full text-sm font-semibold shadow"
              >
                Retry
              </button>
              <button
                onClick={onNext}
                className="flex-1 bg-gradient-to-r from-rose-400 to-pink-500
                text-white py-2 rounded-full text-sm font-semibold shadow"
              >
                Continue 💌
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SpinWheel;
