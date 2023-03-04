<template>
  <AlertBox/>

  <div class="mb-3 row">
    <label class="col-sm-2 col-form-label d-flex justify-content-start" for="factoryName">Number</label>
    <input v-model="number" class="form-control-color" name="number" placeholder="Question Number"
           type="text">
  </div>

  <div class="mb-3 row">
    <label class="col-sm-2 col-form-label d-flex justify-content-start" for="factoryCode">Type</label>
    <input v-model="type" class="form-control-color" name="type" placeholder="Question Type"
           type="text">
  </div>

  <div class="d-flex justify-content-start border-top border-1 mt-1">
    <button class="btn btn-success mt-3" type="button" @click="saveQuestion">Save</button>&nbsp;&nbsp;
    <button class="btn btn-danger mt-3" @click="$router.push('/question')">Cancel</button>
  </div>

</template>

<script>
import {mapActions} from "vuex";
import AlertBox from "@/components/util/AlertBox";

export default {
  name: "QuestionForm",
  components: {
    AlertBox
  },
  computed: {
    type: {
      get() {
        return this.$store.state.questionForm.type
      },
      set(value) {
        this.$store.commit('questionForm/UPDATE_QUESTION_TYPE', value)
      }
    },
    number: {
      get() {
        return this.$store.state.questionForm.number
      },
      set(value) {
        this.$store.commit('questionForm/UPDATE_QUESTION_NUMBER', value)
      }
    }
  },
  methods: {
    ...mapActions(
        {
          fetchQuestionById: 'questionForm/fetchQuestionById',
          saveQuestion: 'questionForm/saveQuestion'
        }
    ),
  },
  mounted() {
    this.$store.dispatch('hideAlert');
    this.fetchQuestionById(this.$route.params.id);
  },
}
</script>

<style scoped>
.form-control-color {
  width: 25rem;
}
</style>