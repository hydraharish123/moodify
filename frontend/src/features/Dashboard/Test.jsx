import { useEffect, useState } from "react";

function Test() {
  const [accessToken, setAccessToken] = useState(null);
  const [genres, setGenres] = useState([]);

  async function getAvailableGenres(token) {
    try {
      console.log(token);
      const response = await fetch(
        "https://api.spotify.com/v1/recommendations/available-genre-seeds",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `Failed to fetch genre seeds: ${response.status} - ${errorText}`
        );
      }

      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error("Error fetching genres:", error);
    }
  }

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    setAccessToken(token);

    if (token) {
      getAvailableGenres(token);
    }
  }, []);

  return (
    <div>
      <h2>Available Genre Seeds</h2>
    </div>
  );
}

export default Test;
