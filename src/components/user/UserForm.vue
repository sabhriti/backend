<template>
  <AlertBox/>
  <div class="container-fluid">
    <div class="mb-3 row">
      <label class="col-sm-2 col-form-label d-flex justify-content-start" for="username">Username</label>
      <input v-model="username" class="form-control-color col-sm-3" name="username" placeholder="Username"
             required type="text"/>
    </div>

    <div class="mb-3 row">
      <label class="col-sm-2 col-form-label d-flex justify-content-start" for="email">Email</label>
      <input v-model="email" class="col-4 form-control-color" name="email" placeholder="Email"
             required type="text"/>
    </div>
    <div class="mb-3 row">
      <label class="col-sm-2 col-form-label d-flex justify-content-start" for="name">Name</label>
      <input v-model="name" class="form-control-color" name="name" placeholder="Name"
             type="text"/>
    </div>
    <div class="mb-3 row">
      <label class="col-sm-2 col-form-label d-flex justify-content-start" for="roles">Roles</label>
      <div class="form-control-color d-flex justify-content-start">
        <template v-for="role in rolesList" :key="role">
          <div class="form-check form-check-inline">
            <input :id="role" v-model="roles" class="form-check-input" type="checkbox" v-bind:value="role">
            <label :for="role" class="form-check-label"> {{ role.toUpperCase() }}</label>
          </div>
        </template>
      </div>
    </div>

    <div class="mb-3 row">
      <label class="col-sm-2 col-form-label d-flex justify-content-start" for="userStatus">Status</label>
      <select v-model="userStatus" class="form-select form-control-color">
        <option v-for="status in statusList" :key="status" :value="status">{{ status.toUpperCase() }}</option>
      </select>
    </div>

    <div class="d-flex justify-content-start border-top border-1 mt-1">
      <button class="btn btn-success mt-3" type="button" @click="saveUser">Save</button>&nbsp;&nbsp;
      <button class="btn btn-danger mt-3" @click="$router.push('/users')">Cancel</button>
    </div>
  </div>
</template>

<script>
import AlertBox from "@/components/util/AlertBox.vue";
import {mapActions} from "vuex";

export default {
  name: "UserForm",
  components: {AlertBox},
  data() {
    return {
      statusList: ['new', 'active', 'inactive', 'disabled'],
      rolesList: ['USER', 'ADMIN']
    };
  },
  methods: {
    ...mapActions({
      fetchUserById: 'userForm/fetchUserById',
      saveUser: 'userForm/saveUser'
    })
  },
  mounted() {
    this.fetchUserById(this.$route.params.id);
  },
  computed: {
    username: {
      get() {
        return this.$store.state.userForm.username
      },
      set(value) {
        this.$store.commit('userForm/UPDATE_USERNAME', value)
      }
    },
    email: {
      get() {
        return this.$store.state.userForm.email
      },
      set(value) {
        this.$store.commit('userForm/UPDATE_EMAIL', value)
      }
    },
    name: {
      get() {
        return this.$store.state.userForm.name
      },
      set(value) {
        this.$store.commit('userForm/UPDATE_NAME', value)
      }
    },
    roles: {
      get() {
        return this.$store.state.userForm.roles
      },
      set(value) {
        this.$store.commit('userForm/UPDATE_ROLES', value)
      },
    },
    userStatus: {
      get() {
        return this.$store.state.userForm.activationStatus
      },
      set(value) {
        this.$store.commit('userForm/UPDATE_STATUS', value)
      }
    }
  }
}
</script>

<style scoped>
.form-control-color {
  width: 25rem;
}
</style>