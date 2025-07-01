# ResearchAI - Ask.Verify.Trust 🔬🤖

> **The AI and Blockchain for Research** - Where every answer comes with proof and every source is preserved forever.


## 🌟 Project Overview

ResearchAI is a cutting-edge research assistant that combines artificial intelligence with blockchain technology to provide **verifiable, transparent, and trustworthy research answers**. Unlike traditional AI systems that operate as "black boxes," ResearchAI shows its work by citing peer-reviewed research papers stored permanently on IPFS with cryptographic verification.

### 🎯 The Problem We Solve

- **Truth Crisis in AI**: Millions rely on AI for critical decisions without being able to verify sources
- **Blind Trust vs. Total Rejection**: People either believe AI blindly or reject it entirely
- **Misinformation Spread**: False claims spread faster than corrections when sources can't be verified
- **Inaccessible Academic Knowledge**: Scientific research locked behind paywalls and academic barriers

### 💡 Our Solution

- **Direct Citations**: Every AI response includes clickable links to peer-reviewed research papers
- **Blockchain-Secured Authenticity**: All sources stored on IPFS with cryptographic verification
- **Quality-First Foundation**: Built on top-tier journals and rigorous peer review processes
- **Complete Transparency**: No more guessing - just verifiable answers to your most important questions

## 🌐 Filecoin & IPFS Integration

### 🔗 Decentralized Storage Architecture

ResearchAI leverages the power of **Filecoin** and **IPFS** to create an immutable, decentralized storage system for research papers. This ensures that every source cited by our AI remains permanently accessible and tamper-proof.

### 🛠️ Implementation with Lighthouse SDK

We've integrated **Lighthouse SDK** as our gateway to the Filecoin network, providing seamless IPFS storage capabilities:

#### **Key Features:**
- **Permanent Storage**: Research papers stored on IPFS are distributed across multiple nodes, ensuring availability even if individual nodes go offline
- **Content Addressing**: Each document gets a unique cryptographic hash (CID - Content Identifier) that serves as both its address and integrity proof
- **Tamper-Proof Verification**: Any modification to a stored document would result in a completely different hash, making tampering immediately detectable
- **Decentralized Access**: No single point of failure - papers remain accessible through the global IPFS network

#### **Storage Workflow:**
1. **PDF Upload**: Research papers are uploaded to IPFS via Lighthouse SDK
2. **Hash Generation**: Each paper receives a unique IPFS Content Identifier (CID)
3. **Metadata Storage**: Document metadata and embeddings stored in MongoDB with IPFS reference
4. **Citation Linking**: AI responses include direct IPFS links for source verification
5. **Permanent Access**: Papers remain accessible through IPFS gateways indefinitely

#### **Benefits for Users:**
- **Source Verification**: Click any citation to access the original research paper directly from IPFS
- **Global Accessibility**: Papers accessible from anywhere in the world through IPFS network
- **Future-Proof Storage**: Documents remain available even if our servers go offline
- **Cryptographic Trust**: IPFS hashes provide mathematical proof of document authenticity

#### **Lighthouse Integration Advantages:**
- **Enterprise-Grade Reliability**: Professional IPFS gateway service with high uptime
- **API Simplicity**: Easy-to-use SDK for seamless integration
- **Cost-Effective**: Efficient pricing model for storing large volumes of research papers
- **Developer-Friendly**: Comprehensive documentation and support for implementation

This decentralized approach ensures that ResearchAI's knowledge base is not just comprehensive, but also **permanently preserved** and **globally accessible** through the decentralized web.

## 🏗️ Project Architecture

This project consists of two main components:

### 📁 Project Structure

```
research-ai-project/                              
│
├── research_ai/                       # 🚀 Main Application (User-Facing)
│   ├── app.py                         # Flask application entry point
│   ├── config.py                      # Configuration management
│   ├── requirements.txt               # Python dependencies
│   ├── .env.example                   # Environment variables template
│   ├── models/
│   │   ├── __init__.py
│   │   └── database.py                # Database connections and setup
│   ├── routes/
│   │   ├── __init__.py
│   │   ├── auth.py                    # Authentication endpoints
│   │   ├── chat.py                    # Chat and conversation endpoints
│   │   └── main.py                    # Main application routes
│   ├── services/
│   │   ├── __init__.py
│   │   ├── ai_service.py              # AI response generation
│   │   └── embedding_service.py       # Text embedding generation
│   ├── static/
│   │   ├── css/                       # Stylesheets
│   │   │   ├── chat.css
│   │   │   ├── home.css
│   │   │   └── login-create.css
│   │   ├── js/                        # JavaScript files
│   │   │   ├── chat.js
│   │   │   ├── create.js
│   │   │   ├── home.js
│   │   │   └── login.js
│   │   └── Media/                     # Images and videos
│   └── templates/                     # HTML templates
│       ├── chat.html
│       ├── create.html
│       ├── home.html
│       └── login.html
│
└── ADMIN/                             # 🛠️ Administrative System (Owner-Only)
    ├── admin.py                       # Main PDF processing script
    ├── requirements.txt               # Admin-specific dependencies
    ├── .env.example                   # Admin environment variables template
    ├── PDFS/                          # Place PDF files here for processing
    └── Services/
        ├── adding_pdfs.py             # PDF file discovery
        ├── delete_all_mongo.py        # Database cleanup utility
        ├── get_embeddings.py          # Hugging Face embeddings
        ├── pdf_to_text.py             # Text extraction with OCR
        └── upload_to_ipfs.py          # Lighthouse IPFS upload
```

## 🚀 Quick Start Guide

### For Regular Users (Running the Application)

1. **Navigate to the main application**:
   ```bash
   cd research_ai
   ```

2. **Follow the setup instructions** in `research_ai/README.md`

3. **Access the application** at `http://localhost:5000`

### For Administrators (Processing Research Papers)

1. **Navigate to the admin system**:
   ```bash
   cd ADMIN
   ```

2. **Follow the setup instructions** in `ADMIN/README.md`

3. **Process PDFs** to populate the research database

## 🎯 How It Works

### For End Users
1. **Visit Homepage** → Learn about ResearchAI's capabilities
2. **Create Account** → Sign up or login to access the research assistant
3. **Ask Questions** → Submit research queries in natural language
4. **Get Verified Answers** → Receive AI responses with direct citations
5. **Verify Sources** → Click IPFS links to access original research papers
6. **Continue Research** → Maintain context across conversation sessions

### For Administrators
1. **Collect Papers** → Gather peer-reviewed research papers (PDF format)
2. **Process Documents** → Run admin scripts to extract text and generate embeddings
3. **Store on Blockchain** → Upload to IPFS for permanent, tamper-proof storage
4. **Database Integration** → Store metadata and embeddings in MongoDB
5. **Enable Discovery** → Papers become searchable through vector similarity

## 🛡️ Key Features

### 🔗 **Verifiable AI Responses**
- Every answer includes direct citations to peer-reviewed research
- Clickable links to full research papers with publication details
- Complete transparency in AI reasoning and source material

### 🛡️ **Blockchain-Secured Sources**
- Research papers stored on IPFS for permanent records
- Cryptographic hashes ensure document authenticity
- Tamper-proof storage - any change breaks verification

### 📚 **Quality Research Foundation**
- Curated database of peer-reviewed papers from top-tier journals
- Rigorous evaluation for credibility and relevance
- Prioritizes recent studies and high-impact research

### 💬 **Intelligent Chat Interface**
- Natural language conversation with context awareness
- Session management for organizing research topics
- Multi-turn conversations with maintained context

## 🔧 Technology Stack

### AI & Machine Learning
- **OpenRouter**: Access to Mistral 7B and other language models
- **Hugging Face**: Sentence transformers for semantic search
- **Vector Search**: MongoDB vector search for finding relevant papers

### Blockchain & Storage
- **IPFS**: Decentralized file storage via Lighthouse
- **Cryptographic Hashing**: Document integrity verification
- **Permanent Storage**: Tamper-proof research paper preservation

### Backend
- **Flask**: Python web framework
- **MongoDB**: NoSQL database with vector search capabilities
- **PyMongo**: MongoDB Python driver
- **bcrypt**: Password hashing and security

### Frontend
- **Vanilla JavaScript**: Interactive user interface
- **CSS3**: Modern styling and responsive design
- **HTML5**: Semantic markup and accessibility

## 📋 Prerequisites

### System Requirements
- Python 3.8 or higher
- MongoDB Atlas account
- OpenRouter API key
- Hugging Face API token
- Lighthouse API key (for IPFS storage)

### Additional Dependencies (Admin Only)
- Tesseract OCR (for text extraction from scanned PDFs)
- Poppler (for PDF to image conversion)

## 🛠️ Installation & Setup

### 1. Clone the Repository
```bash
git clone <repository-url>
cd research-ai-project
```

### 2. Set Up the Main Application
```bash
cd research_ai
pip install -r requirements.txt
cp .env.example .env
# Edit .env with your API keys and credentials
python app.py
```

### 3. Set Up Admin System (Optional - Administrators Only)
```bash
cd ../ADMIN
pip install -r requirements.txt
cp .env.example .env
# Edit .env with your API keys
# Place PDF files in PDFS/ folder
python admin.py
```

## 🔐 Environment Variables

### Main Application (`research_ai/.env`)
```env
FLASK_SECRET_KEY=your-secret-key-here
OPENROUTER_API_KEY=sk-or-v1-your-openrouter-api-key-here
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database
HF_API_KEY=hf_your-huggingface-token-here
```

### Admin System (`ADMIN/.env`)
```env
LIGHTHOUSE_API_KEY=your-lighthouse-api-key-here
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database
HF_API_KEY=hf_your-huggingface-token-here
```

## 🌐 API Endpoints

### Authentication & User Management
- `POST /create-account` - Create new user account
- `POST /login-account` - User authentication
- `GET /login-page` - Login interface
- `GET /create-page` - Registration interface

### Research & Chat
- `POST /chat` - Submit research queries and get AI responses
- `POST /newsession` - Create new conversation session
- `GET /onload-check` - Load recent session data
- `GET /load-sessions` - Retrieve all user sessions
- `POST /load-session-chats` - Load specific conversation history

### Navigation
- `GET /` - Project homepage and landing page
- `GET /home-page` - Main chat interface (authenticated users)

## 🤝 Contributing

We welcome contributions from the community! Here's how you can help:

### Development Process
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 🚨 Security & Privacy

### Data Protection
- **Password Security**: bcrypt hashing for all user passwords
- **Session Management**: Secure Flask session handling
- **Input Validation**: Protection against injection attacks
- **HTTPS Ready**: Secure communication protocols

### Blockchain Verification
- **Document Integrity**: IPFS hash verification ensures authenticity
- **Immutable Storage**: Research papers cannot be altered once stored
- **Decentralized Access**: No single point of failure for source documents

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Meet the Team

### Founders & Core Developers
- **Anshu Roy** - [LinkedIn](https://www.linkedin.com/in/anshuroy2006/) | [GitHub](https://github.com/AnshuRoy25)
- **Aayush Dubey** - [LinkedIn](https://www.linkedin.com/in/aayush-dubey-19087826b/) | [GitHub](https://github.com/Aayushdubey05)

## 🚀 Future Roadmap

- [ ] **Multi-language Support**: Research papers in multiple languages
- [ ] **Advanced Filters**: Filter by publication date, journal, research type
- [ ] **Collaboration Features**: Share research sessions with team members
- [ ] **API Access**: Public API for developers and researchers
- [ ] **Mobile App**: Native mobile applications for iOS and Android
- [ ] **Integration Partners**: Connect with academic institutions and publishers

## 🌟 Vision Statement

We envision a world where artificial intelligence serves as humanity's most trusted research assistant – not because we ask you to believe it, but because you can verify everything it tells you. By connecting artificial intelligence to the permanent, decentralized web through blockchain technology, we're creating something unprecedented: an AI that gets smarter with every verified source added, more reliable with every citation checked, and more valuable as humanity's collective knowledge grows.


*Built with ❤️ for researchers*