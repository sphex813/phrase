import { createApp, markRaw } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";
import axios from "axios";
import "./assets/main.css";

const app = createApp(App);

const axiosInstance = axios.create();
const pinia = createPinia();
pinia.axios = markRaw(axiosInstance);
app.use(pinia);
app.use(router);

app.mount("#app");
