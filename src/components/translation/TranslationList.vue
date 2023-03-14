<template>
  <AlertBox/>
  <router-link class="btn btn-success mb-2" style="float: right;" to="/translation/key/form">Add new key</router-link>
  <table class="table bg-dark text-info text-lg-start">
    <thead class="table-bordered">
    <tr class="text-white">
      <th scope="col">#</th>
      <th scope="col">Translation Key</th>
      <th scope="col">Languages</th>
      <th scope="col">Excerpt (in English)</th>
      <th scope="col">Status</th>
      <th scope="col">Action</th>
    </tr>
    </thead>
    <tbody class="table-bordered">
    <tr v-for="(translation, index) in translations" v-bind:key="index">
      <th scope="col">{{ index + 1 }}</th>
      <th scope="col">{{ translation.key }}</th>
      <th scope="col">{{ extractLanguages(translation.items) }}</th>
      <th scope="col">{{ extractEnglishExcerpt(translation.items) }}</th>
      <th scope="col">

        <a v-if="'deactivate' === getToggle(translation) && translation.isActive" href="javascript:void(0);"
           @click="toggleTranslationStatus(translation)">
          <span class="material-icons-outlined text-success" title="Click to deactivate Translation">check_circle</span>
        </a>

        <a v-else-if="'activate' === getToggle(translation)" href="javascript:void(0);" @click="toggleTranslationStatus(translation)">
          <span class="material-icons-outlined text-danger" title="Click to activate Translation">cancel</span>
        </a>

        <div v-if="'loading' === getToggle(translation)" class="spinner-border text-white spinner-border-sm" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>

      </th>
      <th scope="col">
        <a :data-bs-target="`#viewTranslations_${translation._id}`" data-bs-toggle="modal" href="javascript:void(0);">
          <span class="material-icons-outlined text-info" title="Preview Translation">preview</span>
        </a>
        <router-link :to="`/translation/form/id=${translation._id}`"
                     class="material-icons text-decoration-none text-info" title="Edit Translations">edit
        </router-link>

        <a :data-bs-target="`#deleteTranslation${translation._id}`" data-bs-toggle="modal" href="javascript:void(0);">
          <span class="material-icons-outlined text-danger" title="Delete Factory">delete</span>
        </a>

        <!-- Delete Modal -->
        <div :id="`deleteTranslation${translation._id}`" aria-hidden="true" class="modal fade" tabindex="-1">
          <div class="modal-dialog">
            <div class="modal-content">

              <div class="modal-body text-danger">
                Are you sure you want to delete? <br> Doing this might break your application.
              </div>
              <div class="modal-footer">
                <button class="btn btn-danger" data-bs-dismiss="modal" type="button"
                        @click="deleteTranslation(translation._id)">Yes
                </button>
                <button class="btn btn-secondary" data-bs-dismiss="modal" type="button">No</button>
              </div>
            </div>
          </div>
        </div>

        <!-- Preview Modal -->
        <div :id="`viewTranslations_${translation._id}`" aria-hidden="true" class="modal fade" tabindex="-1">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header bg-dark">
                <h5>Translations for key <b class="text-white">[ {{ translation.key }} ]</b></h5>
                <button aria-label="Close" class="close bg-danger border-0 text-white" data-dismiss="modal"
                        type="button">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <table class="table">
                  <thead>
                  <tr>
                    <th scope="col">Language</th>
                    <th scope="col">Text</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr v-for="(translationDetail, detailsIndex) in translation.items" v-bind:key="detailsIndex">
                    <th scope="row">{{ translationDetail.lang }}</th>
                    <td>{{ translationDetail.content }}</td>
                  </tr>
                  </tbody>
                </table>
                <div class="modal-body text-danger">

                </div>
                <div class="modal-footer">
                  <button class="btn btn-danger" data-bs-dismiss="modal" type="button">Cancel</button>
                </div>
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
  name: "TranslationList",
  components: {
    AlertBox
  },
  methods: {
    ...mapActions({
      fetchAllTranslations: 'translationList/fetchAllTranslations',
      deleteTranslation: 'translationList/deleteTranslation',
      toggleTranslationStatus: 'translationList/toggleTranslationStatus'
    }),
    getToggle(translation) {
      if (this.activeToggleRequests.filter(value => value === translation._id).length >= 1) {
        return 'loading';
      }

      if (translation.isActive) {
        return 'deactivate';
      }

      if (!translation.isActive) {
        return 'activate';
      }
    },

    extractLanguages(items) {
      return items.reduce((a, b) => a + ["", ", "][+!!a.length] + b.lang, "");
    },

    extractEnglishExcerpt(translationItems) {
      const englishItem = translationItems.filter(translationItem => translationItem.lang === 'en');

      if (englishItem.length >= 1) {
        return englishItem[0].content.substr(0, 50);
      }

      return "No Except available.";
    }
  },
  computed: {
    ...mapGetters({
      translations: 'translationList/translations',
      activeToggleRequests: 'translationList/activeToggleRequests'
    })
  },
  mounted() {
    this.fetchAllTranslations();
  }
}
</script>
