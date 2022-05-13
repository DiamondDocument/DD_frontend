<template>

  <div class="common-layout">
    <el-container>
      <el-header>
        <h2 style="text-align: center">
          新建团队
        </h2>
      </el-header>

      <el-main style="width: 700px; margin:0 auto">
        <el-form model="form" label-width="120px" label-position="top">

          <el-form-item label="团队名称">
            <el-input type="text"/>
          </el-form-item>

          <el-form-item label="团队简介">
            <el-input
                v-model="introduction"
                :autosize="{ minRows: 2, maxRows: 4 }"
                type="textarea"
                placeholder="Please input"
            />
          </el-form-item>

          <el-form-item>
            <el-radio-group v-model="isPublic">
              <el-radio :label="3">
                <el-icon><CopyDocument /></el-icon>
                Public
              </el-radio>
              <el-radio :label="6">
                <el-icon><Lock /></el-icon>
                Private
              </el-radio>
            </el-radio-group>
          </el-form-item>

        </el-form>

        <el-divider />
        <span>
          <el-icon><Warning /></el-icon>
          你正在创建你的团队
        </span>
        <el-divider />

        <el-button type="success">创建团队</el-button>

      </el-main>
    </el-container>
  </div>
</template>

<script>

export default {

}
</script>


<style>

</style>