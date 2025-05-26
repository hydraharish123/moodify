<h1 align="center">Welcome to Moodify</h1>

<h2 align="center">

[🎦Demo Video](https://drive.google.com/file/d/1ISgi3L-_uOGVdmHs7z336lSQJa3YCScb/view?usp=sharing)

</h2>

<!-- Badges -->
<p align="center">
  <img src="https://img.shields.io/github/stars/hydraharish123/moodify?style=flat-square" />
  <img src="https://img.shields.io/github/forks/hydraharish123/moodify?style=flat-square" />
  <img src="https://img.shields.io/github/issues/hydraharish123/moodify?style=flat-square" />
</p>

<div align="center">

<img src="https://img.shields.io/badge/Status-Completed-success?style=flat" alt="Status" />

</div>

## 🧠 Background

Music is deeply intertwined with human emotion — it can uplift, soothe, energize, or console. **Moodify** is based on the idea that our emotional state can be detected and enhanced through personalized music recommendations. This concept is not just intuitive — it’s biologically and psychologically grounded.

### 🔬 The Science Behind Moodify

Moodify draws from multiple areas of neuroscience and physiology to deliver emotionally intelligent song suggestions:

#### 🎯 1. Dopaminergic Reward Pathways

When people listen to music that resonates with their current emotional state, the **brain's reward system** — particularly the **mesolimbic pathway** — releases **dopamine**, the “feel-good” neurotransmitter.

#### 💓 2. Autonomic Nervous System Regulation

Music can modulate physiological arousal:

* **Fast, rhythmic music** increases **sympathetic activity** (fight-or-flight), elevating heart rate and energy.
* **Slow, melodic music** increases **parasympathetic activity** (rest-and-digest), calming the body and reducing stress.
  Moodify uses this principle to either **amplify** or **regulate** the listener’s mood through song tempo and tone.

#### 🧬 3. Hormonal and Emotional Regulation

* **Cortisol**, the primary stress hormone, can be reduced by listening to relaxing music.
* **Oxytocin**, associated with emotional bonding and empathy, is elevated by emotionally rich or socially meaningful music.
* These hormonal responses enhance the user’s **emotional resilience**, a key goal of Moodify.

## Features

* **Real-Time Emotion Detection**
  Captures the user's facial expression via webcam and analyzes it using DeepFace to detect emotions like happy, sad, angry, surprised, etc.

* **🎶 Emotion-Based Music Recommendations**
  Matches the detected emotion to curated Spotify playlists and mood-specific genres (e.g., sad → acoustic, happy → pop), delivering personalized music suggestions aligned with the user’s current mood.

* **🧠 Mood-to-Genre Mapping**
  Each detected emotion is intelligently mapped to specific music genres that reflect or enhance the mood, creating a deeper emotional connection through music.

* **▶️ Interactive Song Playback**
  Users can listen to Spotify song previews directly from the app by clicking on suggested tracks.

* **⭐ Favorite Songs**
  Allows users to mark songs as favorites so they can easily revisit the tracks that resonated most with their mood.

* **📈 Emotion & Song History Dashboard**
  Tracks and visualizes the user’s emotion trends and recommended songs over time using interactive plots—available right in the dashboard.

* **📦 Supabase Integration**
  Stores user emotions, recommended songs, and favorites in a Supabase database for persistence, personalization, and analytics.


## 🛠️ Technology Stack

**Frontend:**

* **React** – Building a fast, interactive, and component-based user interface
* **React Query** – Efficient data fetching, caching, and synchronization
* **Tailwind CSS** and **Styled-Components** for styling
* **Recharts** for analysing past moods

**Backend:**

* **Flask (Python)** – REST API for emotion detection and communication with Spotify/Supabase
* **DeepFace** – Facial emotion recognition from webcam input
* **Spotipy** – Fetching and playing mood-aligned music

**Database & Auth:**

* **Supabase** – PostgreSQL-based backend for storing user data (emotions, song history, favorites) and handling authentication



