<template>
  <AlertBox/>
  <router-link class="btn btn-success mb-2" style="float: right;" to="/users/form/id=">Add</router-link>
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
      <td>{{ user.roles.join(", ") }}</td>
      <td>{{ user.name }}</td>
      <td class="text-center"> {{ user.activationStatus.toUpperCase() }}</td>
      <td class="text-center">
        <router-link :to="`/users/form/id=${user.id}`" class="material-icons text-decoration-none text-info"
                     title="Edit User">edit
        </router-link>
        <a :data-bs-target="`#deleteUser_${user.id}`" data-bs-toggle="modal" href="javascript:void(0);" v-if="!isCurrentUser(user)">
          <span class="material-icons-outlined text-danger" title="Delete User">delete</span>
        </a>

        <div :id="`deleteUser_${user.id}`" aria-hidden="true" class="modal fade" tabindex="-1">
          <div class="modal-dialog">
            <div class="modal-content">

              <div class="modal-body text-danger">
                Are you sure you want to delete <b>{{ user.name }}?</b>
              </div>
              <div class="modal-footer">
                <button class="btn btn-danger" data-bs-dismiss="modal" type="button"
                        @click="deleteUser(user.id)">Yes
                </button>
                <button class="btn btn-secondary" data-bs-dismiss="modal" type="button">No</button>
              </div>
            </div>
          </div>
        </div>
      </td>
    </tr>
    </tbody>
  </table>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import AlertBox from "@/components/util/AlertBox.vue";

export default {
  name: "UserList",
  components: {AlertBox},
  methods: {
    ...mapActions(
        {
          fetchAllUsers: 'userList/fetchAllUsers',
          deleteUser: 'userList/deleteUser'
        }
    ),
    isCurrentUser: function (user) {
      return JSON.parse(localStorage.getItem('session')).username === user.username;
    },
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
