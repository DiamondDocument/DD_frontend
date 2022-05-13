const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true
})
module.exports = {
  pages: {
      // 先配置主页
      index: {
          entry: './src/main.js',
          template: './public/index.html',
          title: '用户登录'
      },
      // 创建团队
      teamCreate: {
          entry: './src/pages/teamCreate/teamCreate.js',
          template: './public/teamCreate.html',
          title: '创建团队'
      },

      inviteMem: {
        entry: './src/pages/inviteMem/inviteMem.js',
        template: './public/inviteMem.html',
        title: '邀请用户'
    }
  }
}
