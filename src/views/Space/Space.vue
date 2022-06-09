<template>
  <div style="margin: 15px 0 5px 0;border-bottom: 1px solid #e8e8e8;padding-bottom: 10px" v-if="!moving && !tmpVisible">
    <el-menu default-active="'/' +this.$route.path.split('/')[1]" >
      <el-button type="primary" icon="ArrowLeft" text @click="getFolderData(true)" v-if="this.folderId!=null">返回上一级</el-button>
      <el-button type="primary" icon="ArrowRight" text v-else>根目录</el-button>
      <el-input v-model="input" placeholder="空间内搜索文件" style="width: 20%"></el-input>
      <el-button type="primary" style="margin-left: 10px"  @click="search">
        <el-icon style="vertical-align: middle;">
          <search />
        </el-icon>
        <span style="vertical-align: middle;">搜索</span>
      </el-button>
      <el-button type="primary" style="float: right; margin-right: 20px" icon="Plus">
        <span style="vertical-align: middle" @click="showNewFolder" >新建文件夹</span>
      </el-button>
      <el-button type="primary" style="float: right; margin-right: 20px" icon="Plus">
        <span style="vertical-align: middle" @click="showNewFile" >新建文件</span>
      </el-button>
      <el-button type="primary" style="float: right; margin-right: 20px" icon="Plus">
        <span style="vertical-align: middle" @click="tmpVisible=true" >从模板新建</span>
      </el-button>
    </el-menu>
  </div>
  <div style="height: 610px;" v-if="!moving && !tmpVisible">
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
              :key="altTable"
              @cell-mouse-enter="recordId">
      <el-table-column width="50" label="">
        <template #default="scope">
          <el-icon v-if="scope.row.fileType===1"><Document /></el-icon>
          <el-icon v-else><Folder /></el-icon>
        </template>
      </el-table-column>
      <el-table-column sortable prop="fileName" label="文件名" width="400"></el-table-column>
      <el-table-column sortable prop="creatorInfo" label="创建时间" width="350"></el-table-column>
      <el-table-column sortable prop="modifyInfo" label="最后修改" width="350"></el-table-column>
      <el-table-column sortable prop="size" label="大小" ></el-table-column>
    </el-table>
  </div>
  <index v-if="menuVisible" @foo="foo" ref="index" :spaceType="this.spaceType" :authority=this.curFileAth :shared="this.curFileShared"
                  @collect="collect" @move="this.moving=true" @remove="remove" @_export="_export"
                  @share="showShare()" @rename="renameVisible=true" @createTmp="showNewTmp()"
                  @authority = "showAuthority()" @notShare="notShare"
         data-popper-placement="top"></index>
  <authority ref="authority" @altAuthority="altAuthority"></authority>
  <share ref="share" :curFileId="this.curFileId" @altAuthority="altAuthority"></share>
  <new-file ref="newFile" :fatherId="this.folderId" :teamId="this.$route.params.teamId" @end="afterNew"></new-file>
  <new-folder ref="newFolder" :fatherId="this.folderId" :teamId="this.$route.params.teamId" @end="afterNew"></new-folder>
  <new-tmp ref="newTmp" :fileId="this.curFileId"></new-tmp>
  <move ref="move" @commit="move" @cancel="this.moving=false" v-if="moving"></move>
  <my ref="My" v-if="tmpVisible" :spaceUsing="true" :parentId="this.folderId" @useTmp="useTmp" @cancel="tmpVisible=false"></my>
  <el-dialog title="重命名" v-model="renameVisible" width="30%">
    <span>请输入文件名：</span>
    <el-input v-model="reName" style="width: 20%"></el-input>
    <template #footer>
    <span class="dialog-footer">
      <el-button @click="renameVisible = false">取 消</el-button>
      <el-button type="primary" @click="rename">确 定</el-button>
    </span>
    </template>
  </el-dialog>
</template>

<script>
import {Search} from "@element-plus/icons-vue";
import index from "@/components/index"
import authority from "@/components/authority";
import share from "@/components/share";
import {ref} from "vue";
import {ElMessage} from "element-plus";
import newFile from "@/components/newFile";
import newFolder from "@/components/newFolder";
import move from "@/views/Space/Move";
import My from "@/views/Template/My";
import newTmp from "@/components/newTmp";

export default {
  name: "Space",
  components: {Search, index, authority, share, newFile, move, My, newFolder, newTmp},
  props: {
    spaceType: {
      type: Number,
    },
  },
  data() {
    return {
      spaceType: 1,             //空间类型用于区分右键菜单显示内容等
      menuVisible: false,       //右键菜单不显示
      loading: true,           //暂时不用
      link: '',                 //分享用的链接
      curFileId: Number,
      curFileAth: Number,
      curFileShared: Number,
      exportLink: '',           //下载文件的链接
      moving: false,            //是否在移动文件，决定文件系统如何显示
      folderId: null,           //当前处在的文件夹的id，null为根目录
      renameVisible: false,     //控制重命名对话框显示
      tmpVisible: false,        //控制选择模板的显示
      altTable: Math.random(),
      tableData: [
        {
          fileType: 1,
          docId: 0,
          fileName: '看到我说明你没获取到文件列表',
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
      value: '',
    }
  },
  setup() {
    const authority = ref()
    const share = ref()
    const newFile = ref()
    const newFolder=ref()
    const newTmp=ref()
    function showAuthority() {
      authority.value.show()
    }
    function showShare() {
      share.value.show()
    }
    function showNewFile() {
      newFile.value.show()
    }
    function showNewFolder() {
      newFolder.value.show()
    }
    function showNewTmp() {
      newTmp.value.show()
    }
    return {
      reName: ref(''),
      input: ref(''),
      showAuthority,
      showShare,
      showNewFile,
      showNewFolder,
      showNewTmp,
      newTmp,
      newFile,
      authority,
      share,
      newFolder,
    }
  },
  mounted() {
    this.getFolderData(false)
  },
  methods: {
    //获得打开的文件夹里面的文件列表
    getFolderData(isback) {
      this.loading=true
      let spaceType="user"
      let ownerId=this.$store.state.loginUser.userId
      if (this.$route.params.teamId!=null) {
        spaceType = "team"
        ownerId=this.$route.params.teamId
      }
      console.log(spaceType, ownerId, this.folderId, this.$store.state.loginUser.userId)
      this.$axios.get('/space', {
        params: {
          type: spaceType,
          ownerId: ownerId,
          folderId: this.folderId,
          visitorId: this.$store.state.loginUser.userId,
          isBack: isback,
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
    rowContextmenu(row, column, event) {
      this.menuVisible = false
      this.menuVisible = true
      // 阻止右键默认行为
      event.preventDefault()
      this.$nextTick(() => {
        this.$refs.index.init(row, column, event)
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
      console.log(row.fileId, row.authority, row.shared)
    },
    //处理自动更新事件
    afterNew(){
      console.log('in');
      setTimeout(() => {
        this.getFolderData(false);
        this.altTable=Math.random()
      }, 1000);
    },
    //从模板创建
    useTmp(tempId,tempName){
      let f = new FormData()
      f.append("type", '1')
      f.append("name", tempName)
      f.append("creatorId", this.$store.state.loginUser.userId)
      f.append("templateId", tempId)
      if (this.folderId!=null){
        f.append("parentId", this.folderId)
      }
      this.$axios.post("/file/create", f).then((response)=>{
        if(response.status === 200){
          if (response.data.code === 0) {
            ElMessage('创建成功')
          } else if(response.data.code===-1){
            ElMessage('创建失败')
          }else if (response.data.code===1){
            ElMessage('文件重名，已修改')
          }else{
            ElMessage('其他错误')
          }
        }else{
          ElMessage({ message: "status = " + response.status, type: 'warning'});
        }
      }).catch((err) => {
        console.log(err);
      })
      this.tmpVisible=false
      this.getFolderData(false)
    },
    //打开文档或文件夹
    edit(row) {
      if (row.fileType===2) {
        this.folderId = this.curFileId
        this.getFolderData(false)
      }
      else {
        this.$router.push({
          name: "documentEdit",
          params: {documentId: row.fileId}
        })
      }
    },
    search(){
      //搜索框为空，默认获取全部文件，也能相当于在搜索之后的返回
      if (this.input==='') {
        this.getFolderData(false)
        return
      }
      this.$axios.get("/search/document", {
        params:{
          type: "user",
          ownerId: this.$store.state.loginUser.userId,
          visitorId: this.$store.state.loginUser.userId,
          key: this.input,
        }
      }).then((response) => {
        if(response.status === 200){
          if (response.data.code === 0) {
            this.tableData = response.data.documents
          } else if(response.data.code===-1){
            ElMessage('操作失败')
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
    rename() {
      console.log(this.curFileId, this.reName)
      this.$axios.post("/file/rename", {
        "fileId": this.curFileId,
        "newName": this.reName,
      }).then((response) => {
        if(response.status === 200){
          if (response.data.code === 0) {
            ElMessage('重命名成功')
            this.getFolderData(false)
          } else if(response.data.code===-1){
            ElMessage('重命名失败')
          }else{
            ElMessage('其他错误')
          }
        }else{
          ElMessage({ message: "status = " + response.status, type: 'warning'});
        }
      }).catch((err) => {
        console.log(err);
      })
      this.renameVisible = false;
      this.afterNew()
    },
    collect() {
      this.$axios.post("/document/like", {
        "userId": this.$store.state.loginUser.userId,
        "docId": this.curFileId
      }).then((response) => {
        if(response.status === 200){
          if (response.data.code === 0) {
            ElMessage('收藏成功')
          } else if(response.data.code===1){
            ElMessage('收藏夹存在该文件')
          }else if(response.data.code===2){
            ElMessage('您没有权限')
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
    altAuthority(ath) {
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
      this.getFolderData(false)
    },
    move(folderId) {
      this.$axios.post("/file/move",
          {
            "fileId": this.curFileId,
            "newParentId": folderId,
          }
      ).then((response) => {
        if(response.status === 200){
          if (response.data.code === 0) {
            ElMessage('移动成功')
            this.getFolderData(false)
          } else if(response.data.code===1){
            ElMessage('文件重名，已修改')
          }else if(response.data.code===-1){
            ElMessage('移动失败')
          }else{
            ElMessage('其他错误')
          }
        }else{
          ElMessage({ message: "status = " + response.status, type: 'warning'});
        }
      }).catch((err) => {
        console.log(err);
      })
      this.moving = false
      this.afterNew()
    },
    remove() {
      this.$axios.post("/file/remove",
          {
            "userId": this.$store.state.loginUser.userId,
            "fileId": this.curFileId,
          }
      ).then((response) => {
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
      this.afterNew()
    },
    _export() {
      console.log("发送导出文档请求...");
      this.$axios.get("/document/export", {
        params: {
          docId: this.curFileId,
        }
      }).then((response) => {
        console.log("请求完毕");
        if (response.status === 200) {
          if (response.data.code === 0) {
            console.log("导出成功");
            this.$axios.get(response.data.download, {responseType: 'blob'}).then((response) => {
              if (response.status === 200) {
                let fileURL = window.URL.createObjectURL(new Blob([response.data]));
                let fileLink = document.createElement('a');
                fileLink.href = fileURL;
                fileLink.setAttribute('download', response.headers['content-disposition'].split('filename=')[1]);
                document.body.appendChild(fileLink);
                console.log();
                fileLink.click();
              } else console.log("请求错误status");
            }).catch((err) => {
              console.log(err);
            });
          } else {
            console.log("请求错误");
          }
        } else {
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
      this.getFolderData(false)
    },
  },
}
</script>

<style scoped>

</style>