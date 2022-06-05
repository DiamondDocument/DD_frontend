<template>
<div id="top-container">
  <div class = "top-ele" style="margin-left: 20px;margin-right: 20px">
    <el-button  icon="House"  @click = "$router.push({name:'table',params:{info: $store.state.tableInfo}})" />
  </div>
  <div class = "top-ele" style="text-align: center;min-width: 100px;margin-right: auto  ">{{ title }}</div>
<!--  <div class = "top-ele" style="margin-right: 20px;"><el-avatar size="small" shape="square"></el-avatar></div>-->
  <div class = "top-ele"><el-button @click = "$router.push({name:'table',params:{info: $store.state.tableInfo}})"> 分享 </el-button></div>
  <div class = "top-ele"><el-button @click = "save"> 保存 </el-button></div>
  <div class = "top-ele"><el-button @click = "exportFile"> 导出 </el-button></div>
<!--  <div v-html="valueHtml"></div>-->
<!--  <div>{{valueHtml}}</div>-->
</div>
<!--  <div v-html="valueHtml"></div>-->
<!--  <div>{{valueHtml}}</div>-->
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
<el-drawer v-model="drawerDisplay" :show-close="false">
  <template #title>
    <h4 >xxx 文档的评论</h4>
    <el-button  @click = "displayNewComment = true" text><el-icon size="20px"><CirclePlus /></el-icon></el-button>
  </template>
  <div id="comment-area" v-if="displayNewComment">
    <el-input
        v-model="commentContent"
        :autosize="{ minRows: 2, maxRows: 4 }"
        type="textarea"
        placeholder="请输入评论内容..."
    />
    <div style="display: flex;margin-top: 10px">
      <el-button style="margin-right:10px;margin-left: auto"  @click = "" text>
        <el-icon size="20px"><Position /></el-icon>
      </el-button>
    </div>
  </div>
  <div id="comment-list" style="margin-top: 30px">
    <el-collapse v-model="activeNames" @change="handleChange">
      <el-collapse-item  name="1">
        <template #title>
          <el-avatar :size="30" src="http://43.138.71.108/api/url/?location=./DD_file/user/avatar/Iamzzy.jpg" /><div style="margin-left: 20px">Consistency</div>
        </template>
        <div v-html="commentContent">

        </div>
        <div style="display: flex">
          <el-popconfirm title="你确定要删除此评论?">
            <template #reference>
              <el-button style="margin-right:10px;margin-left: auto" size="small"  @click = "displayDeletePop=true" text>
                <el-icon size="10px"><CloseBold /></el-icon>
              </el-button>
            </template>
          </el-popconfirm>
        </div>

      </el-collapse-item>
      <el-collapse-item title="Feedback" name="2">
        <div>
          Operation feedback: enable the users to clearly perceive their
          operations by style updates and interactive effects;
        </div>
        <div>
          Visual feedback: reflect current state by updating or rearranging
          elements of the page.
        </div>
      </el-collapse-item>
    </el-collapse>
  </div>
  </el-drawer>
  <div >{{valueHtml}}</div>
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
      title : "空文件空文件空文件",
      auth: 2,
      drawerDisplay : true,
      commentContent : "",
      displayNewComment : false,
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
      MENU_CONF: {
        uploadImage: {
          // server: 'http://localhost/api/document/img',
          async customUpload(file, insertFn) {
            let form = new FormData();
            form.append("file",file);
            axios.post("document/img", form).then((response)=>{
              if(response.status === 200 && response.data.code === 0 ){
                console.log(response.data);
                console.log(insertFn);
                insertFn(response.data.url);
              }
                //http没有返回200

            }).catch((err)=>{
              //报错
            });
            // file 即选中的文件
            // 自己实现上传，并得到图片 url alt href
            // 最后插入图片

          },
          fieldName: 'custom-fileName',
          onProgress(progress) {
            console.log('onProgress', progress)
          },
          onSuccess(file, res) {
            console.log('onSuccess', file, res)
          },
          onFailed(file, res) {
            alert(res.message)
            console.log('onFailed', file, res)
          },
          onError(file, err, res) {
            alert(err.message)
            console.error('onError', file, err, res)
          },
        }
      }
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
      console.log("发送获取文档请求...");
      this.$axios.get("/document/content",{
        params:{
          // userId : this.$store.state.loginUser.userId,
          userId : 'Iamzzy',
          docId : this.$route.params.documentId,
        }
      }).then((response)=>{
        console.log("请求完毕");
        if(response.status === 200){
          if(response.data.code === 0){
            this.$data.valueHtml = response.data.content;
          }else{
            console.log("请求错误");
          }
        }else{
          console.log("请求错误");
        }
      }).catch((err) => {
        console.log("请求错误");
      });
    },
    save(){
      this.$axios.post("document/save",{
        "content" : this.valueHtml,
        "docId" : this.$route.params.documentId,
        // "userId" : this.$store.state.loginUser.userId,
        "userId" : 'Iamzzy',
      }).then((response)=>{
        if(response.status === 200){
          if(response.data.code === 0){
            console.log("保存成功");
          }else{
            console.log("请求错误");
          }
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
    exportFile(){
      console.log("发送导出文档请求...");
      this.$axios.get("/document/export",{
        params:{
          docId : this.$route.params.documentId,
        }
      }).then((response)=>{
        console.log("请求完毕");
        if(response.status === 200){
          if(response.data.code === 0){
            console.log("导出成功");
            this.$axios.get(response.data.download, {responseType: 'blob'}).then((response)=>{
              if(response.status === 200){
                let fileURL = window.URL.createObjectURL(new Blob([response.data]));
                let fileLink = document.createElement('a');
                fileLink.href = fileURL;
                fileLink.setAttribute('download', response.headers['content-disposition'].split('filename=')[1]);
                document.body.appendChild(fileLink);
                console.log();
                fileLink.click();
              }else console.log("请求错误status");
            }).catch((err) => {
              console.log("请求错误");
            });
          }else{
            console.log("请求错误");
          }
        }else{
          console.log("请求错误");
        }
      }).catch((err) => {
        console.log("请求错误");
      });
    }
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
  display: flex;
  border-bottom: 1px solid #e8e8e8;
  padding-left: 0px;
  height: 40px;
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
.top-ele{
  margin-bottom: auto;
  margin-top: auto;
}

</style>