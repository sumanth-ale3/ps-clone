import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Home, Menu, X } from 'lucide-react';

interface NavigationProps {
  currentSection: string;
  onNavigate: (section: string) => void;
  isDark: boolean;
}

const sections = [
  'splash',
  'lovemeter',
  'adventure',
  'puzzle',
  'voice',
  'scratch',
  'bucketlist',
  'songs',
  'spin',
  'countdown',
  'videosongs',
  'final',
  'cassette'
];

const Navigation: React.FC<NavigationProps> = ({ currentSection, onNavigate, isDark }) => {
  const [isOpen, setIsOpen] = useState(false);

  const currentIndex = sections.indexOf(currentSection);
  const canGoBack = currentIndex > 0;
  const canGoForward = currentIndex < sections.length - 1;

  const goBack = () => canGoBack && onNavigate(sections[currentIndex - 1]);
  const goForward = () => canGoForward && onNavigate(sections[currentIndex + 1]);
  const goHome = () => onNavigate('splash');

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-5 right-5 p-3 rounded-full shadow-lg z-50 transition-all ${
          isDark ? 'bg-gray-800 text-white hover:bg-gray-700' : 'bg-white text-gray-700 hover:bg-gray-100'
        }`}
      >
        {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* Navigation Bar */}
      {isOpen && (
        <div className="fixed bottom-16 left-1/2 -translate-x-1/2 z-30 w-full max-w-sm px-2">
          <div
            className={`flex items-center justify-between px-2 py-2 rounded-full shadow-md backdrop-blur-md transition-all duration-300 ${
              isDark ? 'bg-gray-800/90 border border-gray-600' : 'bg-white/40 border border-white/30'
            }`}
          >
            {/* Back */}
            <button
              onClick={goBack}
              disabled={!canGoBack}
              className={`p-2 rounded-full transition-all ${
                canGoBack
                  ? `${isDark ? 'text-white hover:bg-gray-700' : 'text-gray-700 hover:bg-white/60'}`
                  : 'text-gray-400 cursor-not-allowed'
              }`}
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Sections spread evenly */}
            <div className="flex flex-1 justify-center space-x-3">
              {sections.slice(1).map((section) => (
                <button
                  key={section}
                  onClick={() => onNavigate(section)}
                  className={`h-3 w-3 rounded-full transition-all duration-300 ${
                    section === currentSection
                      ? 'bg-gradient-to-r from-pink-400 to-blue-400 animate-pulse shadow-md scale-110'
                      : `${isDark ? 'bg-gray-500 hover:bg-gray-400' : 'bg-gray-300 hover:bg-pink-300'}`
                  }`}
                />
              ))}
            </div>

            {/* Home */}
            <button
              onClick={goHome}
              className={`p-2 rounded-full transition-all ${
                isDark ? 'text-white hover:bg-gray-700' : 'text-gray-700 hover:bg-white/60'
              }`}
            >
              <Home className="w-5 h-5" />
            </button>

            {/* Forward */}
            <button
              onClick={goForward}
              disabled={!canGoForward}
              className={`p-2 rounded-full transition-all ${
                canGoForward
                  ? `${isDark ? 'text-white hover:bg-gray-700' : 'text-gray-700 hover:bg-white/60'}`
                  : 'text-gray-400 cursor-not-allowed'
              }`}
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Navigation;
