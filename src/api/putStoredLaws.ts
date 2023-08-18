import { useMutation, useQueryClient } from "@tanstack/react-query";

import { LawStoreRequest } from "@/interface/lawStorage";

import { http } from "./_http";
import { API_KEY } from "./constants";

const storeLaws = async ({ type, id }: LawStoreRequest) => {
  const url = `/laws/${type}/${id}/bookmark`;
  const response = await http.authPost(url);

  return response;
};

const useStoreLaws = () => {
  const queryClient = useQueryClient();
  return useMutation(storeLaws, {
    onSuccess: () => {
      queryClient.invalidateQueries([API_KEY.STORED_LAWS]);
    },
  });
};

export default useStoreLaws;
