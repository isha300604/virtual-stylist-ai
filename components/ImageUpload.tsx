
import React, { useRef, useState } from 'react';

interface ImageUploadProps {
  onUpload: (base64: string) => void;
  isLoading: boolean;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onUpload, isLoading }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onUpload(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mb-12">
      <div className="bg-white rounded-[2.5rem] p-10 shadow-xl border border-gray-100 flex flex-col items-center text-center">
        <div className={`w-24 h-24 rounded-3xl flex items-center justify-center mb-8 bg-gray-50 text-black border border-gray-100 shadow-sm
          ${isLoading ? 'animate-pulse' : ''}
        `}>
          {isLoading ? (
            <i className="fas fa-spinner fa-spin text-3xl"></i>
          ) : (
            <i className="fas fa-camera text-4xl text-gray-800"></i>
          )}
        </div>
        
        <h2 className="text-3xl font-serif mb-3">Add to your closet</h2>
        <p className="text-gray-500 max-w-sm mb-10 leading-relaxed">
          Snap a photo of your item or upload one from your device to see how our AI would style it for you.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 w-full px-4">
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleFileChange} 
            accept="image/*" 
            className="hidden" 
          />
          <input 
            type="file" 
            ref={cameraInputRef} 
            onChange={handleFileChange} 
            accept="image/*" 
            capture="environment" 
            className="hidden" 
          />
          
          <button 
            disabled={isLoading}
            onClick={() => cameraInputRef.current?.click()}
            className="flex-1 bg-black text-white px-8 py-4 rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-gray-800 active:scale-95 transition-all disabled:opacity-50"
          >
            <i className="fas fa-camera"></i>
            Take Photo
          </button>
          
          <button 
            disabled={isLoading}
            onClick={() => fileInputRef.current?.click()}
            className="flex-1 bg-gray-100 text-black px-8 py-4 rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-gray-200 active:scale-95 transition-all disabled:opacity-50"
          >
            <i className="fas fa-upload"></i>
            Upload Image
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageUpload;
