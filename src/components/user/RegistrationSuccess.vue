<template>
  <div class="login-form-container">
    <div class="card bg-transparent border-0">
      <div class="card-body">

        <div class="form-greetings py-3">
          <h3 class="h3">Thank you very much.</h3>
          <p class="message">
            Your request has been successfully completed. We have received your application.
            We will inform you at the email address provided as soon as the user is activated.
          </p>
          <router-link to="/user/login" class="btn btn-info login-button">Login</router-link>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import '@/assets/login.css';
export default {
  name: "RegistrationSuccess",
  mounted() {
    this.$store.dispatch('hideAlert');
  }
}
</script>

<style scoped>

</style>