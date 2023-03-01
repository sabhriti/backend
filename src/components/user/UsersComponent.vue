<template>
  <ComponentHeader text="Users"/>
  <AlertBox/>
  <table class="table bg-dark text-info text-lg-start">
    <thead class="table-bordered">
    <tr class="text-white">
      <th scope="col">#</th>
      <th scope="col">Name</th>
      <th scope="col">Email</th>
      <th scope="col">Address</th>
      <th class="text-center" scope="col">Activated</th>
      <th class="text-center" scope="col">Action</th>
    </tr>
    </thead>
    <tbody class="table-bordered">
    <tr v-for="(user, index) in allUsers" :key="user.id">
      <td>{{ index + 1 }}</td>
      <td>{{ user.fullName }}</td>
      <td>{{ user.email }}</td>
      <td>{{ user.address }}</td>
      <td class="text-center">

        <a v-if="'deactivate' === getToggle(user) && !user.isAdmin" href="javascript:void(0);" @click="toggleUserStatus(user)">
          <span class="material-icons-outlined text-success" title="Click to deactivate User">check_circle</span>
        </a>

        <a v-else-if="'activate' === getToggle(user)" href="javascript:void(0);" @click="toggleUserStatus(user)">
          <span class="material-icons-outlined text-danger" title="Click to activate User">cancel</span>
        </a>

        <div v-if="'loading' === getToggle(user)" class="spinner-border text-white spinner-border-sm" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>

      </td>
      <td class="text-center">
        <a href="javascript:void(0);" v-if=" !user.isAdmin">
          <span :data-bs-target="'#deleteUser' + user._id" class="material-icons-outlined text-danger"
                data-bs-toggle="modal" title="Delete User">delete</span>
          <DeleteConfirmationModel :user-id="user._id" user-name="{{user.fullName}}"/>
        </a>
      </td>
    </tr>
    </tbody>
  </table>
</template>

<script>
import ComponentHeader from "@/components/ComponentHeader";
import DeleteConfirmationModel from "@/components/user/DeleteUserConfirmationModel";
import {mapActions, mapGetters} from "vuex";
import AlertBox from "@/components/util/AlertBox";

export default {
  name: "UsersComponent",
  components: {
    AlertBox,
    DeleteConfirmationModel,
    ComponentHeader
  },

  methods: {
    ...mapActions(['fetchAllUsers', 'toggleUserStatus', 'deleteUser']),

    getToggle(user) {
      if (this.activeToggleRequests.filter(value => value === user._id).length >= 1) {
        return 'loading';
      }

      if (user.isActive) {
        return 'deactivate';
      }

      if (!user.isActive) {
        return 'activate';
      }
    }
  },
  computed: {
    ...mapGetters(['allUsers', 'activeToggleRequests'])
  },

  mounted() {
    this.$store.dispatch('hideAlert');
    this.fetchAllUsers();
  }
}
</script>

<style scoped>
.material-icons-outlined {
  position: relative;
  bottom: -5px;
  margin-right: 2px;
}

</style>