<template>
  <el-menu default-active="'/' +this.$route.path.split('/')[1]">
    <el-select v-model="value" placeholder="排序方式" style="float: right; margin-right: 20px">
      <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
    </el-select>
  </el-menu>
  <el-table :data="tableData" stripe
            height="800"
            style="width:100%;margin-top: 0"
            :row-style="{height: '0'}"
            :cell-style="{padding: '20px'}"
            @row-contextmenu="rowContextmenu"
            highlight-current-row
            @row-dblclick="edit"
            befoe-load="getFolderData(0)">
    <el-table-column prop="docName" label="文件名" width="450"></el-table-column>
    <el-table-column prop="creatorName" label="创建者" width="300"></el-table-column>
    <el-table-column prop="modifyTime" label="修改日期" width="400"></el-table-column>
    <el-table-column prop="modifierName" label="修改人" width="300"></el-table-column>
    <el-table-column prop="size" label="大小" width="300"></el-table-column>
  </el-table>
  <index v-if="menuVisible" @foo="foo" ref="contextButton" :spaceType="spaceType"
         @collect="collect" @_export="_export"
         @share="showShare('默认文件名')" @edit="edit"
         data-popper-placement="top"></index>
  <share ref="share" :curFileId="curFileId" @altAuthority="altAuthority"></share>
</template>

<script>
import Template from "@/views/Template/Template";
import {Search} from "@element-plus/icons-vue";
import index from "@/components/index"
import share from "@/components/share";
import {ref} from "vue";
import {ElMessage} from "element-plus";
export default {
  name: "Recent",
  components: {Search, Template, index, share},
  props:{
    spaceType: {
      type: Number,
    },
  },
  data() {
    return {
      spaceType: 0,
      menuVisible: false,
      loading: false,           //暂时不用
      link:'',                  //分享用的链接
      // curFile: this.tableData.,          //当前鼠标选中的文件
      curFileId: Number,
      curFileAth: Number,
      curFileShared: Boolean,
      exportLink: '',           //下载文件的链接
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
          folderId: null,
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
    //获得打开的文件夹里面的文件列表
    getFolderData() {
      this.$axios.get('/api/space/last', {
        params: {
          userId: this.$store.state.userId,
        }
      }).then((response) => {
        if(response.status===0){
          this.tableData.clear()
          this.tableData = response.data.files
        }
        else if (response.status===-1){
          ElMessage('获取列表失败')
        }
        else{
          ElMessage('其他错误')
        }
      }).catch((err) => {
        ElMessage(err)
      })
    },
    edit (row) {
      this.$router.push({
        name: "documentEdit",
        params: {documentId: row.id}
      })
    },
    collect () {
      this.$axios.post("/api/document/like", {
        "userId": this.$store.state.userId,
        "docId": this.curFileId
      }).then((response) => {
        if (response.status===0) {
          ElMessage("收藏成功/已经被收藏")
        }
        else if(response.status===1){
          ElMessage('收藏夹已经存在该文件')
        }
        else{
          ElMessage('您没有权限')
        }
      }).catch((err)=>{
        ElMessage(err)
      })
    },
    altAuthority(ath) {
      ElMessage(ath)
      this.$axios.post("/altAuthority", {
        params: {
          authority: ath,
          fileId: this.curFileId,
        },
      }).then((response) => {
        if (response.status === 1) {
          ElMessage('修改成功')
        } else {
          ElMessage('修改失败')
        }
      }).catch((err) => {
        ElMessage(err)
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
      this.$axios.post("/api/document/dis-share",
          {
            "docId": this.curFileId
          }
      ).then((response)=>{
        if(response.status === 0){
          console.log(response.data);
          ElMessage("取消分享")
        }else{
          console.log('failed')
          ElMessage('操作失败')
        }
      }).catch((err)=>{
        console.log(err)
      });
    },
    //暂时不在其他空间设置取消收藏的操作
    // disCollect() {
    //   this.$axios.post("/notCollect",
    //       {
    //         params:{
    //           fileId: this.curFileId
    //         }
    //       }
    //   ).then((response)=>{
    //     if(response.status === 200){
    //       console.log(response.data);
    //       ElMessage("取消收藏")
    //     }else{
    //       console.log('failed')
    //     }
    //   }).catch((err)=>{
    //     console.log('err!!!')
    //   });
    // },
  }
}
</script>

<style scoped>

</style>