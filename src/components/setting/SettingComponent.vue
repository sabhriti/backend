<template>
  <component-header text="Settings"/>
  <router-view></router-view>
</template>

<script>
import ComponentHeader from "@/components/ComponentHeader.vue";

export default {
  name: "SettingComponent",
  components: {ComponentHeader}
}
</script>

<style scoped>

</style>