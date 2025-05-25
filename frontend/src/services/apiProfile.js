import supabase from "./supabase";

export async function getProfile(spotify_id) {
  let { data: users, error } = await supabase
    .from("users")
    .select("*")
    .eq("spotify_id", spotify_id);

  if (error) throw new Error("Error in fetching user data");

  return users;
}

export async function updatePastMoods({ spotify_id, mood }) {
  const { data: user, error: fetchError } = await supabase
    .from("users")
    .select("past_moods")
    .eq("spotify_id", spotify_id)
    .single();

  if (fetchError) throw fetchError;

  // Step 2: Append new mood with timestamp
  const updatedMoods = [
    ...(user.past_moods || []),
    {
      ...mood,
      timestamp: new Date().toISOString(),
    },
  ];

  // Step 3: Update user
  const { error: updateError } = await supabase
    .from("users")
    .update({ past_moods: updatedMoods })
    .eq("spotify_id", spotify_id);

  if (updateError) throw updateError;
}

export async function updateFavorites({ spotify_id, track }) {
  console.log(track);
  const { data: user, error: fetchError } = await supabase
    .from("users")
    .select("favorites")
    .eq("spotify_id", spotify_id)
    .single();

  if (fetchError) throw fetchError;

  const currentFavorites = user.favorites || [];

  console.log(currentFavorites);
  const isAlreadyFavorite = currentFavorites.some(
    (fav) => fav.spotify_url === track.spotify_url
  );
  if (isAlreadyFavorite) return;

  // // Append new track
  const updatedFavorites = [...currentFavorites, track];

  // Update in DB
  const { error: updateError } = await supabase
    .from("users")
    .update({ favorites: updatedFavorites })
    .eq("spotify_id", spotify_id);

  if (updateError) throw updateError;
}
