<template>
  <div class="userDetails">
    <div class="box">
      <div class="left">
        <Panel>
          <template #header>
            <div class="nav-top">
              <li>
                <router-link to="/" style="color: #409eff; padding-right: 0"
                  >主页</router-link
                >
              </li>
              <li style="margin: 0; color: #9d9d9d">/</li>
              <li><a>用户详情</a></li>
            </div>
          </template>
          <template #content>
            <div class="user-details-content">
              <div class="user_head">
                <img :src="value.avatar_url" alt="" />
              </div>
              <div class="user_right">
                <span class="user_name">{{ value.loginname }}</span>
                <span class="create_time"
                  >注册{{ $moment(value.create_at).fromNow(true) }}</span
                >
                <span class="scores"
                  ><span style="color: #409eff">积分：</span>
                  {{ value.score }}</span
                >
                <span class="user-collection">
                  <span>{{ collection.length }}个话题收藏</span>
                </span>
              </div>
            </div>
          </template>
        </Panel>
        <Panel>
          <template #header>
            <div class="nav-top">
              <li><a>最近创建的话题</a></li>
            </div>
          </template>
          <template #content>
            <div v-if="value.recent_topics">
              <div
                class="post-item"
                v-for="post in value.recent_topics"
                :key="post.id"
              >
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
        <Panel style="margin-top: 20px">
          <template #header>
            <div class="nav-top">
              <li><a>最近参与的话题</a></li>
            </div>
          </template>
          <template #content>
            <div v-if="value.recent_replies">
              <div
                class="post-item"
                v-for="post in value.recent_replies"
                :key="post.id"
              >
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
      </div>
      <div class="right">
        <Panel>
          <template #header>
            <span v-if="value">个人信息</span>
          </template>
          <template #content>
            <div v-if="value" class="content-box">
              <div class="content-item-1">
                <img :src="value.avatar_url" alt="" />
              </div>
              <div class="content-item-2">
                <span>{{ value.loginname }}</span>
              </div>
              <div class="content-item-3">
                <i>“这个家伙很懒，什么都没有留下”</i>
              </div>
            </div>
          </template>
        </Panel>
        <Panel class="thissrc">
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
import Panel from "../layout/Panel";
export default {
  name: "userDetails",
  data() {
    return {
      value: "",
      collection: "",
    };
  },
  components: {
    Panel,
  },
  async created() {
    this.$store.commit("getMyInfo", this.myInfo);
    const token = sessionStorage.getItem("token");
    this.$store.dispatch("getMyInfo", token);
    const userD = this.$route.params.loginname;
    const res = await this.$axios.get(`/user/${userD}`);
    this.value = res.data;
    const coll = await this.$axios.get(`topic_collect/${userD}`);
    this.collection = coll.data;
    console.log(this.collection);
  },
  methods: {
    userOther(name) {
      return "/user/" + name;
    },
  },
  computed: {
    myInfo() {
      return this.$store.state.myInfo;
    },
  },
};
</script>

<style lang="less" scoped>
.left {
  .user-details-content {
    background-color: #fff;
    display: flex;
    padding: 10px 20px;
    margin-bottom: 20px;
    .user_head {
      img {
        border-radius: 50%;
        width: 80px;
        height: 80px;
      }
    }
    .user_right {
      margin-left: 50px;
      .user_name {
        font-size: 20px;
        line-height: 20px;
        font-weight: 700;
        padding-top: 20px;
        display: inline-block;
      }
      .create_time {
        margin: 0 8px;
        display: inline-block;
        border: solid 1px #99a2aa;
        border-radius: 5px;
        padding: 2px 4px;
        color: #99a2aa;
      }
      .scores {
        display: inline-block;
        margin-left: 20px;
        color: #525354;
      }
      .user-collection{
          margin-left: 20px;
          color: #99a2aa;
      }
    }
  }
}
</style>