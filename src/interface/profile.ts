import { SearchTabType } from "./search";

export const PROFILE_TAB_INFOS: {
  label: string;
  value: SearchTabType;
}[] = [
  {
    label: "저장한 판례",
    value: "prec",
  },
  {
    label: "저장한 법령",
    value: "statute",
  },
];
