import { makeAutoObservable } from "mobx";

import { SearchTabType, SortType } from "@/interface/search";

class MainStore {
  searchWords: string[];

  selectedTab: SearchTabType;

  selectedSort: SortType;

  constructor() {
    this.searchWords = [];
    this.selectedTab = "PRECEDENT";
    this.selectedSort = "DESC";

    makeAutoObservable(this);
  }

  resetSearchWords() {
    this.searchWords = [];
  }

  addSearchWord(value: string) {
    this.searchWords = [...this.searchWords, value];
  }

  setSelectedTab(value: SearchTabType) {
    this.selectedTab = value;
  }

  setSelectedSort(value: SortType) {
    this.selectedSort = value;
  }
}

export default MainStore;
