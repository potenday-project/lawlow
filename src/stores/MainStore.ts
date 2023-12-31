import { makeAutoObservable } from "mobx";

import { SearchTabType } from "@/interface/search";

class MainStore {
  searchWords: string[];

  selectedTab: SearchTabType;

  totalElements: number;

  selectedPage: number;

  isSaved: boolean;

  constructor() {
    this.searchWords = [];
    this.selectedTab = "prec";
    this.totalElements = 0;
    this.selectedPage = 1;
    this.isSaved = false;

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

  setTotalElements(value: number) {
    this.totalElements = value;
  }

  setSelectedPage(value: number) {
    this.selectedPage = value;
  }

  setIsSaved(value: boolean) {
    this.isSaved = value;
  }
}

export default MainStore;
