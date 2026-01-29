
export enum OutfitCategory {
  CASUAL = 'Casual',
  BUSINESS = 'Business',
  NIGHT_OUT = 'Night Out'
}

export interface OutfitPlan {
  category: OutfitCategory;
  description: string;
  recommendedItems: string[];
}

export interface AnalysisResult {
  itemName: string;
  styleDescription: string;
  colorPalette: string[];
  plans: OutfitPlan[];
}

export interface GeneratedOutfit {
  category: OutfitCategory;
  imageUrl: string;
  description: string;
  isLoading: boolean;
  editHistory: string[];
}

export interface SavedOutfit extends GeneratedOutfit {
  id: string;
  originalItemUrl: string;
  timestamp: number;
  // New detail fields from analysis
  itemName: string;
  styleDescription: string;
  colorPalette: string[];
}

export type ViewType = 'main' | 'closet' | 'style-guide' | 'how-it-works';

export interface StylistState {
  originalImage: string | null;
  analysis: AnalysisResult | null;
  outfits: GeneratedOutfit[];
  isAnalyzing: boolean;
  error: string | null;
}
