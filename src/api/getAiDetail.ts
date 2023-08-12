import { useQuery, UseQueryResult } from "@tanstack/react-query";

import { AiDetailRequest, AiResponseData } from "@/interface/searchDetail";

import { http } from "./_http";
import { API_KEY } from "./constants";

const getAiDetail = async ({
  type,
  id,
  recentSummaryMsg,
}: AiDetailRequest): Promise<AiResponseData> => {
  const url = `/laws/${type}/${id}/summary`;
  const response: AiResponseData | undefined = await http.post(url, {
    data: recentSummaryMsg,
  });

  return response as AiResponseData;
};

const useGetAiDetail = ({
  type,
  id,
  recentSummaryMsg = undefined,
  enabled = true,
}: AiDetailRequest): UseQueryResult<AiResponseData> => {
  return useQuery(
    [API_KEY.AI_DETAIL, { type, id, recentSummaryMsg }],
    () => getAiDetail({ type, id, recentSummaryMsg }),
    { suspense: true, enabled },
  );
};

export default useGetAiDetail;
