<template>
  <el-menu default-active="'/' +this.$route.path.split('/')[1]">
    <el-input v-model="input" placeholder="空间内搜索文件"></el-input>
  </el-menu>
  <el-table :data="tableData" height="1000" style="width:100%">
    <el-table-column prop="name" label="文件名" width="500"></el-table-column>
    <el-table-column prop="author" label="创建者" width="300"></el-table-column>
    <el-table-column prop="altDate" label="修改日期" width="500"></el-table-column>
    <el-table-column prop="altUser" label="修改人" width="300"></el-table-column>
    <el-table-column prop="size" label="大小" width="300"></el-table-column>
  </el-table>
</template>

<script>
import Template from "@/views/Template/Template";
import {ref} from "vue";

export default {
  name: "Space",
  components: {Template},
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
      ]
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