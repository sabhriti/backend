<template>
  <AlertBox/>

  <div class="mb-3 row">
    <label class="col-sm-2 col-form-label d-flex justify-content-start" for="keyName">Key name</label>
    <input v-model="keyName" class="form-control" name="factoryName" placeholder="Key Name" style="width: 25rem;"
           type="text">
  </div>

  <div class="mb-3 row">
    <label class="col-sm-2 col-form-label d-flex justify-content-start" for="defaultText">Default text (in English)</label>
    <textarea v-model="defaultText" class="form-control" name="defaultText" style="width: 25rem;"></textarea>
  </div>

  <div class="mb-3 row">
    <label class="col-sm-2 col-form-label d-flex justify-content-start" for="defaultText">Is active?</label>
    <input v-model="isActive" class="form-control-color" name="isActive" type="checkbox" />
  </div>

  <div class="d-flex justify-content-start border-top border-1 mt-1">
    <button class="btn btn-success mt-3" type="button" @click="saveKey">Save</button>&nbsp;&nbsp;
    <button class="btn btn-danger mt-3" @click="$router.push('/translation')">Cancel</button>
  </div>

</template>

<script>
import AlertBox from "@/components/util/AlertBox";
import {mapActions} from "vuex";

export default {
  name: "TranslationKeyForm",
  components: {
    AlertBox
  },
  methods: {
    ...mapActions({
      saveKey: 'translationKeyForm/saveKey'
    })
  },
  computed: {
    keyName: {
      get() {
        return this.$store.state.translationKeyForm.keyName
      },
      set(value) {
        this.$store.commit('translationKeyForm/UPDATE_KEY_NAME', value)
      }
    },
    defaultText: {
      get() {
        return this.$store.state.translationKeyForm.defaultText
      },
      set(value) {
        this.$store.commit('translationKeyForm/UPDATE_DEFAULT_TEXT', value)
      }
    } ,
    isActive: {
      get() {
        return this.$store.state.translationKeyForm.isActive
      },
      set(value) {
        this.$store.commit('translationKeyForm/UPDATE_IS_ACTIVE', value)
      }
    }
  }
}
</script>

<style scoped>

</style>