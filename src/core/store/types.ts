import { UnwrapNestedRefs } from "vue";

type State<T> = UnwrapNestedRefs<T>;

interface Getters {
  [getter: string]: <T, S>(state: State<T>) => S;
}

export interface Mutations {
  [mutation: string]: <T, S>(state: State<T>, payload?: S) => void;
}

export interface ActionContext<T> {
  state: State<T>;
  dispatch: <S>(action: string, payload: S) => Promise<void> | void;
  commit: <S>(mutation: string, payload: S) => void;
}

interface Actions {
  [action: string]: <T, S>(
    ctx: ActionContext<T>,
    payload?: S
  ) => Promise<void> | void;
}

export interface Store<T> {
  name: string;
  state: State<T>;
  getters: Getters;
  mutations: Mutations;
  actions: Actions;
}

export interface Stores<T> {
  [store: string]: Store<T>;
}

export interface StoreArg<T> {
  name: string;
  state: T;
  getters: Getters<T>;
  mutations: Mutations<T>;
  actions: Actions<T>;
}
