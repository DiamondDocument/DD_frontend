<template>

  <el-menu default-active="'/' +this.$route.path.split('/')[1]">
    <el-input v-model="input" placeholder="空间内搜索文件" style="width: 20%"></el-input>
    <el-button type="primary" style="margin-left: 10px">
      <el-icon style="vertical-align: middle;">
        <search />
      </el-icon>
      <span style="vertical-align: middle;">搜索</span>
    </el-button>
    <el-button type="primary" style="float: right; margin-right: 20px">
      <span style="vertical-align: middle" @click="cancel">取消</span>
    </el-button>
    <el-button type="primary" style="float: right; margin-right: 20px">
      <span style="vertical-align: middle" @click="commit">移动到此处</span>
    </el-button>
  </el-menu>
  <el-table :data="tableData" stripe
            v-loading="loading"
            element-loading-text="少女折寿中"
            height="800"
            style="width:100%;margin-top: 0"
            :row-style="{height: '0'}"
            :cell-style="{padding: '20px'}"
            highlight-current-row
            @row-dblclick="commit"
            @cell-mouse-enter="recordId"
            onload="getTableData">
    <el-table-column prop="name" label="文件名" width="450"></el-table-column>
    <el-table-column prop="author" label="创建者" width="300"></el-table-column>
    <el-table-column prop="altDate" label="修改日期" width="400"></el-table-column>
    <el-table-column prop="altUser" label="修改人" width="300"></el-table-column>
    <el-table-column prop="size" label="大小" width="300"></el-table-column>
  </el-table>
</template>

<script>
import {ElMessage} from "element-plus";
import {ref} from "vue";
export default {
  name: "Move",
  components: {},
  props:{
  },
  data() {
    return {
      menuVisible: false,       //右键菜单不显示
      loading: false,           //暂时不用
      curFileId: Number,
      curFileAth: Number,
      curFileShared: Boolean,
      exportLink: '',           //下载文件的链接
      commitFileId: Number,     //确定移动的目标文件夹id
      tableData: [
        {
          id:0,
          name: '金刚石需求文档',
          author: '赵老板',
          altDate: '1919-08-10',
          altUser: 'lyh',
          authority: 1,
          size: '20K',
          shared: false,
          isFolder: false,
        },
        {
          id:1,
          name: '金刚石产品计划书',
          author: '赵老板',
          altDate: '1919-08-10',
          altUser: 'lyh',
          authority: 2,
          size: '98K',
          shared:true,
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
  methods: {
    //开局获得文件列表，移动场景下，仅获取文件夹
    getTableData() {
      this.$axios.get('/getMoveFormData', {
        params: {
          UserId: this.state.loginUser.userId
        }
      }).then((response) => {
        this.tableData = response.data
      }).catch((err) => {
        ElMessage('err!!!')
      })
    },
    //获得打开的文件夹里面的文件列表
    getFolderData() {
      this.$axios.get('/getFileFormData', {
        params: {
          fileId: this.curFileId,
          UserId: this.state.loginUser.userId
        }
      }).then((response) => {
        this.tableData.clear
        this.tableData = response.data
      }).catch((err) => {
        ElMessage('err!!!')
      })
    },
    //跟踪鼠标指向的文件信息
    recordId(row) {
      this.curFileId = row.id
      this.curFileAth = row.authority
      this.curFileShared = row.shared
    },
    edit(row) {
      this.commitFileId = this.curFileId
      this.getFolderData()
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