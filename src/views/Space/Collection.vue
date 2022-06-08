<template>
  <div style="margin: 15px 0 5px 0;border-bottom: 1px solid #e8e8e8;padding-bottom: 10px">
    <el-menu default-active="'/' +this.$route.path.split('/')[1]" >
    </el-menu>
  </div>
  <div style="height: 610px;">
    <el-table :data="tableData" stripe
              v-loading="loading"
              element-loading-text="少女折寿中"
              style="width:100%;margin-top: 0;"
              height="100%"
              :row-style="{height: '0'}"
              :cell-style="{padding: '20px'}"
              @row-contextmenu="rowContextmenu"
              highlight-current-row
              @row-dblclick="edit"
              @cell-mouse-enter="recordId">
      <el-table-column prop="fileName" label="文件名" width="400"></el-table-column>
      <el-table-column prop="createInfo" label="创建时间" width="350"></el-table-column>
      <el-table-column prop="modifyInfo" label="最后修改" width="350"></el-table-column>
      <el-table-column prop="size" label="大小" ></el-table-column>
    </el-table>
  </div>
  <index v-if="menuVisible" @foo="foo" ref="contextButton" :spaceType="spaceType"
         @_export="_export" @share="showShare('默认文件名')" @edit="edit" @disCollect="disCollect"
         data-popper-placement="top"></index>
  <share ref="share" :curFileId="this.curFileId" @altAuthority="altAuthority"></share>
</template>

<script>
import Template from "@/views/Template/Template";
import {Search} from "@element-plus/icons-vue";
import index from "@/components/index"
import {ref} from "vue";
import share from "@/components/share";
import {ElMessage} from "element-plus";
export default {
  name: "Collection",
  components: {Search, Template, index, share},
  props:{
    spaceType: {
      type: Number,
    },
  },
  data() {
    return {
      menuVisible: false,
      spaceType: 2,
      loading: false,           //暂时不用
      link:'',                  //分享用的链接
      curFileId: Number,
      curFileAth: Number,
      curFileShared: Boolean,
      exportLink: '',           //下载文件的链接
      folderId: null,
      tableData: [
        {
          docId: 0,
          docName: '金刚石需求文档',
          creatorName: '赵老板',
          modifyTime: '1919-08-10',
          modifierName: 'lyh',
          authority: 1,
          size: '20K',
          shared: false,
          isFolder: false,
        },
      ],
      options: [
        {
          value: '1',
          label: '名称',
        },
        {
          value: '2',
          label: '创建者',
        },
        {
          value: '3',
          label: '修改时间',
        },
        {
          value: '4',
          label: '大小',
        },
      ],
      value:'',
    }
  },
  setup() {
    const share=ref()
    function showShare(fileName) {
      share.value.show(fileName)
    }
    return {
      input :ref(''),
      showShare,
      share,
    }
  },
  mounted() {
    this.getFolderData(false)
  },
  methods: {

    rowContextmenu (row, column, event) {
      this.menuVisible = false
      this.menuVisible = true
      // 阻止右键默认行为
      event.preventDefault()
      this.$nextTick(() => {
        this.$refs.contextButton.init(row,column,event)
      })

    },
    foo() { // 取消鼠标监听事件 菜单栏
      this.menuVisible = false;
      document.removeEventListener('click', this.foo);
    },
    //跟踪鼠标指向的文件信息
    recordId(row) {
      this.curFileId = row.id
      this.curFileAth = row.authority
      this.curFileShared = row.shared
    },
    //获得打开的文件夹里面的文件列表
    getFolderData(isback) {
      this.$axios.get('/space/collection', {
        params: {
          userId: this.$store.state.loginUser.userId,
          visitorId: this.$store.state.loginUser.userId,
        }
      }).then((response) => {
        console.log(response);
        if(response.status === 200) {
          if (response.data.code === 0) {
            if (isback) this.folderId = response.data.parentId;

            let files = response.data.files;
            this.tableData = files;
            for(let i = 0; i < this.tableData.length; i++){
              let time =  files[i].createTime;
              time = time.split('+')[0];
              time = time.split('T')[0] + ' ' + time.split('T')[1].slice(0,-7);
              this.tableData[i].createInfo = time + '  by ' + files[i].creatorName;
              if(files[i].modifyTime === null) this.tableData[i].modifyInfo = "无修改记录";
              else{
                time =  files[i].modifyTime;
                time = time.split('+')[0];
                time = time.split('T')[0] + ' ' + time.split('T')[1].slice(0,-7);
                this.tableData[i].modifyInfo = time + '  by ' + files[i].modifierName;
              }
            }
          } else if (response.data.code === -1) {
            ElMessage({message: '获取列表失败', type: 'warning'});
          }
        }else{
          ElMessage({ message: "status = " + response.status, type: 'warning'});
        }
      }).catch((err) => {
        console.log(err);
      })
    },
    edit (row) {
      this.$router.push({
        name: "documentEdit",
        params: {documentId: row.id}
      })
    },
    altAuthority(ath) {
      ElMessage(ath)
      this.$axios.post("/file/authority", {
        "fileId": this.curFileId,
        "newAuth": ath,
      }).then((response) => {
        if(response.status === 200){
          if (response.data.code === 0) {
            ElMessage('修改成功')
          } else if(response.data.code===-1){
            ElMessage('修改失败')
          }else{
            ElMessage('其他错误')
          }
        }else{
          ElMessage({ message: "status = " + response.status, type: 'warning'});
        }
      }).catch((err) => {
        console.log(err);
      })
    },
    _export (){
      console.log("发送导出文档请求...");
      this.$axios.get("/document/export",{
        params:{
          docId : this.curFileId,
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
              console.log(err);
            });
          }else{
            console.log("请求错误");
          }
        }else{
          console.log("请求错误");
        }
      }).catch((err) => {
        console.log(err);
      });
    },
    notShare(){
      this.$axios.post("/document/dis-share",
          {
              "docId": this.curFileId
          }
      ).then((response)=>{
        if(response.status === 200){
          if (response.data.code === 0) {
            ElMessage('取消分享成功')
          } else if(response.data.code===-1){
            ElMessage('取消分享失败')
          }else{
            ElMessage('其他错误')
          }
        }else{
          ElMessage({ message: "status = " + response.status, type: 'warning'});
        }
      }).catch((err) => {
        console.log(err);
      })
    },
    disCollect() {
      this.$axios.post("/document/dislike",
          {
              "userId": this.$store.state.loginUser.userId,
              "docId": this.curFileId
          }
      ).then((response)=>{
        if(response.status === 200){
          if (response.data.code === 0) {
            ElMessage('取消收藏成功')
            this.getFolderData(false)
          } else if(response.data.code===-1){
            ElMessage('取消收藏失败')
          }else{
            ElMessage('其他错误')
          }
        }else{
          ElMessage({ message: "status = " + response.status, type: 'warning'});
        }
      }).catch((err) => {
        console.log(err);
      })
    },
  }
}
</script>

<style scoped>

</style>