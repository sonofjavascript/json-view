import { computed, getCurrentInstance, Ref } from "vue";
import type { Store } from "./types";

function getStore<T>(storeName: string): Store<T> {
  const appProps = getCurrentInstance()?.appContext.config.globalProperties;
  if (!appProps) throw new Error("Application is not instantiated");

  console.log(appProps, storeName);
  return appProps.$stores[storeName];
}

export function useGetter<T>(storeName: string, getter: string): Ref<T> {
  const store = getStore(storeName);
  return computed(() => store.getters[getter](store.state));
}

type ActionFn<T> = (payload?: T) => void;

export function useAction<T = never>(
  storeName: string,
  action: string
): ActionFn<T> {
  const store = getStore(storeName);

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
