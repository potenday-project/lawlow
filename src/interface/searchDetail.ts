const DETAIL_TAB_TYPES = ["original", "info"] as const;
export type DetailTabType = (typeof DETAIL_TAB_TYPES)[number];
export const DETAIL_TAB_INFOS: {
  label: string;
  value: DetailTabType;
}[] = [
  {
    label: "판례 원문",
    value: "original",
  },
  {
    label: "판례 정보",
    value: "info",
  },
];

export interface SearchDetailResult {
  id: string;
  title: string;
  subTitle: string;
  original: string; // 판례 원문
  info: string; // 판례 정보
}

export interface LawLowResult {
  content: string;
  keywords: string[];
}
