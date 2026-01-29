
import React, { useState } from 'react';
import { GeneratedOutfit } from '../types';

interface OutfitCardProps {
  outfit: GeneratedOutfit;
  onEdit: (category: string, prompt: string) => void;
  onSave?: () => void;
  isSaved?: boolean;
}

const OutfitCard: React.FC<OutfitCardProps> = ({ outfit, onEdit, onSave, isSaved }) => {
  const [editPrompt, setEditPrompt] = useState('');

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editPrompt.trim() && !outfit.isLoading) {
      onEdit(outfit.category, editPrompt);
      setEditPrompt('');
    }
  };

  return (
    <div className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-gray-100 flex flex-col h-full">
      <div className="relative aspect-square overflow-hidden bg-gray-50">
        {outfit.isLoading ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center loading-shimmer">
            <i className="fas fa-spinner fa-spin text-2xl text-black mb-4"></i>
            <p className="text-sm font-medium animate-pulse">Designing your {outfit.category} look...</p>
          </div>
        ) : (
          <>
            <img 
              src={outfit.imageUrl} 
              alt={outfit.category} 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
            />
            <div className="absolute top-4 left-4">
              <span className="px-3 py-1.5 bg-black/80 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-widest rounded-full">
                {outfit.category}
              </span>
            </div>
            
            <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <button 
                onClick={onSave}
                disabled={isSaved}
                className={`w-10 h-10 rounded-full flex items-center justify-center shadow-lg transition-transform hover:scale-110
                  ${isSaved ? 'bg-red-500 text-white' : 'bg-white text-gray-800'}
                `}
              >
                <i className={`${isSaved ? 'fas' : 'far'} fa-heart text-sm`}></i>
              </button>
              <a 
                href={outfit.imageUrl} 
                download={`StylistAI-${outfit.category}.png`}
                className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-gray-800 shadow-lg hover:scale-110 transition-transform"
              >
                <i className="fas fa-download"></i>
              </a>
            </div>
          </>
        )}
      </div>

      <div className="p-8 flex flex-col flex-grow">
        <h3 className="text-xl font-bold mb-3">{outfit.category} Concept</h3>
        
        <div className="mb-4 flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-gray-400">
          <i className="fas fa-gem"></i>
          <span>Includes Suggested Accessories</span>
        </div>

        <p className="text-sm text-gray-600 mb-6 flex-grow leading-relaxed">
          {outfit.description}
        </p>

        <div className="space-y-4">
          <form onSubmit={handleEditSubmit} className="relative">
            <input
              type="text"
              placeholder="Swap accessories or change shoes..."
              value={editPrompt}
              onChange={(e) => setEditPrompt(e.target.value)}
              disabled={outfit.isLoading}
              className="w-full bg-gray-50 border border-gray-200 rounded-2xl py-3 px-4 pr-12 text-sm focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-black transition-all disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={!editPrompt.trim() || outfit.isLoading}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-xl flex items-center justify-center bg-black text-white disabled:bg-gray-200 disabled:text-gray-400 transition-colors"
            >
              <i className="fas fa-magic text-xs"></i>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default OutfitCard;
