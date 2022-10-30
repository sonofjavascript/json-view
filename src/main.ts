import { createApp } from "vue";
import App from "./App.vue";
import store from "@/core/store";
import jsonStore from "@/modules/json/store";

const app = createApp(App);
app.use(store([jsonStore]));

app.mount("#app");
