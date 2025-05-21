import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

const CallbackHandler = () => {
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const code = searchParams.get("code");
    if (code) {
      // Clear old tokens before fetching new ones
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      localStorage.removeItem("token_timestamp");

      fetch("http://127.0.0.1:5000/api/spotify/callback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          localStorage.setItem("access_token", data.access_token);
          localStorage.setItem("refresh_token", data.refresh_token);
          localStorage.setItem("token_timestamp", Date.now());
          window.location.href = "/";
        });
    }
  }, [searchParams]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-black text-white">
      <div className="flex flex-col items-center space-y-12">
        {/* Spotify Logo */}
        <img
          src="https://storage.googleapis.com/pr-newsroom-wp/1/2023/03/Spotify_Logo_CMYK_White.png"
          alt="Spotify Logo"
          className="w-32 h-auto"
        />

        {/* Spinner */}
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-green-500 border-opacity-50"></div>

        {/* Message */}
        <p className="text-lg font-medium text-center">
          Redirecting to Spotify...
          <br />
          Please wait.
        </p>
      </div>
    </div>
  );
};

export default CallbackHandler;
