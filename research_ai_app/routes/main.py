from flask import Blueprint, render_template, session

main_bp = Blueprint('main', __name__)

@main_bp.route('/ping')
def ping():
    return {"status": "ok"}, 200

@main_bp.route('/')
def login():
    return render_template('login.html')

@main_bp.route('/create-page')
def create():
    return render_template('create.html')

@main_bp.route('/home-page')
def home():
    return render_template('home.html', username=session['user_name'])