
import React from 'react';
import { SavedOutfit } from '../types';

interface CollectionsProps {
  items: SavedOutfit[];
  onRemove: (id: string) => void;
}

const Collections: React.FC<CollectionsProps> = ({ items, onRemove }) => {
  if (items.length === 0) {
    return (
      <div className="max-w-4xl mx-auto py-24 px-6 text-center animate-in fade-in duration-700">
        <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6 text-gray-300">
          <i className="fas fa-heart text-3xl"></i>
        </div>
        <h2 className="text-3xl font-serif mb-4">Your closet is empty</h2>
        <p className="text-gray-500 mb-10 max-w-md mx-auto">
          Start styling your clothes and save your favorite generated looks here for future reference.
        </p>
        <button 
          onClick={() => window.location.reload()}
          className="bg-black text-white px-8 py-3 rounded-full font-bold hover:scale-105 transition-transform"
        >
          Stylist Home
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto py-12 px-6 animate-in fade-in duration-700">
      <div className="flex justify-between items-end mb-16">
        <div>
          <h2 className="text-5xl font-serif mb-3 tracking-tight">Personal Archive</h2>
          <p className="text-gray-500 text-lg">Every detail of your curated wardrobe styling.</p>
        </div>
        <div className="text-xs font-bold text-gray-400 uppercase tracking-widest bg-gray-100 px-4 py-2 rounded-full">
          {items.length} {items.length === 1 ? 'Curated Look' : 'Curated Looks'}
        </div>
      </div>

      <div className="space-y-24">
        {items.map((item) => (
          <div key={item.id} className="relative group bg-white rounded-[3rem] overflow-hidden shadow-2xl border border-gray-100 p-8 md:p-12 transition-all hover:shadow-black/5">
            {/* Remove Button */}
            <button 
              onClick={() => onRemove(item.id)}
              className="absolute top-8 right-8 w-12 h-12 bg-gray-50 text-gray-400 rounded-full flex items-center justify-center hover:bg-red-500 hover:text-white transition-all z-20 shadow-sm"
            >
              <i className="fas fa-trash-alt"></i>
            </button>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              {/* Image Section */}
              <div className="lg:col-span-5 relative space-y-6">
                <div className="aspect-square rounded-[2rem] overflow-hidden shadow-xl ring-1 ring-gray-200 bg-gray-50">
                  <img 
                    src={item.imageUrl} 
                    alt={item.itemName} 
                    className="w-full h-full object-cover" 
                  />
                </div>
                
                <div className="flex gap-4 items-center">
                  <div className="w-20 h-20 rounded-2xl overflow-hidden border-4 border-white shadow-lg shrink-0">
                    <img src={item.originalItemUrl} className="w-full h-full object-cover" alt="Source" />
                  </div>
                  <div className="flex-1">
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 mb-1">Source Item</p>
                    <h4 className="font-bold text-sm truncate">{item.itemName}</h4>
                  </div>
                </div>
              </div>

              {/* Details Section */}
              <div className="lg:col-span-7 space-y-8">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="px-4 py-1.5 bg-black text-white text-[10px] font-bold uppercase tracking-widest rounded-full">
                      {item.category}
                    </span>
                    <span className="text-xs text-gray-400 font-medium">
                      Saved on {new Date(item.timestamp).toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' })}
                    </span>
                  </div>
                  <h3 className="text-4xl font-serif mb-4 leading-tight">{item.itemName}</h3>
                  <p className="text-lg text-gray-500 italic leading-relaxed">
                    "{item.styleDescription}"
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div className="space-y-4">
                    <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-400">Styling Logic</h4>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-400 mb-3">Detected Colors</h4>
                      <div className="flex gap-2">
                        {item.colorPalette?.map((color, i) => (
                          <div 
                            key={i} 
                            className="w-8 h-8 rounded-full border border-gray-100 shadow-sm" 
                            style={{ backgroundColor: color }}
                            title={color}
                          />
                        ))}
                      </div>
                    </div>

                    <div className="pt-6 border-t border-gray-100">
                      <div className="flex items-center gap-3 text-gray-900 font-bold text-sm">
                        <i className="fas fa-check-circle text-green-500"></i>
                        <span>Ready to wear</span>
                      </div>
                      <p className="text-xs text-gray-400 mt-2">Accessories and pairings verified by AI stylist.</p>
                    </div>
                  </div>
                </div>
                
                <div className="pt-8 flex gap-4">
                  <a 
                    href={item.imageUrl} 
                    download={`Stylis-${item.itemName}-${item.category}.png`}
                    className="bg-black text-white px-8 py-4 rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-gray-800 transition-all shadow-lg"
                  >
                    <i className="fas fa-download"></i>
                    Export Visual
                  </a>
                  <button 
                    onClick={() => {
                      // Note: In a real app we'd trigger a "re-style" flow
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="px-8 py-4 rounded-2xl font-bold border border-gray-200 hover:bg-gray-50 transition-all"
                  >
                    New Fitting
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Collections;
