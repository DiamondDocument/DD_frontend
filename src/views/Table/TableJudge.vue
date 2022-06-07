<template>
  <div>
    <Table v-if="type === 'my'"></Table>
    <TeamTable v-else-if="type === 'team'"></TeamTable>
    <OtherTable v-else-if="type === 'other'"></OtherTable>
  </div>
</template>

<script>


import TeamTable from "@/views/Table/TeamTable";
import OtherTable from "@/views/Table/OtherTable";
import Table from "@/views/Table/Table";
import {ref} from "vue";
import {useRoute} from "vue-router";
export default {

  setup(){
    const route = useRoute();
    let changeTable = ref(route.params.info);
    return {
      changeTable,
    };
  },
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
    // document.body.style.backgroundSize = '100%';
    // document.body.style.backgroundImage = this.loginBg;
    console.log("created!");
    console.log(this.info);
    this.$store.commit(
        "changeTable",
        this.$route.params.info,
    );
    this.type = this.$store.state.tableType;
  },
  updated() {
    console.log("updated");
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