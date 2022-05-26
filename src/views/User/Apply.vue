<template>
  <div style="
      text-align: center;
      border-style: solid;
      border-width: 1px;
      border-color: lightgray;
      border-radius: 5px;
      margin: 0 auto;
      width: 300px;">

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
      以及拒绝该用户申请
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
          确定
        </el-button>
        <el-button type="danger" @click="deal(0)">
          取消
        </el-button>
      </div>
    </div>

  </div>

</template>


<script>
import {ElMessage} from "element-plus";

export default {
  name: "Apply.vue",
  data(){
    return {
      state: 1,
      url: '',
      userId: '',
      teamId: '',
      nickName: '',
      email: '',
      introduction: '',
    }
  },

  methods: {
    deal:function (option){
      this.$axios.post("/api/team/apply-deal",
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
      location.reload();
    },
    //接口缺失
    checkUserState: function (){

    }
  },

  created() {
    this.userId = this.$route.params.userId;
    this.teamId = this.$route.params.teamId;
    this.$axios.get("/api/user/information", {
      params:{
        userId: this.userId,
      }
    }).then((response)=>{
      if (response.status === 200){
        if (response.data.code === 0){
          this.nickName = response.data.nickName;
          this.email = response.data.email;
          this.introduction = response.data.introduction;
        }else ElMessage("获取用户信息错误！");
      }else console.log("请求返回status不为200")
    }).catch((err)=>{
      console.log(err);
    });

    this.checkUserState();

  }
}
</script>

<style scoped>

</style>