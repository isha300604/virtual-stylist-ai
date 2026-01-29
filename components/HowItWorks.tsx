
import React from 'react';

const HowItWorks: React.FC = () => {
  const steps = [
    {
      icon: 'fa-camera-retro',
      title: '1. Vision Input',
      desc: 'Snap a live photo or upload an image of a single clothing item. Our AI analyzes the garment\'s silhouette, fabric texture, and primary/secondary colors.'
    },
    {
      icon: 'fa-wand-magic-sparkles',
      title: '2. Generative Styling',
      desc: 'Gemini 3 Pro searches for complementary pieces across thousands of style categories to create three unique "Casual", "Business", and "Night Out" looks.'
    },
    {
      icon: 'fa-gem',
      title: '3. Accessory Logic',
      desc: 'We don\'t just pick clothes. Our model selects matching footwear, bags, jewelry, and eyewear that harmonize with your original item\'s vibe.'
    },
    {
      icon: 'fa-folder-heart',
      title: '4. Your Digital Closet',
      desc: 'Save your favorite generated outfits to your personal collection. Access them anytime to plan your day or shopping trips.'
    }
  ];

  return (
    <div className="max-w-5xl mx-auto py-12 px-6 animate-in fade-in duration-700">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-serif mb-6">Elevate Your Wardrobe</h2>
        <p className="text-gray-500 max-w-2xl mx-auto text-lg leading-relaxed">
          STYLIS.AI bridges the gap between your existing closet and professional fashion coordination using advanced Google Gemini vision models.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
        {steps.map((step, i) => (
          <div key={i} className="flex gap-6 items-start bg-white p-8 rounded-[2rem] border border-gray-50 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-16 h-16 rounded-2xl bg-black text-white flex-shrink-0 flex items-center justify-center text-2xl shadow-lg">
              <i className={`fas ${step.icon}`}></i>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-3">{step.title}</h3>
              <p className="text-gray-500 leading-relaxed text-sm">{step.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-20 p-12 bg-black text-white rounded-[3rem] relative overflow-hidden">
        <div className="relative z-10 max-w-2xl">
          <h3 className="text-3xl font-serif mb-6 italic text-white">Interactive Styling</h3>
          <p className="text-gray-400 leading-relaxed mb-8">
            Once an outfit is generated, you can use natural language to refine it. 
            Want to see it with "red heels" instead? Or "add a gold watch"? 
            Just type your request and the AI will re-render the vision instantly.
          </p>
          <div className="flex gap-4">
            <span className="bg-white/10 px-4 py-2 rounded-full text-xs font-mono">Refinement Prompts</span>
            <span className="bg-white/10 px-4 py-2 rounded-full text-xs font-mono">Real-time Visualization</span>
          </div>
        </div>
        <div className="absolute right-0 top-0 w-1/3 h-full opacity-20 pointer-events-none hidden md:block">
           <i className="fas fa-sparkles text-[200px] -rotate-12 translate-x-12 translate-y-12"></i>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
