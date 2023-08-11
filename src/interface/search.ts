const SEARCH_TAB_TYPES = ["presc", "law"] as const;
export type SearchTabType = (typeof SEARCH_TAB_TYPES)[number];
export const SEARCH_TAB_INFOS: {
  label: string;
  value: SearchTabType;
}[] = [
  {
    label: "판례",
    value: "presc",
  },
  {
    label: "현행 법령",
    value: "law",
  },
];

export interface BriefSearchRequest {
  q: string; // 검색어
  type: SearchTabType;
  page: number;
  size: number;
}

export interface BriefSearchResult {
  id: number;
  title: string;
  content: string;
  keywords: string[];
}
