<template>
<!--  space调用的时候才会显示的一个div-->
  <div style="margin: 15px 0 5px 0;border-bottom: 1px solid #e8e8e8;padding-bottom: 10px" v-if="spaceUsing">
    <el-menu default-active="'/' +this.$route.path.split('/')[1]" >
      <el-button type="primary" style="float: right; margin-right: 20px">
        <span style="vertical-align: middle" @click="this.$emit('cancel')">取消</span>
      </el-button>
    </el-menu>
  </div>
  <el-row>
    <el-col
        v-for="(temps, i) in templates"
        :span="6.5"
        :offset="i > 0 ? 0.5 : 0"
    >
      <el-card class="box-card">
        <img
            :src="temps.url"
            class="image"
            style="position: center"
            @click="this.$router.push({name: 'templateDetail', params:{templateId:temps.tempId}})"
        />
        <div style="padding: 14px; margin: 0;">
          <p>{{temps.tempName}}</p>
          <div class="bottom">
            <p>作者：{{temps.creatorId}}</p>
            <el-button type="primary" round @click="useTmp(temps)">立即使用</el-button>
          </div>
        </div>
      </el-card>
    </el-col>
  </el-row>
  <tmp-pos ref="tmpPos" v-if="selectPos" @commit="commit" @cancel="selectPos=false"></tmp-pos>
</template>

<script>
import {ElMessage} from "element-plus";
import tmpPos from "@/views/Space/tmpPos";

export default {
  name: "MyTemplate.vue",
  components:[tmpPos],
  data() {
    return {
      userId: '',
      spaceUsing: false,    //是否正在被space调用
      selectPos: false,     //是否在选择创建位置
      curTmpId: Number,     //当前选中的id
      curTmpName: '',       //当前选中的name
      templates: [
        {
          tempName: 'for space test'
        }
      ]
    }
  },

  created() {
    this.userId = this.$store.state.loginUser.userId
    this.$axios.get("/template/list/my", {
      params: {
        userId: this.userId,
      }
    }).then((response) => {
      if (response.status === 200) {
        if (response.data.code === 0) {
          this.templates = response.data.temps;
          console.log(this.templates[0].url)
        } else ElMessage("模板信息获取错误");
      } else console.log("请求返回status不为200")
    }).catch((err) => {
      console.log(err);
    });
  },
  methods:{
    useTmp(tmp){
      if (this.spaceUsing)
        this.$emit('useTmp', tmp.tempId, tmp.tempName)
      this.selectPos=true
      this.curTmpId=tmp.tempId;
    },
    commit(id){
      this.$axios.post("/api/file/create", {
        "type": 1,
        "name": this.curTmpName,
        "templateId": this.curTmpId,
        "authority": 3,
        "creatorId": this.$store.state.userId,
        "parentId": id,
      }).then((response)=>{
        if (response.status===0){
          ElMessage('创建成功')
        }
        else if (response.status===-1){
          ElMessage('创建失败')
        }
        else if (response.status===1){
          ElMessage('文件重名,已自动修改')
        }
        else{
          ElMessage('其他错误')
        }
      }).catch((err)=>{
        console.log(err)
      });
    },
  }
}
</script>

<style>

.bottom {
  margin-top: 13px;
  line-height: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.button {
  padding: 0;
  min-height: auto;
}

.image {
  width: 140px;
  display: block;
}

.box-card {
  margin-left: 0;
  margin-top: 20px;
  width: 400px;
  float: left;
}
</style>