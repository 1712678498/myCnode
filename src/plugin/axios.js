import axios from "axios";
// import Vue from "vue";

axios.defaults.baseURL = "https://cnodejs.org/api/v1";
// 响应拦截
axios.interceptors.response.use((res) => res.data);
var $axios = axios;

// Vue.prototype.$axios = axios
export default $axios;
