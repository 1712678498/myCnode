<template>
  <div class="home">
    <div class="box">
      <div class="left">
        <Panel>
          <template #header>
            <div class="nav-top">
              <li><router-link to="/">首页</router-link></li>
              <li><router-link to="/good">精华</router-link></li>
              <li><router-link to="/share">分享</router-link></li>
              <li><router-link to="/ask">问答</router-link></li>
              <li><router-link to="/job">招聘</router-link></li>
              <li><router-link to="/dev">客户端测试</router-link></li>
            </div>
          </template>
          <template #content>
            <div v-if="posts.length">
              <div class="post-item" v-for="post in posts" :key="post.id">
                <div class="item-content">
                  <router-link :to="userOther(post.author.loginname)">
                    <img
                      class="avatar"
                      :title="post.author.loginname"
                      :src="post.author.avatar_url"
                      alt=""
                  /></router-link>
                  <div class="info">
                    <span class="tab" :class="post | isColor">{{
                      post | getPostChineseTab
                    }}</span>
                    <span class="title" @click="getAuthor(post.id)">
                      {{ post.title }}
                    </span>
                  </div>
                </div>
                <div class="reply-content">
                  <span class="reply_count">回复 {{ post.reply_count }}</span>
                  <span class="visit_count">阅读 {{ post.visit_count }}</span>
                  <span class="visit_time"
                    >{{ $moment(post.last_reply_at).fromNow(true) }}前</span
                  >
                </div>
              </div>
            </div>
          </template>
        </Panel>
        <div class="pagination">
          <el-pagination
            :current-page="currentPages"
            @current-change="paginationClick"
            background
            layout="prev, pager, next"
            :total="600"
          >
          </el-pagination>
        </div>
      </div>
      <div class="right">
        <Panel
          v-if="!$route.path.includes('login')"
          class="right"
          width="300px"
        >
          <template #header>
            <span v-if="myInfo">个人信息</span>
            <span v-else>CNode：Node.js专业中文社区</span>
          </template>
          <template #content>
            <div class="content-box" v-if="myInfo">
              <div class="content-item-1">
                <router-link :to="user"
                  ><img :src="myInfo.avatar_url" alt=""
                /></router-link>
              </div>
              <div class="content-item-2">
                <span>{{ myInfo.loginname }}</span>
              </div>
              <div class="content-item-3">
                <i>“这个家伙很懒，什么都没有留下”</i>
              </div>
            </div>
            <div class="content-item-3" v-else>
              <p>你可以点击下面的按钮登录QAQ</p>
              <div class="loginning">
                <router-link to="/login">登录</router-link>
              </div>
            </div>
          </template>
        </Panel>
        <Panel class="thissrc" v-if="isLogin">
          <template #content>
            <div class="comments-add">
              <router-link to="/topic/create">发布话题</router-link>
            </div>
          </template>
        </Panel>
      </div>
    </div>
    
  </div>
</template>

<script>
import Panel from "../layout/Panel.vue";
export default {
  components: { Panel},
  name: "Home",
  data() {
    return {
      currentPages: 1,
      posts: [],
      isColor: "",
    };
  },
  async created() {
    this.$store.commit("getMyInfo", this.myInfo);
    sessionStorage.removeItem("userId");
    const token = sessionStorage.getItem("token");
    if (token !== null) {
      this.$store.dispatch("getMyInfo", token);
    }

    // const pageCount = await this.$axios.get(`/topics?tab=good`);
    // console.log(pageCount);
  },
  methods: {
    getAuthor(id) {
      sessionStorage.setItem("userId", id);
      this.$axios.get(`/topic/${id}`);
      this.$store.dispatch("UserPage", id);
      this.$router.push(`/topic/${id}`);
    },
    userOther(name) {
      // sessionStorage.setItem("userName",name)
      // console.log();
      return "/user/" + name;
    },
    async paginationClick(page) {
      const currentTab = this.$route.path;
      const a = currentTab.replace("/", "");
      const res = await this.$axios.get(
        `/topics?page=${page}&limit=40&tab=${a}`
      );
      this.posts = res.data;
      this.currentPages = page;
    },
  },
  watch: {
    tab: {
      async handler(newValue) {
        const queryTab = newValue ? `&tab=${newValue}` : "";
        const res = await this.$axios.get(`/topics?page=1&limit=40${queryTab}`);
        this.posts = res.data;
        this.currentPages = 1;
      },

      immediate: true,
    },
  },
  computed: {
    user() {
      const res = this.$store.state.myInfo.loginname;
      return "/user/" + res;
    },
    isLogin() {
      const res = sessionStorage.getItem("isLogin");
      return res;
    },
    //  ecf878d1-6052-476a-8262-824760c7872b
    myInfo() {
      return this.$store.state.myInfo;
    },
    tab() {
      return this.$route.params.tab;
    },
  },
};
</script>
<style lang="less">
// scoped
.thissrc .header {
  display: none;
}
.box {
  // margin: 15px auto;
  // display: flex;
  .left {
    .nav-top {
      background-color: #fff;
      height: 60px;
      border-radius: 3px;
      margin-bottom: 20px;
      height: 60px;
      display: flex;
      li {
        display: inline-block;
        list-style-type: none;
        margin-right: 20px;
        line-height: 60px;
        text-align: center;
        .router-link-exact-active.router-link-active {
          color: #409eff;
          border-bottom: #409eff 1px solid;
        }
        a {
          font-size: 16px;
          color: #9d9d9d;
          padding: 20px;
        }
      }
    }
    .post-item {
      padding: 10px;
      display: flex;
      justify-content: space-between;
      border-top: #ccc 1px solid;
      background-color: #fff;
      .item-content {
        display: flex;
        align-items: center;
        .avatar {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          border: #409eff 2px solid;
        }
        .tab {
          margin: 0 5px;
        }
        .info {
          display: flex;
          align-items: center;
          justify-content: start;

          .title {
            width: 600px;
            display: block;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            // 超出隐藏，变为三个点
          }
        }
      }
      .reply-content {
        color: #9d9d9d;
        display: flex;
        align-items: center;
        white-space: nowrap;
        span {
          margin-right: 5px;
          font-size: 13px;
        }
        .visit_time {
          color: #000;
        }
      }
    }
    .pagination {
      background-color: #fff;
      padding-top: 20px;
      margin: 10px 0;
      height: 50px;
    }
  }
  .right {
    .thissrc {
      margin-top: 20px;
      .content {
        background-color: #fff;
        padding: 20px;
        .comments-add {
          margin: 0 auto;
          text-align: center;
          width: 80px;
          height: 40px;
          padding: 0px 3px;
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
</style>
