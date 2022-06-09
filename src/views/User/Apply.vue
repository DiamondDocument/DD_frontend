<template>


  <div style="width: 400px;
              margin-left: auto;
              margin-right:auto;
              margin-top: 30px;
              text-align: center;">
    <el-card shadow="always" :body-style="{ padding: '40px 20 20 0 ',backgroundColor: '#F7F7F7'  }" >
        <div>
<!--          <div style="-->
<!--                background-color: white;-->
<!--                -->
<!--                border-style: solid;-->
<!--                border-width: 1px;-->
<!--                border-color: lightgray;-->
<!--                border-radius: 5px;-->
<!--                margin: 20px auto;-->
<!--                width: 300px;">-->
          <el-avatar
              style="margin-top: 30px;"
              :size="150"
              :src="url"/>

          <el-form
              label-position="Right"
              label-width="100px"
              style="
                max-width: 300px;
                margin: 20px;
          ">
            <el-form-item label="用户名：">
              {{ userId }}
            </el-form-item>

            <el-form-item label="用户昵称：">
              {{ nickName }}
            </el-form-item>

            <el-form-item label="邮箱：">
              {{ email }}
            </el-form-item>

            <el-form-item label="用户简介：">
              {{ introduction }}
            </el-form-item>
          </el-form>

          <el-divider/>

          <span v-if="state === 0">
            是否同意该用户申请?
          </span>
              <span v-else-if="state === 1">
            该用户已在团队中
          </span>
              <span v-else-if="state === 2">
            已经拒绝该用户申请
          </span>
              <span v-else-if="state === 3">
            该用户未提交申请
          </span>
              <span v-else>
            other error!
          </span>

          <el-divider/>

          <div v-if="state === 0">
            <div style="width: 250px;
                  height: 50px;
                  text-align: center;
                  margin: 0 auto">
              <el-button type="success" @click="deal(1)">
                同意
              </el-button>
              <el-button type="danger" @click="deal(0)">
                拒绝
              </el-button>
            </div>
<!--          </div>-->

        </div>
      </div>
    </el-card>
  </div>



</template>


<script>
import {ElMessage} from "element-plus";

export default {
  name: "Apply.vue",
  data(){
    return {
      state: -1,
      flag: false,
      url: '',
      userId: '',
      teamId: '',
      nickName: '',
      email: '',
      introduction: '',
    }
  },

  methods: {
    sendDeal: function (option){
      console.log('sendDeal is called!');
      return this.$axios.post("team/apply-deal",
          {
            "teamId" : this.teamId,
            "userId" : this.userId,
            "deal" : option,
          }).then((res)=>{
        if (res.status === 200){
          if (res.data.code === 0) ElMessage("处理成功！");
          else if (res.data.code === 1) ElMessage("申请记录不存在");
          else if (res.data.code === 2) ElMessage("已经处理");
          else ElMessage("系统错误！！");
        }else console.log("return status != 200!!");
      }).catch((err)=>{
        console.log(err);
      })
    },

    isMaster:  function (){
      console.log('check is master ?');
      return this.axios.get("team/team-status",{
        params:{
          teamId: this.teamId,
          userId: this.$store.state.loginUser.userId,
          // userId: 'admin',
        }
      }).then(res => {
        console.log('userType data =  ');
        console.log(res.data);
        if (res.status === 200){
          this.flag =  (res.data.status === 0);
        }else  console.log('status is not 200!');
      }).catch(err => {
        console.log(err);
      });
    },

    async deal(option){
      console.log("deal is called!");
      await this.isMaster();
      console.log('flag = ' + this.flag);
      if (this.flag === false) {
        ElMessage('你不是该团队的队长');
        return;
      }
      await this.sendDeal(option);
      await this.checkUserState();
    },

    checkUserState: function (){
      console.log("checkUserState is called!");
      this.axios.get("team/is-apply",{
        params:{
          teamId: this.teamId,
          userId: this.userId,
        }
      }).then(res => {
        console.log('userState data =  ');
        console.log(res.data);
        if (res.status === 200){
          this.state = res.data.code;
          // this.state = 4;
        }else console.log('status is not 200!');
      }).catch(err => {
        console.log(err);
      })

    },

    getUserInformation: function (){
      this.$axios.get("user/information", {
        params:{
          userId: this.userId,
        }
      }).then((response)=>{
        if (response.status === 200){
          console.log('user data');
          console.log(response.data);
          if (response.data.code === 0){
            this.nickName = response.data.nickName;
            this.email = response.data.email;
            this.introduction = response.data.introduction;
          }else if(response.data.code === 1) console.log('用户不存在')
          else console.log("用户信息获取错误");
        }else console.log("请求返回status不为200")
      }).catch((err)=>{
        console.log(err);
      });

      this.$axios.get("user/get-avatar", {
        params:{
          userId: this.userId,
        }
      }).then((response)=>{
        if (response.status === 200){
          console.log('get User avatar = ')
          console.log(response.data)
          if (response.data.code === 0){
            this.url = response.data.url;
          }else console.log("用户头像获取错误");
        }else console.log("请求返回status不为200");
      }).catch((err)=>{
        console.log(err);
      });

    },
  },

  created() {
    this.userId = this.$route.params.userId;
    this.teamId = this.$route.params.teamId;
    this.checkUserState();
    this.getUserInformation();
  }
}
</script>

<style scoped>

</style>