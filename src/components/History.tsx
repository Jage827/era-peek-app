import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowLeft, Clock, Trash2 } from 'lucide-react';
import { HistoryProps } from '@/types/age-classification';

const History = ({ results, onBack, onSelectResult }: HistoryProps) => {
  const handleClearHistory = () => {
    if (confirm('Are you sure you want to clear all history?')) {
      localStorage.removeItem('age-classification-history');
      onBack();
    }
  };

  if (results.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-card flex items-center justify-center p-4">
        <div className="w-full max-w-md space-y-6 animate-fade-in">
          <div className="flex items-center space-x-4">
            <Button variant="outline" size="icon" onClick={onBack}>
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <h1 className="text-2xl font-bold">History</h1>
          </div>

          <Card className="p-8 shadow-card border-card-border text-center">
            <Clock className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium mb-2">No History Yet</h3>
            <p className="text-muted-foreground mb-4">
              Start classifying ages to see your history here
            </p>
            <Button onClick={onBack} variant="outline">
              Get Started
            </Button>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-card p-4">
      <div className="w-full max-w-md mx-auto space-y-6 animate-fade-in">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="outline" size="icon" onClick={onBack}>
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <h1 className="text-2xl font-bold">History</h1>
          </div>
          
          <Button
            variant="outline"
            size="sm"
            onClick={handleClearHistory}
            className="text-destructive hover:bg-destructive/10"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>

        {/* Results Grid */}
        <div className="space-y-4">
          {results.map((result) => (
            <Card
              key={result.id}
              className="p-4 shadow-card border-card-border cursor-pointer hover:shadow-primary transition-all duration-300 hover:scale-[1.02]"
              onClick={() => onSelectResult(result)}
            >
              <div className="flex items-center space-x-4">
                {/* Thumbnail */}
                <div className="w-16 h-16 rounded-lg overflow-hidden bg-muted">
                  <img
                    src={result.imageUrl}
                    alt={`Classification ${result.id}`}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-medium truncate">{result.ageGroup}</h3>
                    <span className="text-sm font-bold text-primary">
                      {result.confidence}%
                    </span>
                  </div>
                  
                  <p className="text-sm text-muted-foreground truncate mb-1">
                    {result.imageName}
                  </p>
                  
                  <p className="text-xs text-muted-foreground">
                    {result.timestamp.toLocaleDateString()} at{' '}
                    {result.timestamp.toLocaleTimeString([], { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Stats */}
        <Card className="p-4 shadow-card border-card-border bg-gradient-glow">
          <div className="text-center">
            <h3 className="font-medium mb-1">Total Classifications</h3>
            <p className="text-2xl font-bold text-primary">{results.length}</p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default History;