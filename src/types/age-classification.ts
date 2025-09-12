export interface AgeClassification {
  id: string;
  ageGroup: string;
  confidence: number;
  timestamp: Date;
  imageUrl: string;
  imageName: string;
}

export interface CameraProps {
  onCapture: (imageData: string, fileName: string) => void;
  onBack: () => void;
}

export interface UploadProps {
  onUpload: (imageData: string, fileName: string) => void;
  onBack: () => void;
}

export interface ClassificationResultProps {
  result: AgeClassification;
  onNewClassification: () => void;
}

export interface HistoryProps {
  results: AgeClassification[];
  onBack: () => void;
  onSelectResult: (result: AgeClassification) => void;
}

export type AppView = 'splash' | 'landing' | 'upload' | 'camera' | 'result' | 'history';

export interface AppState {
  currentView: AppView;
  currentResult: AgeClassification | null;
  history: AgeClassification[];
  isLoading: boolean;
}