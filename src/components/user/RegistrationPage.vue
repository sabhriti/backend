<template>
  <div class="login-form-container">
    <div class="card bg-transparent border-0">
      <div class="card-body">
        <AlertBox/>

        <div class="form-greetings py-3">
          <h3 class="h3">Registration Form</h3>
        </div>

        <div class="form-container">
          <div class="login-form">
            <form>

              <div class="mb-3">
                <input v-model="fullName" :class="inputClasses(this.fullNameValid)" placeholder="Full name" type="text"
                       @input="fullNameChange"/>
              </div>

              <div class="mb-3">
                <input v-model="address" :class="inputClasses(this.addressValid)" placeholder="Address" type="text"
                       @input="addressChange"/>
              </div>


              <div class="mb-3">
                <input v-model="telephone" class="form-control" placeholder="Telephone" type="number"
                       @input="userInformationChange"/>
              </div>

              <div class="mb-3">
                <input v-model="email" :class="inputClasses(this.emailValid)" placeholder="Email" type="email"
                       @input="emailChange"/>
              </div>

              <div class="mb-3">
                <input v-model="password" :class="inputClasses(this.passwordValid)" placeholder="Password"
                       type="password"
                       @input="passwordChange"/>
              </div>

              <div class="mb-3">
                <input v-model="repeatPassword" :class="inputClasses(this.repeatPasswordValid)"
                       placeholder="Repeat Password"
                       type="password" @input="repeatPasswordChange"/>
              </div>

              <div class="mb-3">
                <button class="btn btn-info login-button" @click="registerConfirmChange">Register</button>
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
import FormValidation from "@/util/FormValidation";
import {mapActions, mapGetters} from "vuex";
import AlertBox from "@/components/util/AlertBox";

export default {
  name: "RegistrationPage",
  components: {
    AlertBox
  },
  data() {
    return {
      formValidated: false,

      fullNameValid: false,
      addressValid: false,
      emailValid: false,
      passwordValid: false,
      repeatPasswordValid: false,

      fullName: '',
      address: '',
      telephone: '',
      email: '',
      password: '',
      repeatPassword: ''
    }
  },

  computed: {
    ...mapGetters(['userRegistrationErrorMessage']),
  },
  methods: {
    ...mapActions(['registerAction']),

    inputClasses: function (field) {
      return {
        'form-control': true,
        'is-valid': field && this.formValidated,
        'is-invalid': !field && this.formValidated,
      }
    },

    fullNameChange() {
      this.formValidated = true;
      this.fullNameValid = this.fullName !== '';
    },
    addressChange() {
      this.formValidated = true;
      this.addressValid = this.address !== '';
    },
    emailChange() {
      this.formValidated = true;
      this.emailValid = FormValidation.validateEmail(this.email);
    },
    passwordChange() {
      this.formValidated = true;
      this.passwordValid = this.password !== '';
    },
    repeatPasswordChange() {
      this.formValidated = true;
      this.repeatPasswordValid = this.password === this.repeatPassword;
    },

    registerConfirmChange() {
      this.formValidated = true;

      if (this.fullNameValid && this.addressValid && this.emailValid && this.passwordValid && this.repeatPasswordValid) {
        this.registerAction(
            {
              fullName: this.fullName,
              address: this.address,
              telephone: this.telephone,
              email: this.email,
              password: this.password
            });
      }
    }
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