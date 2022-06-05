<template>

  <el-menu default-active="'/' +this.$route.path.split('/')[1]">
    <el-input v-model="input" placeholder="空间内搜索文件" style="width: 20%"></el-input>
    <el-button type="primary" style="margin-left: 10px">
      <el-icon style="vertical-align: middle;">
        <search />
      </el-icon>
      <span style="vertical-align: middle;">搜索</span>
    </el-button>
    <el-select v-model="value" placeholder="排序方式" style="float: right; margin-right: 20px">
      <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
    </el-select>
    <el-button type="primary" style="float: right; margin-right: 20px">
      <span style="vertical-align: middle" @click="showNewFile">新建文件</span>
    </el-button>
  </el-menu>
  <el-table :data="tableData" stripe
            v-loading="loading"
            element-loading-text="少女折寿中"
            height="800"
            style="width:100%;margin-top: 0"
            :row-style="{height: '0'}"
            :cell-style="{padding: '20px'}"
            @row-contextmenu="rowContextmenu"
            highlight-current-row
            @row-dblclick="edit"
            @cell-mouse-enter="recordId"
            onload="getTableData">
    <el-table-column prop="name" label="文件名" width="450"></el-table-column>
    <el-table-column prop="author" label="创建者" width="300"></el-table-column>
    <el-table-column prop="altDate" label="修改日期" width="400"></el-table-column>
    <el-table-column prop="altUser" label="修改人" width="300"></el-table-column>
    <el-table-column prop="size" label="大小" width="300"></el-table-column>
  </el-table>
  <index v-if="menuVisible" @foo="foo" ref="index" :spaceType="spaceType" :authority=this.curFileAth :shared="this.curFileShared"
                  @collect="collect" @move="move" @remove="remove" @_export="_export"
                  @share="showShare()" @disCollect="disCollect" @recover="recover"
                  @del="del" @authority = "showAuthority()" @notShare="notShare"
         data-popper-placement="top"></index>
  <authority ref="authority" @altAuthority="altAuthority"></authority>
  <share ref="share" :curFileId="curFileId" @altAuthority="altAuthority"></share>
  <new-file ref="newFile"></new-file>
</template>

<script>
import Template from "@/views/Template/Template";
import {Search} from "@element-plus/icons-vue";
import index from "@/components/index"
import authority from "@/components/authority";
import share from "@/components/share";
import {ref} from "vue";
import {ElMessage} from "element-plus";
import newFile from "@/components/newFile";
export default {
  name: "Space",
  components: {Search, Template, index, authority, share, newFile},
  props:{
    spaceType: {
      type: Number,
    },
  },
  data() {
    return {
      spaceType: 1,             //空间类型用于区分右键菜单显示内容等
      menuVisible: false,       //右键菜单不显示
      loading: false,           //暂时不用
      link:'',                  //分享用的链接
      curFileId: Number,
      curFileAth: Number,
      curFileShared: Boolean,
      exportLink: '',           //下载文件的链接
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
    const authority = ref()
    const share=ref()
    const newFile=ref()
    function showAuthority() {
      authority.value.show()
    }
    function showShare() {
      share.value.show()
    }
    function showNewFile() {
      newFile.value.show()
    }

    return {
      input :ref(''),
      showAuthority,
      showShare,
      showNewFile,
      newFile,
      authority,
      share,
    }
  },
  methods: {
    //开局获得文件列表
    getTableData(){
      this.$axios.get('/getFormData', {
        params: {
          spaceType: this.spaceType,
          UserId: this.state.loginUser.userId
        }
      }).then((response)=>{
        this.tableData=response.data
      }).catch((err)=>{
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
      }).then((response)=>{
        this.tableData.clear
        this.tableData=response.data
      }).catch((err)=>{
        ElMessage('err!!!')
      })
    },
    rowContextmenu (row, column, event) {
      this.menuVisible = false
      this.menuVisible = true
      // 阻止右键默认行为
      event.preventDefault()
      this.$nextTick(() => {
        this.$refs.index.init(row,column,event)
      })
    },
    foo() { // 取消鼠标监听事件 菜单栏
      this.menuVisible = false;
      document.removeEventListener('click', this.foo);
    },
    //跟踪鼠标指向的文件信息
    recordId(row) {
      this.curFileId=row.id
      this.curFileAth=row.authority
      this.curFileShared=row.shared
    },
    edit (row) {
      if (row.isFolder){
        this.getFolderData()
      }
      else {
        this.$router.push({
          name: "documentEdit",
          params: {documentId: row.id}
        })
      }
    },
    collect () {
      this.$axios.post("/collect", {
        params:{
          fileId: this.curFileId
        }
      }).then((response) => {
        if (response.status===200) {
          ElMessage("收藏成功/已经被收藏")
        }
        else {
          ElMessage('收藏夹已经存在该文件')
        }
      }).catch((err)=>{
        ElMessage(err)
      })
    },
    altAuthority(ath){
      ElMessage(ath)
      this.$axios.post("/altAuthority",{
        params:{
          authority: ath,
          fileId: this.curFileId,
        },
      }).then((response)=>{
        if (response.status===1){
          ElMessage('修改成功')
        }
        else{
          ElMessage('修改失败')
        }
      }).catch((err)=>{
        ElMessage(err)
      })
    },
    move (){

      ElMessage("请选择移动到：")
    },
    remove (){
      this.$axios.post("/remove",
          {
            params:{
              fileId: this.curFileId
            }
          }
      ).then((response)=>{
        if(response.status === 200){
          console.log(response.data);
          ElMessage("删除成功")
        }else{
          console.log('failed')
        }
      }).catch((err)=>{
        console.log('err!!!')
      });
    },
    _export (){
      this.$axios.get("/export",{
        params:{
          fileId: this.curFileId
        }
      }).then((response)=>{
        this.exportLink=response.data;
        let input = document.createElement("input"); // 创建input对象
        input.value = this.exportLink; // 设置复制内容
        document.body.appendChild(input); // 添加临时实例
        input.select(); // 选择实例内容
        document.execCommand("Copy"); // 执行复制
        document.body.removeChild(input); // 删除临时实例
        ElMessage('已复制下载链接')
      });
    },
    notShare(){
      this.$axios.post("/notShare",
          {
            params:{
              fileId: this.curFileId
            }
          }
      ).then((response)=>{
        if(response.status === 200){
          console.log(response.data);
          ElMessage("取消分享")
        }else{
          console.log('failed')
        }
      }).catch((err)=>{
        console.log('err!!!')
      });

    },
    disCollect() {
      this.$axios.post("/notCollect",
          {
            params:{
              fileId: this.curFileId
            }
          }
      ).then((response)=>{
        if(response.status === 200){
          console.log(response.data);
          ElMessage("取消收藏")
        }else{
          console.log('failed')
        }
      }).catch((err)=>{
        console.log('err!!!')
      });
    },
    recover() {
      this.$axios.post("/recover",
          {
            params:{
              fileId: this.curFileId
            }
          }
      ).then((response)=>{
        if(response.status === 200){
          console.log(response.data);
          ElMessage("成功恢复")
        }else{
          console.log('failed')
        }
      }).catch((err)=>{
        console.log('err!!!')
      });
    },
    del() {
      this.$axios.post("/del",
          {
            params:{
              fileId: this.curFileId
            }
          }
      ).then((response)=>{
        if(response.status === 200){
          console.log(response.data);
          ElMessage("彻底删除")
        }else{
          console.log('failed')
        }
      }).catch((err)=>{
        console.log('err!!!')
      });
      },
  }
}
</script>

<style scoped>

</style>