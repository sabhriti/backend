<template>
  <div class="px-4 py-5 my-5 text-center">
    <div class="col-lg-5 mx-auto">

      <div class="card bg-transparent" v-if="tokenInvalid">
        <div class="card-header">
          <h3 class="h3 text-start">
            This link is either very old or has already been used.
            Please re-check if you correctly copied the link.
            If still problem persists please contact your system administrators.
          </h3>
        </div>
      </div>

      <div class="card bg-transparent" v-else>
        <div class="card-header border-success ">
          <h3 class="h3">Change Password</h3>
          <p class="text-start text-info">
            Please use the password sent to you in the email along with this link as old password.
            The new password must be at-least 6 characters long.
          </p>
        </div>
        <div class="card-body">
          <AlertBox/>
          <div class="container text-start">
            <div class="row">

              <div class="col-6 col-sm-4 fw-bold text-uppercase">Old Password:</div>
              <div class="col-6 col-sm-8">
                <input v-model="oldPassword" class="form-control " placeholder="old password" type="password"/>
              </div>
              <div class="w-100 mt-4"></div>

              <div class="col-6 col-sm-4 fw-bold text-uppercase">New Password:</div>
              <div class="col-6 col-sm-8">
                <input v-model="newPassword" class="form-control" placeholder="new password" type="password"/>
              </div>
              <div class="w-100 mt-4"></div>

              <div class="col-6 col-sm-4 fw-bold text-uppercase">Repeat New Password:</div>
              <div class="col-6 col-sm-8">
                <input v-model="newPasswordRepeated" class="form-control" placeholder="repeat new password" type="password"/>
              </div>
            </div>
          </div>
        </div>

        <div class="card-footer bg-transparent border-success mb-2">
          <button class="btn btn-success me-2 mt-2" @click="updatePassword">Change Password</button>
        </div>

      </div>
    </div>
    <div class="form-register footer mt-auto">
      <div class="w-100 mt-2"></div>
      <router-link to="/" class="footer-link text-info">Home</router-link> |
      <router-link to="/" class="footer-link text-info">Help</router-link>
    </div>
  </div>


</template>

<script>
import AlertBox from "@/components/util/AlertBox.vue";
import {mapActions, mapGetters} from "vuex";

export default {
  name: "NewPasswordForm",
  components: {AlertBox},
  mounted() {
    this.validateToken(this.$route.params.token);
  },
  methods: {
    ...mapActions(
        {
          updatePassword: 'passwordResetForm/updatePassword',
          validateToken: 'passwordResetForm/validateToken',
        }
    )
  },
  computed: {
    ...mapGetters({
      tokenInvalid: 'passwordResetForm/tokenInvalid'
    }),
    oldPassword: {
      get() {
        return this.$store.state.passwordResetForm.oldPassword
      },
      set(value) {
        this.$store.commit('passwordResetForm/UPDATE_OLD_PASSWORD', value)
      }
    },
    newPassword: {
      get() {
        return this.$store.state.passwordResetForm.newPassword
      },
      set(value) {
        this.$store.commit('passwordResetForm/UPDATE_NEW_PASSWORD', value)
      }
    },
    newPasswordRepeated: {
      get() {
        return this.$store.state.passwordResetForm.newPasswordRepeated
      },
      set(value) {
        this.$store.commit('passwordResetForm/UPDATE_NEW_PASSWORD_REPEATED', value)
      }
    }
  }
}
</script>

<style scoped>
.login-form-container {
  width: 100% !important;
}
</style>