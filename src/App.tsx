import React, { useState, useEffect } from 'react';
import SplashScreen from './components/SplashScreen';
import LoveMeter from './components/LoveMeter';
import AdventureStory from './components/AdventureStory';
import MemoryPuzzle from './components/MemoryPuzzle';
import VoiceNote from './components/VoiceNote';
import ScratchCards from './components/ScratchCards';
import BucketList from './components/BucketList';
import SongDedication from './components/SongDedication';
import SpinWheel from './components/SpinWheel';
import TripCountdown from './components/TripCountdown';
import FinalMessage from './components/FinalMessage';
import CassettePlayer from './components/CassettePlayer';
import VideoSongs from './components/VideoSongs';
import Navigation from './components/Navigation';
import EasterEgg from './components/EasterEgg';



function App() {
  const [currentSection, setCurrentSection] = useState('splash');
  const [showEasterEgg, setShowEasterEgg] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Preload and setup
    const timer = setTimeout(() => setIsLoaded(true), 500);
    return () => clearTimeout(timer);
  }, []);



  const navigateToSection = (section: string) => {
    setCurrentSection(section);
  };


  const renderCurrentSection = () => {
    switch (currentSection) {
      case 'splash':
        return <SplashScreen onComplete={() => setCurrentSection('lovemeter')} />;
      case 'lovemeter':
        return <LoveMeter onNext={() => setCurrentSection('adventure')} />;
      case 'adventure':
        return <AdventureStory onNext={() => setCurrentSection('puzzle')} />;
      case 'puzzle':
        return <MemoryPuzzle onNext={() => setCurrentSection('voice')} />;
      case 'voice':
        return <VoiceNote onNext={() => setCurrentSection('scratch')} />;
      case 'scratch':
        return <ScratchCards onNext={() => setCurrentSection('bucketlist')} />;
      case 'bucketlist':
        return <BucketList onNext={() => setCurrentSection('songs')} />;
      case 'songs':
        return <SongDedication onNext={() => setCurrentSection('spin')} />;
      case 'spin':
        return <SpinWheel onNext={() => setCurrentSection('countdown')} />;
      case 'countdown':
        return <TripCountdown onNext={() => setCurrentSection('videosongs')} />;
      case 'videosongs':
        return <VideoSongs onNext={() => setCurrentSection('final')} />;
      case 'final':
        return <FinalMessage />;
      case 'cassette':
        return <CassettePlayer />;
      default:
        return <SplashScreen onComplete={() => setCurrentSection('lovemeter')} />;
    }
  };

  return (
    <div className={`min-h-screen transition-all duration-500 gradient-romantic animate-gradient-shift`}>
      {/* Background Pattern */}
      <div className="fixed inset-0 opacity-10 pointer-events-none overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-100 via-pink-100 to-purple-100 animate-gradient-shift"></div>
        {/* Floating particles */}
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className={`absolute rounded-full animate-float ${
              i % 3 === 0 ? 'bg-pink-300' : i % 3 === 1 ? 'bg-blue-300' : 'bg-purple-300'
            }`}
            style={{
              width: Math.random() * 8 + 4 + 'px',
              height: Math.random() * 8 + 4 + 'px',
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
              animationDelay: Math.random() * 5 + 's',
              animationDuration: (Math.random() * 3 + 4) + 's'
            }}
          />
        ))}
        
        {/* Sparkle effects */}
        {[...Array(15)].map((_, i) => (
          <div
            key={`sparkle-${i}`}
            className="absolute text-yellow-300 animate-sparkle"
            style={{
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
              animationDelay: Math.random() * 4 + 's',
              fontSize: Math.random() * 8 + 8 + 'px'
            }}
          >
            ✨
          </div>
        ))}
      </div>

      {/* Easter Egg */}
     {
      currentSection === 'countdown' && (
        <EasterEgg onClick={() => setShowEasterEgg(true)} />
      )
     }
      
      {/* Main Content */}
      <div className={`relative z-10 transition-all duration-1000 ${
        isLoaded ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-4'
      }`}>
        {renderCurrentSection()}
      </div>

      {/* Navigation */}
      {currentSection !== 'splash' && (
        <Navigation 
          currentSection={currentSection}
          onNavigate={navigateToSection}
          isDark={false}
        />
      )}

      {/* Easter Egg Modal */}
{showEasterEgg && (
  <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
    <div className="card-romantic rounded-3xl p-8 max-w-sm w-full text-center animate-bounce-in shadow-dreamy">

      {/* Voucher Icon */}
      <div className="text-6xl mb-5 animate-heart-beat">💝</div>

      <h3 className="text-2xl font-serif text-rose-600 mb-3">
        You unlocked something special
      </h3>

      <p className="text-gray-700 font-serif italic leading-relaxed mb-4">
        Because you noticed the little things…
        you’ve earned something just for you.
      </p>

      {/* Voucher Card */}
      <div className="bg-gradient-to-r from-pink-50 to-rose-50 rounded-2xl p-4 border border-rose-200 mb-5 shadow-sm">
        <p className="text-sm text-gray-600 uppercase tracking-widest mb-1">
          Love Voucher
        </p>
        <p className="text-lg font-semibold text-rose-600">
          One “No-Questions-Asked” Day
        </p>
        <p className="text-xs text-gray-500 mt-2">
          Redeemable anytime, anywhere 💗
        </p>
      </div>

      <p className="text-sm text-gray-500 mb-6 font-clean">
        Use this whenever you want —
        for a date, a trip, or a day that’s all about you.
      </p>

      <button
        onClick={() => setShowEasterEgg(false)}
        className="bg-gradient-to-r from-rose-400 to-pink-400
                   hover:from-rose-500 hover:to-pink-500
                   text-white px-8 py-3 rounded-full
                   font-serif text-lg
                   transition-all duration-500
                   hover:scale-[1.04]
                   shadow-[0_10px_30px_-10px_rgba(244,114,182,0.7)]
                   focus:outline-none"
      >
        I’ll save this 💖
      </button>

      {/* playful footer */}
      <p className="mt-4 text-xs text-gray-400 italic">
        Valid forever. No expiry. No escape 😉
      </p>

    </div>
  </div>
)}


    </div>
  );
}

export default App;