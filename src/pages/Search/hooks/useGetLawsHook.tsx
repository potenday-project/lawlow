import { useEffect } from "react";

import { useQueryClient } from "@tanstack/react-query";

import useGetLaws from "@/api/getLaws";
import { GetLawsResponseType, SearchTabType } from "@/interface/search";
import { useStore } from "@/stores";

interface Props {
  q: string;
  type: SearchTabType;
}

interface Returns<T extends SearchTabType> {
  isNoResult: boolean;
  laws: GetLawsResponseType<T>[];
  totalPages: number;
}

const useGetLawsHook = ({ q, type }: Props): Returns<typeof type> => {
  const { mainStore } = useStore();
  const queryClient = useQueryClient();

  const { data } = useGetLaws({
    q,
    type,
    page: mainStore.selectedPage,
    size: 5,
  });

  useEffect(() => {
    if (data) {
      mainStore.setTotalElements(data.totalElements ?? 0);
      const queryCache = queryClient.getQueryCache();
      const queries = queryCache.getAll();
      if (queries.length > 1) {
        const { queryKey: cur } = queries[queries.length - 1];
        const { queryKey: last } = queries[queries.length - 2];
        if (
          Array.isArray(cur) &&
          Array.isArray(last) &&
          cur.length > 1 &&
          last.length > 1 &&
          cur[0] === last[0] &&
          (cur[1].q !== last[1].q || cur[1].type !== last[1].type)
        )
          mainStore.setSelectedPage(1);
      }
    }
  }, [data]);

  return {
    isNoResult: (data?.totalElements ?? 0) === 0,
    laws: data?.list ?? [],
    totalPages: data?.totalPages ?? 0,
  };
};

export default useGetLawsHook;
