
<template>
  <teleport to="body">
    <transition name="confirm-fade">
      <div class="confirm" v-show="visible">
        <div class="confirm-wrapper">
          <div class="confirm-content">
            <p class="text">{{ detail }}</p>
            <el-button type="primary" style="bottom: 10px; left: 80px; position: absolute" @click="agree"><span>同意</span></el-button>
            <el-button type="primary" style="bottom: 10px; right: 80px; position: absolute" @click="refuse"><span>拒绝</span></el-button>
          </div>
        </div>
      </div>
    </transition>
  </teleport>
</template>

<script>

export default {
  name: "joinRequest",
  data() {
    return {
      detail: '',
      visible: false,
    }
  },
  emits: ['agree', 'refuse'],
  methods: {
    // 确认
    agree () {
      this.hide()
      this.$emit('agree')
    },
    // 取消
    refuse () {
      this.hide()
      this.$emit('refuse')
    },
    hide () {
      this.visible = false
    },
    show (s) {
      this.detail = s
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