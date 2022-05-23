<template>
  <div style="width: 1000px; margin: 0 auto;">

    <div style="
         width: 600px;
         text-align: center;
         margin: 40px auto;">
      <el-icon size="30px"><Aim /></el-icon>
      <h2>邀请成员到你的团队{{teamName}}中</h2>
    </div>
    <el-input placeholder="请输入内容"
              @keyup.enter="search"
              v-model="keyword"
              style="
              margin-bottom: 20px">
      <template #prepend>
        <el-icon><Avatar /></el-icon>
      </template>
      <template #append>
        <el-button type="primary" @click="search">
          搜索
        </el-button>
      </template>
    </el-input>

    <el-row v-for="(user, index) in userList" :key="user.userId"
            class="block">
      <el-avatar src="circleUrl" style="margin: 10px; float: left" />

      <div @click="goUser(user.userId)"
           style="float: right; width: 800px">
        <h3 >
          {{user.userNickname}}
        </h3>
        <p >
          {{user.userIntroduction}}
        </p>
      </div>

      <el-button type="success"
                 @click.stop="inviteUser(user.userId)"
                 style="
                 margin: auto 20px;">
        邀请
      </el-button>

    </el-row>
  </div>

</template>

<script>
export default {
  name: "Invite.vue",

  data(){
    return {
      teamName: 'DiamondPick',
      keyword: '',
      userList: [
        {
          userId: '1',
          userNickname: '赵赵',
          userIntroduction: '不要停下来啊',
        },
        {
          userId: '2',
          userNickname: 'THR',
          userIntroduction: '我的名字叫THR，20岁。住在北航522宿舍，未婚。我在龟友连锁店服务。' +
              '每天都要加班到晚上8点才能回家。我不抽烟，酒仅止于浅尝。晚上11点睡，每天要睡足8个小时。' +
              '睡前，我一定喝一杯温牛奶，然后做20分钟的柔软操，上了床，马上熟睡。' +
              '一觉到天亮，决不把疲劳和压力，留到第二天。医生都说我很正常 '
        },
        {
          userId: '3',
          userNickname: '王王',
          userIntroduction: '这个彬彬就是逊啦'
        }
      ],

    }
  },
  methods: {
    inviteUser: function (){

    },

    goUser: function (userId){
      this.$router.push({name: 'userInformation', params:{userId: userId}});
    },
    search: function (){
      this.$router.push({name: 'teamInvite', params: {userId: this.keyword}});
    },
  },
  created() {
    this.keyword = this.$route.params.key;
    if (this.keyword.length === 0){

    }else {

    }
  }
}
</script>

<style scoped>
.block {
  margin-bottom: 10px;
  padding: 10px;
  border-style: solid;
  border-width: 1px;
  border-color: lightgray;
  border-radius: 5px;
}
</style>