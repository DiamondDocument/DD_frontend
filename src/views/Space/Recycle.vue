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
              :key="Math.random()"
              @cell-mouse-enter="recordId">
      <el-table-column width="50" label="">
        <template #default="scope">
          <el-icon v-if="scope.row.fileType===1"><Document /></el-icon>
        </template>
      </el-table-column>
      <el-table-column sortable prop="fileName" label="文件名" width="400"></el-table-column>
      <el-table-column sortable prop="createInfo" label="创建时间" width="350"></el-table-column>
      <el-table-column sortable prop="modifyInfo" label="最后修改" width="350"></el-table-column>
      <el-table-column sortable prop="size" label="大小" ></el-table-column>
    </el-table>
  </div>
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
      loading: true,           //暂时不用
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
      this.curFileId = row.fileId
      this.curFileAth = row.authority
      this.curFileShared = row.shared
    },
    //获得打开的文件夹里面的文件列表
    getFolderData(isback) {
      this.loading=true
      let type="user"
      let ownerId=this.$store.state.loginUser.userId
      if (this.$route.params.teamId!=null){
        ownerId=this.$route.params.teamId
        type="team"
      }
      this.$axios.get('/space/recycle', {
        params: {
          type: type,
          ownerId: ownerId,
        }
      }).then((response) => {
        console.log(response);
        if(response.status === 200) {
          if (response.data.code === 0) {
            if (isback) this.folderId = response.data.parentId;

            this.tableData = response.data.files;
          } else if (response.data.code === -1) {
            ElMessage({message: '获取列表失败', type: 'warning'});
          }
        }else{
          ElMessage({ message: "status = " + response.status, type: 'warning'});
        }
      }).catch((err) => {
        console.log(err);
      })
      this.loading=false
    },
    recover() {
      this.$axios.post("/file/recover",
          {
            "userId": this.$store.state.loginUser.userId,
            "fileId": this.curFileId,
          }
      ).then((response)=>{
        if(response.status === 200){
          if (response.data.code === 0) {
            ElMessage('恢复成功')
            this.getFolderData(false)
          } else if(response.data.code===-1){
            ElMessage('恢复失败')
          }else{
            ElMessage('其他错误')
          }
        }else{
          ElMessage({ message: "status = " + response.status, type: 'warning'});
        }
      }).catch((err) => {
        console.log(err);
      })
      this.getFolderData(false)
    },
    del() {
      this.$axios.post("/file/complete-remove",
          {
            "userId": this.$store.state.loginUser.userId,
            "fileId": this.curFileId,
          }
      ).then((response)=>{
        if(response.status === 200){
          if (response.data.code === 0) {
            ElMessage('删除成功')
            this.getFolderData(false)
          } else if(response.data.code===-1){
            ElMessage('删除失败')
          }else{
            ElMessage('其他错误')
          }
        }else{
          ElMessage({ message: "status = " + response.status, type: 'warning'});
        }
      }).catch((err) => {
        console.log(err);
      })
      this.getFolderData(false)
    },
  }
}
</script>

<style scoped>

</style>