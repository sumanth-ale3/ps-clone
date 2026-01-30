import React, { useState, useEffect } from "react";
import { Shuffle, CheckCircle, Clock, Zap } from "lucide-react";

interface MemoryPuzzleProps {
  onNext: () => void;
}

const GRID_SIZE = 3; // keep 3x3 but harder
const EMPTY_TILE = GRID_SIZE * GRID_SIZE - 1;
const TOTAL_TIME = 150; // reduced from 180 → pressure

const MemoryPuzzle: React.FC<MemoryPuzzleProps> = ({ onNext }) => {
  const [tiles, setTiles] = useState<number[]>([]);
  const [isComplete, setIsComplete] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [timeLeft, setTimeLeft] = useState(TOTAL_TIME);
  const [autoSolveOption, setAutoSolveOption] = useState(false);

  const imageURL =
    "https://res.cloudinary.com/defswxqkw/image/upload/v1769715755/IMG_0259_fx44yp.jpg";

  /* ---------------- INIT ---------------- */
  useEffect(() => {
    shufflePuzzle();
  }, []);

  /* ---------------- TIMER ---------------- */
  useEffect(() => {
    if (isComplete) return;
    if (timeLeft <= 0) {
      setAutoSolveOption(true);
      return;
    }
    const timer = setInterval(() => {
      setTimeLeft((t) => t - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft, isComplete]);

  /* ---------------- SHUFFLE (HARDER) ---------------- */
  const shufflePuzzle = () => {
    let arr = Array.from({ length: GRID_SIZE * GRID_SIZE }, (_, i) => i);

    const moveRandom = () => {
      const emptyIndex = arr.indexOf(EMPTY_TILE);
      const row = Math.floor(emptyIndex / GRID_SIZE);
      const col = emptyIndex % GRID_SIZE;
      const moves: number[] = [];

      if (row > 0) moves.push(emptyIndex - GRID_SIZE);
      if (row < GRID_SIZE - 1) moves.push(emptyIndex + GRID_SIZE);
      if (col > 0) moves.push(emptyIndex - 1);
      if (col < GRID_SIZE - 1) moves.push(emptyIndex + 1);

      const target = moves[Math.floor(Math.random() * moves.length)];
      [arr[emptyIndex], arr[target]] = [arr[target], arr[emptyIndex]];
    };

    // 🔥 MUCH harder: 70 random legal moves
    for (let i = 0; i < 70; i++) moveRandom();

    setTiles(arr);
    setIsComplete(false);
    setShowMessage(false);
    setAutoSolveOption(false);
    setTimeLeft(TOTAL_TIME);
  };

  /* ---------------- MOVE TILE ---------------- */
  const moveTile = (index: number) => {
    if (isComplete) return;

    const emptyIndex = tiles.indexOf(EMPTY_TILE);
    const row = Math.floor(index / GRID_SIZE);
    const col = index % GRID_SIZE;
    const emptyRow = Math.floor(emptyIndex / GRID_SIZE);
    const emptyCol = emptyIndex % GRID_SIZE;

    const isAdjacent =
      (Math.abs(row - emptyRow) === 1 && col === emptyCol) ||
      (Math.abs(col - emptyCol) === 1 && row === emptyRow);

    if (!isAdjacent) return;

    const newTiles = [...tiles];
    [newTiles[index], newTiles[emptyIndex]] = [
      newTiles[emptyIndex],
      newTiles[index],
    ];
    setTiles(newTiles);

    if (newTiles.every((t, i) => t === i)) {
      setIsComplete(true);
      setTimeout(() => setShowMessage(true), 900);
    }
  };

  /* ---------------- AUTO SOLVE ---------------- */
  const autoSolve = () => {
    setTiles(Array.from({ length: GRID_SIZE * GRID_SIZE }, (_, i) => i));
    setIsComplete(true);
    setTimeout(() => setShowMessage(true), 700);
  };

  const formatTime = (s: number) =>
    `${Math.floor(s / 60)}:${s % 60 < 10 ? "0" : ""}${s % 60}`;

  /* ---------------- RENDER ---------------- */
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-pink-100 to-purple-100 px-6">
      <div className="max-w-sm w-full text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">
          Memory Puzzle 💙
        </h2>
        <p className="text-gray-600 mb-4">
          Put the pieces together just like us 🧩
        </p>

        {!isComplete && (
          <div className="flex items-center justify-center gap-2 text-gray-700 mb-4">
            <Clock className="w-5 h-5 text-pink-400" />
            <span className="font-semibold">{formatTime(timeLeft)}</span>
          </div>
        )}

        {/* PUZZLE */}
        <div className="relative w-80 h-80 bg-white rounded-2xl shadow-xl mx-auto mb-6 overflow-hidden">
          {isComplete ? (
            <img
              src={imageURL}
              alt="Complete"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="grid grid-cols-3 grid-rows-3 gap-[2px] p-2 h-full">
              {tiles.map((tile, idx) => {
                const row = Math.floor(tile / GRID_SIZE);
                const col = tile % GRID_SIZE;

                return (
                  <div
                    key={idx}
                    onClick={() => moveTile(idx)}
                    className={`rounded-lg transition-all duration-200 ${
                      tile === EMPTY_TILE
                        ? "bg-transparent"
                        : "cursor-pointer hover:scale-[1.03]"
                    }`}
                    style={{
                      backgroundImage:
                        tile !== EMPTY_TILE ? `url(${imageURL})` : "none",
                      backgroundSize: "320px 320px",
                      backgroundPosition: `-${col * 106.6}px -${
                        row * 106.6
                      }px`,
                    }}
                  >
                    {tile !== 8 && !isComplete && (
                      <div className="bg-opacity-20 flex ml-1 mt-1 w-6 h-6 items-center justify-center">
                        <span className="text-white font-bold text-lg select-none drop-shadow-lg">
                          {tile + 1}
                        </span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* CONTROLS */}
        {!isComplete && !autoSolveOption && (
          <button
            onClick={shufflePuzzle}
            className="flex items-center gap-2 mx-auto mb-4 px-6 py-2 rounded-full
            bg-white text-gray-700 shadow hover:scale-105 transition"
          >
            <Shuffle className="w-4 h-4" /> Shuffle Again
          </button>
        )}

        {autoSolveOption && !isComplete && (
          <button
            onClick={autoSolve}
            className="flex items-center gap-2 mx-auto mb-4 px-6 py-2 rounded-full
            bg-pink-400 text-white shadow hover:scale-105 transition"
          >
            <Zap className="w-4 h-4" /> Too cute to solve 😌
          </button>
        )}

        {/* MESSAGE */}
        {showMessage && (
          <div className="bg-white/80 backdrop-blur-md rounded-2xl p-5 shadow-lg mb-4 animate-fade-in">
            <h3 className="font-bold text-gray-800 mb-2">
              You Did It 💌
            </h3>
            <p className="text-gray-700 text-sm leading-relaxed">
              Every piece fell into place… just like you did in my life.
              You don't just complete puzzles you complete me 💙
            </p>
          </div>
        )}

        {isComplete && showMessage && (
          <button
            onClick={onNext}
            className="mt-2 px-8 py-3 rounded-full bg-gradient-to-r from-pink-400 to-purple-400
            text-white font-semibold shadow hover:scale-105 transition"
          >
            Continue the Journey ✨
          </button>
        )}
      </div>
    </div>
  );
};

export default MemoryPuzzle;
