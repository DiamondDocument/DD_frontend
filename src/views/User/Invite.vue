<template>
  <div>
    <el-input placeholder="请输入内容"
              @keyup.enter="search"
              v-model="keyword"
              style=" margin-bottom: 20px">
      <template #prepend>
        <el-icon><Search /></el-icon>
      </template>
      <template #append>
        <el-button type="primary" @click="search">
          搜索
        </el-button>
      </template>
    </el-input>

    <el-row v-for="(user, index) in userList" :key="user.userId"
            @click="goUser(index)"
            class="block">
      <el-avatar src="circleUrl" style="margin: 10px; float: left" />
      <div style="float: right; width: 800px">
        <h3 >
          {{user.userNickname}}
        </h3>
        <p >
          {{user.userIntroduction}}
        </p>
      </div>

    </el-row>
  </div>

</template>

<script>
export default {
  name: "Invite.vue",

  data(){
    return {
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
    goUser: function (){
      this.$router.push({name: 'userInformation', params:{userId: this.userList[index].userId}});
    },
    search: function (){
      this.$router.push({name: 'userInvite', params: {userId: this.keyword}});
    },
  },
  created() {
    this.keyword = this.$route.params.userId;
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