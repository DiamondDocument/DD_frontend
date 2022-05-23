
<template>
  <teleport to="body">
    <transition name="confirm-fade">
      <div class="confirm" v-show="visible">
        <div class="confirm-wrapper">
          <div class="confirm-content">
            <p class="text">谁可以查看/编辑文档: </p>
            <el-radio-group v-model="radio" @change="change" style="display:table-cell">
              <el-radio label="1" border style="margin-left: 35px">仅自己可查看</el-radio>
              <el-radio label="2" border style="margin-left: 35px">所有人可查看</el-radio>
              <el-radio label="3" border style="margin-left: 35px">所有人可评论</el-radio>
              <el-radio label="4" border style="margin-left: 35px">所有人可编辑</el-radio>
            </el-radio-group>
            <el-button type="primary" style="bottom: 10px; left: 80px; position: absolute" @click="commit"><span>确定</span></el-button>
            <el-button type="primary" style="bottom: 10px; right: 80px; position: absolute" @click="hide"><span>取消</span></el-button>
          </div>
        </div>
      </div>
    </transition>
  </teleport>
</template>

<script>

export default {
  name: "authority",
  data() {
    return {
      radio: 1,
      visible: false,
      authority: Number,
    }
  },
  methods: {
    change: function(val){
      this.authority=val
    },
    commit () {
      this.hide()
      this.$emit('altAuthority', this.authority)
    },
    hide () {
      this.visible = false
    },
    show () {
      this.visible = true
    }
  },
}
</script>

<style scoped lang="scss">
.confirm {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 996;
  background-color: #ebebeb;
  &.confirm-fade-enter-active {
    animation: confirm-fadein .3s;
    .confirm-content {
      animation: confirm-zoom-in .3s;
    }
  }
  &.confirm-fade-leave-active {
    animation: confirm-fadeout .3s;
    .confirm-content {
      animation: confirm-zoom-out .3s;
    }
  }
}
.confirm-wrapper {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 997;
  .confirm-content {
    width: 400px;
    height: 400px;
    border-radius: 13px;
    position: relative;
    background: #ffffff;
    .text {
      padding: 25px 20px;
      line-height: 22px;
      text-align: center;
      font-size: 15px;
      color: dimgrey;
    }
  }
}
@keyframes confirm-fadein {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
@keyframes confirm-fadeout {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
@keyframes confirm-zoom-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
}
@keyframes confirm-zoom-out {
  0% {
    transform: scale(1);
  }
  100% {
    transform: scale(0);
  }
}
</style>