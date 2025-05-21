from flask import Flask, request, jsonify
import requests
from flask_cors import CORS
from dotenv import load_dotenv
import os

app = Flask(__name__)
CORS(app)
dotenv_path = os.path.join(os.path.dirname(__file__), '..', 'frontend', '.env')
print(dotenv_path)
load_dotenv(dotenv_path)

CLIENT_ID = os.getenv("VITE_CLIENT_ID")
CLIENT_SECRET = os.getenv("VITE_CLIENT_SECRET")
REDIRECT_URI = "http://127.0.0.1:5173/callback"
TOKEN_URL = "https://accounts.spotify.com/api/token"

@app.route("/api/spotify/callback", methods=["POST"])
def spotify_callback():
    code = request.json.get("code")
    payload = {
        "grant_type": "authorization_code",
        "code": code,
        "redirect_uri": REDIRECT_URI,
        "client_id": CLIENT_ID,
        "client_secret": CLIENT_SECRET,
    }
    headers = { "Content-Type": "application/x-www-form-urlencoded" }
    response = requests.post(TOKEN_URL, data=payload, headers=headers)
    return jsonify(response.json())

@app.route("/api/spotify/refresh", methods=["POST"])
def refresh_token():
    refresh_token = request.json.get("refresh_token")
    payload = {
        "grant_type": "refresh_token",
        "refresh_token": refresh_token,
        "client_id": CLIENT_ID,
        "client_secret": CLIENT_SECRET,
    }
    headers = { "Content-Type": "application/x-www-form-urlencoded" }
    response = requests.post(TOKEN_URL, data=payload, headers=headers)
    return jsonify(response.json())

if __name__ == "__main__":
    app.run(debug=True)
