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
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
        >
      </el-option>
    </el-select>
  </el-menu>
  <el-table :data="tableData" height="900" style="width:100%">
    <el-table-column prop="name" label="文件名" width="450"></el-table-column>
    <el-table-column prop="author" label="创建者" width="300"></el-table-column>
    <el-table-column prop="altDate" label="修改日期" width="400"></el-table-column>
    <el-table-column prop="altUser" label="修改人" width="300"></el-table-column>
    <el-table-column prop="size" label="大小" width="300"></el-table-column>
  </el-table>
</template>

<script>
import Template from "@/views/Template/Template";
import {ref} from "vue";
import {Search} from "@element-plus/icons-vue";

export default {
  name: "Space",
  components: {Search, Template},
  data() {
    return {
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
  }
}
</script>

<style scoped>

</style>