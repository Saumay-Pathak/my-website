import { useState, useEffect } from 'react';
import { Scene } from './components/canvas/Scene';
import { Header } from './components/ui/Header';
import { NavIndicator } from './components/ui/NavIndicator';
import { LoadingScreen } from './components/ui/LoadingScreen';
import { useReducedMotion } from './hooks/useReducedMotion';
import { useWorldState } from './hooks/useWorldState';
import { useIsMobile } from './hooks/useIsMobile';
import './index.css';

function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const reducedMotion = useReducedMotion();
  const { setReducedMotion } = useWorldState();
  const isMobile = useIsMobile();

  useEffect(() => {
    setReducedMotion(reducedMotion);
  }, [reducedMotion, setReducedMotion]);

  return (
    <div className="w-full h-full bg-background">
      {/* Loading Screen */}
      {!isLoaded && <LoadingScreen onComplete={() => setIsLoaded(true)} />}

      {/* 3D Canvas */}
      {isLoaded && <Scene />}

      {/* UI Overlay */}
      {isLoaded && (
        <div className="ui-overlay">
          <Header />
          <NavIndicator />

          {/* Scroll Hint - mobile adjusted */}
          <div className={`fixed left-1/2 -translate-x-1/2 text-center animate-bounce ${isMobile ? 'bottom-4' : 'bottom-8'
            }`}>
            <div className={`text-gray-500 font-mono mb-1 ${isMobile ? 'text-[10px]' : 'text-xs'
              }`}>
              {isMobile ? 'Swipe to explore' : 'Scroll to explore'}
            </div>
            <svg
              className={`mx-auto text-gray-500 ${isMobile ? 'w-4 h-4' : 'w-5 h-5'}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </div>

          {/* Keyboard Hints - Desktop only */}
          <div className="fixed bottom-8 right-6 hidden md:flex items-center gap-4 text-xs text-gray-600 font-mono">
            <div className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 bg-white/5 rounded border border-white/10">W</kbd>
              <kbd className="px-1.5 py-0.5 bg-white/5 rounded border border-white/10">S</kbd>
            </div>
            <span>or scroll</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
