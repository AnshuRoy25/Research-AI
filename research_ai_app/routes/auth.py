from flask import Blueprint, request, jsonify, session
from models.user import UserModel

auth_bp = Blueprint('auth', __name__)
user_model = UserModel()

@auth_bp.route('/create-account', methods=['POST'])
def create_account():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')
    
    result = user_model.create_user(username, password)
    return jsonify({"reply": result})

@auth_bp.route('/login-account', methods=['POST'])
def login_account():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')
    
    result = user_model.authenticate_user(username, password)
    
    if result['success']:
        session['user_id'] = result['user_id']
        session['user_name'] = result['username']
        return jsonify({"reply": "Login Successful"})
    
    return jsonify({"reply": result['message']})