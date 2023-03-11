<template>
  <div class="login-form-container">
    <div class="card bg-transparent border-0">
      <div class="card-body">

        <div class="form-greetings py-3">
          <p class="message">
            Your password has been successfully changed.
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
  name: "PasswordResetSuccess"
}
</script>

<style scoped>

</style>