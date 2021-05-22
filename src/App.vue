<template>
  <div id="app">
    <div class="wrapper">
      <Header class="header" />
      <div class="main">
        <router-view />
      </div>
      <Footer class="footer" />
    </div>
  </div>
</template>

<script>
import Header from "./components/Header.vue";
import Footer from "./views/footer.vue";
import UserPage from "./views/UserPage";
export default {
  components: { Header, UserPage, Footer },
};
</script>

<style lang="less">
#app {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}
.wrapper {
  display: flex;
  flex-direction: column;
  min-height: 100%;
}
body {
  margin: 0;
  padding: 0;
  height: 100%;
  zoom: 80%;
  .content {
    margin: 0 auto;
    .markdown-text {
      p {
        img {
          display: inline-block;
          width: 100%;
        }
      }
    }
  }
  a {
    text-decoration: none;
  }
  background-image: url("https://res.gimmgimm.com/static2/images/bg.body.png?v=0.11");
  .header {
    flex: 0;
  }
  .main {
    flex: 1;
    width: 90%;
    max-width: 1400px;
    min-width: 960px;
    margin: 15px auto;
    min-height: 400px;
    .box {
      margin: 15px auto;
      margin-top: 40px;
      display: flex;
      .left {
        min-width: 1000px;
        margin-right: 50px;
        .info {
          span {
            display: inline-block;
          }
          .top {
            background-color: #80bd01;
            color: #fff;
            padding: 2px 4px;
            border-radius: 5px;
          }
          .good {
            background-color: #7fdbff;
            color: #fff;
            padding: 2px 4px;
            border-radius: 5px;
          }
          .share {
            background-color: #39cccc;
            color: #fff;
            padding: 2px 4px;
            border-radius: 5px;
          }
          .ask {
            background-color: #ffdc00;
            color: #fff;
            padding: 2px 4px;
            border-radius: 5px;
          }
          .job {
            background-color: #f012be;
            color: #fff;
            padding: 2px 4px;
            border-radius: 5px;
          }
        }
      }
      .right {
        width: 320px;
        height: 240px;
        background-color: #fff;
        border-radius: 5px;
        .header {
          height: 60px;
          line-height: 58px;
          color: #9d9d9d;
          background-color: #f6f6f6;
          border-radius: 5px;
          span {
            margin-left: 20px;
          }
        }
        .content {
          background-color: #fff;
          margin: 0 auto;
          padding: 10px;
          border-radius: 0 0 3px 3px;
          .markdown-text {
            p {
              img {
                display: inline-block;
                width: 100%;
              }
            }
          }
          .content-box {
            margin: 15px;
            .content-item-1 {
              float: left;
              width: 80px;
              height: 80px;
              img {
                width: 100%;
              }
            }
            .content-item-2 {
              span {
                padding: 20px;
                line-height: 80px;
                font-size: 18px;
                color: #9d9d9d;
              }
            }
            .content-item-3 {
              line-height: 24px;
              margin: 15px 0;
            }
          }
          .content-item-3 {
            p {
              text-align: center;
              line-height: 40px;
            }
            .loginning {
              // margin-top: 10px;
              // margin-left: 115px;
              margin: 0 auto;
              text-align: center;
              width: 80px;
              height: 40px;
              background-color: #409eff;
              border-radius: 5px;
              a {
                line-height: 38px;
                font-size: 18px;
                color: #fff;
              }
            }
          }
        }
      }
    }
  }
  .footer {
    flex: 0;
  }
}
</style>