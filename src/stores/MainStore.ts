import { makeAutoObservable } from "mobx";

class MainStore {
  searchWord: string;

  constructor() {
    this.searchWord = "";

    makeAutoObservable(this);
  }

  setSearchWord(value: string) {
    this.searchWord = value;
  }
}

export default MainStore;
