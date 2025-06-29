import bcrypt
from utils.database import get_collections

class UserModel:
    def __init__(self):
        self.collections = get_collections()
    
    def create_user(self, username, password):
        users = self.collections['users']
        
        # Check if username already exists
        if users.find_one({"username": username}):
            return "Username already exists"

        # Hash and store the new password
        hashed_pw = bcrypt.hashpw(password.encode(), bcrypt.gensalt()).decode()
        users.insert_one({
            "username": username,
            "password": hashed_pw
        })

        return "Account Created Successfully"
    
    def authenticate_user(self, username, password):
        users = self.collections['users']
        
        # Find the user by username
        user = users.find_one({"username": username})
        if user:
            # Compare hashed passwords
            if bcrypt.checkpw(password.encode(), user['password'].encode()):
                return {
                    'success': True,
                    'user_id': str(user['_id']),
                    'username': user['username']
                }
            return {'success': False, 'message': 'Invalid Password'}
        return {'success': False, 'message': 'Invalid Username'}