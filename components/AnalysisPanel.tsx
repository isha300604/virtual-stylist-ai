
import React from 'react';
import { AnalysisResult } from '../types';

interface AnalysisPanelProps {
  analysis: AnalysisResult;
  originalImage: string;
}

const AnalysisPanel: React.FC<AnalysisPanelProps> = ({ analysis, originalImage }) => {
  return (
    <div className="max-w-7xl mx-auto px-6 mb-16 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row gap-12 items-start">
        <div className="w-full md:w-1/3">
          <div className="rounded-2xl overflow-hidden shadow-2xl ring-1 ring-gray-200">
            <img src={originalImage} alt="Original Item" className="w-full h-auto object-cover" />
          </div>
        </div>
        
        <div className="w-full md:w-2/3">
          <h2 className="text-4xl font-serif mb-4 leading-tight">{analysis.itemName}</h2>
          <p className="text-lg text-gray-600 mb-8 leading-relaxed italic">
            "{analysis.styleDescription}"
          </p>
          
          <div className="mb-10">
            <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">Detected Color Palette</h3>
            <div className="flex gap-4">
              {analysis.colorPalette.map((color, i) => (
                <div key={i} className="group relative">
                  <div 
                    className="w-12 h-12 rounded-full border border-gray-100 shadow-sm transition-transform hover:scale-110" 
                    style={{ backgroundColor: color }}
                  />
                  <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] font-medium opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    {color}
                  </span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {analysis.plans.map((plan, i) => (
              <div key={i} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center mb-4 text-xs font-bold">
                  {i + 1}
                </div>
                <h4 className="font-bold mb-2">{plan.category}</h4>
                <p className="text-sm text-gray-500 mb-4 line-clamp-3">{plan.description}</p>
                <div className="flex flex-wrap gap-1">
                  {plan.recommendedItems.slice(0, 2).map((item, j) => (
                    <span key={j} className="text-[10px] bg-gray-100 text-gray-600 px-2 py-1 rounded-md">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalysisPanel;
