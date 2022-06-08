<template>

  <div style="margin: 15px 0 5px 0;border-bottom: 1px solid #e8e8e8;padding-bottom: 10px">
    <el-menu default-active="'/' +this.$route.path.split('/')[1]" >
      <el-button type="primary" icon="ArrowLeft" text @click="getFolderData(true)">返回上一级</el-button>
      <el-button type="primary" style="float: right; margin-right: 20px">
        <span style="vertical-align: middle" @click="cancel">取消</span>
      </el-button>
      <el-button type="primary" style="float: right; margin-right: 20px">
        <span style="vertical-align: middle" @click="commit">创建到此处</span>
      </el-button>
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
              highlight-current-row
              @row-dblclick="edit"
              @cell-mouse-enter="recordId">
      <el-table-column width="50" label="">
        <template #default="scope">
          <el-icon v-if="scope.row.fileType===2"><Folder /></el-icon>
        </template>
      </el-table-column>
      <el-table-column sortable prop="fileName" label="文件名" width="400"></el-table-column>
      <el-table-column sortable prop="createInfo" label="创建时间" width="350"></el-table-column>
      <el-table-column sortable prop="modifyInfo" label="最后修改" width="350"></el-table-column>
      <el-table-column sortable prop="size" label="大小" ></el-table-column>
    </el-table>
  </div>
</template>

<script>
import {ElMessage} from "element-plus";
import {ref} from "vue";
export default {
  name: "tmpPos",
  components: {},
  props:{
  },
  data() {
    return {
      menuVisible: false,       //右键菜单不显示
      loading: true,           //暂时不用
      curFileId: Number,
      curFileAth: Number,
      curFileShared: Boolean,
      exportLink: '',           //下载文件的链接
      commitFileId: Number,     //确定移动的目标文件夹id
      folderId: null,
      tableData: [
        {
          fileType: 1,
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
    return{
      input: ref('')
    }
  },

  mounted() {
    this.getFolderData(false)
  },
  methods: {
    //获得打开的文件夹里面的文件列表
    getFolderData(isback) {
      this.loading=true
      this.$axios.get('/space', {
        params: {
          type: "user",
          ownerId: this.$store.state.loginUser.userId,
          folderId: this.folderId,
          visitorId: this.$store.state.loginUser.userId,
          isBack: isback,
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
      this.loading=false
    },
    //跟踪鼠标指向的文件信息
    recordId(row) {
      this.curFileId = row.id
      this.curFileAth = row.authority
      this.curFileShared = row.shared
    },
    edit() {
      this.folderId=this.curFileId
      this.getFolderData(false)
    },
    commit() {
      this.$emit('commit', this.commitFileId)
    },
    cancel() {
      this.$emit('cancel')
    },
  }
}
</script>

<style scoped>

</style>