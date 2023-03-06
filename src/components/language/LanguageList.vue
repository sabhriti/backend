<template>
  <AlertBox/>
  <router-link class="btn btn-success mb-2" style="float: right;" to="/language/form/id=">Add</router-link>
  <table class="table bg-dark text-info text-lg-start">
    <thead class="table-bordered">
    <tr class="text-white">
      <th scope="col">#</th>
      <th scope="col">Language</th>
      <th scope="col">Code</th>
      <th scope="col">Action</th>
    </tr>
    </thead>
    <tbody class="table-bordered">
    <tr v-for="(language, index) in allLanguages" v-bind:key="index">
      <th scope="col">{{ index + 1 }}</th>
      <th scope="col">{{ language.name }}</th>
      <th scope="col">{{ language.code }}</th>
      <th scope="col">
        <template v-if="'English' !== language.name">
          <router-link :to="`/language/form/id=${language._id}`"
                       class="material-icons text-decoration-none text-info" title="Edit language">edit
          </router-link>
          <a :data-bs-target="`#deleteLanguage_${language._id}`" data-bs-toggle="modal"
             href="javascript:void(0);">
            <span class="material-icons-outlined text-danger" title="Delete Language">delete</span>
          </a>
        </template>

        <template v-else>
          <span class="material-icons-outlined disabled text-danger" title="Delete Language">block</span>
        </template>

        <!-- Modal -->
        <div :id="`deleteLanguage_${language._id}`" aria-hidden="true" class="modal fade" tabindex="-1">
          <div class="modal-dialog">
            <div class="modal-content">

              <div class="modal-body text-danger">
                Are you sure you want to delete?
              </div>
              <div class="modal-footer">
                <button class="btn btn-danger" data-bs-dismiss="modal" type="button"
                        @click="deleteLanguage(language._id)">Yes
                </button>
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
  name: "LanguageList",
  components: {
    AlertBox
  },
  methods: {
    ...mapActions(['fetchAllLanguages', 'deleteLanguage']),
  },
  computed: {
    ...mapGetters(['allLanguages'])
  },
  mounted() {
    this.fetchAllLanguages();
  }
}
</script>

<style scoped>

</style>