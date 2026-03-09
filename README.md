# Chatbot App

An AI-powered chatbot application using OpenAI's GPT-4o Mini model with a React frontend and Express.js backend.

## 🌐 Live Demo

**Public URL:** https://ec8d-2a02-4780-59-8a70-00-1.ngrok-free.app

---

## 📁 Project Structure

```
chatbot-app/
├── backend/          # Express.js REST API + OpenAI integration
│   ├── server.js     # Main server file
│   ├── dist/         # Built static files
│   └── package.json
└── frontend/         # React + Vite frontend
    ├── src/
    │   ├── App.jsx   # Chat interface component
    │   ├── main.jsx
    │   └── index.css
    ├── index.html
    ├── vite.config.js
    └── package.json
```

---

## 🚀 Setup Instructions

### Prerequisites

- Node.js v18+ (v20 recommended)
- npm or yarn
- **OpenAI API Key** (required for chat functionality)

### Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Set your OpenAI API key
export OPENAI_API_KEY='your-api-key-here'

# Start development server (with auto-reload)
npm run dev

# Start production server
npm start
```

The backend runs on **http://localhost:8005** by default.

### Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

The frontend runs on **http://localhost:5173** by default (Vite default).

### Build & Deploy Static Files

The backend serves static files from `./dist`. To build the frontend and copy to backend:

```bash
# Build frontend
cd frontend
npm run build

# Copy built files to backend/dist
cp -r dist/* ../backend/dist/
```

---

## 📡 API Endpoints

### Base URL
```
http://localhost:8005
```

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/chat` | Send a message and get AI response |
| `POST` | `/chat/clear` | Clear conversation history |
| `GET` | `/health` | Health check endpoint |
| `GET` | `/` | Serve static frontend |

### Request/Response Examples

#### Chat with AI
```bash
POST /chat
Content-Type: application/json

{
  "message": "Hello, how are you?",
  "sessionId": "user123"
}
```
```json
{
  "success": true,
  "message": "Hello! I'm doing well, thank you for asking. How can I help you today?",
  "usage": {
    "prompt_tokens": 25,
    "completion_tokens": 18,
    "total_tokens": 43
  }
}
```

#### Clear Conversation
```bash
POST /chat/clear
Content-Type: application/json

{
  "sessionId": "user123"
}
```
```json
{
  "success": true,
  "message": "Conversation cleared"
}
```

#### Health Check
```bash
GET /health
```
```json
{
  "status": "ok",
  "timestamp": "2024-01-15T12:00:00.000Z",
  "service": "chatbot-api",
  "model": "gpt-4o-mini"
}
```

### Request Parameters

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `message` | string | Yes | - | User's message to the AI |
| `sessionId` | string | No | `"default"` | Session identifier for conversation history |

---

## 🐳 Deployment

### Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `PORT` | `8005` | Server port |
| `OPENAI_API_KEY` | - | **Required** - Your OpenAI API key |

### Getting an OpenAI API Key

1. Visit [OpenAI Platform](https://platform.openai.com/)
2. Sign up or log in
3. Go to API Keys section
4. Create a new secret key
5. Store it securely and use it in your deployment

### Production Deployment Steps

1. **Build the frontend:**
   ```bash
   cd frontend
   npm run build
   ```

2. **Copy static files to backend:**
   ```bash
   cp -r dist/* ../backend/dist/
   ```

3. **Set environment variables:**
   ```bash
   export OPENAI_API_KEY='your-api-key-here'
   export PORT=8005
   ```

4. **Deploy the backend:**
   - Deploy to a cloud provider (Heroku, Railway, Render, etc.)
   - Make sure to set `OPENAI_API_KEY` in your environment variables

### Docker Deployment (Optional)

Create a `Dockerfile` in the backend folder:

```dockerfile
FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install --production

COPY . .

EXPOSE 8005

ENV PORT=8005

CMD ["node", "server.js"]
```

Then build and run:

```bash
cd backend
docker build -t chatbot-app .
docker run -d -p 8005:8005 -e OPENAI_API_KEY=your-key --name chatbot chatbot-app
```

### ngrok Tunnel (Development)

To expose your local server publicly during development:

```bash
# Install ngrok if not already installed
npm install -g ngrok

# Expose the backend
ngrok http 8005
```

The current public URL is: **https://ec8d-2a02-4780-59-8a70-00-1.ngrok-free.app**

---

## 🛠️ Tech Stack

### Backend
- **Runtime:** Node.js
- **Framework:** Express.js
- **AI Model:** OpenAI GPT-4o Mini
- **CORS:** Enabled for cross-origin requests
- **Static Files:** Served from `./dist`

### Frontend
- **Framework:** React 18
- **Build Tool:** Vite
- **Styling:** Tailwind CSS
- **State Management:** React Hooks (useState, useEffect)

---

## 📝 Features

- ✅ Real-time AI chat with GPT-4o Mini
- ✅ Conversation history per session
- ✅ Session-based conversations (multiple users)
- ✅ Clear conversation functionality
- ✅ Responsive chat UI
- ✅ Token usage tracking
- ✅ RESTful API design
- ✅ Health check endpoint for monitoring
- ✅ Static file serving from backend

---

## 🔧 Development

### Running Both Services

Open two terminal windows:

```bash
# Terminal 1 - Backend
cd backend
export OPENAI_API_KEY='your-api-key-here'
npm run dev

# Terminal 2 - Frontend
cd frontend
npm run dev
```

### Testing the API

```bash
# Test chat endpoint
curl -X POST http://localhost:8005/chat \
  -H "Content-Type: application/json" \
  -d '{"message":"Hello!","sessionId":"test"}'

# Test health
curl http://localhost:8005/health

# Clear conversation
curl -X POST http://localhost:8005/chat/clear \
  -H "Content-Type: application/json" \
  -d '{"sessionId":"test"}'
```

---

## 📦 GitHub Repository

**Repository:** https://github.com/Mlutfi12/chatbot-app

---

## ⚠️ Security Notes

- **Never commit your OpenAI API key** to version control
- Use environment variables for sensitive data
- Consider rate limiting for production deployments
- Monitor API usage to avoid unexpected costs

---

## 📄 License

MIT

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

---

**Built with ❤️ using React + Express + GPT-4o Mini**
