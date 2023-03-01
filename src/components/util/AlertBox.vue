<template>
  <div :class="alertClass" role="alert" v-if="!isHidden">
    {{ alertMessage }}
    <button aria-label="Close" class="btn-close alert-close" data-bs-dismiss="alert" type="button"></button>
  </div>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: "AlertBox",
  computed: {
    ...mapGetters(['alertMessage', 'alertType', 'isHidden']),
    alertClass: function() {
      return `alert alert-${this.alertType}`;
    }
  },
  methods: {
  }
}
</script>

<style scoped>
.alert-close {
  position: absolute;
  right: 5px;
  top: 30%;
}
</style>