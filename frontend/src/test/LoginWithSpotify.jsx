import React, { useEffect } from "react";

const client_id = import.meta.env.VITE_CLIENT_ID;
console.log(client_id);
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
        window.location.href = "/dashboard";
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
    <div className="flex items-center justify-center min-h-screen bg-black text-white font-sans">
      <div className="bg-[#1c1c1c] px-12 py-12 rounded-2xl shadow-xl flex flex-col items-center w-full max-w-xl">
        {/* Spotify Icon */}
        <div className="mb-6 text-green-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={48}
            height={48}
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12.01 2.019c-5.495 0-9.991 4.496-9.991 9.991S6.515 22 12.01 22 22 17.504 22 12.01c0-5.495-4.446-9.991-9.99-9.991m4.595 14.436c-.199.299-.549.4-.85.201-2.349-1.45-5.296-1.75-8.793-.951-.348.102-.648-.148-.748-.449-.101-.35.149-.648.45-.749 3.795-.85 7.093-.499 9.69 1.1.35.149.4.548.251.848m1.2-2.747c-.251.349-.7.499-1.051.249-2.697-1.646-6.792-2.148-9.939-1.148-.398.101-.85-.1-.949-.498-.101-.402.1-.852.499-.952 3.646-1.098 8.143-.548 11.239 1.351.3.149.45.648.201.998m.099-2.799c-3.197-1.897-8.542-2.097-11.59-1.146a.94.94 0 0 1-1.148-.6.937.937 0 0 1 .599-1.151c3.547-1.049 9.392-.85 13.089 1.351.449.249.599.849.349 1.298-.25.35-.849.498-1.299.248"></path>
          </svg>
        </div>

        {/* Headline */}
        <h1 className="text-3xl font-extrabold mb-4 tracking-tight">
          Welcome to Moodify
        </h1>
        <p className="text-lg text-gray-400 mb-8 text-center">
          Login to continue with your Spotify account
        </p>

        {/* Login Button */}
        <button
          onClick={login}
          className="bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-full text-xl transition duration-300 w-full text-center"
        >
          Login with Spotify
        </button>
      </div>
    </div>
  );
};

export default LoginWithSpotify;
