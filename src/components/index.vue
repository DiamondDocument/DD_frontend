<template>
  <div id="contextmenu" class="contextmenu">
    <div v-if="spaceType===1 || spaceType===0" class="contextmenu__item" @click="collect()">收藏</div>
    <div v-if="spaceType===1" class="contextmenu__item" @click="move()">移动</div>
    <div v-if="spaceType===1" class="contextmenu__item" @click="authority()">设置权限</div>
    <div v-if="spaceType===1" class="contextmenu__item" @click="rename()">重命名</div>
    <div v-if="spaceType===1" class="contextmenu__item" @click="remove()">删除</div>
    <div v-if="spaceType===1 || spaceType===2 || spaceType===0" class="contextmenu__item" @click="_export()">导出</div>
    <div v-if="(spaceType===1 || spaceType===2 || spaceType===0) && !shared" class="contextmenu__item" @click="share()">分享</div>
    <div v-if="(spaceType===1 || spaceType===2 || spaceType===0) && shared" class="contextmenu__item" @click="notShare()">取消分享</div>
    <div v-if="spaceType===2" class="contextmenu__item" @click="disCollect()">取消收藏</div>
    <div v-if="spaceType===3" class="contextmenu__item" @click="recover()">恢复文件</div>
    <div v-if="spaceType===3" class="contextmenu__item" @click="del()">彻底删除</div>
  </div>
</template>


<script>
export default {
  name: "index",
  props: {
    spaceType: {
      type: Number,
    },
    shared: {
      shared: Boolean,
    }
  },
  data () {
    return {
      collapse: false,
    }
  },
  methods: {
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
    collect (){
      this.$emit('collect')
    },
    rename(){
      this.$emit('rename')
    },
    move (){
      this.$emit('move')
    },
    remove (){
      this.$emit('remove')
    },
    _export (){
      this.$emit('_export')
    },
    share (){
      this.$emit('share')
    },
    notShare(){
      this.$emit('notShare')
    },
    disCollect (){
      this.$emit('disCollect')
    },
    recover() {
      this.$emit('recover')
    },
    del() {
      this.$emit('del')
    },
    authority() {
      this.$emit('authority')
    }
  }
}

</script>

<style scoped>
.contextmenu__item {
  display: block;
  line-height: 50px;
  text-align: center;
}
.contextmenu__item:not(:last-child) {
  border-bottom: 1px solid rgba(171, 171, 171, 0.2);
}
.contextmenu {
  position: absolute;
  background-color: #ffffff;
  width: 170px;  font-size: 17px;
  color: #4d4d4d;
  /*border-radius: 10px;*/
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  border: 1px solid rgba(44, 44, 44, 0.2);
  white-space: nowrap;
  z-index: 1000;
}
.contextmenu__item:hover {
  cursor: pointer;
  border-radius: 10px;
  background: #c2c2c2;
  border-color: #bdbdbd;
  color: #fff;
}

</style>