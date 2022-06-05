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
            @cell-mouse-enter="recordId">
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
      // curFile: this.tableData.,          //当前鼠标选中的文件
      curFileId:Number,
      curFileAth: Number,
      curFileShared:Boolean,
      tableData: [
        {
          id:0,
          name: '金刚石需求文档',
          author: '赵老板',
          altDate: '1919-08-10',
          altUser: 'lyh',
          authority: '1',
          size: '20K',
          shared: false,
        },
        {
          id:1,
          name: '金刚石产品计划书',
          author: '赵老板',
          altDate: '1919-08-10',
          altUser: 'lyh',
          authority: '2',
          size: '98K',
          shared:true,
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
      this.$router.push({
        name: "documentEdit",
        params: {documentId: row.id}
      })
    },
    collect () {
      this.$axios.post("/space", {
        "type": 2,
        // "documentId": this.curFile.id
        "documentId": this.curFileId
      }).then((response) => {
        if (response.status===1) {
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
      this.$axios.post("/space",{
        "type": 3,
        "authority": ath,
        "documentId": this.curFileId
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
      ElMessage("删除成功")
    },
    _export (){
      ElMessage("请选择保存位置")
    },
    share (){
      ElMessage("生成分享链接")
    },
    notShare(){
      ElMessage("取消分享")
    },
    disCollect() {
      ElMessage("已取消收藏")
    },
    recover() {
      ElMessage("成功恢复")
    },
    del() {
      ElMessage("已彻底删除")
      },
  }
}
</script>

<style scoped>

</style>