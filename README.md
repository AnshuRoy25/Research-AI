# ResearchAI - Ask.Verify.Trust 🔬🤖

> **The AI and Blockchain for Research** - Where every answer comes with cryptographic proof and every verification is secured by smart contracts.
>
> Website Link - https://research-ai-test.onrender.com/

## 🌟 Project Overview

ResearchAI is a cutting-edge research assistant that combines artificial intelligence with blockchain technology to provide **verifiable, transparent, and trustworthy research answers**. Unlike traditional AI systems that operate as "black boxes," ResearchAI shows its work by citing peer-reviewed research papers stored permanently on IPFS with cryptographic verification **secured by smart contracts on the Filecoin network**.

### 🎯 The Problem We Solve

- **Truth Crisis in AI**: Millions rely on AI for critical decisions without being able to verify sources
- **Blind Trust vs. Total Rejection**: People either believe AI blindly or reject it entirely
- **Misinformation Spread**: False claims spread faster than corrections when sources can't be verified
- **Inaccessible Academic Knowledge**: Scientific research locked behind paywalls and academic barriers
- **Unverifiable AI Responses**: No way to cryptographically prove AI response authenticity and immutability

### 💡 Our Solution

- **Direct Citations**: Every AI response includes clickable links to peer-reviewed research papers
- **Blockchain-Secured Authenticity**: All sources stored on IPFS with cryptographic verification
- **Smart Contract Verification**: Pay-to-verify system ensures only serious users access verified content
- **Immutable Proof**: Once verified, responses are permanently stored with tamper-proof evidence
- **Quality-First Foundation**: Built on top-tier journals and rigorous peer review processes
- **Complete Transparency**: No more guessing - just verifiable answers with cryptographic proof

## 🌐 Filecoin & Web3 Integration

### 🔗 Revolutionary Pay-to-Verify System

ResearchAI introduces a groundbreaking **pay-to-verify system** powered by **Filecoin smart contracts**. Users can cryptographically verify AI responses by paying 0.01 testnet FIL (tFIL), ensuring that each verification is permanently recorded on the blockchain with immutable proof of authenticity.

### 🛠️ Smart Contract Architecture

Our verification system is built on **Filecoin's Calibration testnet** using custom smart contracts:

#### **Key Features:**
- **Payment Verification**: Users pay 0.01 tFIL to verify AI responses
- **Permanent Records**: All verifications are recorded on the Filecoin blockchain
- **Duplicate Protection**: Users who have already paid can access verified content without additional fees
- **Transparent Pricing**: Fixed, transparent pricing with no hidden costs
- **Immutable Proof**: Once verified, responses cannot be altered or tampered with

#### **Core Functions:**
- `payForVerification(ipfsHash)`: Pay for verification access
- `hasUserPaidForVerification(user, ipfsHash)`: Check payment status
- `withdrawFunds()`: Owner withdraws collected payments
- `updatePrice(newPrice)`: Owner updates verification cost

### 🔐 Verification Workflow

1. **AI Response Generation**: User asks a question and receives an AI response
2. **IPFS Hash Creation**: Response is stored on IPFS with unique content identifier
3. **Verification Check**: System checks if user has already paid for this specific response
4. **Payment Processing**: If not paid, user pays 0.01 tFIL through MetaMask
5. **Blockchain Confirmation**: Smart contract records payment and verification
6. **Verified Access**: User can now access the cryptographically verified response on IPFS
7. **Permanent Record**: Verification status is permanently stored on Filecoin blockchain

### 🛡️ Security & Trust Features

- **Content Addressing**: Each response gets a unique IPFS hash that serves as both address and integrity proof
- **Tamper Detection**: Any modification to a verified response would result in a completely different hash
- **Blockchain Immutability**: Payment records and verification status cannot be altered
- **Decentralized Validation**: No single point of failure or control
- **Smart Contract Security**: Transparent, auditable logic with automated execution

## 🏗️ Project Architecture

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
│   │   ├── js/                        # JavaScript files (with Web3 integration)
│   │   └── Media/                     # Images and videos
│   └── templates/                     # HTML templates
│
├── ADMIN/                             # 🛠️ Administrative System (Owner-Only)
│   ├── admin.py                       # Main PDF processing script
│   ├── requirements.txt               # Admin-specific dependencies
│   ├── .env.example                   # Admin environment variables template
│   ├── PDFS/                          # Place PDF files here for processing
│   └── Services/
│       ├── adding_pdfs.py             # PDF file discovery
│       ├── delete_all_mongo.py        # Database cleanup utility
│       ├── get_embeddings.py          # Hugging Face embeddings
│       ├── pdf_to_text.py             # Text extraction with OCR
│       └── upload_to_ipfs.py          # Lighthouse IPFS upload
│  
└── contracts/                         # 🔐 Smart Contracts (Blockchain)
    ├── IPFSPayment.sol                # Pay-to-verify smart contract
    ├── README.md                      # Contract documentation
    └── deployment/                    # Contract deployment configs
        └──contract-config.json        # Deployed contract addresses and abi format
        
```

## 🚀 Quick Start Guide

### For Regular Users (Running the Application)

1. **Install MetaMask** and get testnet FIL from [Filecoin Calibration faucet](https://faucet.calibration.fildev.network/)
2. **Navigate to the main application**:
   ```bash
   cd research_ai
   pip install -r requirements.txt
   cp .env.example .env
   # Edit .env with your API keys and credentials
   python app.py
   ```
3. **Access the application** at `http://localhost:5000`
4. **Connect MetaMask** when prompted for verification features

### For Administrators (Processing Research Papers)

1. **Navigate to the admin system**:
   ```bash
   cd ADMIN
   pip install -r requirements.txt
   cp .env.example .env
   # Edit .env with your API keys
   # Place PDF files in PDFS/ folder
   python admin.py
   ```

## 🎯 How It Works

### For End Users
1. **Visit Homepage** → Learn about ResearchAI's capabilities
2. **Create Account** → Sign up or login to access the research assistant
3. **Ask Questions** → Submit research queries in natural language
4. **Get AI Responses** → Receive intelligent answers with verification options
5. **Connect MetaMask** → Link your wallet for blockchain verification
6. **Pay to Verify** → Pay 0.01 tFIL to cryptographically verify responses
7. **Access Verified Content** → View tamper-proof responses on IPFS

### For Administrators
1. **Collect Papers** → Gather peer-reviewed research papers (PDF format)
2. **Process Documents** → Run admin scripts to extract text and generate embeddings
3. **Store on IPFS** → Upload to IPFS for permanent, tamper-proof storage
4. **Database Integration** → Store metadata and embeddings in MongoDB
5. **Enable Discovery** → Papers become searchable through vector similarity

## 🔧 Technology Stack

### AI & Machine Learning
- **OpenRouter**: Access to Mistral 7B and other language models
- **Hugging Face**: Sentence transformers for semantic search
- **Vector Search**: MongoDB vector search for finding relevant papers

### Web3 & Blockchain
- **Filecoin Calibration Testnet**: Smart contract deployment and execution
- **MetaMask Integration**: Wallet connection and transaction signing
- **Web3.js**: Blockchain interaction and smart contract communication
- **IPFS**: Decentralized file storage via Lighthouse
- **Solidity**: Smart contract development (^0.8.19)

### Backend & Frontend
- **Flask**: Python web framework
- **MongoDB**: NoSQL database with vector search capabilities
- **Vanilla JavaScript**: Interactive user interface with Web3 integration
- **CSS3**: Modern styling and responsive design

## 📋 Prerequisites

### System Requirements
- Python 3.8 or higher
- MongoDB Atlas account
- OpenRouter API key
- Hugging Face API token
- Lighthouse API key (for IPFS storage)
- MetaMask browser extension
- Filecoin Calibration testnet tFIL

### Additional Dependencies (Admin Only)
- Tesseract OCR (for text extraction from scanned PDFs)
- Poppler (for PDF to image conversion)

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

### Web3 Configuration
```javascript
// In web3-integration.js
const CONTRACT_ADDRESS = "0xYourDeployedContractAddress";
const FILECOIN_TESTNET_CONFIG = {
    chainId: '0x4cb2f',
    chainName: 'Filecoin Calibration',
    // ... other config
};
```

## 💰 Verification Pricing

### Current Pricing (Testnet)
- **Verification Cost**: 0.01 tFIL per response
- **Network**: Filecoin Calibration Testnet
- **Payment Method**: MetaMask wallet
- **Duplicate Protection**: No additional charges for already-verified content

### Getting testnet FIL
1. Visit [Filecoin Calibration Faucet](https://faucet.calibration.fildev.network/)
2. Connect your MetaMask wallet
3. Request testnet FIL
4. Start verifying responses!

## 🤝 Contributing

We welcome contributions from the community! Here's how you can help:

### Development Process
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Web3 Development
- Test all smart contract interactions on Calibration testnet
- Ensure MetaMask integration works across different browsers
- Follow Web3 security best practices
- Document any blockchain-related changes

## 🚨 Security & Privacy

### Data Protection
- **Password Security**: bcrypt hashing for all user passwords
- **Session Management**: Secure Flask session handling
- **Input Validation**: Protection against injection attacks
- **HTTPS Ready**: Secure communication protocols

### Blockchain Security
- **Smart Contract Auditing**: Thoroughly tested verification logic
- **Payment Security**: Secure MetaMask transaction handling
- **Private Key Protection**: Never store or transmit private keys
- **Network Security**: Secure RPC connections to Filecoin network

### Verification Integrity
- **Document Integrity**: IPFS hash verification ensures authenticity
- **Immutable Storage**: Research papers cannot be altered once stored
- **Blockchain Records**: All verifications permanently recorded
- **Decentralized Access**: No single point of failure for verified content

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Meet the Team

### Founders & Core Developers
- **Anshu Roy** - [LinkedIn](https://www.linkedin.com/in/anshuroy2006/) | [GitHub](https://github.com/AnshuRoy25)
- **Aayush Dubey** - [LinkedIn](https://www.linkedin.com/in/aayush-dubey-19087826b/) | [GitHub](https://github.com/Aayushdubey05)

## 🌟 Vision Statement

We envision a world where artificial intelligence serves as humanity's most trusted research assistant – not because we ask you to believe it, but because you can cryptographically verify everything it tells you. By connecting artificial intelligence to smart contracts and the decentralized web, we're creating something unprecedented: an AI that gets smarter with every verified source added, more reliable with every blockchain-confirmed citation, and more valuable as humanity's collective knowledge grows on the immutable ledger of truth.

**Every answer is verifiable. Every verification is permanent. Every researcher can trust.**

---

*Built with ❤️ for researchers, secured by blockchain, verified by you.*
