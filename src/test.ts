import { GoogleGenAI } from "@google/genai";
import * as fs from 'fs';
import * as path from 'path';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

async function analyzeImages() {
  const imagesDir = path.join(process.cwd(), 'public', 'images');
  const files = fs.readdirSync(imagesDir).filter(f => f.endsWith('.jpg'));
  
  for (const file of files) {
    const filePath = path.join(imagesDir, file);
    const data = fs.readFileSync(filePath).toString("base64");
    
    try {
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: {
          parts: [
            {
              inlineData: {
                data: data,
                mimeType: "image/jpeg",
              },
            },
            {
              text: "Describe this image in one short sentence. Is it a kitchen (kuhinja), bedroom (spavaca soba), living room (dnevna soba), or office furniture (kancelarijski namjestaj)?",
            },
          ],
        },
      });
      console.log(`${file}: ${response.text}`);
    } catch (e) {
      console.error(`Error analyzing ${file}:`, e);
    }
  }
}

analyzeImages();
