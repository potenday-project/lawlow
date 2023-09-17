import { useQuery, UseQueryResult } from "@tanstack/react-query";

import { LawStoreGetRequest } from "@/interface/lawStorage";
import { GetLawsResponseType, Page } from "@/interface/search";

import { http } from "./_http";
import { API_KEY } from "./constants";

const getStoredLaws = async ({
  type,
  page,
  take,
}: LawStoreGetRequest): Promise<Page<GetLawsResponseType<typeof type>>> => {
  const url = `/laws/${type}/bookmarks?page=${page}&take=${take}`;
  const response: Page<GetLawsResponseType<typeof type>> | undefined =
    await http.authGet(url);

  const newList = response?.list.map((l) => ({ ...l, type }));

  return { ...response, list: newList } as Page<
    GetLawsResponseType<typeof type>
  >;
};

const useGetStoredLaws = ({
  type,
  page,
  take,
}: LawStoreGetRequest): UseQueryResult<
  Page<GetLawsResponseType<typeof type>>
> => {
  return useQuery(
    [API_KEY.STORED_LAWS, { type, page, take }],
    () => getStoredLaws({ type, page, take }),
    { suspense: true },
  );
};

export default useGetStoredLaws;
