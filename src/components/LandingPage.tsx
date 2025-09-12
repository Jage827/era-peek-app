import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Camera, Upload, History, Sparkles } from 'lucide-react';

interface LandingPageProps {
  onStartClassification: () => void;
  onViewHistory: () => void;
  hasHistory: boolean;
}

const LandingPage = ({ onStartClassification, onViewHistory, hasHistory }: LandingPageProps) => {
  return (
    <div className="min-h-screen bg-gradient-card flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6 animate-fade-in">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 mx-auto bg-gradient-primary rounded-full flex items-center justify-center mb-6 animate-float">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold mb-2 bg-gradient-primary bg-clip-text text-transparent">
            AgeVision
          </h1>
          <p className="text-muted-foreground">
            Discover age insights with AI precision
          </p>
        </div>

        {/* Main Action */}
        <Card className="p-6 shadow-card border-card-border">
          <div className="text-center space-y-4">
            <h2 className="text-xl font-semibold">Ready to get started?</h2>
            <p className="text-muted-foreground text-sm">
              Upload a photo or use your camera to classify age with AI
            </p>
            <Button
              onClick={onStartClassification}
              size="lg"
              className="w-full bg-gradient-primary hover:shadow-primary transition-all duration-300 hover:scale-105"
            >
              <Camera className="w-5 h-5 mr-2" />
              Start Age Classification
            </Button>
          </div>
        </Card>

        {/* Features */}
        <div className="grid grid-cols-2 gap-4">
          <Card className="p-4 shadow-card border-card-border hover:shadow-primary transition-all duration-300">
            <div className="text-center space-y-2">
              <Upload className="w-6 h-6 mx-auto text-primary" />
              <h3 className="font-medium text-sm">Upload Image</h3>
              <p className="text-xs text-muted-foreground">From your device</p>
            </div>
          </Card>
          <Card className="p-4 shadow-card border-card-border hover:shadow-primary transition-all duration-300">
            <div className="text-center space-y-2">
              <Camera className="w-6 h-6 mx-auto text-primary" />
              <h3 className="font-medium text-sm">Live Camera</h3>
              <p className="text-xs text-muted-foreground">Real-time capture</p>
            </div>
          </Card>
        </div>

        {/* History */}
        {hasHistory && (
          <Button
            variant="outline"
            onClick={onViewHistory}
            className="w-full border-primary/20 hover:bg-primary/5"
          >
            <History className="w-4 h-4 mr-2" />
            View History
          </Button>
        )}
      </div>
    </div>
  );
};

export default LandingPage;