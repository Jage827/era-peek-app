import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowLeft, Download, Sparkles, Users } from 'lucide-react';
import { ClassificationResultProps } from '@/types/age-classification';

const ClassificationResult = ({ result, onNewClassification }: ClassificationResultProps) => {
  const getAgeGroupIcon = (ageGroup: string) => {
    if (ageGroup.includes('Child') || ageGroup.includes('Teen')) return '👶';
    if (ageGroup.includes('Young Adult')) return '👨';
    if (ageGroup.includes('Adult')) return '👩';
    if (ageGroup.includes('Senior')) return '👴';
    return '👤';
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 80) return 'text-success';
    if (confidence >= 60) return 'text-warning';
    return 'text-destructive';
  };

  const handleDownload = () => {
    // Simulate PDF download
    const link = document.createElement('a');
    link.download = `age-classification-${result.id}.pdf`;
    link.href = '#'; // In real app, this would be generated PDF blob
    link.click();
  };

  return (
    <div className="min-h-screen bg-gradient-card flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6 animate-fade-in">
        {/* Header */}
        <div className="flex items-center justify-between">
          <Button variant="outline" size="icon" onClick={onNewClassification}>
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <h1 className="text-2xl font-bold">Classification Result</h1>
          <div /> {/* Spacer */}
        </div>

        {/* Image */}
        <Card className="p-4 shadow-card border-card-border">
          <div className="aspect-square relative overflow-hidden rounded-lg mb-4">
            <img
              src={result.imageUrl}
              alt="Analyzed"
              className="w-full h-full object-cover"
            />
          </div>
        </Card>

        {/* Result */}
        <Card className="p-6 shadow-card border-card-border">
          <div className="text-center space-y-6">
            {/* Age Group */}
            <div className="space-y-3">
              <div className="w-16 h-16 mx-auto bg-gradient-primary rounded-full flex items-center justify-center">
                <span className="text-2xl">{getAgeGroupIcon(result.ageGroup)}</span>
              </div>
              <div>
                <h2 className="text-2xl font-bold mb-1">{result.ageGroup}</h2>
                <p className="text-muted-foreground">Predicted Age Group</p>
              </div>
            </div>

            {/* Confidence */}
            <div className="space-y-2">
              <div className="flex items-center justify-center space-x-2">
                <Sparkles className={`w-5 h-5 ${getConfidenceColor(result.confidence)}`} />
                <span className={`text-2xl font-bold ${getConfidenceColor(result.confidence)}`}>
                  {result.confidence}%
                </span>
              </div>
              <p className="text-muted-foreground text-sm">Confidence Score</p>
              
              {/* Confidence Bar */}
              <div className="w-full bg-muted rounded-full h-2">
                <div
                  className={`h-2 rounded-full transition-all duration-1000 ${
                    result.confidence >= 80 
                      ? 'bg-success' 
                      : result.confidence >= 60 
                      ? 'bg-warning' 
                      : 'bg-destructive'
                  }`}
                  style={{ width: `${result.confidence}%` }}
                />
              </div>
            </div>

            {/* Timestamp */}
            <div className="pt-4 border-t border-border">
              <p className="text-xs text-muted-foreground">
                Analyzed on {result.timestamp.toLocaleDateString()} at{' '}
                {result.timestamp.toLocaleTimeString()}
              </p>
            </div>
          </div>
        </Card>

        {/* Actions */}
        <div className="space-y-3">
          <Button
            onClick={onNewClassification}
            className="w-full bg-gradient-primary hover:shadow-primary transition-all duration-300 hover:scale-105"
            size="lg"
          >
            <Users className="w-4 h-4 mr-2" />
            Classify Another
          </Button>
          
          <Button
            variant="outline"
            onClick={handleDownload}
            className="w-full border-primary/20 hover:bg-primary/5"
          >
            <Download className="w-4 h-4 mr-2" />
            Download as PDF
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ClassificationResult;