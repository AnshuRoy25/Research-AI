# ResearchAI - Main Application 🚀

> **User-Facing Web Application** - The primary interface for researchers to interact with our AI-powered research assistant.

## 🌟 Overview

This is the main web application that users interact with to access ResearchAI's capabilities. Built with Flask and modern web technologies, it provides a clean, intuitive interface for submitting research queries and receiving verifiable AI responses with blockchain-secured citations.

### 🎯 What This Module Does

- **User Authentication**: Secure account creation and login system
- **Interactive Chat Interface**: Natural language research conversations
- **Session Management**: Organize and maintain research conversations
- **Real-time AI Responses**: Get instant answers with verifiable citations
- **Source Verification**: Direct access to IPFS-stored research papers

## 🏗️ Application Architecture

### Backend Components
- **Flask Web Framework**: RESTful API endpoints and web server
- **MongoDB Integration**: User data and conversation storage
- **AI Service Integration**: OpenRouter API for language model access
- **Vector Search**: Semantic search through research paper embeddings
- **Authentication System**: Secure user management with bcrypt

### Frontend Components
- **Responsive Web Interface**: Works seamlessly across all devices
- **Interactive Chat UI**: Real-time conversation experience
- **Session Management**: Organize research topics and conversations
- **Citation Display**: Easy access to source verification

## 📁 Detailed Project Structure

```
research_ai/
├── app.py                             # Flask application entry point
├── config.py                          # Configuration management
├── requirements.txt                   # Python dependencies
├── .env.example                       # Environment variables template
├── .env                               # Your environment variables (create this)
│
├── models/                            # Database Models & Connections
│   ├── __init__.py                    # Package initialization
│   └── database.py                    # MongoDB connection and setup
│
├── routes/                            # Flask Route Handlers
│   ├── __init__.py                    # Package initialization
│   ├── auth.py                        # Authentication endpoints
│   │                                  # - POST /create-account
│   │                                  # - POST /login-account
│   ├── chat.py                        # Research & Chat endpoints
│   │                                  # - POST /chat (main research endpoint)
│   │                                  # - POST /newsession
│   │                                  # - GET /onload-check
│   │                                  # - GET /load-sessions
│   │                                  # - POST /load-session-chats
│   └── main.py                        # Navigation & Page routes
│                                      # - GET / (homepage)
│                                      # - GET /login-page
│                                      # - GET /create-page
│                                      # - GET /home-page
│
├── services/                          # Business Logic Services
│   ├── __init__.py                    # Package initialization
│   ├── ai_service.py                  # AI response generation
│   │                                  # - OpenRouter API integration
│   │                                  # - Response formatting with citations
│   └── embedding_service.py           # Text embedding generation
│                                      # - Hugging Face API integration
│                                      # - Vector similarity search
│
├── static/                            # Static Web Assets
│   ├── css/                           # Stylesheets
│   │   ├── chat.css                   # Main chat interface styles
│   │   ├── home.css                   # Homepage and landing page styles
│   │   └── login-create.css           # Authentication page styles
│   ├── js/                            # JavaScript Files
│   │   ├── chat.js                    # Chat functionality and real-time updates
│   │   ├── create.js                  # Account creation form handling
│   │   ├── home.js                    # Homepage interactions and navigation
│   │   └── login.js                   # Login form handling and validation
│   └── Media/                         # Images, Videos & Assets
│       ├── logo.png                   # ResearchAI logo
│       ├── background.jpg             # Homepage background
│       └── icons/                     # UI icons and graphics
│
└── templates/                         # HTML Jinja2 Templates
    ├── chat.html                      # Main research chat interface
    ├── create.html                    # Account creation page
    ├── home.html                      # Landing page and project overview
    └── login.html                     # User authentication page
```

## 🛠️ Setup Instructions

### Prerequisites
Before starting, ensure you have:
- Python 3.8 or higher installed
- MongoDB Atlas account (free tier works fine)
- OpenRouter API key ([Get one here](https://openrouter.ai/))
- Hugging Face API token ([Get one here](https://huggingface.co/settings/tokens))

### 1. Navigate to the Application Directory
```bash
cd research_ai
```

### 2. Install Python Dependencies
```bash
pip install -r requirements.txt
```

### 3. Environment Configuration
1. Copy the example environment file:
   ```bash
   cp .env.example .env
   ```

2. Edit `.env` and add your API keys and credentials:
   ```env
   # Flask Security
   FLASK_SECRET_KEY=your-secret-key-here-make-it-long-and-random
   
   # OpenRouter (AI/LLM)
   OPENROUTER_API_KEY=sk-or-v1-your-openrouter-api-key-here
   
   # MongoDB Atlas
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/research_ai_database?retryWrites=true&w=majority
   
   # Hugging Face
   HF_API_KEY=hf_your-huggingface-token-here
   
   # Optional: Port Configuration
   PORT=5000
   ```

### 4. MongoDB Database Setup

#### 4.1 Create MongoDB Atlas Cluster
1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a free cluster
3. Create a database named `research_ai_database`
4. Get your connection string and add it to `.env`

#### 4.2 Set Up Vector Search Index
**Important**: For the semantic search to work, you need to create a vector search index:

1. In MongoDB Atlas, go to your cluster
2. Click "Search" tab
3. Click "Create Search Index"
4. Choose "JSON Editor"
5. Use this configuration:
   ```json
   {
     "fields": [
       {
         "numDimensions": 384,
         "path": "embedding",
         "similarity": "cosine",
         "type": "vector"
       }
     ]
   }
   ```
6. Name the index: `vector_index`
7. Select collection: `pdfs`

### 5. Run the Application
```bash
python app.py
```

The application will be available at `http://localhost:5000`

## 🎮 How to Use the Application

### For New Users

#### 1. Visit the Homepage
- Navigate to `http://localhost:5000`
- Learn about ResearchAI's capabilities and features
- Understand how blockchain verification works

#### 2. Create an Account
- Click "Get Started" or "Sign Up"
- Fill in your details (username, email, password)
- Your password is securely hashed with bcrypt

#### 3. Login to Your Account
- Use your credentials to access the research interface
- Sessions are managed securely with Flask sessions

#### 4. Start Your Research
- Ask any research question in natural language
- Examples:
  - "What are the latest findings on climate change impacts?"
  - "How does machine learning improve medical diagnosis?"
  - "What are the benefits of renewable energy systems?"

#### 5. Verify Sources
- Each AI response includes direct citations
- Click IPFS links to access original research papers
- Verify document authenticity through blockchain hashes

### For Returning Users

#### Session Management
- Your conversations are automatically saved
- Access previous research sessions from the sidebar
- Continue conversations where you left off
- Create new sessions for different research topics

#### Advanced Features
- **Multi-turn Conversations**: Ask follow-up questions with maintained context
- **Source Verification**: Every citation links to the original research paper
- **Session Organization**: Keep different research topics organized

## 🔧 API Endpoints Reference

### Authentication Endpoints

#### Create Account
```http
POST /create-account
Content-Type: application/json

{
  "username": "researcher123",
  "email": "user@example.com",
  "password": "secure_password"
}
```

#### Login
```http
POST /login-account
Content-Type: application/json

{
  "username": "researcher123",
  "password": "secure_password"
}
```

### Research & Chat Endpoints

#### Submit Research Query
```http
POST /chat
Content-Type: application/json

{
  "message": "What are the latest findings on renewable energy?",
  "session_id": "optional_session_id"
}
```

#### Create New Session
```http
POST /newsession
Content-Type: application/json

{
  "session_name": "Renewable Energy Research"
}
```

#### Load User Sessions
```http
GET /load-sessions
```

#### Load Session Conversations
```http
POST /load-session-chats
Content-Type: application/json

{
  "session_id": "your_session_id"
}
```

### Page Navigation Endpoints

#### Homepage
```http
GET /
```

#### Login Page
```http
GET /login-page
```

#### Account Creation Page
```http
GET /create-page
```

#### Main Chat Interface (Authenticated)
```http
GET /home-page
```

## 🔒 Security Features

### User Authentication
- **Password Hashing**: All passwords hashed with bcrypt
- **Session Security**: Flask sessions with secure secret keys
- **Input Validation**: Protection against injection attacks
- **HTTPS Ready**: Secure communication protocols

### Data Protection
- **User Privacy**: Conversations stored securely in MongoDB
- **Session Management**: Automatic logout on browser close
- **API Security**: Protected endpoints require authentication

## 🎨 Frontend Features

### Responsive Design
- **Mobile-First**: Works perfectly on phones and tablets
- **Desktop Optimized**: Full functionality on desktop browsers
- **Cross-Browser**: Compatible with all modern browsers

### User Interface
- **Clean Design**: Intuitive and professional interface
- **Real-time Updates**: Instant AI responses and feedback
- **Interactive Elements**: Smooth animations and transitions
- **Dark/Light Mode**: Comfortable viewing in any environment

### JavaScript Functionality
- **Dynamic Content**: Real-time chat interface
- **Form Validation**: Client-side validation for better UX
- **Session Management**: Automatic session handling
- **Error Handling**: Graceful error messages and recovery


## 🔄 Integration with Admin System

This application works in conjunction with the `ADMIN/` system:

### Data Flow
1. **Admin System**: Processes PDF research papers
2. **IPFS Storage**: Papers uploaded to blockchain storage
3. **Database Population**: Embeddings and metadata stored in MongoDB
4. **User Queries**: This application searches through processed papers
5. **AI Responses**: Generated with citations to IPFS-stored papers

### Requirements
- The admin system must be run first to populate the research database
- Both systems must connect to the same MongoDB database
- Vector search index must be properly configured

## 📊 Performance Optimization

### Caching Strategies
- **Session Caching**: User sessions cached for quick access
- **Database Queries**: Optimized MongoDB queries with proper indexing
- **Static Assets**: CSS/JS files served with caching headers

### Scalability Considerations
- **Database Indexing**: Proper indexes on frequently queried fields
- **Connection Pooling**: Efficient MongoDB connection management
- **Async Processing**: Non-blocking AI API calls where possible

## 🤝 Contributing to the Application

### Development Setup
1. Fork the repository
2. Create a feature branch
3. Set up development environment
4. Make your changes
5. Test thoroughly
6. Submit a pull request


**Need to populate the research database?** Check out the [`ADMIN/README.md`](../ADMIN/README.md) for instructions on processing research papers.

**Questions or issues?** Create an issue in the main repository or contact the development team.

ResearchAI Application - Bringing verifiable AI research to everyone. 🔬✨