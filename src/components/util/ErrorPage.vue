<template>
  <div class="px-4 py-5 my-5 text-center">
    <div class="col-lg-5 mx-auto text-center">
      <div class="card bg-transparent">
        <div class="card-header border-success">
          <img :src="require('@/assets/oops.png')" alt="oops" class="w-25 bg-transparent mb-2"/>
          <p class="h2 text-danger">Something went wrong.</p>

          <button class="footer-link btn btn-sm btn-outline-warning m-3" @click="$router.back()">go back
          </button>
        </div>
        <div class="form-register footer mt-auto">
          <div class="w-100 mt-4"></div>
          <router-link class="footer-link text-info" to="/">Home</router-link>
          |
          <router-link class="footer-link text-info" to="/">Help</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ErrorPage"
}
</script>

<style scoped>

</style>