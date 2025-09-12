import { useCallback, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Upload, ArrowLeft, Image as ImageIcon, X } from 'lucide-react';
import { UploadProps } from '@/types/age-classification';

const ImageUpload = ({ onUpload, onBack }: UploadProps) => {
  const [dragActive, setDragActive] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string>('');

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const files = e.dataTransfer.files;
    if (files?.[0]) {
      handleFile(files[0]);
    }
  }, []);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      setSelectedImage(result);
      setFileName(file.name);
    };
    reader.readAsDataURL(file);
  };

  const handleConfirm = () => {
    if (selectedImage) {
      onUpload(selectedImage, fileName);
    }
  };

  const handleClear = () => {
    setSelectedImage(null);
    setFileName('');
  };

  return (
    <div className="min-h-screen bg-gradient-card flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6 animate-fade-in">
        {/* Header */}
        <div className="flex items-center space-x-4">
          <Button variant="outline" size="icon" onClick={onBack}>
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <h1 className="text-2xl font-bold">Upload Image</h1>
        </div>

        {/* Upload Area */}
        <Card className="p-6 shadow-card border-card-border">
          {!selectedImage ? (
            <div
              className={`border-2 border-dashed rounded-lg p-8 text-center transition-all duration-300 ${
                dragActive 
                  ? 'border-primary bg-primary/5 scale-105' 
                  : 'border-border hover:border-primary/50'
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <Upload className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-2">Drop your image here</h3>
              <p className="text-muted-foreground mb-4">or click to browse</p>
              
              <input
                type="file"
                accept="image/*"
                onChange={handleFileInput}
                className="hidden"
                id="file-input"
              />
              
              <Button asChild variant="outline">
                <label htmlFor="file-input" className="cursor-pointer">
                  <ImageIcon className="w-4 h-4 mr-2" />
                  Choose File
                </label>
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="relative">
                <img
                  src={selectedImage}
                  alt="Selected"
                  className="w-full h-64 object-cover rounded-lg"
                />
                <Button
                  variant="outline"
                  size="icon"
                  className="absolute top-2 right-2 bg-white/90"
                  onClick={handleClear}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
              
              <div className="text-center">
                <p className="text-sm text-muted-foreground mb-4">
                  {fileName}
                </p>
                <div className="flex space-x-3">
                  <Button variant="outline" onClick={handleClear} className="flex-1">
                    Choose Different
                  </Button>
                  <Button 
                    onClick={handleConfirm} 
                    className="flex-1 bg-gradient-primary hover:shadow-primary"
                  >
                    Classify Age
                  </Button>
                </div>
              </div>
            </div>
          )}
        </Card>

        <p className="text-xs text-muted-foreground text-center">
          Supported formats: JPG, PNG, GIF, WebP
        </p>
      </div>
    </div>
  );
};

export default ImageUpload;