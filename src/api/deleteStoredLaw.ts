import { useMutation, useQueryClient } from "@tanstack/react-query";

import { LawStoreRequest } from "@/interface/lawStorage";

import { http } from "./_http";
import { API_KEY } from "./constants";

const deleteStoredLaw = async ({ type, id }: LawStoreRequest) => {
  const url = `/laws/${type}/${id}/bookmark`;
  const response = await http.delete(url);

  return response;
};

const useDeleteStoredLaw = () => {
  const queryClient = useQueryClient();
  return useMutation(deleteStoredLaw, {
    onSuccess: () => {
      queryClient.invalidateQueries([API_KEY.STORED_LAWS]);
    },
  });
};

export default useDeleteStoredLaw;
