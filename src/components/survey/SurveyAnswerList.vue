<template>
  <table class="table bg-dark text-info text-lg-start caption-top">
    <caption>
      <button class="btn btn-sm btn-danger ms-1" type="button" @click="$router.go(-1)">Back</button>
    </caption>
    <thead class="table-bordered">
    <tr class="text-info">
      <th scope="col">#</th>
      <th scope="col">Factory Code</th>
      <th scope="col">Question Number</th>
      <th scope="col">Answer Text</th>
      <th scope="col">Answer Value</th>
    </tr>
    </thead>
    <tbody class="table-bordered">
    <tr v-for="(surveyAnswer, index) in allSurveyAnswers" v-bind:key="surveyAnswer._id">
      <td>{{ index + 1 }}</td>
      <td>{{surveyAnswer.factoryCode}}</td>
      <td>{{surveyAnswer.questionNumber}}</td>
      <td>{{surveyAnswer.answerText}}</td>
      <td>{{surveyAnswer.answerValue}}</td>
    </tr>
    </tbody>
  </table>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "SurveyAnswerList",
  methods: {
    ...mapActions(['fetchAnswersBySurveyCode'])
  },
  computed: {
    ...mapGetters(['allSurveyAnswers'])
  },
  mounted() {
    this.$store.dispatch('hideAlert');
    this.fetchAnswersBySurveyCode(this.$route.params.surveyId);
  }
}
</script>

<style scoped>

</style>