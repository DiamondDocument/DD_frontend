<template>
  <div>
    <Table v-if="type === 'my'"></Table>
    <TeamTable v-else-if="type === 'team'"></TeamTable>
    <OtherTable v-else></OtherTable>
  </div>
</template>

<script>


import TeamTable from "@/views/Table/TeamTable";
import OtherTable from "@/views/Table/OtherTable";
import Table from "@/views/Table/Table";
export default {
  name: "TableJudge",
  data() {
    return {
      type: '',
      loginBg: 'url(' + require('../../assets/bk.jpg') + ')'
    }
  },
  components: {
    Table,
    OtherTable,
    TeamTable
  },

  created() {
    document.body.style.backgroundSize = '100%';
    document.body.style.backgroundImage = this.loginBg;

    this.$store.commit(
        "changeTable",
        this.$route.params.info,
    );
    this.type = this.$store.state.tableType;
  }
}
</script>

<style scoped>

</style>