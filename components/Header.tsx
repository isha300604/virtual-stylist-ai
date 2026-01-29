
import React from 'react';
import { ViewType } from '../types';

interface HeaderProps {
  currentView: ViewType;
  setView: (view: ViewType) => void;
  savedCount: number;
}

const Header: React.FC<HeaderProps> = ({ currentView, setView, savedCount }) => {
  return (
    <header className="sticky top-0 z-50 glass py-4 px-6 mb-8 border-b border-gray-200">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <button onClick={() => setView('main')} className="flex items-center gap-2 group">
          <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center text-white group-hover:scale-110 transition-transform">
            <i className="fas fa-wand-magic-sparkles"></i>
          </div>
          <div className="text-left">
            <h1 className="text-xl font-bold tracking-tight text-gray-900">STYLIS.AI</h1>
            <p className="text-[10px] text-gray-500 uppercase tracking-widest font-medium">Virtual Wardrobe Concierge</p>
          </div>
        </button>
        
        <nav className="hidden md:flex gap-8 text-sm font-medium text-gray-600">
          <button 
            onClick={() => setView('how-it-works')} 
            className={`${currentView === 'how-it-works' ? 'text-black font-bold' : 'hover:text-black'} transition-colors`}
          >
            How it works
          </button>
          <button 
            onClick={() => setView('style-guide')} 
            className={`${currentView === 'style-guide' ? 'text-black font-bold' : 'hover:text-black'} transition-colors`}
          >
            Style Guide
          </button>
        </nav>

        <button 
          onClick={() => setView('closet')}
          className={`relative px-5 py-2 rounded-full text-sm font-semibold transition-all flex items-center gap-2 border-2
            ${currentView === 'closet' 
              ? 'bg-black text-white border-black' 
              : 'bg-white text-black border-gray-100 hover:border-black hover:bg-gray-50'}
          `}
        >
          <i className="fas fa-heart text-xs"></i>
          My Closet
          {savedCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center border-2 border-white">
              {savedCount}
            </span>
          )}
        </button>
      </div>
    </header>
  );
};

export default Header;
