<template>
  <div>
    <Table v-if="$route.params.info === 'my'"></Table>
    <TeamTable v-else-if="$route.params.info === 'team'"></TeamTable>
    <OtherTable v-else="$route.params.info === 'other'"></OtherTable>
  </div>
</template>

<script>


import TeamTable from "@/views/Table/TeamTable";
import OtherTable from "@/views/Table/OtherTable";
import Table from "@/views/Table/Table";
export default {
  name: "TableJudge",
  components: {
    Table,
    OtherTable,
    TeamTable
  },
  data(){
    return{
      loginBg: 'url(' + require('../../assets/bk.jpg') + ')'
    };
  },
  created() {
    document.body.style.backgroundSize = '100%';
    document.body.style.backgroundImage = this.loginBg;
    this.$store.commit(
        "changeTable",
        this.$route.params.info,
    );
  }
}
</script>

<style scoped>

</style>