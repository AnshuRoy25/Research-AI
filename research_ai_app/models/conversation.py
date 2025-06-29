from datetime import datetime
import pytz
from bson import ObjectId
from utils.database import get_collections

class ConversationModel:
    def __init__(self):
        self.collections = get_collections()
    
    def get_session_messages(self, user_id, session_id):
        conversations = self.collections['conversations']
        
        messages = list(conversations.find(
            {"user_id": ObjectId(user_id), "session_id": ObjectId(session_id)},
            {"_id": 0, "role": 1, "content": 1}
        ))
        return messages
    
    def save_messages(self, user_id, session_id, user_message, ai_reply, ipfs):
        conversations = self.collections['conversations']
        
        conversations.insert_many([
            {"user_id": ObjectId(user_id), "session_id": ObjectId(session_id), 
             "role": "user", "content": user_message},
            {"user_id": ObjectId(user_id), "session_id": ObjectId(session_id), 
             "role": "assistant", "content": ai_reply, "ipfs": ipfs}
        ])
    
    def create_new_session(self, user_id):
        sessions = self.collections['sessions']
        ist_now = datetime.now(pytz.timezone('Asia/Kolkata'))
        
        title = "Chat | " + ist_now.strftime("%I:%M %p - %d %B %Y")
        
        new_session = sessions.insert_one({
            "user_id": ObjectId(user_id),
            "title": title,
            "created_at": ist_now
        })
        
        return {
            "reply": "New session created",
            "session_id": str(new_session.inserted_id),
            "title": title
        }
    
    def get_or_create_session(self, user_id):
        sessions = self.collections['sessions']
        conversations = self.collections['conversations']
        
        # Get the most recent session
        session_doc = sessions.find_one(
            {"user_id": ObjectId(user_id)},
            sort=[("created_at", -1)]
        )

        if session_doc:
            # Load all conversations for this session
            chats = self.get_session_messages(user_id, str(session_doc['_id']))
            return {
                "success": True, 
                "conversations": chats,
                "session_id": str(session_doc['_id'])
            }

        # If no session, create one
        result = self.create_new_session(user_id)
        return {
            "success": False,
            "session_id": result['session_id']
        }
    
    def get_user_sessions(self, user_id):
        sessions = self.collections['sessions']
        
        sessions_list = list(sessions.find(
            {"user_id": ObjectId(user_id)},
            {"_id": 1, "title": 1},
            sort=[("created_at", -1)]
        ))

        # Convert ObjectIds to string
        for s in sessions_list:
            s['_id'] = str(s['_id'])

        return sessions_list