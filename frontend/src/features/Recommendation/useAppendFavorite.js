import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateFavorites } from "../../services/apiProfile";

export function useAppendFavorite() {
  const queryClient = useQueryClient();

  const { mutate: appendFavorite } = useMutation({
    mutationFn: updateFavorites,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["profile", variables.spotify_id],
      });
    },
  });

  return { appendFavorite };
}
