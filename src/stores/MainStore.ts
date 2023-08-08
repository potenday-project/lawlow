import { makeAutoObservable } from "mobx";

import { SearchTabType, SortType } from "@/interface/search";

class MainStore {
  searchWord: string;

  selectedTab: SearchTabType;

  selectedSort: SortType;

  constructor() {
    this.searchWord = "";
    this.selectedTab = "PRECEDENT";
    this.selectedSort = "DESC";

    makeAutoObservable(this);
  }

  setSearchWord(value: string) {
    this.searchWord = value;
  }

  setSelectedTab(value: SearchTabType) {
    this.selectedTab = value;
  }

  setSelectedSort(value: SortType) {
    this.selectedSort = value;
  }
}

export default MainStore;
