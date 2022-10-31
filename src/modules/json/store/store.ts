import { ActionContext, StoreArg } from "@/core/store";
import type { JSON } from "@/modules/json/types";
import { SET_JSON, SET_JSON_FORMATTED } from "./mutation-types";

type State = {
  json: JSON | null;
  jsonFormatted: string | null;
};

const store: StoreArg<State> = {
  name: "json",
  state: {
    json: null,
    jsonFormatted: null,
  },
  getters: {
    json: (state: State) => state.json,
    jsonFormatted: (state: State) => state.jsonFormatted ?? null,
  },
  mutations: {
    [SET_JSON]: (state: State, json: JSON | null) => {
      state.json = json;
    },
    [SET_JSON_FORMATTED]: (state: State, jsonFormatted: string | null) => {
      state.jsonFormatted = jsonFormatted;
    },
  },
  actions: {
    setJson: ({ commit }: ActionContext<State>, json: JSON) => {
      commit(SET_JSON, json);
      commit(SET_JSON_FORMATTED, JSON.stringify(json, null, 2));
    },
  },
};

export default store;
