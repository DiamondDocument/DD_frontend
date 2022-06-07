<template>

</template>

<script>
export default {
  data (){
    return {

    }
  },
  created() {
    let option = this.$route.params.option;
    if (option === '0'){
      this.$router.push({name:'teamList', params: {key : this.$route.params.key}});
    }else if (option === '1'){
      this.$router.push({name:'teamInvite', params: {
          keyword : this.$route.params.keyword,
          teamId: this.$route.params.teamId,
      }});
    }
  }
}
</script>