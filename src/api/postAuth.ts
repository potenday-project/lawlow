import { useMutation, useQueryClient } from "@tanstack/react-query";

import { LoginRequest, LoginResponse } from "@/interface/login";

import { http } from "./_http";
import { API_KEY } from "./constants";

const postAuth = async ({ login_type, token }: LoginRequest) => {
  const url = `/auth/login/${login_type}`;
  const response: LoginResponse | undefined = await http.post(url, { token });

  return response as LoginResponse;
};

const usePostAuth = () => {
  const queryClient = useQueryClient();
  return useMutation(postAuth, {
    onSuccess: () => {
      queryClient.invalidateQueries([API_KEY.STORED_LAWS]);
    },
  });
};

export default usePostAuth;
