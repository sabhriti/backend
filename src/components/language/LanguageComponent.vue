<template>
  <ComponentHeader text="Languages"/>
  <router-view></router-view>
</template>

<script>
import ComponentHeader from "@/components/ComponentHeader";

export default {
  name: "LanguageComponent",
  components: {
    ComponentHeader
  }
}
</script>

<style scoped>

</style>