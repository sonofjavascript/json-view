import { UnwrapNestedRefs } from "vue";

type State<T> = UnwrapNestedRefs<T>;

interface Getters<T, S> {
  [getter: string]: (state: State<T>) => S;
}

export interface Mutations<T, S> {
  [mutation: string]: (state: State<T>, payload?: S) => void;
}

export interface ActionContext<T, S> {
  state: State<T>;
  dispatch: (action: string, payload: S) => Promise<void> | void;
  commit: (mutation: string, payload: S) => void;
}

export interface Actions<T, S> {
  [action: string]: (
    actionCtx: ActionContext<T, S>,
    payload?: S
  ) => Promise<void> | void;
}

export interface StoreContext<T, S> {
  state: State<T>;
  getters: Getters<T, S>;
  mutations: Mutations<T, S>;
  actions: Actions<T, S>;
}

export interface GlobalStore<T, S> {
  root: StoreContext<T, S>;
  stores: { [store: string]: StoreContext<T, S> };
}

export interface Store<T, S> {
  name: string;
  namespaced?: boolean;
  state: T;
  getters: Getters<T, S>;
  mutations: Mutations<T, S>;
  actions: Actions<T, S>;
}
