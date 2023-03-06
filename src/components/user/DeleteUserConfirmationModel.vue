<template>
  <div :id="'deleteUser' + userId" aria-hidden="true" aria-labelledby="deleteModalLabel" class="modal fade"
       tabindex="-1">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header bg-dark">
          <h5 class="modal-title text-danger">Are you sure you want to delete?</h5>
          <button aria-label="Close" class="btn-close bg-light" data-bs-dismiss="modal" type="button"></button>
        </div>
        <div class="modal-body text-danger">
          You are going to delete the user forever. Are you absolutely sure?
        </div>
        <div class="modal-footer bg-dark">
          <button class="btn btn-secondary" data-bs-dismiss="modal" type="button" @click="deleteUser(userId)">Yes
          </button>
          <button class="btn btn-primary" data-bs-dismiss="modal" type="button">No</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapActions} from "vuex";

export default {
  name: "DeleteUserConfirmationModel",
  props: {
    userId: String,
    userName: String
  },
  methods: {
    ...mapActions(['deleteUser'])
  }
}
</script>
