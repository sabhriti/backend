<template>
  <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
    <h1 class="h2">{{ text }}</h1>
  </div>
</template>

<script>
export default {
  name: "ComponentHeader",
  props: {
    text: String
  }
}
</script>

<style scoped>

</style>