import { SearchTabType } from "./search";

export type DetailTabType<T extends SearchTabType> = T extends "prec"
  ? "ai" | "prec"
  : "ai" | "law";
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
  law: [
    {
      label: "쉬운 법령",
      value: "ai",
    },
    {
      label: "법령 원문",
      value: "law",
    },
  ],
};

export interface LawDetailRequest {
  type: SearchTabType;
  id: string | number;
}
