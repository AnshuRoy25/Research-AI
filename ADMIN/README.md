# ADMIN - Research Paper Processing System 🛠️

> **Administrative Module for Project Owners** - Processes PDF research papers, uploads to IPFS, generates embeddings, and populates the MongoDB database for user queries with blockchain verification support.

## 🚀 Overview

The ADMIN system is the backbone of ResearchAI that prepares research papers for the main application. This module is **exclusively for project administrators** and handles the complete pipeline from raw PDF files to searchable, blockchain-verified research database entries.

### 🎯 What This Module Does

1. **PDF Discovery**: Automatically scans local folders for research papers
2. **IPFS Upload**: Uploads PDFs to decentralized storage via Lighthouse
3. **Text Extraction**: Extracts full content using OCR for scanned documents
4. **Embedding Generation**: Creates semantic search vectors using Hugging Face
5. **Database Population**: Stores all data in MongoDB for user application queries
6. **Blockchain Verification**: Ensures permanent, tamper-proof storage with IPFS hashes

### 🔄 Integration with Main Application

This admin system directly feeds the main ResearchAI application with blockchain-verified content:

```
PDF Files → ADMIN Processing → MongoDB Database → Main Application → User Queries → Pay-to-Verify System
```

**Important**: The admin system must be run before users can get meaningful responses from the main application, as it populates the research database that powers AI responses with verifiable IPFS citations.

## 📋 Prerequisites

### System Dependencies
**Critical**: Install these system dependencies before proceeding with Python packages.

#### Tesseract OCR (Required for text extraction)
- **Windows**: 
  1. Download from [GitHub Tesseract Releases](https://github.com/tesseract-ocr/tesseract)
  2. Install and add to Windows PATH
  3. Restart command prompt
- **macOS**: 
  ```bash
  brew install tesseract
  ```
- **Ubuntu/Debian**: 
  ```bash
  sudo apt-get update
  sudo apt-get install tesseract-ocr
  ```

#### Poppler (Required for PDF to Image conversion)
- **Windows**: 
  1. Download from [Poppler for Windows](https://blog.alivate.com.au/poppler-windows/)
  2. Extract and add `bin` folder to PATH
- **macOS**: 
  ```bash
  brew install poppler
  ```
- **Ubuntu/Debian**: 
  ```bash
  sudo apt-get install poppler-utils
  ```

### API Requirements
- **Lighthouse API Key**: For IPFS storage ([Get one here](https://lighthouse.storage/))
- **MongoDB Atlas**: Same database as main application
- **Hugging Face Token**: For embedding generation ([Get one here](https://huggingface.co/settings/tokens))

## 📁 Detailed Project Structure

```
ADMIN/
├── README.md                          # This file - Admin setup guide
├── admin.py                           # 🎯 Main processing script
├── requirements.txt                   # Python dependencies for admin system
├── .env.example                       # Environment variables template
├── .env                               # Your environment variables (create this)
├── PDFS/                              # 📚 Place your PDF files here (create this folder)
│   ├── research_paper_1.pdf           # Example research papers
│   ├── climate_study_2024.pdf
│   ├── ai_healthcare_analysis.pdf
│   └── ... (all your research PDFs)
│
└── Services/                          # 🔧 Core Processing Services
    ├── adding_pdfs.py                 # PDF file discovery and validation
    ├── upload_to_ipfs.py              # IPFS upload via Lighthouse
    ├── pdf_to_text.py                 # Text extraction with OCR fallback
    ├── get_embeddings.py              # Vector embedding generation
    └── delete_all_mongo.py            # Database management utility
```

## 🛠️ Setup Instructions

### 1. Navigate to Admin Directory
```bash
cd ADMIN
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

2. Edit `.env` with your API keys and credentials:
   ```env
   # Lighthouse API Key (Get from https://lighthouse.storage/)
   LIGHTHOUSE_API_KEY=your-lighthouse-api-key-here
   
   # MongoDB Atlas Connection String (SAME as main application)
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/research_ai_database?retryWrites=true&w=majority
   
   # Hugging Face API Token (Get from https://huggingface.co/settings/tokens)
   HF_API_KEY=hf_your-huggingface-token-here
   ```

### 4. Create PDF Storage Directory
```bash
# Create the PDFS folder if it doesn't exist
mkdir -p PDFS
```

### 5. Add Your Research Papers
Place all PDF research papers you want to process in the `ADMIN/PDFS/` folder:
```bash
# Copy your research papers to the PDFS folder
cp /path/to/your/research/papers/*.pdf PDFS/
```

**Supported Formats**:
- Standard text-based PDFs
- Scanned PDFs (will be processed with OCR)
- Multi-page research papers
- Academic journals and preprints

### 6. Verify System Dependencies
Test that all system dependencies are properly installed:
```bash
# Test Tesseract OCR
tesseract --version

# Test Poppler (Linux/Mac)
pdftoppm -h

# Test Python imports
python -c "import pytesseract, pdf2image, pymongo; print('All dependencies working!')"
```

## 🎯 How to Use the Admin System

### Main Processing Workflow

#### 1. Prepare Your Research Papers
- Collect high-quality, peer-reviewed research papers
- Ensure PDFs are not corrupted or password-protected
- Place all PDFs in the `ADMIN/PDFS/` folder

#### 2. Run the Main Processing Script
```bash
python admin.py
```

The script will automatically:
1. **Scan** the PDFS folder for all PDF files
2. **Upload** each PDF to IPFS via Lighthouse storage (generates IPFS hashes for verification)
3. **Extract** text content (with OCR fallback for scanned PDFs)
4. **Generate** semantic embeddings using Hugging Face API
5. **Store** everything in MongoDB for the main application's pay-to-verify system

### Processing Pipeline Details

#### Stage 1: PDF Discovery (`adding_pdfs.py`)
- Recursively scans the PDFS folder
- Validates PDF file format and integrity
- Filters out corrupted or invalid files
- Returns list of processable documents

#### Stage 2: IPFS Upload (`upload_to_ipfs.py`)
- Uploads each PDF to IPFS via Lighthouse
- Generates unique cryptographic hash (IPFS CID) for blockchain verification
- Checks for duplicates to avoid re-uploading
- Ensures permanent, decentralized storage for pay-to-verify system

#### Stage 3: Text Extraction (`pdf_to_text.py`)
- **Primary Method**: Direct text extraction from PDF
- **Fallback Method**: OCR processing for scanned documents
- **Language Support**: Multi-language OCR capabilities
- **Error Handling**: Graceful handling of corrupted files

#### Stage 4: Embedding Generation (`get_embeddings.py`)
- Uses `sentence-transformers/all-MiniLM-L6-v2` model
- Creates 384-dimensional semantic vectors
- Optimized for research content and academic language
- Enables semantic similarity search in main application

#### Stage 5: Database Storage
- Stores in MongoDB collection: `pdfs`
- Document structure includes IPFS hash for verification:
  ```json
  {
    "_id": "unique_document_id",
    "text": "Full extracted text content...",
    "ipfs_hash": "QmHashOfTheFileOnIPFS...",
    "embedding": [0.1, 0.2, 0.3, ...],
  }
  ```

## 🔧 Utility Scripts

### Database Management

#### Clear All Documents (⚠️ Use with Extreme Caution!)
```bash
python Services/delete_all_mongo.py
```
**Warning**: This permanently deletes ALL research papers from the database. The main application will have no data to search through until you re-process papers.

## 🔒 Security Considerations

### Data Protection
- **API Keys**: Never commit `.env` file to version control
- **PDF Content**: Ensure you have rights to upload research papers
- **Database Access**: Use strong MongoDB credentials
- **IPFS Storage**: Content on IPFS is public - ensure appropriate papers only

### Access Control
- **Admin Only**: This system should only be accessed by project administrators
- **File Validation**: System validates PDFs before processing
- **Error Handling**: Graceful handling prevents system crashes

## 🔄 Integration with Main Application

### Data Flow
```
Research Papers (PDF) 
    ↓ [ADMIN System]
IPFS Storage + MongoDB 
    ↓ [Vector Search Index]
Main Application Database 
    ↓ [User Queries]
AI Responses with IPFS Citations
    ↓ [Pay-to-Verify System]
Blockchain-Verified Access
```

### Shared Resources
- **MongoDB Database**: Both systems use `research_ai_database`
- **Collection**: Research data stored in `pdfs` collection with IPFS hashes
- **Vector Index**: Main app requires `vector_index` for semantic search
- **Environment**: Some environment variables shared between systems

### Synchronization
- **Database Updates**: Changes in admin system immediately available to main app
- **New Papers**: Users can access new research immediately after processing (with pay-to-verify)


**Ready to populate your research database?** Follow the setup instructions above, add your PDF research papers to the `PDFS/` folder, and run `python admin.py`.

**Need help with the main application?** Check out the [`../research_ai/README.md`](../research_ai/README.md) for user-facing application setup with Web3 integration.

**Questions or issues?** Create an issue in the main repository or contact the development team.

ADMIN System - Powering ResearchAI with verified, blockchain-secured research papers. 🔬🔗