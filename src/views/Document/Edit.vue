<template>
<div id="top-container">
  <p>zzy's edit</p>
  <p>
    <a href="./index.html">&lt;&lt; 回到工作台</a>
  </p>
  <div v-html="valueHtml"></div>
  <div>{{valueHtml}}</div>
</div>
<div style="border-bottom: 1px solid #e8e8e8;">
  <Toolbar
      id="editor-toolbar"
      style="border-bottom: 1px solid #ccc"
      :editor="editorRef"
      :defaultConfig="toolbarConfig"
      :mode="mode"
  />
</div>
<div id="content">
  <div id="editor-container">
    <div id="title-container">
      <input v-model="title">
    </div>
    <Editor
        id = "editor-text-area"
        v-model="valueHtml"
        :defaultConfig="editorConfig"
        :mode="mode"
        @onCreated="handleCreated"
        @onChange="change"
    />
  </div>
</div>

</template>

<script>
import '@wangeditor/editor/dist/css/style.css' // 引入 css
import { onBeforeUnmount, ref, shallowRef, onMounted } from 'vue'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import axios from "axios";
export default {
  components: { Editor, Toolbar },
  data(){
    return {
      valueHtml : "<p>开始编辑文件</p>",
      title : "空文件",
    };
  },
  setup() {
    // 创建一个跟踪自身 .value 变化的 ref，但不会使其值也变成响应式的。
    const editorRef = shallowRef()
    // 内容 HTML,创建一个ref
    // const valueHtml = ref('<h1>123</h1>')
    // 模拟 ajax 异步获取内容
    // onMounted(() => {
    //   setTimeout(() => {
    //     valueHtml.value = '<p>模拟 Ajax 异步设置内容</p>'
    //   }, 1500)
    // })
    // 组件销毁时，也及时销毁编辑器
    onBeforeUnmount(() => {
      const editor = editorRef.value
      if (editor == null) return
      editor.destroy()
    })

    const toolbarConfig = {
      excludeKeys: 'fullScreen',
    }
    const editorConfig = {
      scroll: false, // 禁止编辑器滚动
    }
    const handleCreated = (editor) => {
      editorRef.value = editor // 记录 editor 实例，重要！
    }

    return {
      editorRef,
      // valueHtml,
      mode: 'default', // 或 'simple'
      toolbarConfig,
      editorConfig,
      handleCreated
    };
  },
  mounted() {
    this.getDoc();
  },
  methods: {
    getDoc(){
      this.$axios.get("document",{
        params:{
          userId : this.$store.state.loginUser.userId,
          docId : this.$route.params.documentId,
        }
      }).then((response)=>{
        if(response.status === 200){
          this.$data.valueHtml = response.data;
        }else{
          console.log("请求错误");
        }
      }).catch((err) => {
        console.log("请求错误");
      });
    },
    save(){
      this.$axios.post("document/save",{
        "content" : valueHtml,
        "docId" : this.$route.params.documentId,
        "userId" : this.$store.state.loginUser.userId,
      }).then((response)=>{
        if(response.status === 200){
          //保存成功
        }else{
          console.log("请求错误");
        }
      }).catch((err) => {
        console.log("请求错误");
      });
    },
    change(){
      console.log('onchange!');
    },
  },
}
</script>

<style scoped>
html,
body {
  background-color: #fff;
  height: 100%;
  overflow: hidden;
  color: #333;
}

#top-container {
  border-bottom: 1px solid #e8e8e8;
  padding-left: 30px;
}

#editor-toolbar {
  width: 1350px;
  background-color: #FCFCFC;
  margin: 0 auto;
}

#content {
  height: calc(100% - 40px);
  background-color: rgb(245, 245, 245);
  overflow-y: auto;
  position: relative;
}

#editor-container {
  width: 850px;
  margin: 30px auto 150px auto;
  background-color: #fff;
  padding: 20px 50px 50px 50px;
  border: 1px solid #e8e8e8;
  box-shadow: 0 2px 10px rgb(0 0 0 / 12%);
}

#title-container {
  padding: 20px 0;
  border-bottom: 1px solid #e8e8e8;
}

#title-container input {
  font-size: 30px;
  border: 0;
  outline: none;
  width: 100%;
  line-height: 1;
}

#editor-text-area {
  min-height: 900px;
  margin-top: 20px;
}
</style>