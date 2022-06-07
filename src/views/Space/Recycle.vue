<template>
  <p>{{$route.params.tableId}}giao</p>

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
            before-load="getFolderData(0)">
    <el-table-column prop="docName" label="文件名" width="450"></el-table-column>
    <el-table-column prop="creatorName" label="创建者" width="300"></el-table-column>
    <el-table-column prop="modifyTime" label="修改日期" width="400"></el-table-column>
    <el-table-column prop="modifierName" label="修改人" width="300"></el-table-column>
    <el-table-column prop="size" label="大小" width="300"></el-table-column>
  </el-table>
  <index v-if="menuVisible" @foo="foo" ref="contextButton" :spaceType="spaceType"
         @recover="recover" @del="del"
         data-popper-placement="top"></index>
</template>

<script>
import Template from "@/views/Template/Template";
import {Search} from "@element-plus/icons-vue";
import index from "@/components/index"
import {ref} from "vue";
import {ElMessage} from "element-plus";
export default {
  name: "Recycle",
  components: {Search, Template, index},
  props:{
    spaceType: {
      type: Number,
    },
  },
  data() {
    return {
      spaceType: 3,
      menuVisible: false,
      loading: false,           //暂时不用
      link:'',                  //分享用的链接
      // curFile: this.tableData.,          //当前鼠标选中的文件
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
    return {
      input :ref(''),
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
      this.$axios.get('/api/space/recycle', {
        params: {
          type: "user",
          ownerId: this.$store.state.userId,
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
    //暂时不做了
    // search(){
    //   //搜索框为空，默认获取全部文件，也能相当于在搜索之后的返回
    //   if (this.input==='') {
    //     this.getTableData()
    //     return
    //   }
    //   let that = this;
    //   this.$axios.post("/api/search/document", {
    //     "type": "user",
    //     "ownerId": this.$store.state.userId,
    //     "visitorId": this.$store.state.userId,
    //     "key": this.input,
    //   }).then((response) => {
    //     if (response.status === 0) {
    //       that.tableData.clear();
    //       that.tableData=response.data.documents;
    //     } else if (response.status === 1) {
    //       ElMessage('获取失败')
    //     } else{
    //       ElMessage('其他错误')
    //     }
    //   }).catch((err) => {
    //     ElMessage(err)
    //   })
    // },
    recover() {
      this.$axios.post("/api/file/recover",
          {
            "fileId": this.curFileId,
          }
      ).then((response)=>{
        if(response.status === 0){
          ElMessage("成功恢复")
        }else if(response.status===1){
          ElMessage('有重名文件，已自动修改')
        }else{
          ElMessage('其他错误')
        }
      }).catch((err)=>{
        console.log(err)
      });
    },
    del() {
      this.$axios.post("/api/file/complete-remove",
          {
            "userId": this.$store.state.userId,
            "fileId": this.curFileId,
          }
      ).then((response)=>{
        if(response.status === 0){
          ElMessage("彻底删除")
        }else if(response.status===-1){
          ElMessage('删除失败')
        }else{
          ElMessage('其他错误')
        }
      }).catch((err)=>{
        console.log(err)
      });
    },
  }
}
</script>

<style scoped>

</style>