<script setup>
import ApplicationIndex from "@/components/ApplicationIndex";
import FullPageSpinner from "@/components/util/FullPageSpinner.vue";
</script>

<template>
  <FullPageSpinner />
  <ApplicationIndex />
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
</style>
