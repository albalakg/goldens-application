/* eslint-disable no-unused-vars */
import { error, warning } from "./helpers/GlobalMethods";
import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router'
import store from './store'
import axios from "axios";
import AxiosHandler from './helpers/AxiosHandler'
import ContentService from './helpers/ContentService'
import CookieService from './helpers/CookieService'
import ClientService from './helpers/ClientService'
import TimeService from './helpers/TimeService'
import StatusService from './helpers/StatusService'
import { LOCAL, PROD } from './helpers/EnvService'
import Auth from "./helpers/Auth";
import AddToHome from "./helpers/AddToHome"

Vue.config.productionTip  = false
axios.defaults.baseURL    = process.env.VUE_APP_SERVER_BASE_URL + '/api/';
window.ClientService      = ClientService;
window.isMobile           = ClientService.isMobile;
window.error              = error;
window.warning            = warning;
window.Auth               = Auth;
window.axios              = axios;
window.baseURL            = window.location.origin + '/';
window.ContentService     = ContentService;
window.CookieService      = CookieService;
window.TimeService        = TimeService;
window.StatusService      = StatusService;
window.FILES_PATH         = window.location.origin + "/assets/files/";
window.isLocal            = process.env.VUE_APP_ENV === LOCAL;
window.isProd             = process.env.VUE_APP_ENV === PROD;
window.FORM_DATA_CONFIG   = {
  headers: {
      "Content-Type": "multipart/form-data",
  }
}

if(Auth.token()) {
  axios.defaults.headers.common["Authorization"] = `Bearer ${Auth.token()}`;
}

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
