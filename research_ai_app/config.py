import os
from dotenv import load_dotenv

load_dotenv()

class Config:
    SECRET_KEY = os.getenv("FLASK_SECRET_KEY")
    MONGODB_URI = os.getenv("MONGODB_URI")
    OPENROUTER_API_KEY = os.getenv("OPENROUTER_API_KEY")
    
    # Database settings
    DB_NAME = 'researchai_database'
    
    # Collections
    USERS_COLLECTION = 'users'
    CONVERSATIONS_COLLECTION = 'conversations'
    SESSIONS_COLLECTION = 'sessions'
    PDFS_COLLECTION = 'pdfs'