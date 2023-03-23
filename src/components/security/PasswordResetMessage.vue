<template>
  <div class="login-form-container">
    <div class="card bg-transparent border-0">
      <div class="card-body">

        <div class="form-greetings py-3">
          <p class="message">
            {{message}}
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
  name: "PasswordResetMessage",
  props: {
    message: String
  }
}
</script>

<style scoped>

</style>