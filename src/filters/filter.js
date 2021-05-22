import Vue from "vue";

Vue.filter("getPostChineseTab", (post) =>
  post.top
    ? "置顶"
    : post.good
    ? "精华"
    : post.tab === "share"
    ? "分享"
    : post.tab === "ask"
    ? "问答"
    : post.tab === "job"
    ? "招聘"
    : ""
);
Vue.filter("isColor", (post) =>
  post.top
    ? "top"
    : post.good
    ? "good"
    : post.tab === "share"
    ? "share"
    : post.tab === "ask"
    ? "ask"
    : post.tab === "job"
    ? "job"
    : ""
);
