<template>
  <div class="login-form-container">
    <div class="card bg-transparent border-0">
      <div class="card-body">
        <AlertBox/>

        <div class="form-greetings py-3">
          <h3 class="h3">Register</h3>
        </div>

        <div class="form-container">
          <div class="login-form">
            <form>
              <div class="mb-3">
                <input v-model="email" :class="emailClass" placeholder="Email" type="email"/>
              </div>

              <div class="mb-3">
                <input v-model="username" :class="usernameClass" placeholder="Username" type="text"/>
              </div>

              <div class="mb-3">
                <input v-model="password" :class="passwordClass" placeholder="Password"
                       type="password"/>
              </div>

              <div class="mb-3">
                <input v-model="passwordRepeat" :class="passwordRepeatClass"
                       placeholder="Repeat Password"
                       type="password"/>
              </div>

              <div class="mb-3">
                <button class="btn btn-info login-button" @click="registerAction">Register</button>
                <router-link class="btn btn-info login-button" to="/user/login">Back</router-link>
              </div>
            </form>
          </div>
        </div>

      </div>
    </div>
  </div>

</template>

<script>
import '@/assets/login.css';
import {mapActions, mapGetters} from "vuex";
import AlertBox from "@/components/util/AlertBox";

export default {
  name: "RegistrationPage",
  components: {
    AlertBox
  },

  computed: {
    ...mapGetters(
        {
          usernameClass: 'registration/usernameClass',
          passwordClass: 'registration/passwordClass',
          emailClass: 'registration/emailClass',
          passwordRepeatClass: 'registration/passwordRepeatClass'
        }
    ),
    email: {
      get() {
        return this.$store.state.login.email;
      },
      set(value) {
        this.$store.commit('registration/EMAIL', value);
        this.$store.commit('registration/EMAIL_CLASS');
      }
    },
    username: {
      get() {
        return this.$store.state.login.username
      },
      set(value) {
        this.$store.commit('registration/USERNAME', value);
        this.$store.commit('registration/USERNAME_CLASS');
      }
    },
    password: {
      get() {
        return this.$store.state.login.password;
      },
      set(value) {
        this.$store.commit('registration/PASSWORD', value);
        this.$store.commit('registration/PASSWORD_CLASS');
      }
    },
    passwordRepeat: {
      get() {
        return this.$store.state.login.passwordRepeat;
      },
      set(value) {
        this.$store.commit('registration/PASSWORD_REPEAT', value);
        this.$store.commit('registration/PASSWORD_REPEAT_CLASS');
      }
    }
  },
  methods: {
    ...mapActions(
        {
          registerAction: 'registration/registerAction'
        }
    )
  },
  mounted() {
    this.$store.dispatch('hideAlert');
  }
}

</script>

<style scoped>
.login-button {
  min-width: 25%;
  margin: 1rem;

}

</style>