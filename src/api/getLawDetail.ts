import { useQuery, UseQueryResult } from "@tanstack/react-query";

import { GetLawDetailResponseType } from "@/interface/search";
import { LawDetailRequest } from "@/interface/searchDetail";

import { http } from "./_http";
import { API_KEY } from "./constants";

const getLawDetail = async ({
  type,
  id,
}: LawDetailRequest): Promise<GetLawDetailResponseType<typeof type>> => {
  const url = `/laws/${type}/${id}`;
  const response: GetLawDetailResponseType<typeof type> | undefined =
    await http.get(url);

  const newResponse = { ...response, type };

  return newResponse as GetLawDetailResponseType<typeof type>;
};

const useGetLawDetail = ({
  type,
  id,
}: LawDetailRequest): UseQueryResult<GetLawDetailResponseType<typeof type>> => {
  return useQuery(
    [API_KEY.LAW_DETAIL, { type, id }],
    () => getLawDetail({ type, id }),
    { suspense: true },
  );
};

export default useGetLawDetail;
