import { computed, getCurrentInstance, Ref } from "vue";
import { GlobalStores, StoreCtx } from "./store";

function useStore<S = never, T = never>(storeName?: string): StoreCtx<S, T> {
  const appProps = getCurrentInstance()?.appContext.config.globalProperties;
  if (!appProps) throw new Error("Application is not instantiated");

  const globalStore = appProps.$globalStore as GlobalStores<S, T>;

  if (storeName) return globalStore.stores[storeName];
  return {
    state: globalStore.state,
    getters: globalStore.getters,
    mutations: globalStore.mutations,
  };
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
  return (payload?: T) => store.mutations[action](store.state, payload);
}
