<template>
  <header>
    <div class="nav">
      <li><i class="iconfont icon-logo"></i></li>
      <li><router-link to="/">首页</router-link></li>
      <li v-if="isLoginning">
        <router-link to="/unmessage" class="nav-content">
          <span v-if="unMessageNum !== 0" class="message">{{
            unMessageNum
          }}</span>
          未读消息</router-link
        >
      </li>
      <li>
        <a><span @click="exit()">退出</span></a>
      </li>
    </div>
  </header>
</template>

<script>
export default {
  data() {
    return {
      unMessageNum: 0,
    };
  },
  methods: {
    exit() {
      sessionStorage.removeItem("isLogin");
      sessionStorage.removeItem("token");
      // this.$router.push("/");
      this.$route.name !== "Home" && this.$router.push({ name: "Home" });
      this.$route.path !== "/" && this.$router.push("/");
      location.reload()
    },
  },
  computed: {
    unMessage() {
      const token = sessionStorage.getItem("token");
      return this.$axios
        .get(`/message/count?accesstoken=${token}`)
        .then((res) => {
          // console.log(res.data);
          this.unMessageNum = res.data;
        });
    },
    isLoginning() {
      const login = sessionStorage.getItem("isLogin");
      // console.log("islogin" + login);
      return login;
    },
  },
};
</script>

<style lang="less" scoped>
.nav {
  display: flex;
  height: 80px;
  background-color: #fff;
  li {
    display: inline-block;
    margin-right: 20px;
    list-style-type: none;
    line-height: 78px;
    text-align: center;
    .icon-logo {
      color: #409eff;
      font-size: 50px;
    }
    .router-link-exact-active.router-link-active {
      color: #409eff;
      border-bottom: #409eff 1px solid;
    }
    a {
      font-size: 18px;
      padding: 30px;
      color: #9d9d9d;
      text-decoration: none;
    }
    .nav-content {
      .message {
        display: inline-block;
        background-color: #f55;
        border-radius: 50%;
        width: 20px;
        height: 20px;
        line-height: 20px;
        color: #000;
        text-align: center;
      }
    }
  }
}
</style>
