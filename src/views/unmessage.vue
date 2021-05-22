<template>
  <div class="unmessage">
    <div class="box">
      <div class="left">
        <Panel>
          <template #header>
            <div class="nav-top">
              <li>
                <router-link to="/" style="color: #409eff">主页</router-link>
              </li>
              <li style="margin: 0; color: #9d9d9d">/</li>
              <li><a>新消息</a></li>
            </div>
            <div class="unReadText-item unReadText-item-1">
              <div v-if="notRead === []">
                <div v-for="notReadArr in notRead" :key="notReadArr.id">
                  用户"
                  <span>{{ notReadArr.author.loginname }}</span>
                  "在话题《
                  <span>{{ notReadArr.topic.title }}</span>
                  》中说"
                  <span
                    v-html="notReadArr.reply.content"
                    style="display: inline-block"
                  ></span>
                  "
                  <button @click="Readed(notReadArr.id)">已读</button>
                </div>
              </div>
              <div v-else>
                <p>无未读消息</p>
              </div>
            </div>
          </template>
          <template #content>
            <div class="nav-top">
              <li><a>过往信息</a></li>
            </div>
            <div class="unReadText-item unReadText-item-2">
              <div v-if="Read">
                <div v-for="ReadArr in Read" :key="ReadArr.id">
                  用户"
                  <span>{{ ReadArr.author.loginname }}</span>
                  "在话题《
                  <span>{{ ReadArr.topic.title }}</span>
                  》中提到了你
                </div>
              </div>
              <div v-else>
                <p>无过往信息</p>无过往信息
              </div>
            </div>
          </template>
        </Panel>
      </div>

      <div class="right">
        <Panel class="right" width="300px">
          <template #header>
            <span v-if="myInfo">个人信息</span>
          </template>
          <template #content>
            <div class="content-box" v-if="myInfo">
              <div class="content-item-1">
                <img :src="myInfo.avatar_url" alt="" />
              </div>
              <div class="content-item-2">
                <span>{{ myInfo.loginname }}</span>
              </div>
              <div class="content-item-3">
                <i>“这个家伙很懒，什么都没有留下”</i>
              </div>
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
  components: { Panel },
  async created() {
    this.$store.commit("getMyInfo", this.myInfo);
    const token = sessionStorage.getItem("token");
    if (token !== null) {
      this.$store.dispatch("getMyInfo", token);
    }
    const res = await this.$axios.get(`/messages?accesstoken=${token}`);
    // const token = sessionStorage.getItem("token");
    // console.log(res.data.hasnot_read_messages);
    const notReadArr = res.data.hasnot_read_messages;
    const ReadArr = res.data.has_read_messages;
    this.notRead = notReadArr;
    this.Read = ReadArr;
  },
  data() {
    return {
      notRead: null,
      Read: null,
    };
  },
  methods: {
    // async aa() {
    //   const token = sessionStorage.getItem("token");
    //   const res = await this.$axios.get(`/messages?accesstoken=${token}`);
    //   const not = res.data.hasnot_read_messages;
    //   console.log(not);
    // },
    async Readed(id) {
      const token = sessionStorage.getItem("token");
      const res = await this.$axios.post(
        `/message/mark_one/${id}?accesstoken=${token}`
      );
      console.log(res);
    },
  },
  computed: {
    myInfo() {
      return this.$store.state.myInfo;
    },
  },
};
</script>

<style scoped lang="less">
.box {
  .left {
    .unReadText-item{
      background-color: #fff;
      padding: 50px 20px;
      border-radius: 5px;
      margin-bottom: 20px;
    }
  }
}
</style>