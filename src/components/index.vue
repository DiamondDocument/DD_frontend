<template>
  <div id="contextmenu" class="contextmenu">
    <div v-if="spaceType===1" class="contextmenu__item" @click="rename()"><el-icon style="margin: auto 10px auto 0 "><ScaleToOriginal /></el-icon><div>重命名</div></div>
    <div v-if="spaceType===1 || spaceType===0" class="contextmenu__item" @click="collect()"><el-icon style="margin: auto 10px auto 0 "><CollectionTag /></el-icon>收藏</div>
    <div v-if="spaceType===1" class="contextmenu__item" @click="move()"><el-icon style="margin: auto 10px auto 0 "><Right /></el-icon><div>移动</div></div>
    <div v-if="spaceType===1" class="contextmenu__item" @click="authority()"><el-icon style="margin: auto 10px auto 0 "><Key /></el-icon><div>设置权限</div></div>
    <div v-if="spaceType===1" class="contextmenu__item" @click="remove()"><el-icon style="margin: auto 10px auto 0 "><Remove /></el-icon><div>删除</div></div>
    <div v-if="spaceType===1 || spaceType===2 || spaceType===0" class="contextmenu__item" @click="_export()"><el-icon style="margin: auto 10px auto 0 "><Ticket /></el-icon><div>导出</div></div>
    <div v-if="(spaceType===1 || spaceType===2 || spaceType===0) && !shared" class="contextmenu__item" @click="share()"><el-icon style="margin: auto 10px auto 0 "><Share /></el-icon><div>分享</div></div>
    <div v-if="(spaceType===1 || spaceType===2 || spaceType===0) && shared" class="contextmenu__item" @click="notShare()"><el-icon style="margin: auto 10px auto 0 "><Lock /></el-icon><div>取消分享</div></div>
    <div v-if="spaceType===2" class="contextmenu__item" @click="disCollect()"><el-icon style="margin: auto 10px auto 0 "><RemoveFilled /></el-icon><div>取消收藏</div></div>
    <div v-if="spaceType===3" class="contextmenu__item" @click="recover()"><el-icon style="margin: auto 10px auto 0 "><Refresh /></el-icon><div>恢复文件</div></div>
    <div v-if="spaceType===3" class="contextmenu__item" @click="del()"><el-icon style="margin: auto 10px auto 0 "><Remove /></el-icon><div>彻底删除</div></div>
  </div>
</template>


<script>
import {RemoveFilled, Ticket} from "@element-plus/icons-vue";
export default {
  name: "index",
  components: {RemoveFilled, Ticket},
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
  display: flex;
  line-height: 40px;
  text-align: left;
  padding-left: 10px;
}
.contextmenu__item:not(:last-child) {
  border-bottom: 1px solid rgba(171, 171, 171, 0.2);
}
.contextmenu {
  position: absolute;
  background-color: #ffffff;
  width: 140px;  font-size: 13px;
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