<template>
  <form @submit="requestPasswordResetToken">
    <div class="px-4 py-5 my-5 text-center">
      <div class="col-lg-4 mx-auto">

        <div class="card bg-transparent">

          <div class="card-header border-success ">
            <h3 class="h3">Reset password</h3>
            <p class="text-start text-info">Please provide your email address;
              an email will be sent to your email with the instructions to to reset your password.</p>
          </div>

          <div class="card-body">
            <AlertBox/>
            <div class="container text-start">

              <div class="row">
                <div class="col-6 col-sm-4 fw-bold text-uppercase">Email Address</div>
                <div class="col-6 col-sm-8">
                  <input v-model="email" class="form-control" placeholder="emaill address" type="email"/>
                </div>
              </div>

            </div>
          </div>

          <div class="card-footer bg-transparent border-success mb-2">
            <button class="btn btn-success me-2 mt-2">
              Request new password
            </button>
          </div>

        </div>
      </div>
      <div class="form-register footer mt-auto">
        <div class="w-100 mt-2"></div>
        <router-link class="footer-link text-info" to="/">Home</router-link>
        |
        <router-link class="footer-link text-info" to="/">Help</router-link>
      </div>
    </div>

  </form>

</template>

<script>
import {mapActions} from "vuex";
import AlertBox from "@/components/util/AlertBox.vue";

export default {
  name: "ForgetPassword",
  components: {AlertBox},
  computed: {
    email: {
      get() {
        return this.$store.state.passwordForgetForm.email
      },
      set(value) {
        this.$store.commit('passwordForgetForm/UPDATE_EMAIL', value)
      }
    },
  },
  methods: {
    ...mapActions(
        {
          requestPasswordResetToken: 'passwordForgetForm/requestPasswordResetToken',
        }
    )
  }
}

</script>

<style scoped>

</style>