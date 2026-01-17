import { useState, useCallback } from 'react';
import { generateText } from '../services/geminiService';

const useGemini = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [response, setResponse] = useState('');

    const askGemini = useCallback(async (prompt) => {
        setLoading(true);
        setError(null);
        try {
            const result = await generateText(prompt);
            setResponse(result);
            return result;
        } catch (err) {
            setError(err.message || "Failed to get response from Gemini");
            return null;
        } finally {
            setLoading(false);
        }
    }, []);

    return { askGemini, response, loading, error };
};

export default useGemini;
