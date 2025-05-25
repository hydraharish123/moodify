import { useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getProfile } from "../../services/apiProfile";

export function useProfile() {
  const [searchParams] = useSearchParams();
  const spotify_id = searchParams.get("spotify_id");
  const { data, isLoading } = useQuery({
    queryKey: ["profile", spotify_id],
    queryFn: () => getProfile(spotify_id),
  });

  return { data, isLoading };
}
