
import React from 'react';

const StyleGuide: React.FC = () => {
  const colorMastery = [
    { 
      color: '#FFFFFF', 
      name: 'Neutral White', 
      logic: 'The Ultimate Canvas', 
      pairs: ['Navy Blue (Classic)', 'Emerald Green (Bold)', 'Terracotta (Warm)', 'Black (High Contrast)'],
      accs: 'Gold jewelry for warmth, Silver for modern minimalism.'
    },
    { 
      color: '#000000', 
      name: 'Classic Black', 
      logic: 'Sophistication & Depth', 
      pairs: ['Camel (Elegant)', 'Burgundy (Rich)', 'Grey (Monotone)', 'Electric Blue (Modern)'],
      accs: 'Pearl necklaces, leather boots, or statement colorful bags.'
    },
    { 
      color: '#000080', 
      name: 'Deep Navy', 
      logic: 'Versatile Professionalism', 
      pairs: ['Mustard Yellow', 'Crisp White', 'Coral', 'Tan Leather'],
      accs: 'Brown leather belts, silver watches, nautical stripes.'
    },
    { 
      color: '#228B22', 
      name: 'Forest Green', 
      logic: 'Organic & Grounded', 
      pairs: ['Cream', 'Plum', 'Soft Grey', 'Copper'],
      accs: 'Wooden beads, tortoiseshell frames, tan suede shoes.'
    },
    { 
      color: '#FF7F50', 
      name: 'Coral/Peach', 
      logic: 'Vibrant Warmth', 
      pairs: ['Teal', 'Beige', 'White', 'Olive'],
      accs: 'Straw hats, gold hoops, turquoise accents.'
    }
  ];

  const fitGuides = [
    {
      category: 'Oversized / Relaxed',
      vibe: 'Effortless Streetwear',
      accessories: ['Chunky Sneakers', 'Bucket Hats', 'Crossbody Bags', 'Thick Chain Jewelry']
    },
    {
      category: 'Tailored / Slim',
      vibe: 'Sharp Professional',
      accessories: ['Pointed Heels/Loafers', 'Skinny Belts', 'Minimalist Studs', 'Structured Tote']
    },
    {
      category: 'Structured / Boxy',
      vibe: 'High Fashion / Avant-Garde',
      accessories: ['Geometric Eyewear', 'Architectural Earrings', 'Sleek Clutches']
    }
  ];

  return (
    <div className="max-w-6xl mx-auto py-12 px-6 animate-in fade-in duration-700">
      <div className="text-center mb-20">
        <h2 className="text-4xl md:text-5xl font-serif mb-4">The Style Registry</h2>
        <p className="text-gray-500 text-lg">Detailed color theory and accessory pairing for the modern wardrobe.</p>
      </div>

      <div className="space-y-24">
        {/* Color Section */}
        <section>
          <div className="flex items-center gap-4 mb-12">
             <h3 className="text-2xl font-bold italic font-serif">I. Color Harmony Logic</h3>
             <div className="h-px flex-grow bg-gray-100"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {colorMastery.map((c, i) => (
              <div key={i} className="bg-white rounded-[2rem] border border-gray-100 p-8 shadow-sm hover:shadow-md transition-all">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 rounded-2xl shadow-inner border border-gray-100" style={{ backgroundColor: c.color }}></div>
                  <div>
                    <h4 className="font-bold text-lg">{c.name}</h4>
                    <p className="text-xs text-gray-400 uppercase tracking-widest">{c.logic}</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <span className="text-[10px] font-bold text-gray-400 uppercase block mb-1">Recommended Pairings</span>
                    <p className="text-sm font-medium">{c.pairs.join(' • ')}</p>
                  </div>
                  <div className="pt-4 border-t border-gray-50">
                    <span className="text-[10px] font-bold text-gray-400 uppercase block mb-1">Accessory Guide</span>
                    <p className="text-xs text-gray-500 italic leading-relaxed">{c.accs}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Accessory Section */}
        <section>
          <div className="flex items-center gap-4 mb-12">
             <div className="h-px flex-grow bg-gray-100"></div>
             <h3 className="text-2xl font-bold italic font-serif">II. Accessory-to-Fit Matrix</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {fitGuides.map((f, i) => (
              <div key={i} className="group relative overflow-hidden bg-gray-50 rounded-[2.5rem] p-10 text-center transition-all hover:bg-black hover:text-white">
                <div className="mb-6 inline-block p-4 rounded-full bg-white group-hover:bg-white/10">
                  <i className={`fas ${i === 0 ? 'fa-tshirt' : i === 1 ? 'fa-user-tie' : 'fa-gem'} text-2xl`}></i>
                </div>
                <h4 className="text-xl font-bold mb-2">{f.category}</h4>
                <p className="text-xs uppercase tracking-widest text-gray-400 mb-6 group-hover:text-gray-400">{f.vibe}</p>
                <div className="flex flex-wrap justify-center gap-2">
                  {f.accessories.map((acc, j) => (
                    <span key={j} className="text-[10px] px-3 py-1 rounded-full border border-gray-200 group-hover:border-white/20">
                      {acc}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      <div className="mt-24 p-12 text-center border-t border-gray-100">
         <p className="text-gray-400 italic text-sm">"Style is a way to say who you are without having to speak." — Rachel Zoe</p>
      </div>
    </div>
  );
};

export default StyleGuide;
