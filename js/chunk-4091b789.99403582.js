(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-4091b789"],{a09e:function(t,e,n){"use strict";n("a112")},a112:function(t,e,n){},d879:function(t,e,n){"use strict";n.r(e);var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"Create"},[n("div",{staticClass:"box"},[n("div",{staticClass:"left"},[n("Panel",{scopedSlots:t._u([{key:"header",fn:function(){return[n("div",{staticClass:"nav-top"},[n("li",[n("router-link",{staticStyle:{color:"#409eff","padding-right":"0"},attrs:{to:"/"}},[t._v("主页")])],1),n("li",{staticStyle:{margin:"0",color:"#9d9d9d"}},[t._v("/")]),n("li",[n("a",[t._v("发布话题")])])])]},proxy:!0},{key:"content",fn:function(){return[n("div",{staticClass:"topic-content"},[n("div",{staticClass:"plate"},[n("span",[t._v("请选择模块：")]),n("el-select",{attrs:{placeholder:"请选择"},model:{value:t.value,callback:function(e){t.value=e},expression:"value"}},t._l(t.options,(function(t){return n("el-option",{key:t.value,attrs:{label:t.label,value:t.value}})})),1)],1),n("div",{staticClass:"headline"},[n("input",{directives:[{name:"model",rawName:"v-model",value:t.headlineContent,expression:"headlineContent"}],attrs:{type:"text",placeholder:"请输入标题"},domProps:{value:t.headlineContent},on:{input:function(e){e.target.composing||(t.headlineContent=e.target.value)}}})]),n("div",{staticClass:"tiny"},[n("Editor",{attrs:{"api-key":"9mieih2cqsubf30b1omff3w107ojvjfvzhmb7haq4giiy754",init:t.editorInit},model:{value:t.tinymceHtml,callback:function(e){t.tinymceHtml=e},expression:"tinymceHtml"}}),n("el-button",{attrs:{type:"primary"},on:{click:function(e){return t.newTopic()}}},[t._v("发送")])],1)])]},proxy:!0}])})],1),n("div",{staticClass:"right"},[n("Panel",{scopedSlots:t._u([{key:"header",fn:function(){return[n("span",[t._v("Markdown 语法参考")])]},proxy:!0},{key:"content",fn:function(){return[n("div",{staticClass:"content-box"},[n("li",[n("tt",[t._v(" ### 单行的标题")])],1),n("li",[n("tt",[t._v(" **粗体**")])],1),n("li",[n("tt",[t._v("`console.log('行内代码')` ")])],1),n("li",[n("tt",[t._v(" ```js\\n code \\n``` 标记代码块")])],1),n("li",[n("tt",[t._v(" [内容](链接)")])],1),n("li",[n("tt",[t._v("![文字说明](图片链接)")])],1)])]},proxy:!0}])}),n("Panel",{staticClass:"right-down",scopedSlots:t._u([{key:"header",fn:function(){return[n("span",[t._v("话题发布指南")])]},proxy:!0},{key:"content",fn:function(){return[n("div",{staticClass:"content-box"},[n("li",[n("tt",[t._v("尽量把话题要点浓缩到标题里")])],1),n("li",[n("tt",[t._v(" 代码含义和报错可在SegmentFault提问")])],1)])]},proxy:!0}])})],1)])])},i=[],l=n("1da1"),o=(n("96cf"),n("ca72")),s=n("89d7"),r={components:{Panel:s["a"],Editor:o["a"]},data:function(){return{editorInit:{language:"zh_CN",height:300,menubar:!1,branding:!1,statusbar:!1,plugins:"preview searchreplace autolink directionality visualblocks visualchars fullscreen image link media template code bbcode codesample table charmap hr pagebreak nonbreaking anchor insertdatetime advlist lists wordcount imagetools textpattern help autosave bbcode",toolbar:["bold italic underline | alignleft aligncenter alignright alignjustify outdent indent | bullist numlist blockquote"]},options:[{value:"ask",label:"分享"},{value:"share",label:"问答"},{value:"job",label:"招聘"},{value:"dev",label:"客户端测试"}],value:"",headlineContent:"",tinymceHtml:""}},methods:{newTopic:function(){var t=this;return Object(l["a"])(regeneratorRuntime.mark((function e(){var n;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(n=sessionStorage.getItem("token"),!(t.value&&t.headlineContent&&t.tinymceHtml)){e.next=7;break}return e.next=4,t.$axios.post("/topics",{accesstoken:n,title:t.headlineContent,tab:t.value,content:t.tinymceHtml});case 4:t.$router.push("/"),e.next=8;break;case 7:alert("有内容未填写");case 8:case"end":return e.stop()}}),e)})))()}}},c=r,u=(n("a09e"),n("2877")),d=Object(u["a"])(c,a,i,!1,null,"616fbe62",null);e["default"]=d.exports}}]);
//# sourceMappingURL=chunk-4091b789.99403582.js.map