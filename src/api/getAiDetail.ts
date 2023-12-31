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
    recentSummaryMsg,
  });

  return response as AiResponseData;
};

interface Props extends AiDetailRequest {
  setEnabledFalse?: () => void;
}

const useGetAiDetail = ({
  type,
  id,
  recentSummaryMsg = undefined,
  enabled = true,
  setEnabledFalse = () => undefined,
}: Props): UseQueryResult<AiResponseData> => {
  return useQuery(
    [API_KEY.AI_DETAIL, { type, id, recentSummaryMsg }],
    () => getAiDetail({ type, id, recentSummaryMsg }),
    {
      suspense: true,
      enabled,
      onSuccess: () => {
        setEnabledFalse();
      },
    },
  );
};

export default useGetAiDetail;
