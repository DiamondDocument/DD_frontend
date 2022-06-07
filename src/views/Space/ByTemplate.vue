<template>

</template>
<script>
export default {
  methods: {
    toEdit() {
      //进入编辑界面之前使用replace而不是push
      this.$router.replace({name:"documentEdit", params:{}});
    }
  }
}
</script>
