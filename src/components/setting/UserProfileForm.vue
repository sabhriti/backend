<template>
  <AlertBox/>

  <div class="px-4 py-5 my-5 text-center">
    <div class="col-lg-6 mx-auto">
      <div class="card bg-transparent ">
        <div class="card-body">

          <div class="container text-start">
            <div class="row">
              <div class="w-100 mt-2"></div>
              <div class="col-6 col-sm-3 fw-bold text-uppercase">name:</div>
              <div class="col-6 col-sm-7 ">
                <input v-model="name" class="form-text form-control"/>
              </div>
              <!-- Force next columns to break to new line -->
              <div class="w-100 mt-3"></div>

              <div class="col-6 col-sm-3 fw-bold text-uppercase">username:</div>
              <div class="col-6 col-sm-7 ">
                <input v-model="username" class="form-text form-control"/>
              </div>


              <div class="w-100 mt-3"></div>

              <div class="col-6 col-sm-3 fw-bold text-uppercase">email:</div>
              <div class="col-6 col-sm-7">
                <input v-model="email" class="form-text form-control"/>
              </div>

              <!-- Force next columns to break to new line -->
              <div class="w-100 mt-3"></div>

              <div class="col-6 col-sm-3 fw-bold text-uppercase">phone:</div>
              <div class="col-6 col-sm-7">
                <input v-model="phone" class="form-text form-control"/>
              </div>

              <!-- Force next columns to break to new line -->
              <div class="w-100 mt-5"></div>

              <div class="col-6 col-sm-3 fw-bold text-uppercase"></div>
              <div class="col-6 col-sm-7">
                <button class="btn btn-success mt-3" type="button" @click="updateProfile">Save</button>&nbsp;&nbsp;
                <button class="btn btn-danger mt-3" @click="$router.push('/setting/profile')">Cancel</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import AlertBox from "@/components/util/AlertBox.vue";

export default {
  name: "UserProfileForm",
  components: {AlertBox},
  computed: {
    ...mapGetters({
      profileDetails: 'userProfile/profileDetails'
    }),

    name: {
      get() {
        return this.$store.state.userProfile.name
      },
      set(value) {
        this.$store.commit('userProfile/UPDATE_NAME', value)
      }
    },
    username: {
      get() {
        return this.$store.state.userProfile.username
      },
      set(value) {
        this.$store.commit('userProfile/UPDATE_USERNAME', value)
      }
    },
    email: {
      get() {
        return this.$store.state.userProfile.email
      },
      set(value) {
        this.$store.commit('userProfile/UPDATE_EMAIL', value)
      }
    },
    phone: {
      get() {
        return this.$store.state.userProfile.phone
      },
      set(value) {
        this.$store.commit('userProfile/UPDATE_PHONE', value)
      }
    }
  },
  methods: {
    ...mapActions({
      fetchProfileDetails: 'userProfile/fetchProfileDetails',
      updateProfile: 'userProfile/updateProfile'
    })
  },
  created() {
    if (this.profileDetails.id === '') {
      this.fetchProfileDetails();
    }
  }
}
</script>
