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

  return <div>Handling Spotify login...</div>;
};

export default CallbackHandler;
