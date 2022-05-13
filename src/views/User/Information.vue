<template>
  <div>
    <el-container>
      <el-header class="Header" style="height: 50px">
        <img src="../../assets/logo.png" style="width: 50px; height: 50px;">
        <div>
          <a href="#" style="padding: 0 10px 0 0">头像</a>
          <a href="#" @click="toMessage">消息</a>
        </div>
      </el-header>
      <el-main >
        <h2>
          个人信息
        </h2>

        <div>
          <el-tabs type="border-card">
            <el-tab-pane label="个人信息">
              <el-form
                  label-position="Rignt"
                  label-width="100px"
                  style="max-width: 460px"
              >
                <el-form-item label="用户名：">
                  {{ userName }}
                </el-form-item>

                <el-form-item label="用户昵称：">
                  {{ nickName }}
                </el-form-item>

                <el-form-item label="邮箱：">
                  {{ email }}
                </el-form-item>

              </el-form>
            </el-tab-pane>


            <el-tab-pane label="修改信息">
              <el-form
                  label-position="Rignt"
                  label-width="100px"
                  style="max-width: 460px"
              >
                <el-form-item label="用户昵称：">
                  <el-input type="text" style="margin-bottom: 10px"></el-input>
                  <el-button type="success">修改昵称</el-button>
                </el-form-item>

                <el-form-item label="邮箱：">
                  <el-input type="text" style="margin-bottom: 10px">
                    <template #append>
                      <el-button >发送验证码</el-button>
                    </template>
                  </el-input>

                  <el-form label-position="Left">
                    <el-form-item label="验证码">
                      <el-input type="text"></el-input>
                    </el-form-item>
                  </el-form>

                  <el-button type="success">修改邮箱</el-button>
                </el-form-item>
              </el-form>
            </el-tab-pane>


            <el-tab-pane label="修改密码">
              <el-form
                  label-position="Rignt"
                  label-width="100px"
                  style="max-width: 460px"
              >
                <el-form-item label="原密码：">
                  <el-input v-model="oldPassword" type="password"/>
                </el-form-item>

                <el-form-item label="新密码：">
                  <el-input v-model="newPassword" type="password"/>
                </el-form-item>

                <div style="margin-left: 200px;">
                  <el-button type="success">
                    提交修改
                  </el-button>
                </div>

              </el-form>
            </el-tab-pane>

          </el-tabs>
        </div>

      </el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  name: "Information",
}
</script>

<style scoped>
.Header {
  background-color: #B3C0D1;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px 40px;
}
</style>