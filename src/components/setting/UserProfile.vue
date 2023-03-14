<template>
  <AlertBox/>

  <div class="px-4 py-5 my-5 text-center">
    <div class="col-lg-6 mx-auto">
      <div class="card bg-transparent ">
        <div class="card-header border-success ">
          <h1 class="display-5 fw-bold float-start">{{ profileDetails.name }}</h1>
        </div>
        <div class="card-body">

          <div class="container text-start">
            <div class="row">

              <div class="col-6 col-sm-3 fw-bold text-uppercase">username:</div>
              <div class="col-6 col-sm-3 ">{{ profileDetails.username }}</div>

              <!-- Force next columns to break to new line -->
              <div class="w-100 mt-4"></div>

              <div class="col-6 col-sm-3 fw-bold text-uppercase">password:</div>
              <div class="col-6 col-sm-3 ">
                <a class="btn btn-sm btn-outline-danger" href="#">change</a>
              </div>

              <!-- Force next columns to break to new line -->
              <div class="w-100 mt-4"></div>

              <div class="col-6 col-sm-3 fw-bold text-uppercase">email:</div>
              <div class="col-6 col-sm-3">{{ profileDetails.email }}</div>

              <div class="w-100 mt-4"></div>

              <div class="col-6 col-sm-3 fw-bold text-uppercase">phone:</div>
              <div class="col-6 col-sm-3">{{ profileDetails.phone }}</div>

              <div class="w-100 mt-4"></div>

              <div class="col-6 col-sm-3 fw-bold text-uppercase">roles:</div>
              <div class="col-6 col-sm-3">{{ profileDetails.roles.join(", ") }}</div>

              <div class="w-100 mt-4"></div>

              <div class="col-6 col-sm-3 fw-bold text-uppercase">status:</div>
              <div class="col-6 col-sm-3">{{ profileDetails.status }}</div>

              <div class="w-100 mt-4"></div>

            </div>
          </div>
        </div>
        <div class="card-footer bg-transparent border-success">
          <router-link to="/setting/profile/edit" class="btn btn-success mb-2 mt-2">
            EDIT PROFILE
          </router-link>
        </div>
      </div>

    </div>
  </div>


</template>

<script>
import AlertBox from "@/components/util/AlertBox.vue";
import {mapActions, mapGetters} from "vuex";

export default {
  name: "UserProfile",
  components: {AlertBox},
  computed: {
    ...mapGetters({
      profileDetails: 'userProfile/profileDetails'
    })
  },
  methods: {
    ...mapActions({
      fetchProfileDetails: 'userProfile/fetchProfileDetails'
    })
  },
  created() {
    this.fetchProfileDetails();
  }
}
</script>
