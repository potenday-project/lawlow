import { useMutation, useQueryClient } from "@tanstack/react-query";

import { AiResponseData, StoreDetailRequest } from "@/interface/searchDetail";

import { API_KEY } from "./constants";

const putStoredLaws = async ({
  type,
  actionType,
  content,
}: StoreDetailRequest) => {
  /** @TODO api 안나옴 */
  const curArr: AiResponseData[] = JSON.parse(
    localStorage.getItem(`stored-${type}`) ??
      JSON.stringify([] as AiResponseData[]),
  );
  if (content === undefined) {
    //  do nothing
  } else if (actionType === "add") {
    const newArr = [...curArr, content];
    localStorage.setItem(`stored-${type}`, JSON.stringify(newArr));
  } else if (actionType === "delete") {
    //   일단 냅두자
  }

  return new Promise((res) => {
    setTimeout(() => {
      res({ success: true });
    }, 100);
  });
};

const usePutStoredLaws = () => {
  const queryClient = useQueryClient();
  return useMutation(putStoredLaws, {
    onSuccess: () => {
      queryClient.invalidateQueries([API_KEY.STORED_LAWS]);
    },
  });
};

export default usePutStoredLaws;
