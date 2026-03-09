require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const OpenAI = require('openai');

const app = express();
const PORT = parseInt(process.env.PORT) || 8005;

// Initialize OpenAI client with API key from environment
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files from ./dist
app.use(express.static(path.join(__dirname, 'dist')));

// Conversation history (in-memory)
const conversations = new Map();

// POST /chat - Send message to GPT-4o Mini
app.post('/chat', async (req, res) => {
  const { message, sessionId = 'default' } = req.body;
  
  if (!message || typeof message !== 'string' || !message.trim()) {
    return res.status(400).json({
      success: false,
      error: 'Message is required'
    });
  }
  
  try {
    // Get or create conversation history
    if (!conversations.has(sessionId)) {
      conversations.set(sessionId, [
        { role: 'system', content: 'You are a helpful, friendly AI assistant.' }
      ]);
    }
    
    const conversation = conversations.get(sessionId);
    conversation.push({ role: 'user', content: message });
    
    // Call OpenAI API
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: conversation,
      max_tokens: 1000,
      temperature: 0.7
    });
    
    const assistantMessage = completion.choices[0].message.content;
    conversation.push({ role: 'assistant', content: assistantMessage });
    
    // Keep conversation manageable
    if (conversation.length > 22) {
      conversations.set(sessionId, [conversation[0], ...conversation.slice(-20)]);
    }
    
    res.json({
      success: true,
      message: assistantMessage,
      usage: completion.usage
    });
    
  } catch (error) {
    console.error('OpenAI API error:', error.message);
    res.status(500).json({
      success: false,
      error: 'Failed to get response from AI',
      details: error.message
    });
  }
});

// POST /chat/clear - Clear conversation
app.post('/chat/clear', (req, res) => {
  const { sessionId = 'default' } = req.body;
  conversations.delete(sessionId);
  res.json({ success: true, message: 'Conversation cleared' });
});

// GET /health - Health check
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    service: 'chatbot-api',
    model: 'gpt-4o-mini'
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🤖 Chatbot API running on http://localhost:${PORT}`);
  console.log(`📁 Static files: ${path.join(__dirname, 'dist')}`);
  console.log(`🧠 Model: gpt-4o-mini`);
});
