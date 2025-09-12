import { useEffect, useState } from 'react';

interface SplashScreenProps {
  onComplete: () => void;
}

const SplashScreen = ({ onComplete }: SplashScreenProps) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onComplete, 500);
    }, 2500);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-gradient-primary transition-opacity duration-500 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <div className="text-center animate-scale-in">
        <div className="relative mb-6">
          <div className="w-24 h-24 mx-auto bg-white/20 rounded-full flex items-center justify-center animate-pulse-glow">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
              <span className="text-2xl">🎯</span>
            </div>
          </div>
        </div>
        <h1 className="text-4xl font-bold text-white mb-2 animate-fade-in">
          AgeVision
        </h1>
        <p className="text-white/80 text-lg animate-fade-in" style={{ animationDelay: '0.3s' }}>
          AI-Powered Age Classification
        </p>
      </div>
    </div>
  );
};

export default SplashScreen;