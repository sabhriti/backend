<template>
  <div class="login-form-container">
    <div class="card bg-transparent border-0">
      <div class="card-body">

        <div class="form-greetings py-3">
          <h3 class="h3">Thank you very much.</h3>
          <p class="message">
            Your request has been successfully completed. We have received your application.
            An email will sent to you in few seconds with further instructions to continue with the registrations.
          </p>
          <router-link to="/security/login" class="btn btn-info login-button">Login</router-link>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import '@/assets/login.css';
export default {
  name: "RegistrationSuccess"
}
</script>

<style scoped>

</style>