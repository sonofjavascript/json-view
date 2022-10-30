import { Store } from "@/core/store";
import { JSON } from "@/modules/json/types";

type State = {
  json: JSON;
};

const state: State = {
  json: null,
};

const getters = {
  json: (state: State) => {
    return state.json;
  },
};

const mutations = {
  setJson: (state: State, json: JSON) => {
    const jsonFormatted = JSON.stringify(json, null, 2);
    state.json = jsonFormatted;
  },
};

const store: Store<State, JSON> = {
  name: "json",
  state,
  getters,
  mutations,
};

export default store;
