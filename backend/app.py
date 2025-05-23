from flask import Flask, request, jsonify
import requests
from flask_cors import CORS
from dotenv import load_dotenv
import os
import base64
import re
import os
from deepface import DeepFace
import cv2
import numpy as np
import spotipy
from spotipy.oauth2 import SpotifyClientCredentials

app = Flask(__name__)
CORS(app)
dotenv_path = os.path.join(os.path.dirname(__file__), '..', 'frontend', '.env')
print(dotenv_path)
load_dotenv(dotenv_path)
UPLOAD_FOLDER = 'uploads'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

CLIENT_ID = os.getenv("VITE_CLIENT_ID")
CLIENT_SECRET = os.getenv("VITE_CLIENT_SECRET")
REDIRECT_URI = "http://127.0.0.1:5173/callback"
TOKEN_URL = "https://accounts.spotify.com/api/token"
sp = spotipy.Spotify(auth_manager=SpotifyClientCredentials(
    client_id=CLIENT_ID,
    client_secret=CLIENT_SECRET
))

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


@app.route('/api/detect-emotion', methods=['POST'])
def detect_emotion():
    print("Inside function")
    data = request.get_json()

    base64_img = data.get('image', '')
    if base64_img.startswith('data:image'):
        base64_img = base64_img.split(',')[1]

    img_bytes = base64.b64decode(base64_img)
    nparr = np.frombuffer(img_bytes, np.uint8)
    img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
    img_rgb = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
    result = DeepFace.analyze(img_rgb, actions=['emotion'], enforce_detection=False)
    emotions = result[0]['emotion']
    dominant_emotion = result[0]['dominant_emotion']

    emotion_to_genres = {
        'angry': ['metal', 'punk'],
        'disgust': ['horrorcore'], 
        'fear': ['dark-ambient', 'gothic-rock', 'industrial'],
        'happy': ['pop', 'dance', 'funk', 'edm'],
        'sad': ['acoustic', 'indie', 'classical'],
        'surprise': ['experimental', 'jazz', 'prog-rock'],
        'neutral': ['lo-fi', 'ambient', 'chill']
    }

    keyword = emotion_to_genres[dominant_emotion]
    playlists = search_playlists(keyword)
    playlists = [p for p in playlists if p]
    all_tracks_info = []

    if playlists:
        for playlist in playlists:
            playlist_name = playlist.get('name', 'Unknown Playlist')
            playlist_id = playlist.get('id')
            if not playlist_id:
                print(f"Skipping playlist with missing ID: {playlist_name}")
                continue

            print(f"\nFetching tracks for playlist: {playlist_name} (ID: {playlist_id})\n")

            tracks = get_playlist_tracks(playlist_id)

            for i, item in enumerate(tracks, start=1):
                track = item.get('track')
                if not track:
                    print(f"{i}. [Track data missing]")
                    continue

                name = track.get('name', 'Unknown Title')
                artists = track.get('artists', [])
                artist_names = ", ".join(artist.get('name', 'Unknown Artist') for artist in artists)
                url = track.get('external_urls', {}).get('spotify', 'No URL available')

                track_info = {
                        'playlist_name': playlist_name,
                        'track_number': i,
                        'track_name': name,
                        'artists': artist_names,
                        'spotify_url': url
                    }

                all_tracks_info.append(track_info)
    else:
        print("No playlists found.")

    return jsonify({
        'emotions': emotions,
        'dominant_emotion': dominant_emotion,
        'tracks': all_tracks_info
    })

def search_playlists(keyword, limit=10):
    results = sp.search(q=keyword, type='playlist', limit=limit)
    playlists = results['playlists']['items']
    return playlists

def get_playlist_tracks(playlist_id, limit=10):
    tracks = []
    results = sp.playlist_tracks(playlist_id, limit=limit)
    tracks.extend(results['items'])

    while results['next']:
        results = sp.next(results)
        tracks.extend(results['items'])
    
    return tracks

if __name__ == "__main__":
    app.run(debug=True)
