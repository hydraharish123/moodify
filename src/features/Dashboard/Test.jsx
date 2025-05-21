import { useEffect, useState } from "react";

function Test() {
  const [accessToken, setAccessToken] = useState("");
  useEffect(function () {
    const CLIENT_ID = import.meta.env.VITE_CLIENT_ID;
    const SECRET_ID = import.meta.env.VITE_CLIENT_SECRET;
    console.log(CLIENT_ID, SECRET_ID);
    const authParams = {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `grant_type=client_credentials&client_id=${CLIENT_ID}&client_secret=${SECRET_ID}`,
    };

    fetch("https://accounts.spotify.com/api/token", authParams)
      .then((res) => res.json())
      .then((data) => setAccessToken(data.access_token));
  }, []);

  const fetchAvailableGenres = async (accessToken) => {
    console.log(accessToken);
    const res = await fetch(
      "https://api.spotify.com/v1/recommendations/available-genre-seeds",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    const data = await res.json();
    console.log(data);
    return data.genres; // This is an array of genre strings
  };

  useEffect(
    function () {
      if (accessToken) fetchAvailableGenres(accessToken);
    },
    [accessToken]
  );

  return <div>Testing component</div>;
}

export default Test;
