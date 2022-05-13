<template>
  <div id="contextmenu" class="contextmenu">
    <div class="contextmenu__item" @click="handleTwo()">编辑</div>
    <div class="contextmenu__item" @click="handleThree()">收藏</div>
    <div class="contextmenu__item" @click="handleFour()">移动</div>
    <div class="contextmenu__item" @click="handleFive()">删除</div>
    <div class="contextmenu__item" @click="handleFive()">等等……</div>
  </div>
</template>


<script>
export default {
  name: "index",
  data () {
    return {
      collapse: false,
    }
  },  methods: {
    init (row, column,event) {
      let menu = document.querySelector('#contextmenu')
      let cha = document.body.clientHeight - event.clientY
      console.log(document.body.clientHeight,event.clientY,cha)
      if (cha < 150) {
        menu.style.top = event.clientY + 'px'
      } else {
        menu.style.top = event.clientY -20 + 'px'
      }
      menu.style.left = event.clientX + 20 + 'px'
      document.addEventListener('click', this.foo)
    },
    foo () {
      this.$emit('foo')
    },
    handleTwo () {
      this.$emit('handleTwo')
    },
    handleThree () {
      this.$emit('handleThree')
    },
    handleFour (){
      this.$emit('handleFour')
    },
    handleFive (){
      this.$emit('handleFive')
    }
  }
}

</script>

<style scoped>
.contextmenu__item {
  display: block;
  line-height: 34px;
  text-align: center;
}
.contextmenu__item:not(:last-child) {
  border-bottom: 1px solid rgba(64,158,255,.2);
}
.contextmenu {
  position: absolute;
  background-color: #ecf5ff;
  width: 100px;  font-size: 12px;
  color: #409EFF;
  border-radius: 4px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  border: 1px solid rgba(64,158,255,.2);
  white-space: nowrap;
  z-index: 1000;
}
.contextmenu__item:hover {
  cursor: pointer;
  background: #66b1ff;
  border-color: #66b1ff;
  color: #fff;
}

</style>