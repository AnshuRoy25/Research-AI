from pymongo import MongoClient
from config import Config

# Global database variables
client = None
db = None
user_collection = None
conversations_collection = None
sessions_collection = None
pdfs_collection = None

def init_db():
    global client, db, user_collection, conversations_collection, sessions_collection, pdfs_collection
    
    client = MongoClient(Config.MONGODB_URI)
    db = client[Config.DB_NAME]
    user_collection = db[Config.USERS_COLLECTION]
    conversations_collection = db[Config.CONVERSATIONS_COLLECTION]
    sessions_collection = db[Config.SESSIONS_COLLECTION]
    pdfs_collection = db[Config.PDFS_COLLECTION]

def get_collections():
    return {
        'users': user_collection,
        'conversations': conversations_collection,
        'sessions': sessions_collection,
        'pdfs': pdfs_collection
    }