// Import necessary packages
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Load environment variables from .env file
dotenv.config();

// Initialize Express app
const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(express.json()); // Parse JSON bodies
app.use(express.static('public')); // Serve static files from the 'public' directory

// Initialize Google Generative AI
// Make sure GEMINI_API_KEY is set in your .env file
if (!process.env.GEMINI_API_KEY) {
    console.error('GEMINI_API_KEY is not set. Please add it to your .env file.');
    process.exit(1);
}
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Define the API route for chat
app.post('/api/chat', async (req, res) => {
    try {
        const { messages } = req.body;

        // Validate input
        if (!messages || !Array.isArray(messages) || messages.length === 0) {
            return res.status(400).json({ error: 'Invalid message format.' });
        }

        // Get the generative model
        const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

        // Prepare history for Gemini: Map chatHistory to Gemini format (exclude the last message, as it's the new one)
        const history = messages.slice(0, -1).map(msg => ({
            role: msg.role === 'user' ? 'user' : 'model',  // 'bot' becomes 'model'
            parts: [{ text: msg.content }]
        }));

        // Start a chat session with history
        const chat = model.startChat({ history });

        // Get the latest user message to send
        const userMessage = messages[messages.length - 1].content;

        // Send the message and get response
        const result = await chat.sendMessage(userMessage);
        const response = await result.response;
        const text = response.text();

        // Send the generated text back to the client
        res.json({ result: text });

    } catch (error) {
        console.error('Error in /api/chat:', error);
        res.status(500).json({ error: 'Failed to generate response from Gemini AI.' });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});