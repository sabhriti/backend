<template>
  <AlertBox/>
  <table class="table-borderless text-left">
    <tr>
      <th scope="col">Survey Name:</th>
      <td>
        <hr/>
        <div class="container text-start">
          <div class="row">
            <div class="col mb-2">
              <input v-model="surveyName" class="form-control" name="surveyName" placeholder="A name for the survey."
                     required/>
            </div>
          </div>
        </div>
      </td>
    </tr>
    <tr>
      <th scope="col">Factory:</th>
      <td>
        <hr/>
        <div class="container text-start">
          <div class="row">
            <div class="col mb-2">
              <select id="factoryId" v-model="factoryId" class="form-select" required>
                <option>Select a Factory</option>
                <option v-for="factory in factoryList" :key="factory._id" :value="factory._id">
                  {{ factory.name }}
                </option>
              </select>
            </div>
          </div>
        </div>
      </td>
    </tr>
    <tr>
      <th scope="col">Questions:</th>
      <td>
        <hr/>
        <div class="container text-start">
          <div class="row">
            <div class="col mb-2">
              <button class="btn btn-sm btn-info" type="button" @click="toggleSelectAllQuestions">
                Select all
              </button>
            </div>
          </div>
          <div class="row">
            <template v-for="(chunk, index) in groupQuestionList(questionList)" :key="index">
              <div class="col">
                <div v-for="question in chunk" :key="question.questionId" class="input-group mb-2">
                  <div class="input-group-text rounded-0">
                    <input :id="question.questionId" :checked="question.isSelected" :value="question.questionId"
                           class="form-check"
                           type="checkbox" @change="toggleQuestionToSurvey(question.questionId)">
                  </div>
                  <label class="form-control rounded-0"> {{ question.title }}</label>
                </div>
              </div>
            </template>
          </div>
        </div>
      </td>
    </tr>
    <tr>
      <td>&nbsp;</td>
      <td>
        <hr/>
        <div class="container text-start">
          <div class="row">
            <div class="col">
              <div class="d-flex justify-content-start mt-1">
                <button class="btn btn-success mt-3" type="button" @click="addSurvey">Save</button>&nbsp;&nbsp;
                <button class="btn btn-danger mt-3" @click="$router.push('/surveys')">Cancel</button>&nbsp;
              </div>
            </div>
          </div>
        </div>
      </td>
    </tr>
  </table>
</template>

<script>
import AlertBox from "@/components/util/AlertBox";
import {mapActions, mapGetters} from "vuex";

export default {
  name: "SurveyForm",
  components: {AlertBox},
  methods: {
    ...mapActions(
        {
          fetchFactories: "surveyForm/fetchFactories",
          fetchAllQuestions: "surveyForm/fetchAllQuestions",
          addSurvey: "surveyForm/addSurvey",
          toggleQuestionToSurvey: "surveyForm/toggleQuestionToSurvey",
          toggleSelectAllQuestions: "surveyForm/toggleSelectAllQuestions",
          fetchSurveyById: "surveyForm/fetchSurveyById"
        }
    ),
    groupQuestionList(questionList) {
      let chunks = [[], [], []];
      let count = 0;
      let row = 0;

      for (let i = 0; i < questionList.length; i++) {
        if (count % 3 !== 0) row++;
        else row = 0;

        if(questionList[i]) {
          chunks[row].push(questionList[i]);
          count++;
        }
      }
      return chunks;
    }
  },
  computed: {
    ...mapGetters({
          factoryList: "surveyForm/factoryList",
          questionList: "surveyForm/questionList"
        }
    ),
    factoryId: {
      get() {
        return this.$store.state.surveyForm.survey.factoryId
      },
      set(value) {
        this.$store.commit('surveyForm/UPDATE_FACTORY_ID_IN_SURVEY', value)
      }
    },
    surveyName: {
      get() {
        return this.$store.state.surveyForm.survey.surveyName
      },
      set(value) {
        this.$store.commit('surveyForm/UPDATE_SURVEY_NAME_IN_SURVEY', value)
      }
    },
  },
  mounted() {
    this.fetchSurveyById(this.$route.params.id);
    this.fetchFactories();
    this.fetchAllQuestions()
  }
}
</script>
