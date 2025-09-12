import { Sparkles } from 'lucide-react';

interface LoadingScreenProps {
  message?: string;
}

const LoadingScreen = ({ message = "Analyzing your image..." }: LoadingScreenProps) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="text-center animate-scale-in">
        <div className="w-20 h-20 mx-auto bg-gradient-primary rounded-full flex items-center justify-center mb-6 animate-pulse-glow">
          <Sparkles className="w-10 h-10 text-white animate-spin" />
        </div>
        
        <h2 className="text-xl font-semibold mb-2 text-white">
          Processing...
        </h2>
        
        <p className="text-white/80 mb-6">
          {message}
        </p>
        
        {/* Progress dots */}
        <div className="flex justify-center space-x-2">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-2 h-2 bg-white/60 rounded-full animate-pulse"
              style={{ animationDelay: `${i * 0.2}s` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;