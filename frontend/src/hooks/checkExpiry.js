import supabase from "../services/supabase";

export const checkTokenExpiry = async (userId) => {
  if (!userId) return false;

  const { data, error } = await supabase
    .from("users")
    .select("access_token, refresh_token, token_created")
    .eq("spotify_id", userId)
    .single();

  if (error || !data) {
    console.error("Failed to fetch tokens from Supabase:", error);
    return false;
  }

  const { access_token, refresh_token, token_created } = data;

  if (!access_token || !token_created) return false;

  const oneHour = 60 * 60 * 1000;
  const isExpired = Date.now() - new Date(token_created).getTime() > oneHour;

  if (isExpired) {
    if (
      !window.location.href.includes("/login") &&
      !window.location.href.includes("/callback")
    ) {
      const { error: updateError } = await supabase
        .from("users")
        .update({
          access_token: null,
          refresh_token: null,
          token_created: null,
        })
        .eq("spotify_id", userId);

      if (updateError) {
        console.error("Failed to clear expired tokens:", updateError);
      }

      const client_id = import.meta.env.VITE_CLIENT_ID;
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
