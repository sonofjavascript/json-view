import { App, reactive } from "vue";

import type { Stores, StoreArg, Store } from "./types";

function createStore<T extends object>({
  name,
  state,
  getters,
  mutations,
  actions,
}: StoreArg<T>): Store<T> {
  const storeState = reactive<T>(state || {});
  return { name, state: storeState, getters, mutations, actions };
}

export default <T extends object>(stores: StoreArg<T>[]) => ({
  install: (app: App) => {
    app.config.globalProperties.$stores = stores.reduce(
      (global, store) => ({
        ...global,
        stores: {
          ...global.stores,
          [store.name]: createStore(store),
        },
      }),
      {} as Stores<T>
    );
  },
});
