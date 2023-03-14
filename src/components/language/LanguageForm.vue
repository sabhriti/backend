<template>
  <AlertBox/>

  <div class="mb-3 row">
    <label class="col-sm-2 col-form-label d-flex justify-content-start" for="languageName">Language</label>
    <input v-model="languageName"  class="form-control-color" name="languageName" placeholder="choose language"
           type="text">
  </div>

  <div class="mb-3 row">
    <label class="col-sm-2 col-form-label d-flex justify-content-start" for="languageCode">Language Code</label>
    <input  v-model="languageCode" class="form-control-color" name="languageCode" placeholder="language code"
           type="text">
  </div>

  <div class="d-flex justify-content-start border-top border-1 mt-1">
    <button class="btn btn-success mt-3" type="button" @click="saveLanguage">Save</button>&nbsp;&nbsp;
    <button class="btn btn-danger mt-3" @click="$router.push('/language')">Cancel</button>
  </div>

</template>

<script>
import {mapActions} from "vuex";
import AlertBox from "@/components/util/AlertBox";

export default {
  name: "LanguageForm",
  components: {
    AlertBox
  },
  computed: {
    languageCode: {
      get () {
        return this.$store.state.languageForm.languageCode
      },
      set (value) {
        this.$store.commit('UPDATE_LANGUAGE_CODE', value)
      }
    },
    languageName: {
      get () {
        return this.$store.state.languageForm.languageName
      },
      set (value) {
        this.$store.commit('UPDATE_LANGUAGE_NAME', value)
      }
    },
  },
  methods: {
    ...mapActions(['fetchLanguageById', 'saveLanguage']),
  },
  mounted() {
    this.fetchLanguageById(this.$route.params.id);
  },
}
</script>

<style scoped>
.form-control-color {
  width: 25rem;
}
</style>