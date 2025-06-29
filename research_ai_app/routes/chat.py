from flask import Blueprint, request, jsonify, session
from models.conversation import ConversationModel
from services.ai_service import ai_service

chat_bp = Blueprint('chat', __name__)
conversation_model = ConversationModel()

@chat_bp.route('/chat', methods=['POST'])
def chat():
    data = request.get_json()
    userinput = data.get('userinput')
    modelname = data.get('modelname')

    user_id = session.get('user_id')
    session_id = session.get('current_session_id')

    # Get previous messages for context
    previous_msgs = conversation_model.get_session_messages(user_id, session_id)
    previous_msgs.append({"role": "user", "content": userinput})

    try:
        response = ai_service.get_response(userinput)
        reply = response['reply']
        ipfs = response['ipfs']
    except:
        reply = "Sorry, Something went wrong."
        ipfs = ""

    # Store messages
    conversation_model.save_messages(user_id, session_id, userinput, reply, ipfs)

    return jsonify({"reply": reply, "ipfs": ipfs})

@chat_bp.route('/newsession', methods=['POST'])
def newsession():
    user_id = session.get('user_id')
    result = conversation_model.create_new_session(user_id)
    
    session['current_session_id'] = result['session_id']
    return jsonify(result)

@chat_bp.route('/onload-check')
def onload_check():
    user_id = session.get('user_id')
    result = conversation_model.get_or_create_session(user_id)
    
    session['current_session_id'] = result['session_id']
    return jsonify(result)

@chat_bp.route('/load-sessions')
def load_sessions():
    user_id = session.get('user_id')
    sessions_list = conversation_model.get_user_sessions(user_id)
    return jsonify({"sessions_list": sessions_list})

@chat_bp.route('/load-session-chats', methods=['POST'])
def load_session_chats():
    user_id = session.get('user_id')
    session_id = request.get_json().get('session_id')
    
    session['current_session_id'] = session_id
    chats = conversation_model.get_session_messages(user_id, session_id)
    
    return jsonify({"session_chats": chats})