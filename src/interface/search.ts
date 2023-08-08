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
