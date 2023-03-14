<template>
  <template v-if="activationStatus === 'active'">
    <a href="#">
      <span class="material-icons-outlined text-success">check_circle</span>
    </a>
  </template>

  <template v-if="activationStatus === 'inactive'">
    <a href="#">
      <span class="material-icons-outlined text-danger">cancel</span>
    </a>
  </template>

  <template v-else>
    <a href="#">
      <span class="material-icons-outlined text-danger">no_accounts</span>
    </a>
  </template>

</template>

<script>
export default {
  name: "UserStatus",
  props: {
    activationStatus: {
      type: String
    }
  }
}
</script>

<style scoped>

</style>