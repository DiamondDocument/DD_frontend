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
    }
  },
  components: {
    Table,
    OtherTable,
    TeamTable
  },
  created() {
    this.type = this.$route.params.info.split(":")[0];
    this.$store.commit(
        "changeTable",
        this.$route.params.info,
    );
  }
}
</script>

<style scoped>

</style>