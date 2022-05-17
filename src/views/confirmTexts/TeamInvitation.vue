<!--请把这个放在components文件夹中-->
<!--请把这个放在components文件夹中-->
<!--请把这个放在components文件夹中-->
<!--请把这个放在components文件夹中-->
<!--请把这个放在components文件夹中-->
<!--reply: 暂时没办法我还不会………………-->
<template>
  <teleport to="body">
    <transition name="confirm-fade">
      <div class="confirm" v-show="visible">
        <div class="confirm-wrapper">
          <div class="confirm-content">
            <p class="text">{{ text }}</p>
            <el-button type="primary" style="bottom: 10px; position: absolute" @click="confirm"><span>确定</span></el-button>
            <el-button type="primary" style="bottom: 10px;position: absolute" @click="cancel"><span>关闭</span></el-button>
          </div>
        </div>
      </div>
    </transition>
  </teleport>
</template>

<script>
export default {
  name: "TeamInvitation",
  props: {
    text: {
      type: String,
      default: ''
    },
  },
  data() {
    return {
      visible: false,
    }
  },
  emits: ['confirm', 'cancel'],
  methods: {
    // 确认
    confirm () {
      this.hide()
      this.$emit('confirm')
    },
    // 取消
    cancel () {
      this.hide()
      this.$emit('cancel')
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
      padding: 19px 15px;
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