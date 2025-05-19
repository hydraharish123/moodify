import React, { useEffect } from "react";

const client_id = "CLIENT_ID"; // Never expose client_secret here
const redirect_uri = "http://127.0.0.1:5173/callback";
const scope = [
  "user-read-private",
  "user-read-email",
  "user-modify-playback-state",
  "user-read-playback-position",
  "user-library-read",
  "streaming",
  "user-read-playback-state",
  "user-read-recently-played",
  "playlist-read-private",
].join(" ");

const LoginWithSpotify = () => {
  useEffect(() => {
    const token = localStorage.getItem("access_token");
    const timestamp = localStorage.getItem("token_timestamp");
    const oneHour = 60 * 60 * 1000;

    if (token && timestamp) {
      const expired = Date.now() - parseInt(timestamp) > oneHour;
      if (expired) {
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        localStorage.removeItem("token_timestamp");
        login();
      } else {
        window.location.href = "/app";
      }
    }
  }, []);

  const login = () => {
    const url = `https://accounts.spotify.com/authorize?client_id=${client_id}&response_type=code&redirect_uri=${encodeURIComponent(
      redirect_uri
    )}&scope=${encodeURIComponent(scope)}&show_dialog=true`;
    window.location.href = url;
  };

  return (
    <button onClick={login} className="btn btn-success">
      Login with Spotify
    </button>
  );
};

export default LoginWithSpotify;
