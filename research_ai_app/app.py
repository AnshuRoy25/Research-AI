from flask import Flask
from dotenv import load_dotenv
import os
from utils.database import init_db
from routes.main import main_bp
from routes.auth import auth_bp
from routes.chat import chat_bp

load_dotenv()

def create_app():
    app = Flask(__name__)
    app.secret_key = os.getenv("FLASK_SECRET_KEY")
    
    # Initialize database connections
    init_db()
    
    # Register blueprints
    app.register_blueprint(main_bp)
    app.register_blueprint(auth_bp)
    app.register_blueprint(chat_bp)
    
    return app

if __name__ == '__main__':
    app = create_app()
    app.run(host='0.0.0.0', port=int(os.environ.get('PORT', 5000)))