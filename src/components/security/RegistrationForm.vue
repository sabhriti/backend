<template>
  <div class="px-4 py-5 my-5 text-center">
    <form @submit="registerAction" class="col-lg-6 mx-auto">
      <div class="card bg-transparent ">
        <div class="card-header border-success ">
          <h3 class="h3">Register</h3>
          <p class="text-start text-info">
            Please fill up the following form to create a new account.
            Once you have submitted form you will be informed via email about the next steps to start using this application.
            <br>
            <br>
            <b class="text-primary">Note: All the fields in the form are mandatory.</b>
          </p>
        </div>
        <div class="card-body">
          <AlertBox/>

          <div class="container text-start">
            <div class="row">

              <div class="col-6 col-sm-3 fw-bold text-uppercase">Full name:</div>
              <div class="col-6 col-sm-6 ">
                <input v-model="name" class="form-control" placeholder="name" type="text" required/>
              </div>
              <div class="w-100 mt-4"></div>

              <div class="col-6 col-sm-3 fw-bold text-uppercase">email:</div>
              <div class="col-6 col-sm-6 ">
                <input v-model="email" class="form-control" placeholder="e-mail" type="email" required/>
              </div>
              <div class="w-100 mt-4"></div>

              <div class="col-6 col-sm-3 fw-bold text-uppercase">Username:</div>
              <div class="col-6 col-sm-6 ">
                <input v-model="username" class="form-control" placeholder="username" type="text" required/>
              </div>
              <div class="w-100 mt-4"></div>

            </div>
          </div>
        </div>
        <div class="card-footer bg-transparent border-success">
          <button class="btn btn-success me-2" type="submit">Register</button>
          <router-link class="btn btn-danger " to="/security/login">Cancel</router-link>
        </div>
      </div>
    </form>
  </div>

</template>

<script>
import '@/assets/login.css';
import {mapActions} from "vuex";
import AlertBox from "@/components/util/AlertBox";

export default {
  name: "RegistrationForm",
  components: {
    AlertBox
  },
  computed: {
    name: {
      get() {
        return this.$store.state.login.name;
      },
      set(value) {
        this.$store.commit('registration/NAME', value);
      }
    },
    email: {
      get() {
        return this.$store.state.login.email;
      },
      set(value) {
        this.$store.commit('registration/EMAIL', value);
      }
    },
    username: {
      get() {
        return this.$store.state.login.username
      },
      set(value) {
        this.$store.commit('registration/USERNAME', value);
      }
    }
  },
  methods: {
    ...mapActions(
        {
          registerAction: 'registration/registerAction'
        }
    )
  }
}

</script>
