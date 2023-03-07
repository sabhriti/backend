<template>
  <table class="table bg-dark text-info text-lg-start">
    <thead class="table-bordered">
    <tr class="text-white">
      <th scope="col">#</th>
      <th scope="col">Username</th>
      <th scope="col">Email</th>
      <th scope="col">Roles</th>
      <th scope="col">Name</th>
      <th class="text-center" scope="col">Status</th>
      <th class="text-center" scope="col">Action</th>
    </tr>
    </thead>
    <tbody class="table-bordered">
    <tr v-for="(user, index) in allUsers" :key="user.id">
      <td>{{ index + 1 }}</td>
      <td>{{ user.username }}</td>
      <td>{{ user.email }}</td>
      <td>{{ user.roles.map(x => x.name).join(", ") }}</td>
      <td>{{ user.name }}</td>
      <td class="text-center"> {{user.activationStatus.toUpperCase()}}</td>
      <td class="text-center">
        <router-link :to="`/users/form/id=${user.id}`" class="material-icons text-decoration-none text-info"
                     title="Edit User">edit
        </router-link>
        <a v-if=" !user.isAdmin" href="javascript:void(0);">
          <span :data-bs-target="'#deleteUser' + user.id" class="material-icons-outlined text-danger"
                data-bs-toggle="modal" title="Delete User">delete</span>
        </a>
      </td>
    </tr>
    </tbody>
  </table>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "UserList",
  components: {},
  methods: {
    ...mapActions(
        {
          fetchAllUsers: 'userList/fetchAllUsers',
          deleteUser: 'userList/deleteUser'
        }
    ),
  },
  computed: {
    ...mapGetters(
        {
          allUsers: 'userList/allUsers',
          activeToggleRequests: 'userList/activeToggleRequests'
        }
    )
  },

  mounted() {
    this.fetchAllUsers();
  }
}
</script>
