import { SearchTabType } from "./search";

export type DetailTabType<T extends SearchTabType> = T extends "prec"
  ? "ai" | "prec"
  : "ai" | "statute";
export const DETAIL_TAB_INFOS: {
  [key in SearchTabType]: { label: string; value: DetailTabType<key> }[];
} = {
  prec: [
    {
      label: "쉬운 판례",
      value: "ai",
    },
    {
      label: "판례 원문",
      value: "prec",
    },
  ],
  statute: [
    {
      label: "쉬운 법령",
      value: "ai",
    },
    {
      label: "법령 원문",
      value: "statute",
    },
  ],
};

const ACTION_TYPES = ["add", "delete"] as const;
export type ActionType = (typeof ACTION_TYPES)[number];

export interface LawDetailRequest {
  type: SearchTabType;
  id: string | number;
}

export interface AiDetailRequest {
  id?: string | number;
  type?: SearchTabType;
  recentSummaryMsg?: string;
  enabled?: boolean;
}

export interface StoreDetailRequest {
  type: SearchTabType;
  actionType: ActionType;
  content: AiResponseData | undefined;
}

export interface AiResponseData {
  easyTitle?: string;
  summary: string;
  keywords?: string[];
}
