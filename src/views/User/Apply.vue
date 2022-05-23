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
        <el-button type="success" @click="accept">
          确定
        </el-button>
        <el-button type="danger" @click="object">
          取消
        </el-button>
      </div>
    </div>

  </div>

</template>


<script>
export default {
  name: "Apply.vue",
  data(){
    return {
      state: 1,
      url: '',
      userId: '',
      nickName: '',
      email: '',
      introduction: '',
    }
  },

  methods: {
    accept: function (){

    },
    object: function (){

    }
  },
  created() {
    this.userId = this.$route.params.userId;
    this.teamId = this.$route.params.teamId;

  }
}
</script>

<style scoped>

</style>