import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router'
import store from './store'
import axios from "axios";
import GlobalMethods from "./helpers/GlobalMethods";
import AxiosHandler from './helpers/AxiosHandler'

Vue.config.productionTip = false

axios.defaults.baseURL = 'http://localhost:8000/api/';
axios.defaults.headers.common["Authorization"] = `Bearer ${Auth.token()}`;
window.axios = axios;

window.FORM_DATA_CONFIG = {
  headers: {
      "Content-Type": "multipart/form-data",
  }
}

window.FILES_PATH = window.location.origin + "/assets/files/";

import Auth from "./helpers/Auth";
window.Auth = Auth;


new Vue({
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
