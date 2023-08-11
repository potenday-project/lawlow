import { makeAutoObservable } from "mobx";

import { SearchTabType } from "@/interface/search";

class MainStore {
  searchWords: string[];

  selectedTab: SearchTabType;

  constructor() {
    this.searchWords = [];
    this.selectedTab = "presc";

    makeAutoObservable(this);
  }

  resetSearchWords() {
    this.searchWords = [];
  }

  addSearchWord(value: string) {
    this.searchWords = [...this.searchWords, value];
  }

  popSearchWord() {
    this.searchWords = [...this.searchWords.slice(0, -1)];
  }

  setSelectedTab(value: SearchTabType) {
    this.selectedTab = value;
  }
}

export default MainStore;
