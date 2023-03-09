<template>
  <div class="px-4 py-5 my-5 text-center">
    <div class="col-lg-6 mx-auto">
      <div class="card bg-transparent ">
        <div class="card-header border-success ">
          <h3 class="h3">Register</h3>
        </div>
        <div class="card-body">
          <AlertBox/>

          <div class="container text-start">
            <div class="row">

              <div class="col-6 col-sm-3 fw-bold text-uppercase">Full name:</div>
              <div class="col-6 col-sm-6 ">
                <input v-model="name" class="form-control" placeholder="name" type="text"/>
              </div>
              <div class="w-100 mt-4"></div>

              <div class="col-6 col-sm-3 fw-bold text-uppercase">email:</div>
              <div class="col-6 col-sm-6 ">
                <input v-model="email" class="form-control" placeholder="e-mail" type="email"/>
              </div>
              <div class="w-100 mt-4"></div>

              <div class="col-6 col-sm-3 fw-bold text-uppercase">Username:</div>
              <div class="col-6 col-sm-6 ">
                <input v-model="username" class="form-control" placeholder="username" type="text"/>
              </div>
              <div class="w-100 mt-4"></div>


              <div class="col-6 col-sm-3 fw-bold text-uppercase">Password:</div>
              <div class="col-6 col-sm-6 ">
                <input v-model="password" class="form-control" placeholder="password"
                       type="password"/>
              </div>
              <div class="w-100 mt-4"></div>


              <div class="col-6 col-sm-3 fw-bold text-uppercase">Repeat Password:</div>
              <div class="col-6 col-sm-6 ">
                <input v-model="passwordRepeat" class="form-control"
                       placeholder="re-enter password"
                       type="password"/>
              </div>
              <div class="w-100 mt-4"></div>

            </div>
          </div>
        </div>
        <div class="card-footer bg-transparent border-success">
          <button class="btn btn-success me-2" @click="registerAction">Register</button>
          <router-link class="btn btn-danger " to="/security/login">Cancel</router-link>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import '@/assets/login.css';
import {mapActions} from "vuex";
import AlertBox from "@/components/util/AlertBox";

export default {
  name: "RegistrationPage",
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
    },
    password: {
      get() {
        return this.$store.state.login.password;
      },
      set(value) {
        this.$store.commit('registration/PASSWORD', value);
      }
    },
    passwordRepeat: {
      get() {
        return this.$store.state.login.passwordRepeat;
      },
      set(value) {
        this.$store.commit('registration/PASSWORD_REPEAT', value);
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
