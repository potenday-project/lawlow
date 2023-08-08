import { makeAutoObservable } from "mobx";

import { SearchTabType } from "@/interface/search";

class MainStore {
  searchWord: string;

  selectedTab: SearchTabType;

  constructor() {
    this.searchWord = "";
    this.selectedTab = "PRECEDENT";

    makeAutoObservable(this);
  }

  setSearchWord(value: string) {
    this.searchWord = value;
  }

  setSelectedTab(value: SearchTabType) {
    this.selectedTab = value;
  }
}

export default MainStore;
