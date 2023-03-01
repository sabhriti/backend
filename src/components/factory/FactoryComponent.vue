<template>
  <ComponentHeader text="Factories"/>
  <router-view></router-view>
</template>

<script>
import ComponentHeader from "@/components/ComponentHeader";

export default {
  name: "FactoryComponent",
  components: {
    ComponentHeader
  }
}
</script>

<style scoped>

</style>