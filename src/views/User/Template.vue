<template>
  <el-row :gutter="20">
    <el-col :span="6" style="background-color: #B3C0D1"></el-col>
    <el-col :span="6" style="background-color: #B3C0D1"></el-col>
    <el-col :span="6"></el-col>
    <el-col :span="6"></el-col>
  </el-row>

</template>

<script>
export default {
  name: "Template"
}
</script>

<style>
el-row {
  margin-bottom: 20px;
}
el-row:last-child {
  margin-bottom: 0;
}
el-col {
  border-radius: 4px;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
</style>