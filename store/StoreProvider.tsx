import { createContext, useContext } from "react";
import { Store } from "./store";

let store: Store;
export const StoreContext = createContext<Store>(null);

export function useStore() {
  const context = useContext(StoreContext);
  if (context === undefined) {
    throw new Error("useStore must be used within StoreProvider");
  }

  return context;
}

export function StoreProvider({ children }) {
  const store = initializeStore();

  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  );
}

function initializeStore() {
  const _store = store ?? new Store();

  // For SSG and SSR always create a new store
  if (typeof window === "undefined") return _store;
  // Create the store once in the client
  if (!store) store = _store;

  return _store;
}
