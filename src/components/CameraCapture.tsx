import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Camera, ArrowLeft, RotateCcw, X } from 'lucide-react';
import { CameraProps } from '@/types/age-classification';

const CameraCapture = ({ onCapture, onBack }: CameraProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    startCamera();
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'user' } 
      });
      setStream(mediaStream);
      
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (error) {
      console.error('Camera access error:', error);
      setError('Unable to access camera. Please check permissions.');
    }
  };

  const capturePhoto = () => {
    if (!videoRef.current || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const video = videoRef.current;
    
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.drawImage(video, 0, 0);
      const imageData = canvas.toDataURL('image/jpeg', 0.8);
      setCapturedImage(imageData);
    }
  };

  const handleConfirm = () => {
    if (capturedImage) {
      const fileName = `camera-capture-${Date.now()}.jpg`;
      onCapture(capturedImage, fileName);
    }
  };

  const handleRetake = () => {
    setCapturedImage(null);
  };

  const handleBack = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
    }
    onBack();
  };

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-card flex items-center justify-center p-4">
        <div className="w-full max-w-md space-y-6 animate-fade-in">
          <div className="flex items-center space-x-4">
            <Button variant="outline" size="icon" onClick={handleBack}>
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <h1 className="text-2xl font-bold">Camera</h1>
          </div>

          <Card className="p-6 shadow-card border-card-border text-center">
            <div className="text-destructive mb-4">
              <Camera className="w-12 h-12 mx-auto mb-2" />
              <h3 className="text-lg font-medium">Camera Error</h3>
            </div>
            <p className="text-muted-foreground mb-4">{error}</p>
            <Button variant="outline" onClick={startCamera}>
              Try Again
            </Button>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-card flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6 animate-fade-in">
        {/* Header */}
        <div className="flex items-center space-x-4">
          <Button variant="outline" size="icon" onClick={handleBack}>
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <h1 className="text-2xl font-bold">Camera</h1>
        </div>

        {/* Camera/Preview */}
        <Card className="p-4 shadow-card border-card-border overflow-hidden">
          <div className="relative aspect-[3/4] bg-black rounded-lg overflow-hidden">
            {!capturedImage ? (
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="relative w-full h-full">
                <img
                  src={capturedImage}
                  alt="Captured"
                  className="w-full h-full object-cover"
                />
                <Button
                  variant="outline"
                  size="icon"
                  className="absolute top-2 right-2 bg-white/90"
                  onClick={handleRetake}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            )}
          </div>
        </Card>

        {/* Controls */}
        <div className="flex justify-center space-x-4">
          {!capturedImage ? (
            <Button
              onClick={capturePhoto}
              size="lg"
              className="bg-gradient-primary hover:shadow-primary transition-all duration-300 hover:scale-105"
            >
              <Camera className="w-5 h-5 mr-2" />
              Capture Photo
            </Button>
          ) : (
            <div className="flex space-x-3 w-full">
              <Button variant="outline" onClick={handleRetake} className="flex-1">
                <RotateCcw className="w-4 h-4 mr-2" />
                Retake
              </Button>
              <Button 
                onClick={handleConfirm} 
                className="flex-1 bg-gradient-primary hover:shadow-primary"
              >
                Classify Age
              </Button>
            </div>
          )}
        </div>

        <canvas ref={canvasRef} className="hidden" />
      </div>
    </div>
  );
};

export default CameraCapture;