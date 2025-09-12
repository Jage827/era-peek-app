import { AgeClassification } from '@/types/age-classification';

// Simulate age classification (in real app, this would call an API)
export const classifyAge = async (imageData: string, fileName: string): Promise<AgeClassification> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 2000 + Math.random() * 1000));

  // Generate mock age classification
  const ageGroups = [
    'Child (0-12)',
    'Teenager (13-19)',
    'Young Adult (20-35)',
    'Adult (36-55)',
    'Senior (56+)'
  ];

  const randomAgeGroup = ageGroups[Math.floor(Math.random() * ageGroups.length)];
  const confidence = Math.floor(65 + Math.random() * 30); // 65-95% confidence

  return {
    id: generateId(),
    ageGroup: randomAgeGroup,
    confidence,
    timestamp: new Date(),
    imageUrl: imageData,
    imageName: fileName,
  };
};

export const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

export const saveToHistory = (result: AgeClassification): void => {
  const history = getHistory();
  const updatedHistory = [result, ...history].slice(0, 50); // Keep last 50 results
  localStorage.setItem('age-classification-history', JSON.stringify(updatedHistory));
};

export const getHistory = (): AgeClassification[] => {
  try {
    const stored = localStorage.getItem('age-classification-history');
    if (!stored) return [];
    
    const parsed = JSON.parse(stored);
    return parsed.map((item: any) => ({
      ...item,
      timestamp: new Date(item.timestamp),
    }));
  } catch (error) {
    console.error('Error parsing history:', error);
    return [];
  }
};

export const clearHistory = (): void => {
  localStorage.removeItem('age-classification-history');
};