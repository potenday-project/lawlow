import { createContext, useContext } from "react";

import MainStore from "./MainStore";

interface Store {
  mainStore: MainStore;
}

export const store: Store = {
  mainStore: new MainStore(),
};

export const StoreContext = createContext(store);

export const useStore = () => {
  return useContext(StoreContext);
};
