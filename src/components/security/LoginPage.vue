<template>
  <div class="login-form-container">
    <div class="card bg-transparent border-0">
      <form class="card-body">
        <div class="form-greetings py-3">
          <h3 class="h3">WELCOME</h3>
        </div>
        <AlertBox/>

        <div class="form-container">
          <div class="login-form">
            <div class="mb-3">
              <input v-model="username" class="form-control" autocomplete="on" placeholder="Username"
                     type="text"
                     @input="handleUsernameChange"/>
            </div>

            <div class="mb-3">
              <input v-model="password" class="form-control" placeholder="Password"
                     type="password"
                     @input="handlePasswordChange"/>
            </div>

            <div class="mb-3">
              <input id="rememberMe" v-model="rememberMe" aria-labelledby="rememberMeLabel" class="form-check-input m-1"
                     type="checkbox"
                     value="">
              <label id="rememberMeLabel" class="form-check-label" for="rememberMe">
                Remember me</label>
            </div>

            <div class="mb-3">
              <button class="btn btn-info login-button" @click="loginConfirm">Login</button>
            </div>
          </div>
        </div>

        <div class="form-register footer mt-auto">
          <router-link class="footer-link text-info" to="/security/forget-password">Forgot Password</router-link>
          |
          <router-link class="footer-link text-info" to="/security/register">Register</router-link>
        </div>

      </form>
    </div>
  </div>

</template>

<script>
import '@/assets/login.css';
import {mapActions} from "vuex";
import CryptoJS from 'crypto-js';
import AlertBox from "@/components/util/AlertBox";

export default {
  name: "LoginPage",
  components: {
    AlertBox
  },
  data() {
    return {
      formValidated: false,
    }
  },
  computed: {
    username: {
      get() {
        return this.$store.state.login.username
      },
      set(value) {
        this.$store.commit('login/USERNAME', value)
      }
    },
    password: {
      get() {
        return this.$store.state.login.password;
      },
      set(value) {
        this.$store.commit('login/PASSWORD', value)
      }
    },
    rememberMe: {
      get() {
        return this.$store.state.login.rememberMe;
      },
      set(value) {
        this.$store.commit('login/REMEMBER_ME', value)
      }
    }
  },
  methods: {
    ...mapActions({
      loginAction: 'login/loginAction',
      handleUsernameChange: 'login/handleUsernameChange',
      handlePasswordChange: 'login/handlePasswordChange'
    }),

    encryptPassword(password) {
      return CryptoJS.AES.encrypt(password, 'test').toString();
    },

    loginConfirm() {
      if (this.rememberMe === true) {
        const rememberMe = {
          username: this.username,
          password: this.encryptPassword(this.password)
        };
        localStorage.removeItem("remember_me");
        localStorage.setItem("remember_me", JSON.stringify(rememberMe));
      } else {
        localStorage.removeItem("remember_me");
      }

      this.loginAction(
          {
            username: this.username,
            password: this.password
          });
    }
  },

  created() {
    const itemFromLocalStorage = JSON.parse(localStorage.getItem('remember_me'));
    if (itemFromLocalStorage) {
      const bytes = CryptoJS.AES.decrypt(itemFromLocalStorage.password, 'test');
      this.password = bytes.toString(CryptoJS.enc.Utf8)
      this.username = itemFromLocalStorage.username;
      this.rememberMe = true
    }
  },
  mounted() {
    this.$store.dispatch("login/handleUsernameChange");
    this.$store.dispatch("login/handlePasswordChange");

    this.$store.dispatch('hideAlert');
  }
}
</script>

<style scoped>
</style>