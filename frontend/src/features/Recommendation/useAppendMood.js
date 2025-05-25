import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updatePastMoods } from "../../services/apiProfile";

export function useAppendMood() {
  const queryClient = useQueryClient();

  const { mutate: appendMood } = useMutation({
    mutationFn: updatePastMoods,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["profile", variables.spotify_id],
      });
    },
  });

  return { appendMood };
}
