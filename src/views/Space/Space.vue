<template>
  <div id="giao" style="height: 100%">
    <el-menu default-active="'/' +this.$route.path.split('/')[1]" v-if="!moving">
      <el-input v-model="input" placeholder="空间内搜索文件" style="width: 20%"></el-input>
      <el-button type="primary" style="margin-left: 10px"  @click="search">
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
      <el-button style="float: right; margin-right: 20px">
        <span style="vertical-align: middle" @click="getFolderData(1)">后退</span>
      </el-button>
    </el-menu>
    <el-table :data="tableData" stripe
              v-loading="loading"
              v-show="!moving"
              element-loading-text="少女折寿中"
              style="width:100%;margin-top: 0"
              height="100%"
              :row-style="{height: '0'}"
              :cell-style="{padding: '20px'}"
              @row-contextmenu="rowContextmenu"
              highlight-current-row
              @row-dblclick="edit"
              @cell-mouse-enter="recordId">
      <el-table-column prop="docName" label="文件名" width="450"></el-table-column>
      <el-table-column prop="creatorName" label="创建者" width="300"></el-table-column>
      <el-table-column prop="modifyTime" label="修改日期" width="400"></el-table-column>
      <el-table-column prop="modifierName" label="修改人" width="300"></el-table-column>
      <el-table-column prop="size" label="大小" width="300"></el-table-column>
    </el-table>
  </div>

  <index v-if="menuVisible" @foo="foo" ref="index" :spaceType="spaceType" :authority=this.curFileAth :shared="this.curFileShared"
                  @collect="collect" @move="this.moving=true" @remove="remove" @_export="_export"
                  @share="showShare()" @rename="renameVisible=true"
                  @authority = "showAuthority()" @notShare="notShare"
         data-popper-placement="top"></index>
  <authority ref="authority" @altAuthority="altAuthority"></authority>
  <share ref="share" :curFileId="curFileId" @altAuthority="altAuthority"></share>
  <new-file ref="newFile" :fatherId="folderId"></new-file>
  <move ref="move" @commit="move" @cancel="this.moving=false" v-if="moving"></move>
<!--  重命名懒得再写组件了，space臃肿就臃肿一点吧……-->
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
import Template from "@/views/Template/Template";
import {Search} from "@element-plus/icons-vue";
import index from "@/components/index"
import authority from "@/components/authority";
import share from "@/components/share";
import {ref} from "vue";
import {ElMessage} from "element-plus";
import newFile from "@/components/newFile";
import move from "@/views/Space/Move";
export default {
  name: "Space",
  components: {Search, Template, index, authority, share, newFile, move},
  props: {
    spaceType: {
      type: Number,
    },
  },
  data() {
    return {
      spaceType: 1,             //空间类型用于区分右键菜单显示内容等
      menuVisible: false,       //右键菜单不显示
      loading: false,           //暂时不用
      link: '',                 //分享用的链接
      curFileId: Number,
      curFileAth: Number,
      curFileShared: Boolean,
      exportLink: '',           //下载文件的链接
      moving: false,            //是否在移动文件，决定文件系统如何显示
      folderId: null,           //当前处在的文件夹的id，null为根目录
      renameVisible: false,     //控制重命名对话框显示
      tableData: [
        {
          fileType: 1,
          docId: 0,
          docName: '看到我说明你没获取到文件列表',
          creatorName: '赵老板',
          modifyTime: '1919-08-10',
          modifierName: 'lyh',
          authority: 1,
          size: '20K',
          shared: false,
          isFolder: false,
        },
        {
          fileType: 1,
          docId: 0,
          docName: '看到我说明你没获取到文件列表',
          creatorName: '赵老板',
          modifyTime: '1919-08-10',
          modifierName: 'lyh',
          authority: 1,
          size: '20K',
          shared: false,
          isFolder: false,
        },
        {
          fileType: 1,
          docId: 0,
          docName: '看到我说明你没获取到文件列表',
          creatorName: '赵老板',
          modifyTime: '1919-08-10',
          modifierName: 'lyh',
          authority: 1,
          size: '20K',
          shared: false,
          isFolder: false,
        },
        {
          fileType: 1,
          docId: 0,
          docName: '看到我说明你没获取到文件列表',
          creatorName: '赵老板',
          modifyTime: '1919-08-10',
          modifierName: 'lyh',
          authority: 1,
          size: '20K',
          shared: false,
          isFolder: false,
        },{
          fileType: 1,
          docId: 0,
          docName: '看到我说明你没获取到文件列表',
          creatorName: '赵老板',
          modifyTime: '1919-08-10',
          modifierName: 'lyh',
          authority: 1,
          size: '20K',
          shared: false,
          isFolder: false,
        },{
          fileType: 1,
          docId: 0,
          docName: '看到我说明你没获取到文件列表',
          creatorName: '赵老板',
          modifyTime: '1919-08-10',
          modifierName: 'lyh',
          authority: 1,
          size: '20K',
          shared: false,
          isFolder: false,
        },{
          fileType: 1,
          docId: 0,
          docName: '看到我说明你没获取到文件列表',
          creatorName: '赵老板',
          modifyTime: '1919-08-10',
          modifierName: 'lyh',
          authority: 1,
          size: '20K',
          shared: false,
          isFolder: false,
        },{
          fileType: 1,
          docId: 0,
          docName: '看到我说明你没获取到文件列表',
          creatorName: '赵老板',
          modifyTime: '1919-08-10',
          modifierName: 'lyh',
          authority: 1,
          size: '20K',
          shared: false,
          isFolder: false,
        },{
          fileType: 1,
          docId: 0,
          docName: '看到我说明你没获取到文件列表',
          creatorName: '赵老板',
          modifyTime: '1919-08-10',
          modifierName: 'lyh',
          authority: 1,
          size: '20K',
          shared: false,
          isFolder: false,
        },{
          fileType: 1,
          docId: 0,
          docName: '看到我说明你没获取到文件列表',
          creatorName: '赵老板',
          modifyTime: '1919-08-10',
          modifierName: 'lyh',
          authority: 1,
          size: '20K',
          shared: false,
          isFolder: false,
        },{
          fileType: 1,
          docId: 0,
          docName: '看到我说明你没获取到文件列表',
          creatorName: '赵老板',
          modifyTime: '1919-08-10',
          modifierName: 'lyh',
          authority: 1,
          size: '20K',
          shared: false,
          isFolder: false,
        },{
          fileType: 1,
          docId: 0,
          docName: '看到我说明你没获取到文件列表',
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
      reName: ref(''),
      input: ref(''),
      showAuthority,
      showShare,
      showNewFile,
      newFile,
      authority,
      share,
    }
  },
  mounted() {
    this.getFolderData(0)
  },
  methods: {
    //获得打开的文件夹里面的文件列表
    getFolderData(isback) {
      this.$axios.get('/api/space', {
        params: {
          type: "user",
          ownerId: this.$store.state.userId,
          folderId: this.folderId,
          visitorId: this.$store.state.userId,
          isBack: isback,
        }
      }).then((response) => {
        if(response.status===0){
          this.folderId=response.data.parentId
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
      this.curFileId = row.id
      this.curFileAth = row.authority
      this.curFileShared = row.shared
    },
    //打开文档或文件夹
    edit(row) {
      if (row.fileType===2) {
        this.folderId = this.curFileId
        this.getFolderData(0)
      }
      else {
        this.$router.push({
          name: "documentEdit",
          params: {documentId: row.id}
        })
      }
    },
    search(){
      //搜索框为空，默认获取全部文件，也能相当于在搜索之后的返回
      if (this.input==='') {
        this.getFolderData(0)
        return
      }
      let that = this;
      this.$axios.post("/api/search/document", {
        "type": "user",
        "ownerId": this.$store.state.userId,
        "visitorId": this.$store.state.userId,
        "key": this.input,
      }).then((response) => {
        if (response.status === 0) {
          that.tableData.clear();
          that.tableData=response.data.documents;
        } else if (response.status === 1) {
          ElMessage('获取失败')
        } else{
          ElMessage('其他错误')
        }
      }).catch((err) => {
        ElMessage(err)
      })
    },
    rename() {
      this.$axios.post("/api/file/rename", {
        "fileId": this.curFileId,
        "newName": this.reName,
      }).then((response) => {
        if (response.status === 0) {
          ElMessage('修改成功')
        } else if (response.status === 1) {
          ElMessage('文件重名，已自动修改')
        } else {
          ElMessage('其他错误')
        }
      }).catch((err) => {
        ElMessage(err)
      })
      this.renameVisible = false;
    },
    collect() {
      this.$axios.post("/api/document/like", {
        "userId": this.$store.state.userId,
        "docId": this.curFileId
      }).then((response) => {
        if (response.status === 0) {
          ElMessage("收藏成功/已经被收藏")
        } else if (response.status === 1) {
          ElMessage('收藏夹已经存在该文件')
        } else {
          ElMessage('您没有权限')
        }
      }).catch((err) => {
        ElMessage(err)
      })
    },
    altAuthority(ath) {
      ElMessage(ath)
      this.$axios.post("/api/file/authority", {
        "fileId": this.curFileId,
        "newAuth": ath,
      }).then((response) => {
        if (response.status === 0) {
          ElMessage('修改成功')
        } else if(response.status===-1){
          ElMessage('修改失败')
        }else{
          ElMessage('其他错误')
        }
      }).catch((err) => {
        ElMessage(err)
      })
    },
    move(folderId) {
      this.$axios.post("/api/file/move",
          {
            "fileId": this.curFileId,
            "newParentId": folderId,
          }
      ).then((response) => {
        if (response.status === 0) {
          console.log(response.data);
          ElMessage("移动成功")
        } else if (response.status === 1) {
          ElMessage('有重名文件，已自动修改')
        } else {
          ElMessage('其他错误')
        }
      }).catch((err) => {
        console.log(err)
      });
      this.moving = false
    },
    remove() {
      this.$axios.post("/api/file/remove",
          {
            "userId": this.$store.state.userId,
            "fileId": this.curFileId,
          }
      ).then((response) => {
        if (response.status === 0) {
          ElMessage("删除成功")
        } else {
          console.log('其他错误')
        }
      }).catch((err) => {
        console.log(err)
      });
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
    notShare() {
      this.$axios.post("/api/document/dis-share",
          {
            "docId": this.curFileId
          }
      ).then((response) => {
        if (response.status === 0) {
          console.log(response.data);
          ElMessage("取消分享")
        } else {
          console.log('failed')
          ElMessage('操作失败')
        }
      }).catch((err) => {
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
  },
}
</script>

<style scoped>

</style>