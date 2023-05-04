<template>
  <ComponentHeader text="Questions" icon="quiz"/>
  <router-view></router-view>
</template>

<script>
import ComponentHeader from "@/components/ComponentHeader";

export default {
  name: "QuestionComponent",
  components: {
    ComponentHeader
  }
}
</script>

<style scoped>

</style>