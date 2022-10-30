import { App, reactive } from "vue";

import type { GlobalStore, Store, StoreContext } from "./types";

function createStore<T extends object, S>({
  state,
  getters,
  mutations,
  actions,
}: Store<T, S>): StoreContext<T, S> {
  const storeState = reactive<T>(state || {});
  return { state: storeState, getters, mutations, actions };
}

export default <T extends object, S>(stores: Store<T, S>[]) => ({
  install: (app: App) => {
    app.config.globalProperties.$globalStore = stores.reduce(
      (global, store) => {
        if (store.namespaced) {
          return {
            ...global,
            stores: {
              ...global.stores,
              [store.name]: createStore(store),
            },
          };
        }

        return {
          ...global,
          root: createStore({
            name: "",
            state: {
              ...(Object.assign({}, global.root.state) as T),
              ...store.state,
            },
            getters: { ...global.root.getters, ...store.getters },
            mutations: { ...global.root.mutations, ...store.mutations },
            actions: { ...global.root.actions, ...store.actions },
          }),
        };
      },
      {
        root: { state: {}, getters: {}, mutations: {}, actions: {} },
        stores: {},
      } as GlobalStore<T, S>
    );
  },
});
