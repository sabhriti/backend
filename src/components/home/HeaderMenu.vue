<template>
  <header class="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
    <router-link class="navbar-brand px-3 text-info" to="/">VOICESCARRY</router-link>
    <div class="navbar-nav">
      <div class="nav-item text-nowrap">
        <a class="nav-link px-3 text-info" href="javascript:void(0);" @click="signOut">Sign out</a>
      </div>
      <button aria-controls="sidebarMenu" aria-expanded="false" aria-label="Toggle navigation"
              class="navbar-toggler d-md-none collapsed" data-bs-target="#sidebarMenu" data-bs-toggle="collapse"
              type="button">
        <span class="navbar-toggler-icon"></span>
      </button>
    </div>
  </header>
</template>

<script>
export default {
  name: "HeaderMenu",


  methods: {
    signOut: function () {
      localStorage.removeItem("session");
      this.$router.push({name: 'userLoginPage'});
    }
  }
}
</script>

<style scoped>
</style>