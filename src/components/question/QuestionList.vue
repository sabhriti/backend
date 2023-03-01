<template>
  <AlertBox/>
  <router-link class="btn btn-success mb-2" style="float: right;" to="/question/form/id=">Add</router-link>
  <table class="table bg-dark text-info text-lg-start">
    <thead class="table-bordered">
    <tr class="text-white">
      <th scope="col">#</th>
      <th scope="col">Title</th>
      <th scope="col">Type</th>
      <th scope="col">Answers</th>
      <th scope="col">Action</th>
    </tr>
    </thead>
    <tbody class="table-bordered">
    <tr v-for="question in questionList" :key="question._id">
      <td>{{ question.number }}</td>
      <td>{{ createDefaultTitle(question.titles) }}</td>
      <td>{{ question.questionType }}</td>
      <td>
        <a :data-bs-target="`#answerModal_${question._id}`" data-bs-toggle="modal" href="javascript:void(0)" class="btn btn-sm btn-info">
          View
        </a>
        <div :id="`answerModal_${question._id}`" aria-hidden="true" aria-labelledby="answerModalLabel"
             class="modal fade"
             tabindex="-1">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header bg-dark">
                <h5 id="answerModalLabel" class="modal-title">Answers for question number {{ question.number }}</h5>
                <button aria-label="Close" class="close bg-danger border-0 text-white" data-bs-dismiss="modal"
                        type="button">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <div class="container">
                  <table class="table">
                    <thead>
                    <tr>
                      <th scope="col">Answer Value</th>
                      <th scope="col">Answer Text</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="answer in question.answers" :key="answer._id">
                      <th>{{ answer.value }}</th>
                      <th>{{ createDefaultTitle(answer.items) }}</th>
                    </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div class="modal-footer">
                <button class="btn btn-danger" data-bs-dismiss="modal" type="button">Close</button>
              </div>
            </div>
          </div>
        </div>
      </td>
      <td>
        <router-link :to="'/question/form/id=' + question._id" data-bs-toggle="tooltip" title="Edit Question">
          <span class="material-icons text-info">edit</span>
        </router-link>
      </td>
    </tr>
    </tbody>
  </table>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import AlertBox from "@/components/util/AlertBox";

export default {
  name: "QuestionList",
  components: {
    AlertBox
  },
  methods: {
    ...mapActions({
      fetchAllQuestions: 'questionList/fetchAllQuestions'
    }),
    createDefaultTitle: (questionTitles) => {
      if (questionTitles) {
        const englishTitle = questionTitles.filter(questionTitle => questionTitle.lang === "en" || questionTitle.lang === "english");
        return englishTitle[0].content;
      }
    }
  },
  mounted() {
    this.$store.dispatch('hideAlert');
    this.fetchAllQuestions();
  },

  computed: {
    ...mapGetters({
      questionList: 'questionList/questionList'
    })
  }
}
</script>

<style scoped>

</style>