import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import filters from "./filters/filter";
import $axios from "./plugin/axios";
import moment from "./moment/moment";
import './plugins/element.js'

Vue.config.productionTip = false;
Vue.prototype.$axios = $axios;
Vue.prototype.$moment = moment;
new Vue({
  router,
  filters,
  // $axios,
  store,
  render: (h) => h(App),
}).$mount("#app");
