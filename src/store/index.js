import Vue from "vue";
import Vuex from "vuex";
import $axios from "../plugin/axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    // 用户数据
    userInfo: null,
    // 个人数据
    getUserPage: {},
    // 个人作者数据
    myInfo: null,
  },
  mutations: {
    getUserInfo: (state, userInfo) => {
      state.userInfo = userInfo;
    },
    getUserPage: (state, getUserPage) => {
      state.getUserPage = getUserPage;
    },
    getMyInfo: (state, myInfo) => {
      state.myInfo = myInfo;
      // console.log(state.myInfo);
    },
  },
  actions: {
    UserPage: async ({ commit }, userPageId) => {
      const token = sessionStorage.getItem("token");
      const res = await $axios.get(`/topic/${userPageId}?accesstoken=${token}`);
      // 对应 id 的数据
      commit("getUserPage", res.data);
      // console.log(res.data);
      // 对应 id 的作者信息
      commit("getUserInfo", res.data.author);
      // console.log(res.data);
    },
    getMyInfo: ({ commit }, token) => {
      return new Promise((resolve, reject) => {
        $axios
          .post("/accesstoken", {
            accesstoken: token,
          })
          .then((res) => {
            commit("getMyInfo", res);
            resolve();
          })
          .catch(() => {
            reject();
          });
      });
    },
  },
  modules: {},
});
