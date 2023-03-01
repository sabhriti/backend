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
              <input v-model="email" :class="loginEmailInputClasses" autocomplete="on" placeholder="Email"
                     type="email"
                     @input="handleEmailChange"/>
            </div>

            <div class="mb-3">
              <input v-model="password" :class="loginPasswordInputClasses" placeholder="Password"
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
          <router-link class="footer-link text-info" to="/user/forget-password">Forgot Password</router-link>
          |
          <router-link class="footer-link text-info" to="/user/register">Register</router-link>
        </div>

      </form>
    </div>
  </div>

</template>

<script>
import '@/assets/login.css';
import {mapActions, mapGetters} from "vuex";
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
    ...mapGetters(['getErrorMessage', 'validEmail', 'validPassword', 'validEmail', 'validPassword']),
    email: {
      get() {
        return this.$store.state.login.email
      },
      set(value) {
        this.$store.commit('EMAIL', value)
      }
    },
    password: {
      get() {
        return this.$store.state.login.password;
      },
      set(value) {
        this.$store.commit('PASSWORD', value)
      }
    },
    rememberMe: {
      get() {
        return this.$store.state.login.rememberMe;
      },
      set(value) {
        this.$store.commit('REMEMBER_ME', value)
      }
    },
    loginEmailInputClasses: function () {
      if (this.validEmail) {
        return {
          'form-control': true,
          'is-valid': true,
          'is-invalid': false
        }
      } else {
        return {
          'form-control': true,
          'is-valid': false,
          'is-invalid': true
        }
      }
    },

    loginPasswordInputClasses: function () {
      if (this.validPassword) {
        return {
          'form-control': true,
          'is-valid': true,
          'is-invalid': false
        }
      } else {
        return {
          'form-control': true,
          'is-valid': false,
          'is-invalid': true
        }
      }
    }
  },
  methods: {
    ...mapActions(['loginAction', 'handleEmailChange', 'handlePasswordChange']),

    encryptPassword(password) {
      return CryptoJS.AES.encrypt(password, 'test').toString();
    },

    loginConfirm() {
      this.formValidated = true;
      if (this.validEmail && this.validPassword) {
        if (this.rememberMe === true) {
          const rememberMe = {
            email: this.email,
            password: this.encryptPassword(this.password)
          };
          localStorage.removeItem("remember_me");
          localStorage.setItem("remember_me", JSON.stringify(rememberMe));
        } else {
          localStorage.removeItem("remember_me");
        }

        this.loginAction(
            {
              email: this.email,
              password: this.password
            });
      }
    }
  },

  created() {
    const itemFromLocalStorage = JSON.parse(localStorage.getItem('remember_me'));
    if (itemFromLocalStorage) {
      const bytes = CryptoJS.AES.decrypt(itemFromLocalStorage.password, 'test');
      this.password = bytes.toString(CryptoJS.enc.Utf8)
      this.email = itemFromLocalStorage.email;
      this.emailValid = true;
      this.rememberMe = true
    }
  },
  mounted() {
    this.$store.dispatch("handleEmailChange");
    this.$store.dispatch("handlePasswordChange");

    this.$store.dispatch('hideAlert');
  }
}
</script>

<style scoped>
</style>