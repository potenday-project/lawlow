import { useQuery, UseQueryResult } from "@tanstack/react-query";

import {
  GetLawsResponseType,
  LawsSearchRequest,
  Page,
} from "@/interface/search";

import { http } from "./_http";
import { API_KEY } from "./constants";

const getLaws = async ({
  q,
  type,
  page,
  size,
}: LawsSearchRequest): Promise<Page<GetLawsResponseType<typeof type>>> => {
  const url = `/laws/${type}?q=${q}&page=${page}&take=${size}`;
  const response: Page<GetLawsResponseType<typeof type>> | undefined =
    await http.get(url);

  const newList = response?.list.map((l) => ({ ...l, type }));

  //   return new Promise((res) => {
  //     setTimeout(() => {
  //       res({ ...response, list: newList } as Page<
  //         GetLawsResponseType<typeof type>
  //       >);
  //     }, 100000000);
  //   });

  return { ...response, list: newList } as Page<
    GetLawsResponseType<typeof type>
  >;
};

const useGetLaws = ({
  q,
  type,
  page,
  size,
}: LawsSearchRequest): UseQueryResult<
  Page<GetLawsResponseType<typeof type>>
> => {
  return useQuery(
    [API_KEY.LAWS, { q, type, page, size }],
    () => getLaws({ q, type, page, size }),
    { suspense: true },
  );
};

export default useGetLaws;
