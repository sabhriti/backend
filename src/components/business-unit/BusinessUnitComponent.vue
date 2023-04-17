<template>
  <ComponentHeader text="Business Unit"/>
  <router-view></router-view>
</template>

<script>
import ComponentHeader from "@/components/ComponentHeader";

export default {
  name: "BusinessUnitComponent",
  components: {
    ComponentHeader
  }
}
</script>

<style scoped>

</style>