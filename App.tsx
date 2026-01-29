
import React, { useState, useEffect, useCallback } from 'react';
import Header from './components/Header';
import ImageUpload from './components/ImageUpload';
import AnalysisPanel from './components/AnalysisPanel';
import OutfitCard from './components/OutfitCard';
import HowItWorks from './components/HowItWorks';
import StyleGuide from './components/StyleGuide';
import Closet from './components/Closet';
import { StylistState, AnalysisResult, OutfitCategory, GeneratedOutfit, ViewType, SavedOutfit } from './types';
import { analyzeClothingItem, generateOutfitImage, editOutfitImage } from './geminiService';

const App: React.FC = () => {
  const [view, setView] = useState<ViewType>('main');
  const [savedOutfits, setSavedOutfits] = useState<SavedOutfit[]>([]);
  const [state, setState] = useState<StylistState>({
    originalImage: null,
    analysis: null,
    outfits: [],
    isAnalyzing: false,
    error: null,
  });

  // Load saved outfits from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('stylis_collection');
    if (saved) {
      try {
        setSavedOutfits(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to load saved closet", e);
      }
    }
  }, []);

  // Save outfits to localStorage with full detail
  const saveToCollection = (outfit: GeneratedOutfit) => {
    if (!state.originalImage || !state.analysis) return;
    
    const newSaved: SavedOutfit = {
      ...outfit,
      id: crypto.randomUUID(),
      originalItemUrl: state.originalImage,
      timestamp: Date.now(),
      itemName: state.analysis.itemName,
      styleDescription: state.analysis.styleDescription,
      colorPalette: state.analysis.colorPalette
    };
    
    const updated = [newSaved, ...savedOutfits];
    setSavedOutfits(updated);
    localStorage.setItem('stylis_collection', JSON.stringify(updated));
  };

  const removeSavedOutfit = (id: string) => {
    const updated = savedOutfits.filter(o => o.id !== id);
    setSavedOutfits(updated);
    localStorage.setItem('stylis_collection', JSON.stringify(updated));
  };

  const handleImageUpload = async (base64: string) => {
    setView('main');
    setState(prev => ({ 
      ...prev, 
      originalImage: base64, 
      isAnalyzing: true, 
      error: null, 
      outfits: [], 
      analysis: null 
    }));

    try {
      const analysis = await analyzeClothingItem(base64);
      setState(prev => ({ ...prev, analysis, isAnalyzing: false }));
      generateInitialOutfits(analysis, base64);
    } catch (err: any) {
      setState(prev => ({ 
        ...prev, 
        isAnalyzing: false, 
        error: "Style analysis failed. Check the image and try again." 
      }));
    }
  };

  const generateInitialOutfits = async (analysis: AnalysisResult, originalImage: string) => {
    const initialOutfits: GeneratedOutfit[] = analysis.plans.map(plan => ({
      category: plan.category as OutfitCategory,
      imageUrl: '',
      description: plan.description,
      isLoading: true,
      editHistory: []
    }));

    setState(prev => ({ ...prev, outfits: initialOutfits }));

    for (const plan of analysis.plans) {
      try {
        const imageUrl = await generateOutfitImage(
          analysis.itemName, 
          `${plan.category}: ${plan.description}. Ensure to include relevant accessories like hats, watches, or bags that complete this look.`, 
          originalImage
        );

        setState(prev => ({
          ...prev,
          outfits: prev.outfits.map(o => 
            o.category === plan.category ? { ...o, imageUrl, isLoading: false } : o
          )
        }));
      } catch (err) {
        setState(prev => ({
          ...prev,
          outfits: prev.outfits.map(o => 
            o.category === plan.category ? { ...o, isLoading: false } : o
          )
        }));
      }
    }
  };

  const handleEditOutfit = async (category: string, editPrompt: string) => {
    const currentOutfit = state.outfits.find(o => o.category === category);
    if (!currentOutfit) return;

    setState(prev => ({
      ...prev,
      outfits: prev.outfits.map(o => o.category === category ? { ...o, isLoading: true } : o)
    }));

    try {
      let newImageUrl: string;
      if (currentOutfit.imageUrl) {
        newImageUrl = await editOutfitImage(currentOutfit.imageUrl, `Apply this styling change: ${editPrompt}. Maintain the item and original flat-lay composition.`);
      } else {
        newImageUrl = await generateOutfitImage(
          state.analysis?.itemName || "clothing item",
          `${category} style refined with: ${editPrompt}`,
          state.originalImage!
        );
      }

      setState(prev => ({
        ...prev,
        outfits: prev.outfits.map(o => 
          o.category === category 
            ? { ...o, imageUrl: newImageUrl, isLoading: false, editHistory: [...o.editHistory, editPrompt] } 
            : o
        )
      }));
    } catch (err) {
      setState(prev => ({
        ...prev,
        outfits: prev.outfits.map(o => o.category === category ? { ...o, isLoading: false } : o),
        error: `Could not process your edit for ${category}.`
      }));
    }
  };

  const renderContent = () => {
    if (view === 'how-it-works') return <HowItWorks />;
    if (view === 'style-guide') return <StyleGuide />;
    if (view === 'closet') return (
      <Closet 
        items={savedOutfits} 
        onRemove={removeSavedOutfit} 
        onNavigateHome={() => setView('main')}
      />
    );

    return (
      <div className="max-w-7xl mx-auto px-6">
        {state.error && (
          <div className="max-w-2xl mx-auto mb-8 bg-black text-white px-6 py-4 rounded-2xl flex items-center justify-between shadow-xl animate-in fade-in slide-in-from-top-4">
            <div className="flex items-center gap-3">
              <i className="fas fa-exclamation-triangle text-yellow-400"></i>
              <span className="text-sm font-medium">{state.error}</span>
            </div>
            <button onClick={() => setState(p => ({ ...p, error: null }))}>
              <i className="fas fa-times"></i>
            </button>
          </div>
        )}

        {!state.originalImage ? (
          <div className="pt-20">
            <div className="text-center mb-20 space-y-4">
              <span className="text-xs font-bold uppercase tracking-[0.4em] text-gray-400">Virtual Personal Stylist</span>
              <h1 className="text-6xl md:text-8xl font-serif text-gray-900 tracking-tight">Style <span className="italic">Smarter.</span></h1>
              <p className="text-gray-500 text-lg md:text-xl max-w-xl mx-auto leading-relaxed">
                Unlock the full potential of your closet. Simply upload a photo and get AI-curated outfits for every occasion.
              </p>
            </div>
            <ImageUpload onUpload={handleImageUpload} isLoading={state.isAnalyzing} />
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-32 max-w-5xl mx-auto">
              <div className="text-center group">
                <div className="w-16 h-16 rounded-2xl bg-gray-50 flex items-center justify-center mx-auto mb-6 group-hover:bg-black group-hover:text-white transition-colors">
                  <i className="fas fa-camera-retro text-xl"></i>
                </div>
                <h3 className="font-bold text-lg mb-2">Snap & Scan</h3>
                <p className="text-sm text-gray-500 leading-relaxed">Capture any item from your closet in seconds.</p>
              </div>
              <div className="text-center group">
                <div className="w-16 h-16 rounded-2xl bg-gray-50 flex items-center justify-center mx-auto mb-6 group-hover:bg-black group-hover:text-white transition-colors">
                  <i className="fas fa-wand-magic-sparkles text-xl"></i>
                </div>
                <h3 className="font-bold text-lg mb-2">AI Matchmaking</h3>
                <p className="text-sm text-gray-500 leading-relaxed">We pair your item with the perfect partners.</p>
              </div>
              <div className="text-center group">
                <div className="w-16 h-16 rounded-2xl bg-gray-50 flex items-center justify-center mx-auto mb-6 group-hover:bg-black group-hover:text-white transition-colors">
                  <i className="fas fa-heart text-xl"></i>
                </div>
                <h3 className="font-bold text-lg mb-2">Save Favorites</h3>
                <p className="text-sm text-gray-500 leading-relaxed">Build your personal digital lookbook.</p>
              </div>
            </div>
          </div>
        ) : (
          <div>
            <div className="mb-12 flex justify-between items-center">
               <button 
                onClick={() => setState({ originalImage: null, analysis: null, outfits: [], isAnalyzing: false, error: null })}
                className="group flex items-center gap-2 text-sm font-semibold text-gray-400 hover:text-black transition-colors"
               >
                 <i className="fas fa-arrow-left group-hover:-translate-x-1 transition-transform"></i>
                 Start Over
               </button>
               <span className="text-xs font-bold uppercase tracking-widest text-gray-300">Styling Session Active</span>
            </div>

            {state.isAnalyzing && !state.analysis && (
               <div className="flex flex-col items-center justify-center py-20 space-y-6">
                 <div className="relative">
                   <div className="w-20 h-20 border-4 border-gray-100 border-t-black rounded-full animate-spin"></div>
                   <div className="absolute inset-0 flex items-center justify-center">
                     <i className="fas fa-wand-sparkles text-lg animate-pulse"></i>
                   </div>
                 </div>
                 <div className="text-center">
                   <h3 className="text-2xl font-serif">Curating your look...</h3>
                   <p className="text-gray-400 text-sm mt-1">Our AI is browsing millions of styles for the perfect match.</p>
                 </div>
               </div>
            )}

            {state.analysis && (
              <>
                <AnalysisPanel analysis={state.analysis} originalImage={state.originalImage} />
                <div className="mt-20">
                  <div className="flex items-center gap-4 mb-10">
                    <h2 className="text-3xl font-serif">Visual Fittings</h2>
                    <div className="h-px flex-grow bg-gray-100"></div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                    {state.outfits.map((outfit) => (
                      <OutfitCard 
                        key={outfit.category} 
                        outfit={outfit} 
                        onEdit={handleEditOutfit}
                        onSave={() => saveToCollection(outfit)}
                        isSaved={savedOutfits.some(s => s.imageUrl === outfit.imageUrl && !!outfit.imageUrl)}
                      />
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen pb-20 selection:bg-black selection:text-white">
      <Header currentView={view} setView={setView} savedCount={savedOutfits.length} />
      <main>
        {renderContent()}
      </main>
      <footer className="mt-24 border-t border-gray-100 pt-12 text-center text-gray-400 text-[10px] font-bold uppercase tracking-[0.2em]">
        <p>&copy; 2024 STYLIS.AI &bull; AI-Powered Wardrobe Management</p>
      </footer>
    </div>
  );
};

export default App;
