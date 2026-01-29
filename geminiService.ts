
import { GoogleGenAI, Type, GenerateContentResponse } from "@google/genai";
import { AnalysisResult, OutfitCategory } from "./types";

const API_KEY = process.env.API_KEY || "";

const getAI = () => new GoogleGenAI({ apiKey: API_KEY });

/**
 * Extracts the first image found in a Gemini response.
 */
function extractImageFromResponse(response: GenerateContentResponse): string | null {
  if (!response.candidates?.[0]?.content?.parts) return null;
  
  for (const part of response.candidates[0].content.parts) {
    if (part.inlineData) {
      return `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
    }
  }
  return null;
}

/**
 * Analyzes the uploaded item with a focus on color theory and accessory potential.
 */
export async function analyzeClothingItem(base64Image: string): Promise<AnalysisResult> {
  const ai = getAI();
  const imageData = base64Image.split(",")[1];

  const prompt = `Analyze this clothing item in detail. 
  1. Identify its name, style (e.g., streetwear, formal, bohemian), and fabric feel.
  2. Detect a 5-color palette that works with it.
  3. Create three distinct outfit plans (Casual, Business, Night Out). 
  IMPORTANT: For each plan, explicitly list 3 essential accessories (e.g., specific shoes, jewelry, headwear, bags) that elevate the look. 
  Provide response in pure JSON format.`;

  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: {
      parts: [
        { inlineData: { mimeType: "image/jpeg", data: imageData } },
        { text: prompt }
      ]
    },
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          itemName: { type: Type.STRING },
          styleDescription: { type: Type.STRING },
          colorPalette: { type: Type.ARRAY, items: { type: Type.STRING } },
          plans: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                category: { type: Type.STRING, enum: ["Casual", "Business", "Night Out"] },
                description: { type: Type.STRING },
                recommendedItems: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Include specific pieces AND accessories." }
              },
              required: ["category", "description", "recommendedItems"]
            }
          }
        },
        required: ["itemName", "styleDescription", "colorPalette", "plans"]
      }
    }
  });

  return JSON.parse(response.text.trim()) as AnalysisResult;
}

/**
 * Generates a high-quality flat-lay including suggested accessories.
 */
export async function generateOutfitImage(
  itemDescription: string, 
  plan: string, 
  originalItemImageBase64: string
): Promise<string> {
  const ai = getAI();
  const imageData = originalItemImageBase64.split(",")[1];

  const prompt = `Create a professional 4K flat-lay fashion photograph for a ${plan}. 
  The outfit MUST feature this item prominently: ${itemDescription}. 
  ARRANGEMENT: Lay out all clothing pieces and specified ACCESSORIES (shoes, bags, watch, sunglasses) neatly on a clean off-white minimalist background. 
  LIGHTING: Soft studio lighting with realistic shadows. STYLE: Luxury fashion magazine catalog. 
  Focus on high-quality textures and realistic color coordination.`;

  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash-image',
    contents: {
      parts: [
        { inlineData: { mimeType: "image/jpeg", data: imageData } },
        { text: prompt }
      ]
    },
    config: {
      imageConfig: {
        aspectRatio: "1:1"
      }
    }
  });

  const imageUrl = extractImageFromResponse(response);
  if (!imageUrl) throw new Error("Failed to generate styled visualization.");
  return imageUrl;
}

/**
 * Refines the visualization based on accessory or color changes.
 */
export async function editOutfitImage(
  currentImageBase64: string,
  editPrompt: string
): Promise<string> {
  const ai = getAI();
  const imageData = currentImageBase64.split(",")[1];

  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash-image',
    contents: {
      parts: [
        { inlineData: { mimeType: "image/jpeg", data: imageData } },
        { text: `Modify this outfit visualization with the following refinement: ${editPrompt}. Maintain the same flat-lay composition, background, and lighting. Ensure the main item remains identical.` }
      ]
    },
    config: {
      imageConfig: {
        aspectRatio: "1:1"
      }
    }
  });

  const imageUrl = extractImageFromResponse(response);
  if (!imageUrl) throw new Error("Failed to refine the look.");
  return imageUrl;
}
