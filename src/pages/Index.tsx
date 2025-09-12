import { useState, useEffect } from 'react';
import SplashScreen from '@/components/SplashScreen';
import LandingPage from '@/components/LandingPage';
import ImageUpload from '@/components/ImageUpload';
import CameraCapture from '@/components/CameraCapture';
import ClassificationResult from '@/components/ClassificationResult';
import History from '@/components/History';
import LoadingScreen from '@/components/LoadingScreen';
import { AppState, AgeClassification } from '@/types/age-classification';
import { classifyAge, saveToHistory, getHistory } from '@/utils/age-classification';

const Index = () => {
  const [appState, setAppState] = useState<AppState>({
    currentView: 'splash',
    currentResult: null,
    history: [],
    isLoading: false,
  });

  useEffect(() => {
    // Load history on app start
    const history = getHistory();
    setAppState(prev => ({ ...prev, history }));
  }, []);

  const handleSplashComplete = () => {
    setAppState(prev => ({ ...prev, currentView: 'landing' }));
  };

  const handleStartClassification = () => {
    // Show options modal - for now, default to upload
    setAppState(prev => ({ ...prev, currentView: 'upload' }));
  };

  const handleShowCamera = () => {
    setAppState(prev => ({ ...prev, currentView: 'camera' }));
  };

  const handleShowUpload = () => {
    setAppState(prev => ({ ...prev, currentView: 'upload' }));
  };

  const handleViewHistory = () => {
    setAppState(prev => ({ ...prev, currentView: 'history' }));
  };

  const handleBackToLanding = () => {
    setAppState(prev => ({ 
      ...prev, 
      currentView: 'landing',
      currentResult: null 
    }));
  };

  const handleImageProcess = async (imageData: string, fileName: string) => {
    setAppState(prev => ({ ...prev, isLoading: true }));

    try {
      const result = await classifyAge(imageData, fileName);
      
      // Save to history
      saveToHistory(result);
      
      // Update state
      setAppState(prev => ({
        ...prev,
        currentResult: result,
        history: [result, ...prev.history],
        currentView: 'result',
        isLoading: false,
      }));
    } catch (error) {
      console.error('Classification error:', error);
      setAppState(prev => ({ ...prev, isLoading: false }));
      alert('Failed to classify image. Please try again.');
    }
  };

  const handleSelectHistoryResult = (result: AgeClassification) => {
    setAppState(prev => ({
      ...prev,
      currentResult: result,
      currentView: 'result',
    }));
  };

  const renderCurrentView = () => {
    switch (appState.currentView) {
      case 'splash':
        return <SplashScreen onComplete={handleSplashComplete} />;
      
      case 'landing':
        return (
          <LandingPage
            onStartClassification={handleStartClassification}
            onViewHistory={handleViewHistory}
            hasHistory={appState.history.length > 0}
          />
        );
      
      case 'upload':
        return (
          <ImageUpload
            onUpload={handleImageProcess}
            onBack={handleBackToLanding}
          />
        );
      
      case 'camera':
        return (
          <CameraCapture
            onCapture={handleImageProcess}
            onBack={handleBackToLanding}
          />
        );
      
      case 'result':
        return appState.currentResult ? (
          <ClassificationResult
            result={appState.currentResult}
            onNewClassification={handleBackToLanding}
          />
        ) : null;
      
      case 'history':
        return (
          <History
            results={appState.history}
            onBack={handleBackToLanding}
            onSelectResult={handleSelectHistoryResult}
          />
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="relative">
      {renderCurrentView()}
      
      {/* Loading Overlay */}
      {appState.isLoading && (
        <LoadingScreen message="Analyzing your image with AI..." />
      )}

      {/* Quick Action Buttons - Only show on landing */}
      {appState.currentView === 'landing' && (
        <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-4 z-10">
          <button
            onClick={handleShowUpload}
            className="w-14 h-14 bg-gradient-primary rounded-full shadow-primary flex items-center justify-center text-white hover:shadow-glow transition-all duration-300 hover:scale-110"
            title="Upload Image"
          >
            📁
          </button>
          <button
            onClick={handleShowCamera}
            className="w-14 h-14 bg-gradient-primary rounded-full shadow-primary flex items-center justify-center text-white hover:shadow-glow transition-all duration-300 hover:scale-110"
            title="Open Camera"
          >
            📸
          </button>
        </div>
      )}
    </div>
  );
};

export default Index;