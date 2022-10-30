import { App, reactive, UnwrapNestedRefs } from "vue";

interface Getters<S, T> {
  [fnName: string]: (state: UnwrapNestedRefs<S>) => T;
}

interface Mutations<S, T> {
  [fnName: string]: (state: UnwrapNestedRefs<S>, payload?: T) => void;
}

export interface StoreCtx<S, T> {
  state: UnwrapNestedRefs<S>;
  getters: Getters<S, T>;
  mutations: Mutations<S, T>;
}

export interface GlobalStores<S, T> {
  state: UnwrapNestedRefs<S>;
  getters: Getters<S, T>;
  mutations: Mutations<S, T>;
  stores: { [store: string]: StoreCtx<S, T> };
}

export interface Store<S, T> {
  name: string;
  namespaced?: boolean;
  state: S;
  getters: Getters<S, T>;
  mutations: Mutations<S, T>;
}

function createStore<S extends object, T>({
  state,
  getters,
  mutations,
}: Store<S, T>): StoreCtx<S, T> {
  const storeState = reactive<S>(state || {});
  return { state: storeState, getters, mutations };
}

export default <S extends object, T>(stores: Store<S, T>[]) => ({
  install: (app: App) => {
    app.config.globalProperties.$globalStore = stores.reduce(
      (accStores, rawStore) => {
        const store = createStore(rawStore);
        if (rawStore.namespaced) {
          accStores.stores[rawStore.name] = store;
        } else {
          accStores.state = reactive({
            ...(Object.assign({}, accStores.state) as S),
            ...(Object.assign({}, store.state) as S),
          });
          accStores.getters = { ...accStores.getters, ...store.getters };
          accStores.mutations = { ...accStores.mutations, ...store.mutations };
        }
        return accStores;
      },
      { getters: {}, state: {}, stores: {} } as GlobalStores<S, T>
    );
  },
});
