import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import supabase from "../services/supabase"; // adjust path if needed

const CallbackHandler = () => {
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const code = searchParams.get("code");

    const handleCallback = async () => {
      if (!code) return;

      try {
        // Step 1: Exchange code for tokens from Flask backend
        const res = await fetch("http://127.0.0.1:5000/api/spotify/callback", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ code }),
        });

        const tokenData = await res.json();
        if (!res.ok)
          throw new Error(tokenData.error || "Token exchange failed");

        const { access_token, refresh_token } = tokenData;
        const token_created = new Date().toISOString();

        // Step 2: Get Spotify user profile
        const profileRes = await fetch("https://api.spotify.com/v1/me", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${access_token}`,
          },
        });

        if (!profileRes.ok) {
          const errText = await profileRes.text();
          throw new Error(
            `Failed to fetch profile: ${profileRes.status} - ${errText}`
          );
        }

        const profile = await profileRes.json();
        const spotify_id = profile.id;

        // Step 3: Upsert user into Supabase
        const { error } = await supabase.from("users").upsert(
          {
            spotify_id,
            access_token,
            refresh_token,
            token_created,
          },
          { onConflict: ["spotify_id"] }
        );

        if (error) throw new Error(`Supabase insert error: ${error.message}`);

        window.location.href = `/dashboard?spotify_id=${spotify_id}`;
      } catch (err) {
        console.error("Spotify callback error:", err.message);
      }
    };

    handleCallback();
  }, [searchParams]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-black text-white">
      <div className="flex flex-col items-center space-y-12">
        <img
          src="https://storage.googleapis.com/pr-newsroom-wp/1/2023/03/Spotify_Logo_CMYK_White.png"
          alt="Spotify Logo"
          className="w-32 h-auto"
        />
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-green-500 border-opacity-50"></div>
        <p className="text-lg font-medium text-center">
          Logging you in...
          <br />
          Please wait.
        </p>
      </div>
    </div>
  );
};

export default CallbackHandler;
