<template>
  <div class="message-wrapper ms-2 me-2">
    <div :class="alertClass" role="alert">
      {{ alertMessage }}
      <button aria-label="Close" class="btn-close alert-close" type="button" @click="handleCloseClick"></button>
    </div>
  </div>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: "AlertBox",
  computed: {
    ...mapGetters(['alertMessage', 'alertClass'])
  },
  methods: {
    handleCloseClick() {
      this.$store.dispatch("hideAlert");
    }
  }
}
</script>

<style scoped>
.alert-close {
  position: absolute;
  right: 10px;
  top: 30%;
}
</style>