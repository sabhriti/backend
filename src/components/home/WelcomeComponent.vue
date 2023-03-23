<template>
  <ComponentHeader :text="text" />
</template>

<script>
import ComponentHeader from "@/components/ComponentHeader";
import LocalStorage from "@/util/local_storage";

export default {
  name: "WelcomeComponent",
  components: { ComponentHeader},
  data() {
    return {
      text: '',
    }
  },

  created() {
    const session = LocalStorage.get("session");
    this.text = "Welcome " + session.username;
  }
}
</script>

<style scoped>
</style>