<template>
  <div class="login">
    <div class="loginbox">
      <h2>账号登录</h2>
      <input type="text" v-model.trim="token" />
    </div>
    <div class="loginning" @click="login">
      <a>登录</a>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      token: "",
    };
  },
  
  methods: {
    login() {
      sessionStorage.setItem("token", this.token);
      const res = sessionStorage.getItem("token");
      // console.log(res);
      this.$store
        .dispatch("getMyInfo", this.token)
        .then(() => {
          sessionStorage.setItem("isLogin", true);
          this.$router.push("/");
          location.reload();
        })
        .catch((err) => {
          console.log(err);
          alert("token 有误");
        });
    },
  },
};
</script>

<style lang="less" >
.login {
  width: 600px;
  padding: 30px 10px;
  margin: 0 auto;
  margin-top: 100px;
  text-align: center;
  border-radius: 8px;
  background-color: #fff;
  .loginbox {
    input {
      display: inline-block;
      width: 400px;
      height: 40px;
      font-size: 20px;
      line-height: 18px;
      border: 1px solid #ccc;
      outline: none;
      background-color: rgb(228, 228, 228);
      
    }
  }

  .loginning {
    margin-top: 50px;
    text-align: center;
    display: inline-block;
    width: 80px;
    height: 50px;
    background-color: #409eff;
    border-radius: 5px;
    a {
      line-height: 48px;
      font-size: 18px;
      color: #fff;
    }
  }
}
</style>