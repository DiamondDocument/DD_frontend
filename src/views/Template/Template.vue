<template>
  <div>
    <My></My>
  </div>
  <div>
    <Recommend></Recommend>
  </div>
</template>

<script>
import Recommend from "@/views/Template/Recommend";
import My from "@/views/Template/My";
export default {
  name: "Template.vue",
  components: {
    My,
    Recommend
  }
}
</script>