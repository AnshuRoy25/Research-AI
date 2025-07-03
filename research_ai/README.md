# ResearchAI - Main Application 🚀

> **User-Facing Web Application** - The primary interface for researchers to interact with our AI-powered research assistant with blockchain verification.

## 🌟 Overview

This is the main web application that users interact with to access ResearchAI's capabilities. Built with Flask and modern web technologies, it provides a clean, intuitive interface for submitting research queries and receiving verifiable AI responses with blockchain-secured citations through our **pay-to-verify system**.

### 🎯 What This Module Does

- **User Authentication**: Secure account creation and login system
- **Interactive Chat Interface**: Natural language research conversations
- **Session Management**: Organize and maintain research conversations
- **Real-time AI Responses**: Get instant answers with verifiable citations
- **Pay-to-Verify System**: Blockchain verification using Filecoin smart contracts
- **MetaMask Integration**: Web3 wallet connectivity for verification payments
- **Source Verification**: Direct access to IPFS-stored research papers

## 🌐 Web3 Integration Features

### 🔗 Pay-to-Verify System
- **Verification Cost**: 0.01 tFIL per response
- **Network**: Filecoin Calibration Testnet  
- **Payment Method**: MetaMask wallet integration
- **Smart Contract**: Automated verification and payment processing
- **Permanent Records**: All verifications recorded on blockchain

### 🛠️ Web3 Requirements
- MetaMask browser extension
- Filecoin Calibration testnet configuration
- testnet FIL (tFIL) for verification payments
- Modern web browser with Web3 support

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
│   ├── chat.py                        # Research & Chat endpoints with IPFS hashes
│   └── main.py                        # Navigation & Page routes
│
├── services/                          # Business Logic Services
│   ├── __init__.py                    # Package initialization
│   ├── ai_service.py                  # AI response generation with IPFS citations
│   └── embedding_service.py           # Text embedding generation
│
├── static/                            # Static Web Assets
│   ├── css/                           # Stylesheets
│   │   ├── chat.css                   # Main chat interface styles
│   │   ├── home.css                   # Homepage and landing page styles
│   │   └── login-create.css           # Authentication page styles
│   ├── js/                            # JavaScript Files
│   │   ├── chat.js                    # Chat functionality with Web3 integration
│   │   ├── web3-integration.js        # Web3 & smart contract logic
│   │   ├── create.js                  # Account creation form handling
│   │   ├── home.js                    # Homepage interactions and navigation
│   │   └── login.js                   # Login form handling and validation
│   └── Media/                         # Images, Videos & Assets
│
└── templates/                         # HTML Jinja2 Templates
    ├── chat.html                      # Main research chat interface with verification
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
- **MetaMask extension** installed in your browser
- **testnet FIL** from [Filecoin Calibration faucet](https://faucet.calibration.fildev.network/)

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

### 4. Web3 Configuration
1. **Install MetaMask**: Add the MetaMask extension to your browser
2. **Configure Filecoin Testnet**: The application will auto-configure the network
3. **Get testnet FIL**: Visit [Filecoin Calibration faucet](https://faucet.calibration.fildev.network/)
4. **Smart Contract**: Update contract address in `static/js/web3-integration.js` (admin only)

### 5. MongoDB Database Setup

#### 5.1 Create MongoDB Atlas Cluster
1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a free cluster
3. Create a database named `research_ai_database`
4. Get your connection string and add it to `.env`

#### 5.2 Set Up Vector Search Index
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

### 6. Run the Application
```bash
python app.py
```

The application will be available at `http://localhost:5000`

## 🎮 How to Use the Application

### For New Users

#### 1. Visit the Homepage
- Navigate to `http://localhost:5000`
- Learn about ResearchAI's capabilities and pay-to-verify system
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
- Each AI response includes a "Verify" button
- **Connect MetaMask** when prompted
- **Pay 0.01 tFIL** to verify the response
- **Access verified content** on IPFS with permanent blockchain record
- **No duplicate payments** - once verified, always accessible

### For Returning Users

#### Session Management
- Your conversations are automatically saved
- Access previous research sessions from the sidebar
- Continue conversations where you left off
- **Verification status** is maintained across sessions

#### Web3 Features
- **Automatic Network Switching**: App configures Filecoin testnet
- **Payment Status Tracking**: See which responses you've verified
- **Permanent Access**: Verified responses remain accessible
- **Blockchain Records**: All verifications permanently recorded

## 🔒 Security Features

### User Authentication
- **Password Hashing**: All passwords hashed with bcrypt
- **Session Security**: Flask sessions with secure secret keys
- **Input Validation**: Protection against injection attacks
- **HTTPS Ready**: Secure communication protocols

### Web3 Security
- **Smart Contract Security**: Transparent, auditable verification logic
- **Private Key Protection**: Never store or transmit private keys
- **Network Security**: Secure RPC connections to Filecoin network
- **Payment Security**: Secure MetaMask transaction handling

### Data Protection
- **User Privacy**: Conversations stored securely in MongoDB
- **Blockchain Immutability**: Verification records cannot be altered
- **IPFS Integrity**: Cryptographic hashes ensure content authenticity

## 🎨 Frontend Features

### Responsive Design
- **Mobile-First**: Works perfectly on phones and tablets
- **Desktop Optimized**: Full functionality on desktop browsers
- **Cross-Browser**: Compatible with all modern browsers
- **Web3 Integration**: Seamless MetaMask connectivity

### User Interface
- **Clean Design**: Intuitive and professional interface
- **Real-time Updates**: Instant AI responses and verification status
- **Interactive Elements**: Smooth animations and Web3 interactions
- **Verification UI**: Clear payment and verification workflow

### JavaScript Functionality
- **Dynamic Content**: Real-time chat interface
- **Web3 Integration**: MetaMask connectivity and smart contract interaction
- **Form Validation**: Client-side validation for better UX
- **Session Management**: Automatic session handling with verification status

## 💰 Verification System

### Pricing
- **Cost**: 0.01 tFIL per response verification
- **Network**: Filecoin Calibration Testnet
- **Payment**: MetaMask wallet integration
- **Duplicate Protection**: No additional charges for verified content

### Verification Process
1. **Generate Response**: AI provides answer with IPFS hash
2. **Payment Check**: System verifies if already paid
3. **MetaMask Payment**: User pays 0.01 tFIL if required
4. **Blockchain Recording**: Verification status recorded on chain
5. **Permanent Access**: Verified content accessible indefinitely

## 🔄 Integration with Admin System

This application works in conjunction with the `ADMIN/` system:

### Data Flow
1. **Admin System**: Processes PDF research papers and uploads to IPFS
2. **IPFS Storage**: Papers stored with cryptographic hashes
3. **Database Population**: Embeddings and metadata stored in MongoDB
4. **User Queries**: This application searches through processed papers
5. **AI Responses**: Generated with IPFS citations for verification
6. **Pay-to-Verify**: Users pay to access verified content on blockchain

### Requirements
- The admin system must be run first to populate the research database
- Both systems must connect to the same MongoDB database
- Vector search index must be properly configured
- Smart contracts must be deployed on Filecoin testnet

**Need to populate the research database?** Check out the [`ADMIN/README.md`](../ADMIN/README.md) for instructions on processing research papers.

**Questions or issues?** Create an issue in the main repository or contact the development team.

ResearchAI Application - Bringing verifiable AI research to everyone with blockchain security. 🔬✨