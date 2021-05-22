<template>
  <div class="UserPage">
    <div class="box">
      <div class="left">
        <div class="left-content">
          <Panel>
            <template #header>
              <div class="topic_title">{{ userPage.title }}</div>
              <div class="topic_other_text">
                <span
                  >⚪发布于{{
                    $moment(userPage.create_at).fromNow(true)
                  }}前</span
                >
                <span v-if="userInfo">⚪作者 {{ userInfo.loginname }}</span>
                <span>⚪{{ userPage.visit_count }} 次浏览</span>
                <span>⚪来自 {{ userPage | getPostChineseTab }}</span>
              </div>
              <div class="collection">
                <el-button
                  v-if="!userPage.is_collect"
                  @click="collectionClick()"
                  >收藏</el-button
                >
                <el-button
                  v-if="userPage.is_collect"
                  @click="UncollectionClick()"
                  >取消收藏</el-button
                >
              </div>
              <hr />
            </template>
            <template #content>
              <div v-html="userPage.content"></div>
            </template>
          </Panel>
        </div>
        <div class="reply_content">
          <Panel>
            <template #header>
              <p class="content-item-2">{{ userPage.reply_count }} 个回复</p>
              <div
                class="replie-item"
                v-for="(replie, index) in userPage.replies"
                :key="replie.id"
              >
                <div class="user-face">
                  <router-link :to="userOther(replie.author.loginname)">
                    <img :src="replie.author.avatar_url" alt="" />
                  </router-link>
                </div>
                <div class="con">
                  <p class="name">{{ replie.author.loginname }}</p>
                  <p class="text" v-html="replie.content"></p>
                  <div class="info">
                    <span
                      :class="{ up_active: replie.is_uped }"
                      @click="like(replie.id)"
                    >
                      点赞
                    </span>
                    <h4 class="nums">
                      {{ replie.ups.length }}
                    </h4>
                    <span class="re" @click="replyClick(index)">回复</span>
                  </div>
                  <div class="re-box" ref="res">
                    <textarea
                      name=""
                      cols="80"
                      rows="5"
                      v-model="texta"
                    ></textarea>
                    <button @click="published(replie, index)">
                      发表<br />评论
                    </button>
                  </div>
                </div>
              </div>
            </template>
            <template #content>
              <p class="reply-add">发送一条友善的评论</p>
              <div class="tiny">
                <Editor
                  api-key="9mieih2cqsubf30b1omff3w107ojvjfvzhmb7haq4giiy754"
                  :init="editorInit"
                  v-model="tinymceHtml"
                />
                <button @click="tinyMce()">发送</button>
              </div>
            </template>
          </Panel>
        </div>
      </div>

      <div class="right">
        <Panel
          v-if="!$route.path.includes('login')"
          class="right"
          width="300px"
        >
          <template #header>
            <span>
              <span v-if="userInfo">作者</span>
              <span v-else>个人信息</span>
            </span>
          </template>
          <template #content>
            <div class="content-box" v-if="userInfo">
              <div class="content-item-1">
                <img :src="userInfo.avatar_url" alt="" />
              </div>
              <div class="content-item-2">
                <span>{{ userInfo.loginname }}</span>
              </div>
            </div>
          </template>
        </Panel>
      </div>
    </div>
  </div>
</template>

<script>
import Editor from "@tinymce/tinymce-vue";
import Panel from "../layout/Panel.vue";
export default {
  name: "UserPage",
  components: { Panel, Editor },
  data() {
    return {
      texta: "",
      tinymceHtml: "",
      editorInit: {
        // language_url: "/static/tinymce/zh_CN.js", //你下载的语言包的路径
        language: "zh_CN",
        height: 300,
        // max_height: 700,
        menubar: false, //隐藏默认菜单栏
        branding: false, //隐藏右下角商标
        statusbar: false,
        plugins:
          "preview searchreplace autolink directionality visualblocks visualchars fullscreen image link media template code bbcode codesample table charmap hr pagebreak nonbreaking anchor insertdatetime advlist lists wordcount imagetools textpattern help autosave bbcode", //这里所有的插件需要先引入，否则会报错
        //toolbar 数组的每一项代表每一行,超出会换行, | 代表分组，每个插件用空格隔开
        toolbar: [
          "bold italic underline | alignleft aligncenter alignright alignjustify outdent indent | bullist numlist blockquote",
        ],
      },
    };
  },
  async created() {
    const userId = sessionStorage.getItem("userId");
    this.$store.dispatch("UserPage", userId);
  },
  methods: {
    // 回复按钮点击事件
    replyClick(index) {
      const isLogin = sessionStorage.getItem("isLogin");
      if (isLogin) {
        const _reply = this.$refs.res[index];
        for (let i = 0; i < this.$refs.res.length; i++) {
          this.$refs.res[i].setAttribute("class", "re-box");
        }
        if (_reply.getAttribute("class") === "re-box") {
          _reply.setAttribute("class", "active");
        } else {
          _reply.setAttribute("class", "re-box");
        }
      } else {
        alert("回复前请先登录");
      }
    },
    // 回复按钮下发送评论事件
    async published(item, index) {
      const userId = sessionStorage.getItem("userId");
      const token = sessionStorage.getItem("token");
      await this.$axios.post(`/topic/${userId}/replies`, {
        // reply_id: "5fdb4a8a0f99cbc8325e341e",
        accesstoken: token,
        // reply_id: replyUserID,
        content: `@${item.author.loginname}` + this.texta,
        reply_id: item.id,
      });
      this.$store.dispatch("UserPage", userId);
      this.texta = "";
      console.log(index);
      this.$refs.res[index].setAttribute("class", "re-box");
    },
    async collectionClick() {
      const isLogin = sessionStorage.getItem("isLogin");
      if (isLogin) {
        const userId = sessionStorage.getItem("userId");
        const token = sessionStorage.getItem("token");
        await this.$axios.post("/topic_collect/collect", {
          accesstoken: token,
          topic_id: userId,
        });
        this.$store.dispatch("UserPage", userId);
      } else {
        alert("收藏前请先登录");
      }
    },
    async UncollectionClick() {
      const isLogin = sessionStorage.getItem("isLogin");
      if (isLogin) {
        const userId = sessionStorage.getItem("userId");
        const token = sessionStorage.getItem("token");
        await this.$axios.post("/topic_collect/de_collect ", {
          accesstoken: token,
          topic_id: userId,
        });
        this.$store.dispatch("UserPage", userId);
      } else {
        alert("取消收藏前请登录");
      }
    },
    userOther(name) {
      return "/user/" + name;
    },
    async like(id) {
      const userId = sessionStorage.getItem("userId");
      const token = sessionStorage.getItem("token");
      const isLogin = sessionStorage.getItem("isLogin");
      if (isLogin) {
        await this.$axios
          .post(`/reply/${id}/ups?accesstoken=${token}`)
          .catch(() => {
            alert("不能给自己点赞");
          });
        this.$store.dispatch("UserPage", userId);
        this.$store.state.getUserPage;
      } else {
        alert("点赞前请先登录");
      }
    },
    async tinyMce() {
      var activeEditor = tinymce.activeEditor;
      var editBody = activeEditor.getBody();
      activeEditor.selection.select(editBody);
      var text = activeEditor.selection.getContent({ format: "text" });
      // console.log(text);

      const userId = sessionStorage.getItem("userId");
      const token = sessionStorage.getItem("token");
      // const replyUserID = item.id;
      // console.log("我是文章ID：" + userId);
      // console.log("我是评论ID：" + replyUserID);
      await this.$axios.post(`/topic/${userId}/replies`, {
        // reply_id: "5fdb4a8a0f99cbc8325e341e",
        accesstoken: token,
        // reply_id: replyUserID,
        content: text,
      });
      this.$store.dispatch("UserPage", userId);
      this.tinymceHtml = "";
    },
  },
  computed: {
    userPage() {
      // console.log(this.$store.state.getUserPage);
      return this.$store.state.getUserPage;
    },
    userInfo() {
      return this.$store.state.userInfo;
    },
    clearUserInfo() {
      return this.$route.path;
    },
  },
  watch: {
    clearUserInfo: {
      handler(newValue) {
        if (!newValue.includes("topic")) {
          this.$store.state.userInfo = null;
        }
      },
    },
  },
};
</script>

<style scoped  lang="less">
body {
  background-color: #e1e1e1;
  .box {
    // display: flex;
    .left {
      .left-content {
        padding: 25px;
        box-sizing: border-box;
        background-color: #fff;
        .topic_title {
          padding: 10px 2px;
          font-size: 35px;
          font-weight: 700;
          line-height: 30px;
        }
        .topic_other_text {
          color: #9d9d9d;
          font-size: 12px;
          margin: 10px;
        }
      }
      .reply_content {
        padding: 25px;
        overflow: hidden;
        .content-item-2 {
          margin-top: 20px;
          line-height: 20px;
          font-size: 18px;
          color: #000;
        }
        .replie-item {
          border-top: 1px solid #f0f0f0;
          padding-right: 10px;
          background-color: #fff;
          display: flex;
          .user-face {
            margin: 14px 0 0 5px;
            width: 48px;
            height: 48px;
            float: left;
            position: relative;
            img {
              border-radius: 50%;
              position: absolute;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);
              width: 100%;
              height: 100%;
            }
          }
          .con {
            margin-left: 20px;
            .name {
              line-height: 18px;
              font-weight: bold;
              font-size: 14px;
            }
            .info {
              color: #99a2aa;
              font-size: 14px;
              padding-bottom: 20px;
              .nums {
                margin: 0;
                display: inline-block;
                padding-left: 3px;
              }
              .re {
                margin-left: 15px;
              }
            }
            .active {
              display: block;
              position: relative;
              margin-bottom: 20px;
              textarea {
                padding: 5px 10px;
                border: 1px solid #e5e9ef;
                background-color: #f4f5f7;
                resize: none;
              }
              button {
                width: 80px;
                height: 90px;
                position: absolute;
                right: -90px;
                top: 0;
                padding: 4px 15px;
                font-size: 16px;
                color: #fff;
                letter-spacing: 2px;
                border-radius: 4px;
                text-align: center;
                min-width: 60px;
                vertical-align: top;
                cursor: pointer;
                background-color: #00a1d6;
                border: 1px solid #00a1d6;
                transition: 0.1s;
                user-select: none;
                outline: none;
                line-height: 30px;
              }
            }
            .re-box {
              display: none;
              // position: relative;
              // margin-bottom: 20px;
              // textarea {
              //   padding: 5px 10px;
              //   border: 1px solid #e5e9ef;
              //   background-color: #f4f5f7;
              //   resize: none;
              // }
              // button {
              //   width: 80px;
              //   height: 90px;
              //   position: absolute;
              //   right: -90px;
              //   top: 0;
              //   padding: 4px 15px;
              //   font-size: 16px;
              //   color: #fff;
              //   letter-spacing: 2px;
              //   border-radius: 4px;
              //   text-align: center;
              //   min-width: 60px;
              //   vertical-align: top;
              //   cursor: pointer;
              //   background-color: #00a1d6;
              //   border: 1px solid #00a1d6;
              //   transition: 0.1s;
              //   user-select: none;
              //   outline: none;
              //   line-height: 30px;
              // }
            }
            .up_active {
              color: #409eff;
            }
          }
        }
        .reply-add {
          margin-top: 20px;
          line-height: 20px;
          font-size: 18px;
          color: #000;
        }
        .tiny {
          margin: 0 auto;
          text-align: center;
          button {
            display: block;
            width: 70px;
            height: 30px;
            border: 1px solid #00a1d6;
            background-color: #00a1d6;
            padding: 4px 15px;
            border-radius: 4px;
            color: #fff;
          }
        }
      }
    }
    .reply_content {
      margin-top: 40px;
      background-color: #fff;
    }
  }
}
</style>