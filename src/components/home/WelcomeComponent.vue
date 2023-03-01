<template>
  <ComponentHeader :text="text" />
</template>

<script>
import ComponentHeader from "@/components/ComponentHeader";
export default {
  name: "WelcomeComponent",
  components: { ComponentHeader},
  data() {
    return {
      text: '',
    }
  },

  created() {
    const session = JSON.parse(localStorage.getItem("session"));
    this.text = "Welcome " + session.email;
  }
}
</script>

<style scoped>
</style>