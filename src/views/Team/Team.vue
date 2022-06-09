<template>
  <div style="width: 1000px;margin-left: auto;margin-right: auto;margin-top: 30px; ">
    <el-card shadow="always" :body-style="{ padding: '40px 20 20 0 ',  }">
      <div>
        <div style="height:200px;
                width: 80%;
                margin: 10px auto;
                background-color: #EEF0F1;
                /*position: relative;*/
                border-style: solid;
                border-width: 1px;
                border-color: lightgray;
                border-radius: 5px;
                display: flex;
    ">
<!--          <el-image v-if="userType === 0"-->
<!--                    @click=" changeImg"-->
<!--                    class="teamImg"-->
<!--                    :src="team_img"-->
<!--                    fit="fill" />-->
<!--          <el-image v-else class="teamImg" :src="team_img" fit="fill" />-->
          <el-avatar :size="150" style="float: left; " @click="changeImg" class="teamImg" >
            <template #default>
              <el-avatar :size="146" :src="team_img" fit="cover"/>
            </template>
          </el-avatar>
          <div class="information"  style="height: 100%; ">
            <div style="margin-top: 20px;height: 70%">
              <div v-if="changing === 0" >
                <h2 style="font-size: 35px">
                  {{ team_name }}
                </h2>
                <p style="font-size: 18px;color:  #5B6266;margin-top: 10px">
                  {{ team_introduction }}
                </p>
              </div>
              <div v-else>
                <div>
                  <el-input type="text"
                            v-model="team_name"
                            placeholder="请输入团队名称" style="width: 100px;margin-right: auto"/>
                </div>

                <el-input type="textarea"
                          v-model="team_introduction"
                          placeholder="请输入团队简介"
                          style="margin-top: 10px;width: 150px" />
              </div>
            </div>
            <div style="margin-bottom: 20px;margin-top: auto;">
              <el-button v-if="userType === 0 && changing === 0"
                         @click="change">修改</el-button>
              <input type="file"
                     ref="clearFile"
                     style="display:none"
                     @change="upload($event)"/>
              <el-button v-if="userType === 0 && changing === 1"
                         @click="endChange">
                完成
              </el-button>
            </div>
          </div>
          <div style="margin: auto;">

            <div style="">
              <el-popconfirm
                  v-if="userType === 0"
                  confirm-button-text="确认"
                  cancel-button-text="取消"
                  title="确认要解散团队吗?"
                  @confirm="dropTeam"
              >
                <template #reference>
                  <el-button  type="danger" style="width: 150px" >
                    解散团队
                  </el-button>
                </template>
              </el-popconfirm>
              <el-popconfirm
                  v-else-if="userType === 1"
                  confirm-button-text="确认"
                  cancel-button-text="取消"
                  title="确认要离开团队吗?"
                  @confirm="leaveTeam"
              >
                <template #reference>
                  <el-button  type="danger" style="width: 150px" >
                    离开团队
                  </el-button>
                </template>
              </el-popconfirm>


              <el-button v-else-if="userType === 2" type="info" disabled="true" style="width: 150px">
                待审核
              </el-button>

              <el-button v-else-if="userType === 3" type="success" @click="accept" style="width: 150px">
                同意邀请
              </el-button>

              <el-button v-else-if="userType === 4" type="success" @click="apply" style="width: 150px">
                申请加入
              </el-button>

              <div v-else type="info" disabled="true" style="width: 150px">
                请先登录
              </div>
            </div>
            <el-button v-if="userType === 0"
                       @click="invite"
                       type="primary"
                       style="margin-top: 10px;width: 150px">
              邀请新成员
            </el-button>
            <br>
            <el-button @click="enterTable"
                       type="success"
                       style="margin-top: 10px;width: 150px">
              进入团队工作台
            </el-button>
          </div >
        </div>
        <div style="height: 20px"></div>
        <el-page-header style="margin-left: 20px;" icon="Avatar" content="团队成员" title="        " />
        <el-divider />

        <div style="">
          <el-row v-for="mem in memList" :key="mem.id" class="block" style="width: 80%;height: 70px;">
            <div @click="goUser(mem.userId)"
                 style="
             float: right;
             width: 80%">
              <el-avatar :src="mem.url"
                         style="
                     margin-left: 20px;
                     float: left;
                     margin-top: 20px"/>
              <div style="float: left; margin-left: 25px; margin-top: 25px">
                {{mem.name}}
              </div>
            </div>
            <div v-if="userType === 0 && mem.userId !== this.$store.state.loginUser.userId"
                 style="
             height: 80px;
              position: absolute;
              right: 15px;
              float: right;">

              <el-popconfirm
                  confirm-button-text="确认"
                  cancel-button-text="取消"
                  title="确认将该成员移除团队吗?"
                  @confirm="removeMem(mem.userId)"
              >
                <template #reference>
                  <el-button  type="danger" style="margin: 5px">
                    移除成员
                  </el-button>
                </template>
              </el-popconfirm>

              <br>

              <el-popconfirm
                  confirm-button-text="确认"
                  cancel-button-text="取消"
                  title="确认要将队长权限转让给该成员吗?"
                  @confirm="transPri(mem.userId)"
              >
                <template #reference>
                  <el-button style="margin: 5px">
                    转让权限
                  </el-button>
                </template>
              </el-popconfirm>

            </div>

          </el-row>
        </div>

      </div>
    </el-card>
  </div>

</template>

<script>
import {ElMessage} from "element-plus";

export default {
  data(){
    return {
      changing : 0,
      userType: -1,
      teamId: '',
      team_img:"",
      team_name: "",
      team_introduction: "",
      c_teamName: '',
      c_teamIntroduction: '',
      memList: null,
    }
  },

  methods: {
    change: function (){
      this.changing = 1;
    },

    enterTable: function (){
      this.$router.push({name: 'table', params: {info: 'team-' + this.teamId}});
    },

    endChange: function (){
      this.changing = 0;
      this.$axios.post("team/modify/name",
          {
            "teamId" : this.teamId,
            "newName": this.team_name,
          }).then((res)=>{
        if (res.status === 200){
          console.log('change name data = ');
          console.log(res.data);
          if (res.data.code === 0) ElMessage("修改团队名称成功！");
          else if (res.data.code === 1) ElMessage("团队不存在");
          else ElMessage("系统错误！！");
        }else console.log("return status != 200!!");
      }).catch((err)=>{
        console.log(err);
      })

      this.$axios.post("team/modify/introduction",
          {
            "teamId" : this.teamId,
            "newIntro": this.team_introduction,
          }).then((res)=>{
        if (res.status === 200){
          console.log('change introduction data = ');
          console.log(res.data);
          if (res.data.code === 0) ElMessage("修改团队简介成功！");
          else if (res.data.code === 1) ElMessage("团队不存在");
          else ElMessage("系统错误！！");
        }else console.log("return status != 200!!");
      }).catch((err)=>{
        console.log(err);
      })
    },

    changeImg: function (){
      if(this.userType!==0)return;
      console.log("changeImg is called!");
      console.log('with userType' + this.userType);
      this.$refs.clearFile.click();
    },

    upload: function(e){
      console.log("upload is called!")
      let getFile =document.getElementById("files");
      // getFile.onchange=function(e){
      //获取到文件以后就会返回一个对象，通过这个对象即可获取文件
      console.log(e.currentTarget.files);//所有文件，返回的是一个数组
      console.log(e.currentTarget.files[0].name)//文件名
      let form = new FormData();
      form.append("file",e.currentTarget.files[0]);
      form.append("teamId", this.teamId);
      console.log(form);
      this.axios.post("team/modify/avatar",form).then((response)=>{
        if(response.status === 200){
          console.log('change avatar data = ');
          console.log(response.data);
          if (response.data.code === 0) {
            ElMessage("上传成功！");
            location.reload();
          }
          else ElMessage('系统错误');
        }else{
          ElMessage("上传失败!");
          console.log("status is not 200!");
        }
      }).catch((err)=>{
        console.log(err);
      });
    },

    invite: function (){
      this.$router.push({name: 'teamInvite', params: {teamId: this.teamId ,keyword: ''}});
    },

    dropTeam: function (){
      console.log("dropTeam is called!");
      this.axios.post("team/dismiss",{
        "teamId": this.teamId,
        "userId": this.$store.state.loginUser.userId,
      }).then((response)=>{
        if(response.status === 200){
          console.log('dropTeam data = ');
          console.log(response.data);
          if (response.data.code === 0) {
            ElMessage("解散成功！");
            this.$router.back();
          }
          else if (response.data.code === 1) ElMessage('你不是队长');
          else ElMessage('系统错误');
        }else console.log("status is not 200!");
      }).catch((err)=>{
        console.log(err);
      });
      // this.$router.push({name: 'table', params:{info: 'my'}});
    },

    // 无接口？！！
    leaveTeam: function (userId){
      console.log("leaveTeam is called!")
      this.axios.post("team/leave",{
        "teamId": this.teamId,
        "userId": userId,
      }).then((response)=>{
        if(response.status === 200){
          console.log('dropTeam data = ');
          console.log(response.data);
          if (response.data.code === 0) {
            ElMessage("成功离开！");
            this.$router.push({name: 'table', params:{info: 'my'}});
          } else ElMessage('系统错误');
        }else console.log("status is not 200!");
      }).catch((err)=>{
        console.log(err);
      });
    },

    accept: function (){
      console.log("accept is called!")
      this.axios.post("team/invite-deal",{
        "teamId": this.teamId,
        "userId": this.$store.state.loginUser.userId,
        "deal": 1,
      }).then((response)=>{
        if(response.status === 200){
          console.log('dropTeam data = ');
          console.log(response.data);
          if (response.data.code === 0) {
            ElMessage("成功加入！");
            location.reload();
          }
          else ElMessage('系统错误');
        }else console.log("status is not 200!");
      }).catch((err)=>{
        console.log(err);
      });
    },

    apply: function (){
      console.log("apply is called!");
      this.axios.post("team/apply",{
        "teamId": this.teamId,
        "userId": this.$store.state.loginUser.userId,
      }).then((response)=>{
        if(response.status === 200){
          console.log('apply data = ');
          console.log(response.data);
          if (response.data.code === 0) {
            ElMessage("成功提交申请！");
            location.reload();
          }
          else ElMessage('系统错误');
        }else console.log("status is not 200!");
      }).catch((err)=>{
        console.log(err);
      });

    },

    goUser: function (userId){
      console.log("goUser is called");
      this.$router.push({name: 'userInformation', params: {userId: userId}});
    },

    removeMem: function (memberId){
      console.log("removeMem is called!");
      this.axios.post("team/remove",{
        "teamId": this.teamId,
        "captainId" :  this.$store.state.loginUser.userId,
        "memberId" : memberId,
      }).then((response)=>{
        if(response.status === 200){
          console.log('remove mem data = ');
          console.log(response.data);
          if (response.data.code === 0) {
            ElMessage("成功移除！");
            location.reload();
          }
          else ElMessage('系统错误');
        }else console.log("status is not 200!");
      }).catch((err)=>{
        console.log(err);
      });

    },

    transPri: function (memberId){
      console.log("transPri is called!");
      this.axios.post("team/transfer ",{
        "teamId": this.teamId,
        "oldCaptainId" : this.$store.state.loginUser.userId,
        "newCaptainId" : memberId,
      }).then((response)=>{
        if(response.status === 200){
          console.log('transPri data = ');
          console.log(response.data);
          if (response.data.code === 0) {
            ElMessage("成功转让！");
            location.reload();
          }
          else ElMessage('系统错误');
        }else console.log("status is not 200!");
      }).catch((err)=>{
        console.log(err);
      });
    },

    checkUserType: function (){
      console.log("checkUserType is called!");
      this.axios.get("team/team-status",{
        params:{
          teamId: this.teamId,
          userId: this.$store.state.loginUser.userId,
        }
      }).then(res => {
        console.log('userType data =  ');
        console.log(res.data);
        if (res.status === 200){
          if (res.data.code === 0) this.userType = res.data.status;
          // if (res.data.code === 0) this.userType = 0;
          else console.log('code = ' + res.data.code);
        }else console.log('status is not 200!');
      }).catch(err => {
        console.log(err);
      })
    },

    getTeamInformation: function (){
      console.log('getTeamInformation is called');
      console.log('teamId is ' + this.teamId);
      //  获取团队基本信息
      this.axios.get("team/information",{
        params:{
          teamId: this.teamId,
        }
      }).then(res => {
        if (res.status === 200){
          console.log('get information data = ');
          console.log(res.data);
          if (res.data.code === 0) {
            this.team_name = res.data.name;
            this.team_introduction = res.data.intro;
          }
          else console.log('code = ' + res.data.code);
        }else console.log('status is not 200!');
      }).catch(err => {
        console.log(err);
      })
      // 获取团队头像
      this.axios.get("team/get-avatar",{
        params:{
          teamId: this.teamId,
        }
      }).then(res => {
        if (res.status === 200){
          console.log('get-avatar data = ');
          console.log(res.data)
          if (res.data.code === 0) this.team_img = res.data.url;
          else console.log('code = ' + res.data.code);
        }else console.log('status is not 200!');
      }).catch(err => {
        console.log(err);
      })

      this.axios.get("team/member",{
        params:{
          teamId: this.teamId,
        }
      }).then(res => {
        if (res.status === 200){
          console.log('get mems data = ')
          console.log(res.data)
          console.log(typeof (res.data.member))
          if (res.data.code === 0) this.memList = res.data.member;
          else console.log('code = ' + res.data.code);
        }else console.log('status is not 200!');
      }).catch(err => {
        console.log(err);
      })
    },

  },
  created() {
    console.log(this.$store.state.loginUser.userId)
    this.teamId = this.$route.params.teamId;
    this.checkUserType();
    this.getTeamInformation();
    console.log('parseInt(0.0000005) = ',parseInt(0.0000005));
  }
}

</script>

<style scoped>
.information {
  /*position: absolute;*/
  /*top: 20px;*/
  /*left: 257px;*/
}
.teamImg {
  float: left;
  margin: 25px 50px 25px 50px;
  height: 150px;
  width: 150px;
}
.block {
  margin: 10px auto;
  /*padding: 10px;*/
  /*width: 60%;*/
  /*height: 100px;*/
  border-style: solid;
  border-width: 1px;
  border-color: lightgray;
  border-radius: 5px;
}
</style>