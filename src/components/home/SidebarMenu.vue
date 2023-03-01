<template>
  <nav id="sidebarMenu" class="col-md-3 col-lg-2 d-md-block sidebar bg-dark collapse show">
    <div class="position-sticky pt-3 mt-4">
      <ul class="nav flex-column">
        <li class="nav-item">
          <a aria-current="page" class="nav-link text-info active" href="#">
            <span class="material-icons-outlined">home</span>Home</a>
        </li>

        <li class="nav-item">
          <router-link class="nav-link text-info" to="/users">
            <span class="material-icons-outlined">people_outline</span> User
          </router-link>
        </li>

        <li class="nav-item">
          <router-link class="nav-link text-info" to="/answer-type">
            <span class="material-icons-outlined">rule</span>Answer
          </router-link>
        </li>

        <li class="nav-item">
          <router-link class="nav-link text-info" to="/question">
            <span class="material-icons-outlined">quiz</span>Question
          </router-link>
        </li>

        <li class="nav-item">
          <router-link class="nav-link text-info" to="/surveys">
            <span class="material-icons-outlined">poll</span>Survey
          </router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link text-info" to="/feedbacks">
            <span class="material-icons-outlined">reviews</span>Feedback
          </router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link text-info" to="/factory">
            <span class="material-icons-outlined">factory</span>Factory
          </router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link text-info" to="/language">
            <span class="material-icons-outlined">language</span>Language
          </router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link text-info" to="/translation">
            <span class="material-icons-outlined">translate</span>Translation
          </router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  name: "SidebarMenu"
}
</script>

<style scoped>
.sidebar {
  min-height: 100vh;
}

.nav-item {
  text-transform: uppercase;
  text-align: left;
}

.row > * {
  padding-right: 0;
  padding-left: 0;
}

.material-icons-outlined {
  bottom: -5px;
  position: relative;
  margin-right: 10px;
}
</style>