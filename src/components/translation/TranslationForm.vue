<template>
  <AlertBox/>
  <form>
    <div class="row g3">
      <div class="col-md-6">
        <div class="row">
          <label class="col-sm-3 col-form-label col-form-label-sm text-start" for="key">Translation Key</label>
          <div class="col-sm-9">
            <input v-model="key" class="form-control-color disabled d-flex justify-content-start " disabled
                   name="key" type="text"/>
          </div>
        </div>
      </div>
    </div>
    <div class="col-md-6">&nbsp;</div>
    <div class="col-md-6">
      <div class="row">
        <label class="col-sm-3 form-check-label d-flex justify-content-start" for="isActive">Is active?</label>
        <div class="col-sm-9">
          <input id="isActive" v-model="isActive" class="form-check-input d-flex justify-content-start" name="isActive"
                 type="checkbox"/>
        </div>
      </div>
    </div>

    <template v-for="item in items" v-bind:key="item.lang">
      <div class="col-md-6">&nbsp;</div>
      <div class="col-md-6">
        <div class="row">
          <label class="col-sm-3 col-form-label d-flex justify-content-start" for="key">Text ({{ item.lang.toUpperCase() }})</label>
          <div class="col-sm-9 ">
            <textarea v-model="item.content" class="form-text d-flex justify-content-start" rows="3" style="width: 100%" ></textarea>
          </div>
        </div>
      </div>

    </template>

    <div class="col-md-6">&nbsp;</div>
    <div class="d-flex justify-content-start border-top border-1 mt-1">
      <button class="btn btn-success mt-3" type="button" @click="saveTranslation">Save</button>&nbsp;&nbsp;
      <button class="btn btn-danger mt-3" @click="$router.push('/translation')">Cancel</button>
    </div>
  </form>


</template>

<script>
import {mapActions, mapGetters} from "vuex";
import AlertBox from "@/components/util/AlertBox";

export default {
  name: "TranslationForm",
  components: {
    AlertBox
  },
  computed: {
    ...mapGetters({
      translation: 'translationForm/translations',
      languages: 'translationForm/languages',

    }),
    key: {
      get() {
        return this.$store.state.translationForm.translation.key
      },
      set(value) {
        this.$store.commit('translationForm/UPDATE_TRANSLATION_KEY', value)
      }
    },
    isActive: {
      get() {
        return this.$store.state.translationForm.translation.isActive
      },
      set(value) {
        this.$store.commit('translationForm/UPDATE_STATUS', value)
      }
    },
    items: {
      get() {
        return this.$store.state.translationForm.translation.items;
      }
    }
  },
  methods: {
    ...mapActions({
      fetchTranslationById: 'translationForm/fetchTranslationById',
      saveTranslation: 'translationForm/saveTranslation',
      fetchAllLanguages: 'translationForm/fetchAllLanguages'
    }),
  },
  mounted() {
    this.fetchTranslationById(this.$route.params.id);
  },
}
</script>

<style scoped>
.form-control-color {
  width: 25rem;
}
</style>