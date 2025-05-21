export const checkTokenExpiry = () => {
  const token = localStorage.getItem("access_token");
  const timestamp = localStorage.getItem("token_timestamp");

  if (!token || !timestamp) return false;

  const oneMinute = 60 * 60 * 1000; // For testing (use oneHour = 60 * 60 * 1000 in production)
  const isExpired = Date.now() - parseInt(timestamp, 10) > oneMinute;

  if (isExpired) {
    // Prevent infinite redirect loops
    if (
      !window.location.href.includes("/login") &&
      !window.location.href.includes("/callback")
    ) {
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      localStorage.removeItem("token_timestamp");

      const client_id = "59e25fc61828403b8d3447caf4ff8b51";
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

      const url = `https://accounts.spotify.com/authorize?client_id=${client_id}&response_type=code&redirect_uri=${encodeURIComponent(
        redirect_uri
      )}&scope=${encodeURIComponent(scope)}&show_dialog=true`;

      window.location.href = url;
    }

    return true;
  }

  return false;
};
