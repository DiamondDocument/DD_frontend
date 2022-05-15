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
  </el-menu>
  <el-table :data="tableData" stripe
            height="800"
            style="width:100%;margin-top: 0px"
            :row-style="{height: '0'}"
            :cell-style="{padding: '20px'}"
            @row-contextmenu="rowContextmenu">
    <el-table-column prop="name" label="文件名" width="450"></el-table-column>
    <el-table-column prop="author" label="创建者" width="300"></el-table-column>
    <el-table-column prop="altDate" label="修改日期" width="400"></el-table-column>
    <el-table-column prop="altUser" label="修改人" width="300"></el-table-column>
    <el-table-column prop="size" label="大小" width="300"></el-table-column>
  </el-table>
  <index v-if="menuVisible" @foo="foo" ref="contextButton" :spaceType="spaceType"
                  @collect="collect" @move="move" @remove="remove" @_export="_export"
                  @share="share" @edit="edit" @disCollect="disCollect" @recover="recover"
                  @del="del"
         data-popper-placement="top"></index>
</template>

<script>
import Template from "@/views/Template/Template";
import {Search} from "@element-plus/icons-vue";
import index from "@/views/contextButton/index.vue"
import {ref} from "vue";
export default {
  name: "Space",
  components: {Search, Template, index},
  props:{
    spaceType: {
      type: Number,
    },
  },
  data() {
    return {
      menuVisible: false,
      tableData: [
        {
          name: '金刚石需求文档',
          author: '赵老板',
          altDate: '1919-08-10',
          altUser: 'lyh',
          size: '20K'
        },
        {
          name: '金刚石产品计划书',
          author: '赵老板',
          altDate: '1919-08-10',
          altUser: 'lyh',
          size: '98K'
        },
        {
          name: '金刚石产品计划书',
          author: '赵老板',
          altDate: '1919-08-10',
          altUser: 'lyh',
          size: '98K'
        },
        {
          name: '金刚石产品计划书',
          author: '赵老板',
          altDate: '1919-08-10',
          altUser: 'lyh',
          size: '98K'
        },
        {
          name: '金刚石产品计划书',
          author: '赵老板',
          altDate: '1919-08-10',
          altUser: 'lyh',
          size: '98K'
        },
        {
          name: '金刚石产品计划书',
          author: '赵老板',
          altDate: '1919-08-10',
          altUser: 'lyh',
          size: '98K'
        },
        {
          name: '金刚石产品计划书',
          author: '赵老板',
          altDate: '1919-08-10',
          altUser: 'lyh',
          size: '98K'
        },
        {
          name: '金刚石产品计划书',
          author: '赵老板',
          altDate: '1919-08-10',
          altUser: 'lyh',
          size: '98K'
        },
        {
          name: '金刚石产品计划书',
          author: '赵老板',
          altDate: '1919-08-10',
          altUser: 'lyh',
          size: '98K'
        },
        {
          name: '金刚石产品计划书',
          author: '赵老板',
          altDate: '1919-08-10',
          altUser: 'lyh',
          size: '98K'
        },
        {
          name: '金刚石产品计划书',
          author: '赵老板',
          altDate: '1919-08-10',
          altUser: 'lyh',
          size: '98K'
        },
        {
          name: '金刚石产品计划书',
          author: '赵老板',
          altDate: '1919-08-10',
          altUser: 'lyh',
          size: '98K'
        },
        {
          name: '金刚石产品计划书',
          author: '赵老板',
          altDate: '1919-08-10',
          altUser: 'lyh',
          size: '98K'
        },
        {
          name: '金刚石产品计划书',
          author: '赵老板',
          altDate: '1919-08-10',
          altUser: 'lyh',
          size: '98K'
        },
        {
          name: '金刚石产品计划书',
          author: '赵老板',
          altDate: '1919-08-10',
          altUser: 'lyh',
          size: '98K'
        },
        {
          name: '金刚石产品计划书',
          author: '赵老板',
          altDate: '1919-08-10',
          altUser: 'lyh',
          size: '98K'
        },
        {
          name: '金刚石产品计划书',
          author: '赵老板',
          altDate: '1919-08-10',
          altUser: 'lyh',
          size: '98K'
        },
        {
          name: '金刚石产品计划书',
          author: '赵老板',
          altDate: '1919-08-10',
          altUser: 'lyh',
          size: '98K'
        },
        {
          name: '金刚石产品计划书',
          author: '赵老板',
          altDate: '1919-08-10',
          altUser: 'lyh',
          size: '98K'
        },
        {
          name: '金刚石产品计划书',
          author: '赵老板',
          altDate: '1919-08-10',
          altUser: 'lyh',
          size: '98K'
        },
        {
          name: '金刚石产品计划书',
          author: '赵老板',
          altDate: '1919-08-10',
          altUser: 'lyh',
          size: '98K'
        },
        {
          name: '金刚石产品计划书',
          author: '赵老板',
          altDate: '1919-08-10',
          altUser: 'lyh',
          size: '98K'
        },
        {
          name: '金刚石产品计划书',
          author: '赵老板',
          altDate: '1919-08-10',
          altUser: 'lyh',
          size: '98K'
        },
        {
          name: '金刚石产品计划书',
          author: '赵老板',
          altDate: '1919-08-10',
          altUser: 'lyh',
          size: '98K'
        },
        {
          name: '金刚石产品计划书',
          author: '赵老板',
          altDate: '1919-08-10',
          altUser: 'lyh',
          size: '98K'
        },
        {
          name: '金刚石产品计划书',
          author: '赵老板',
          altDate: '1919-08-10',
          altUser: 'lyh',
          size: '98K'
        },
        {
          name: '金刚石产品计划书',
          author: '赵老板',
          altDate: '1919-08-10',
          altUser: 'lyh',
          size: '98K'
        },
        {
          name: '金刚石产品计划书',
          author: '赵老板',
          altDate: '1919-08-10',
          altUser: 'lyh',
          size: '98K'
        },
        {
          name: '金刚石产品计划书',
          author: '赵老板',
          altDate: '1919-08-10',
          altUser: 'lyh',
          size: '98K'
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
    edit () {
      window.alert("进入编辑")
    },
    collect () {
      window.alert("收藏成功/已经被收藏")
    },
    move (){
      window.alert("请选择移动到：")
    },
    remove (){
      window.alert("删除成功")
    },
    _export (){
      window.alert("请选择保存位置")
    },
    share (){
      window.alert("生成分享链接")
    },
    disCollect() {
      window.alert("已取消收藏")
    },
    recover() {
      window.alert("成功恢复")
    },
    del() {
      window.alert("已彻底删除")
    }
  }
}
</script>

<style scoped>

</style>