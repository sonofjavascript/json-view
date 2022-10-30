import { ActionContext, Store } from "@/core/store";
import type { JSON } from "@/modules/json/types";
import { SET_JSON, SET_JSON_FORMATTED } from "./mutation-types";

type State = {
  json: JSON;
  jsonFormatted?: string | null;
};

const store: Store<State, JSON> = {
  name: "json",
  state: {
    json: null,
    jsonFormatted: null,
  },
  getters: {
    json: (state: State) => state.json,
    jsonFormatted: (state: State) => state.jsonFormatted,
  },
  mutations: {
    [SET_JSON]: (state: State, json: JSON) => {
      state.json = json;
    },
    [SET_JSON_FORMATTED]: (state: State, jsonFormatted: string) => {
      state.jsonFormatted = jsonFormatted;
    },
  },
  actions: {
    setJson: ({ commit }: ActionContext<State, JSON>, json: JSON) => {
      commit(SET_JSON, json);
      commit(SET_JSON_FORMATTED, JSON.stringify(json, null, 2));
    },
  },
};

export default store;
