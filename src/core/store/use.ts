import { computed, getCurrentInstance, Ref } from "vue";
import type { GlobalStore, StoreContext } from "./types";

function useStore<S = never, T = never>(
  storeName?: string
): StoreContext<S, T> {
  const appProps = getCurrentInstance()?.appContext.config.globalProperties;
  if (!appProps) throw new Error("Application is not instantiated");

  const globalStore = appProps.$globalStore as GlobalStore<S, T>;

  if (storeName) return globalStore.stores[storeName];
  return globalStore.root;
}

export function useGetter<T>(getter: string, storeName?: string): Ref<T> {
  const store = useStore(storeName);
  return computed(() => store.getters[getter](store.state));
}

type ActionFn<T> = (payload?: T) => void;
export function useAction<T extends undefined>(
  action: string,
  storeName?: string
): ActionFn<T> {
  const store = useStore(storeName);
  function commit(mutationName: string, payload?: T) {
    store.mutations[mutationName](store.state, payload);
  }
  function dispatch(actionName: string, payload?: T) {
    store.actions[actionName](
      { state: store.state, commit, dispatch },
      payload
    );
  }

  return (payload?: T) => dispatch(action, payload);
}
