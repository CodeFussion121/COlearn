import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

let genAI;
let model;

export const initializeGemini = () => {
    if (!API_KEY) {
        console.warn("Gemini API Key is missing! Check your .env file.");
        return;
    }
    if (!genAI) {
        genAI = new GoogleGenerativeAI(API_KEY);
        model = genAI.getGenerativeModel({ model: "gemini-pro" });
    }
};

export const generateText = async (prompt) => {
    if (!model) initializeGemini();
    if (!model) throw new Error("Gemini AI not initialized");

    try {
        const result = await model.generateContent(prompt);
        const response = await result.response;
        return response.text();
    } catch (error) {
        console.error("Error generating content with Gemini:", error);
        throw error;
    }
};
