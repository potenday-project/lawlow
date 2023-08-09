const SEARCH_TAB_TYPES = ["PRECEDENT", "LEGISLATION"] as const;
export type SearchTabType = (typeof SEARCH_TAB_TYPES)[number];
export const SEARCH_TAB_INFOS: {
  label: string;
  value: SearchTabType;
}[] = [
  {
    label: "판례",
    value: "PRECEDENT",
  },
  {
    label: "현행 법령",
    value: "LEGISLATION",
  },
];

const SORT_TYPES = ["DESC", "ACCURACY"] as const;
export type SortType = (typeof SORT_TYPES)[number];
export const SORT_TYPE_INFOS: {
  label: string;
  value: SortType;
}[] = [
  {
    label: "최신순",
    value: "DESC",
  },
  {
    label: "정확도순",
    value: "ACCURACY",
  },
];

export interface BriefSearchResult {
  id: number;
  title: string;
  content: string;
  keywords: string[];
}
