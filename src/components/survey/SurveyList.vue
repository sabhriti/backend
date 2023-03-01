<template>
  <AlertBox/>
  <table class="table bg-dark text-info text-lg-start caption-top">
    <caption>
      <div class="input-group mb-3">
        <div class="input-group">
          <div class="input-group-text me-3">Factory:
          <select v-model="filteredFactoryId" class="form-select-sm ms-2">
            <option v-for="factory in surveyedFactories" :key="factory._id" v-bind:value="factory._id">
              {{ factory.name }}
            </option>
          </select>
          </div>
          <a class="btn btn-sm btn-warning ms-1" title="Click to apply the filters." type="button"
             @click="filterSurveys">Filter</a>
          <a class="btn btn-sm btn-danger ms-1" title="Reset all filters" type="button" @click="resetFilters">Reset</a>
          <a class="btn btn-sm btn-success material-icons ms-1" style="float: right;" title="Download survey answers"
             @click="downloadFilteredSurveyAnswers">download</a>
        </div>

        <router-link class="btn btn-success position-absolute" style="right: 15px;" to="/surveys/form/id=">
          Create new survey
        </router-link>
      </div>
    </caption>
    <thead class="table-bordered">
    <tr class="text-white">
      <th scope="col">#</th>
      <th scope="col">Survey Name</th>
      <th scope="col">Factory Name</th>
      <th scope="col">Questions</th>
      <th scope="col">Action</th>
    </tr>
    </thead>
    <tbody class="table-bordered">
    <tr v-for="(survey, index) in allSurveys" :key="index">
      <td>{{ index + 1 }}</td>
      <td>{{ survey.surveyName }}</td>
      <td>{{ survey.factory.name }}</td>
      <td>{{ survey.questions.length }}</td>
      <td>
        <router-link :to="`/surveys/form/id=${survey._id}`" class="material-icons text-decoration-none text-info"
                     title="Edit Survey">edit
        </router-link>
        <a class="material-icons text-decoration-none text-info" href="javascript:void(0);"
           @click="previewAnswers(survey._id)">preview</a>
        <a class="material-icons text-decoration-none text-info" href="javascript:void(0);"
           @click="downloadSurveyAnswers(survey._id)">download</a>
      </td>
    </tr>
    </tbody>
  </table>
</template>

<script>
import AlertBox from "@/components/util/AlertBox";
import {mapActions, mapGetters} from "vuex";
import ApiConfig from "@/config/ApiConfig";

export default {
  name: "SurveyList",
  components: {
    AlertBox,
  },
  methods: {
    ...mapActions(['fetchAllSurveys', 'filterSurveys', 'resetFilters', 'downloadFilteredSurveyAnswers']),
    downloadSurveyAnswers(surveyId) {
      console.log(surveyId);
      window.location.href = `${ApiConfig.API_BASE_URL}/surveys/download/answers/${surveyId}`;
    },
    previewAnswers(surveyId) {
      this.$router.push('/surveys/answers/surveyId=' + surveyId)
    }
  },
  mounted() {
    this.$store.dispatch('hideAlert');
    this.fetchAllSurveys();
  },
  computed: {
    ...mapGetters(['allSurveys', 'surveyedFactories']),
    filteredFactoryId: {
      get() {
        return this.$store.state.surveyList.filteredFactoryId
      },
      set(value) {
        this.$store.commit('UPDATE_FILTERED_FACTORY_ID', value)
      }
    }
  }
}
</script>

<style scoped>
</style>