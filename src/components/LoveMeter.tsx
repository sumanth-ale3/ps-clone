import React, { useEffect, useRef, useState } from "react";
import { Heart, Zap } from "lucide-react";

interface LoveMeterProps {
  onNext: () => void;
}

const LoveMeter: React.FC<LoveMeterProps> = ({ onNext }) => {
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [cameraReady, setCameraReady] = useState(false);

  const videoRef = useRef<HTMLVideoElement | null>(null);

  // Start the camera when component mounts
  const [cameraDenied, setCameraDenied] = useState(false);

  useEffect(() => {
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "user" },
          audio: false,
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          await videoRef.current.play();
          setCameraReady(true);
        }
      } catch (err) {
        console.warn("Camera access denied or unavailable:", err);
        setCameraDenied(true); // mark that camera is unavailable
      }
    };

    startCamera();

    return () => {
      if (videoRef.current?.srcObject) {
        const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
        tracks.forEach((track) => track.stop());
        videoRef.current.srcObject = null;
      }
    };
  }, []);

  /* ---------------- SCAN LOGIC ---------------- */
  const startScan = () => {
    setIsScanning(true);
    setScanProgress(0);
    setShowResult(false);

    const interval = setInterval(() => {
      setScanProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsScanning(false);
            setShowResult(true);
          }, 600);
          return 100;
        }
        return prev + 2;
      });
    }, 45);
  };

  /* ---------------- UI ---------------- */
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center relative bg-gradient-to-br from-blue-100 via-pink-100 to-purple-100 overflow-hidden">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-2">
          Doraemon's Cuteness Scanner 💙
        </h1>
        <p className="text-gray-600 text-sm sm:text-base">
          Advanced cuteness detection system ✨
        </p>
      </div>

      {/* Scanner Device */}
      <div className="relative w-72 rounded-3xl p-4 bg-white/60 backdrop-blur-md shadow-xl">
        {/* Screen */}
        <div className="relative w-full h-44 bg-black rounded-2xl overflow-hidden">
          <video
            ref={videoRef}
            className="w-full h-full object-cover"
            playsInline
            muted
          />

          {/* Overlay */}
          {(isScanning || showResult) && (
            <div className="absolute inset-0 bg-black/40" />
          )}

          {/* Idle */}
          {!isScanning && !showResult && cameraReady && (
            <div className="absolute inset-0 flex items-center justify-center text-green-400 font-mono text-sm animate-pulse">
              READY TO SCAN ⚡
            </div>
          )}

          {/* Scanning */}
          {isScanning && (
            <div className="absolute inset-0 flex flex-col items-center justify-center text-green-300 font-mono z-10">
              <div className="mb-2 text-xs tracking-widest">SCANNING</div>
              <div className="text-3xl font-bold">{scanProgress}%</div>
              <div className="mt-3 text-[11px] text-center px-3 opacity-80">
                {scanProgress < 30 && "Detecting smile frequency…"}
                {scanProgress >= 30 &&
                  scanProgress < 60 &&
                  "Analyzing sparkle levels…"}
                {scanProgress >= 60 &&
                  scanProgress < 90 &&
                  "Measuring heart resonance…"}
                {scanProgress >= 90 && "Cuteness limit exceeded…"}
              </div>

              <div
                className="absolute left-0 w-full h-1 bg-gradient-to-r from-blue-400 to-pink-400"
                style={{ top: `${scanProgress}%` }}
              />
            </div>
          )}

          {/* Result */}
          {showResult && (
            <div className="absolute inset-0 flex flex-col items-center justify-center text-pink-400 z-10 animate-fade-in">
              <Heart className="w-14 h-14 mb-2 animate-heart-beat" />
              <div className="text-2xl font-bold">100%</div>
              <div className="text-xs mt-2 font-semibold">
                CUTENESS OVERLOAD 💕
              </div>
              <div className="text-[10px] mt-2 opacity-80 text-center px-3">
                ERROR: Too adorable for standard measurement
              </div>
            </div>
          )}
        </div>

        {/* Controls */}
        {/* {!cameraDenied && ( */}
        {(cameraReady && !isScanning && !showResult) && (
          <div className="mt-5 flex justify-center">
            <button
              onClick={startScan}
              disabled={!cameraReady || isScanning}
              className="flex items-center gap-2 px-7 py-3 rounded-full text-white font-semibold
              bg-gradient-to-r from-pink-500 to-red-500
              disabled:opacity-50 disabled:scale-100
              transition-transform hover:scale-105"
            >
              <Zap className="w-5 h-5" />
              {isScanning ? "Scanning…" : "Scan"}
            </button>
          </div>
        )}

        {/* )} */}
      </div>

      {/* Result Card */}
      {showResult && (
        <div className="mt-4 max-w-xs w-full bg-white/80 backdrop-blur-md rounded-2xl p-5 shadow-xl animate-fade-in">
          <h3 className="text-xl font-bold text-pink-500 mb-3">
            💖 Scan Results 💖 
          </h3>

          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Smile</span>
              <span className="font-bold text-pink-500">Perfect ✨</span>
            </div>
            <div className="flex justify-between">
              <span>Eye Sparkle</span>
              <span className="font-bold text-pink-500">Maximum 💫</span>
            </div>
            <div className="flex justify-between">
              <span>Overall</span>
              <span className="font-bold text-pink-500">Off the charts 💕</span>
            </div>
          </div>

          <p className="mt-4 text-sm text-pink-700 font-medium leading-relaxed">
            You're not just cute… you're the kind of beautiful that makes hearts
            feel safe 💙
          </p>
        </div>
      )}

      {/* Camera Denied */}
      {(cameraDenied && !cameraReady) && (
        <div className="mt-6 text-xs text-gray-600 max-w-xs text-center">
          No camera? Totally okay 💕 Doraemon already knows you’re adorable.
        </div>
      )}

      {(showResult || cameraDenied) && (
        <button
          onClick={onNext}
          className="my-4 px-8 py-3 rounded-full text-white font-semibold
          bg-gradient-to-r from-pink-400 to-blue-400
          hover:scale-105 transition-transform"
        >
          Continue the Journey ✨
        </button>
      )}
    </div>
  );
};

export default LoveMeter;
