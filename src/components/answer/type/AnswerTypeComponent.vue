<template>
  <ComponentHeader text="Answer Types"/>
  <router-view></router-view>
</template>

<script>
import ComponentHeader from "@/components/ComponentHeader";

export default {
  name: "AnswerTypeComponent",
  components: {
    ComponentHeader,
  }
}
</script>

<style scoped>

</style>