import { error, warning} from "./helpers/GlobalMethods";
import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router'
import store from './store'
import axios from "axios";
// eslint-disable-next-line no-unused-vars
import AxiosHandler from './helpers/AxiosHandler'
import ContentService from './helpers/ContentService'
import TimeService from './helpers/TimeService'
import StatusService from './helpers/StatusService'
import Auth from "./helpers/Auth";

Vue.config.productionTip  = false
axios.defaults.baseURL    = process.env.VUE_APP_BASE_URL + '/api/';

window.error = error;
window.warning = warning;
window.Auth = Auth;
window.axios              = axios;
window.baseURL            = window.location.origin + '/';
window.ContentService     = ContentService;
window.TimeService        = TimeService;
window.StatusService      = StatusService;
window.FILES_PATH = window.location.origin + "/assets/files/";
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
