<template>
  <div class="Create">
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
              <li><a>发布话题</a></li>
            </div>
          </template>
          <template #content>
            <div class="topic-content">
              <div class="plate">
                <span>请选择模块：</span>
                <el-select v-model="value" placeholder="请选择">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </div>
              <div class="headline">
                <input
                  type="text"
                  v-model="headlineContent"
                  placeholder="请输入标题"
                />
              </div>
              <div class="tiny">
                <Editor
                  api-key="9mieih2cqsubf30b1omff3w107ojvjfvzhmb7haq4giiy754"
                  :init="editorInit"
                  v-model="tinymceHtml"
                />
                <!-- <button @click="tinyMce()">发送</button> -->
                <el-button type="primary" @click="newTopic()">发送</el-button>
              </div>
            </div>
          </template>
        </Panel>
      </div>

      <div class="right">
        <Panel>
          <template #header>
            <span>Markdown 语法参考</span>
          </template>
          <template #content>
            <div class="content-box">
              <li><tt> ### 单行的标题</tt></li>
              <li><tt> **粗体**</tt></li>
              <li><tt>`console.log('行内代码')` </tt></li>
              <li><tt> ```js\n code \n``` 标记代码块</tt></li>
              <li><tt> [内容](链接)</tt></li>
              <li><tt>![文字说明](图片链接)</tt></li>
            </div>
          </template>
        </Panel>
        <Panel class="right-down">
          <template #header>
            <span>话题发布指南</span>
          </template>
          <template #content>
            <div class="content-box">
              <li><tt>尽量把话题要点浓缩到标题里</tt></li>
              <li><tt> 代码含义和报错可在SegmentFault提问</tt></li>
            </div>
          </template>
        </Panel>
      </div>
    </div>
  </div>
</template>

<script>
import Editor from "@tinymce/tinymce-vue";
import Panel from "../layout/Panel";
export default {
  components: {
    Panel,
    Editor,
  },

  data() {
    return {
      editorInit: {
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
      options: [
        {
          value: "ask",
          label: "分享",
        },
        {
          value: "share",
          label: "问答",
        },
        {
          value: "job",
          label: "招聘",
        },
        {
          value: "dev",
          label: "客户端测试",
        },
      ],
      value: "",
      headlineContent: "",
      tinymceHtml: "",
    };
  },
  methods: {
    async newTopic() {
      const token = sessionStorage.getItem("token");
      if (this.value && this.headlineContent && this.tinymceHtml) {
        await this.$axios.post(`/topics`, {
          accesstoken: token,
          title: this.headlineContent,
          tab: this.value,
          content: this.tinymceHtml,
        });
        this.$router.push("/");
      } else {
        alert("有内容未填写");
      }
    },
  },
};
</script>

<style lang="less" scoped>
.left {
  .topic-content {
    padding: 0 0px 30px;
    background-color: #fff;
    .plate {
      padding: 20px 20px;
    }
    .headline {
      text-align: center;
      margin-bottom: 20px;
      input {
        border: 1px solid #ccc;
        border-radius: 3px;
        width: 95%;
        height: 34px;
        font-size: 16px;
        line-height: 16px;
        outline: none;
      }
    }
    .tiny {
      padding: 10px 20px;
      overflow: hidden;
      button {
        margin-top: 30px;
        float: right;
      }
    }
  }
}
.right {
  .content-box {
    li {
      list-style-type: none;
      width: 100%;
    }
  }
  .right-down {
    margin-top: 20px;
  }
}
</style>