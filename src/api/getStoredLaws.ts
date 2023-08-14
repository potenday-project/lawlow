/* eslint-disable @typescript-eslint/no-unused-vars */
import { useQuery, UseQueryResult } from "@tanstack/react-query";

import { StoredSearchRequest } from "@/interface/profile";
import { Page } from "@/interface/search";
import { AiResponseData } from "@/interface/searchDetail";

import { API_KEY } from "./constants";

/** @TODO api 아직 안나옴! */
const getStoredLaws = async ({
  type,
  page,
  size,
}: StoredSearchRequest): Promise<AiResponseData[]> => {
  /** @TODO api 아직 안나옴! */
  // }: StoredSearchRequest): Promise<Page<GetLawsResponseType<typeof type>>> => {

  const response: AiResponseData[] = JSON.parse(
    localStorage.getItem(`stored-${type}`) ??
      JSON.stringify([] as AiResponseData[]),
  );

  return new Promise((res) => {
    setTimeout(() => {
      res(response);
    }, 100);
  });
  //   const url = `/laws/${type}?q=${q}&page=${page}&take=${size}`;
  //   const response: Page<GetLawsResponseType<typeof type>> | undefined =
  //     await http.get(url);
  //   const newList = response?.list.map((l) => ({ ...l, type }));
  //   return { ...response, list: newList } as Page<
  //     GetLawsResponseType<typeof type>
  //   >;
};

const useGetStoredLaws = ({
  type,
  page,
  size,
}: StoredSearchRequest): UseQueryResult<
  //   Page<AiResponseData>
  AiResponseData[]
> => {
  return useQuery(
    [API_KEY.STORED_LAWS, { type, page, size }],
    () => getStoredLaws({ type, page, size }),
    { suspense: true },
  );
};

export default useGetStoredLaws;
