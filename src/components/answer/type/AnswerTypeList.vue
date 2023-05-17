<template>
  <AlertBox/>
  <router-link class="btn btn-success mb-2" style="float: right;" to="/answer-type/form/id=">Add</router-link>
  <table class="table bg-dark text-info text-lg-start">
    <thead class="table-bordered">
    <tr class="text-white">
      <th scope="col">#</th>
      <th scope="col">Name</th>
      <th scope="col">Type</th>
      <th scope="col">Answer Values</th>
      <th scope="col">Action</th>
    </tr>
    </thead>
    <tbody class="table-bordered">
    <tr v-for="(answerType, index) in answerTypes" :key="index">
      <td>{{ index + 1 }}</td>
      <td>{{ answerType.answerCategory }}</td>
      <td>{{ answerType.answerType }}</td>
      <td>
        <ul class="list-group list-group-horizontal">
          <li v-for="(answer, index) in answerType.answerValues" :key="index" class="list-group-item">{{
              answer
            }}
          </li>
        </ul>
      </td>
      <td>
        <router-link :to="`/answer-type/form/id=${answerType._id}`" data-bs-toggle="tooltip"
                     title="Edit answer type">
          <span class="material-icons text-info">edit</span>
        </router-link>
        <a :data-bs-target="`#deleteAnswerType${answerType._id}`" data-bs-toggle="modal" href="javascript:void(0);"
           title="Delete answer type">
          <span class="material-icons text-danger">delete</span>
        </a>
        <!-- Modal -->
        <div :id="`deleteAnswerType${answerType._id}`" aria-hidden="true" class="modal fade" tabindex="-1">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-body text-danger">
                Are you sure you want to delete?
              </div>
              <div class="modal-footer">
                <button class="btn btn-danger" data-bs-dismiss="modal" type="button"
                        @click="deleteAnswerType(answerType._id)">Yes
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
import AlertBox from "@/components/util/AlertBox";

export default {
  name: "AnswerTypeList",
  components: {
    AlertBox
  },

  methods: {
    ...mapActions(['fetchAllAnswerTypes', 'deleteAnswerType'])
  },

  computed: {
    ...mapGetters(['answerTypes'])
  },

  mounted() {
    this.fetchAllAnswerTypes();
  }
}
</script>

<style scoped>

</style>