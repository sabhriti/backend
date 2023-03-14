<template>
  <header class="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
    <router-link class="navbar-brand px-3 text-info" to="/">SABHRITI</router-link>
    <div class="d-inline-flex mt-2 mt-md-0 ms-md-auto">
      <div class="dropdown-center">
        <a aria-expanded="false" class="btn btn-outline-info border-0 text-decoration-none settings-icon" data-bs-toggle="dropdown"
           href="#">
          <span class="material-icons-outlined">settings</span>
        </a>
        <ul class="dropdown-menu bg-info ">
          <li class="border-bottom">
            <router-link to="/setting/profile" class="dropdown-item">
              <span class="material-icons-outlined me-2 item-icon">manage_accounts</span>Profile
            </router-link>
          </li>
          <li>
            <router-link to="/setting/preferences" class="dropdown-item">
              <span class="material-icons-outlined me-2 item-icon">tune</span>Preferences
            </router-link>
          </li>
        </ul>
      </div>
      <a class="btn btn-group-sm btn-outline-info mt-2 -3 me-3" href="javascript:void(0);" @click="signOut">Sign out</a>

      <div class="nav-item text-nowrap">

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
.settings-icon {
  box-shadow: none !important;
  position: relative;
  top: 0.5em;
  right: 1em;
}

.settings-icon:hover {
  background: transparent !important;
  color: white;
}

.dropdown-menu[data-bs-popper] {
  top: 110%;
  right: 1rem;
  left: -2rem;
}

.item-icon {
  position: relative;
  top: 0.2rem;
}
</style>