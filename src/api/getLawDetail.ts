import { useQuery, UseQueryResult } from "@tanstack/react-query";

import { GetLawsResponseType, LawDetailRequest } from "@/interface/search";

import { http } from "./_http";
import { API_KEY } from "./constants";

const getLawDetail = async ({
  type,
  id,
}: LawDetailRequest): Promise<GetLawsResponseType<typeof type>> => {
  const url = `/laws/${type}/${id}`;
  const response: GetLawsResponseType<typeof type> | undefined = await http.get(
    url,
  );

  const newResponse = { ...response, type };

  return newResponse as GetLawsResponseType<typeof type>;
};

const useGetLawDetail = ({
  type,
  id,
}: LawDetailRequest): UseQueryResult<GetLawsResponseType<typeof type>> => {
  return useQuery(
    [API_KEY.LAW_DETAIL, { type, id }],
    () => getLawDetail({ type, id }),
    { suspense: true },
  );
};

export default useGetLawDetail;
