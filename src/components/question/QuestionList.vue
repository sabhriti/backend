<template>
  <AlertBox/>
  <router-link class="btn btn-success mb-2" style="float: right;" to="/question/form/id=">Add</router-link>
  <table class="table bg-dark text-info text-lg-start">
    <thead class="table-bordered">
    <tr class="text-white">
      <th scope="col">#</th>
      <th scope="col">Number</th>
      <th scope="col">Type</th>
      <th scope="col">Action</th>
    </tr>
    </thead>
    <tbody class="table-bordered">
    <tr v-for="(question, index) in questionList" v-bind:key="index">
      <th scope="col">{{ index + 1 }}</th>
      <th scope="col">{{ question.number }}</th>
      <th scope="col">{{ question.type }}</th>
      <th scope="col">
        <router-link :to="`/question/form/id=${question._id}`" class="material-icons text-decoration-none text-info"
                     title="Edit Question">edit
        </router-link>
        <a :data-bs-target="`#deleteQuestion_${question._id}`" data-bs-toggle="modal" href="javascript:void(0);">
          <span class="material-icons-outlined text-danger" title="Delete Question">delete</span>
        </a>
        <!-- Modal -->
        <div :id="`deleteQuestion_${question._id}`" aria-hidden="true" class="modal fade" tabindex="-1">
          <div class="modal-dialog">
            <div class="modal-content">

              <div class="modal-body text-danger">
                Are you sure you want to delete?
              </div>
              <div class="modal-footer">
                <button class="btn btn-danger" data-bs-dismiss="modal" type="button">Yes</button>
                <button class="btn btn-secondary" data-bs-dismiss="modal" type="button">No</button>
              </div>
            </div>
          </div>
        </div>
      </th>
    </tr>
    </tbody>
  </table>

</template>

<script>
import AlertBox from "@/components/util/AlertBox";
import {mapActions, mapGetters} from "vuex";

export default {
  name: "QuestionList",
  components: {
    AlertBox
  },
  methods: {
    ...mapActions(
        {
          fetchAllQuestions: 'questionList/fetchAllQuestions'
        }
    ),
  },
  computed: {
    ...mapGetters(
        {
          questionList: 'questionList/questionList'
        }
    )
  },
  mounted() {
    this.$store.dispatch('hideAlert');
    this.fetchAllQuestions();
  }
}
</script>

<style scoped>

</style>