<template>
  <component-header text="Feedbacks"/>
  <AlertBox/>
  <table class="table bg-dark text-info text-lg-start caption-top">
    <caption>
      <div class="input-group mb-3">
        <div class="input-group">
          <div class="input-group-text me-3">Business Unit:
            <select v-model="selectedFactory" class="form-select-sm ms-2">
              <option v-for="businessUnit in businessUnitList" :key="businessUnit._id" v-bind:value="businessUnit._id">
                {{ businessUnit.name }}
              </option>
            </select>
          </div>
          <a class="btn btn-sm btn-warning" title="Click to apply the filters." type="button" @click="filterFeedback">Filter</a>
          <a class="btn btn-sm btn-danger ms-1" title="Reset all filters" type="button" @click="resetFilters">Reset</a>
          <a class="btn btn-success material-icons ms-3" @click="downloadFeedbacks">download</a>
        </div>
      </div>
    </caption>
    <thead class="table-bordered">
    <tr class="text-white">
      <th scope="col">#</th>
      <th scope="col">Business Unit Name</th>
      <th scope="col">Survey Name</th>
      <th scope="col">Feedback Message</th>
      <th scope="col">Action</th>
    </tr>
    </thead>
    <tbody class="table-bordered">
    <tr v-for="(feedback, index) in allFeedbacks" :key="feedback.id">
      <td>{{ index + 1 }}</td>
      <td>{{ feedback.businessUnit.name }}</td>
      <td>{{ feedback.survey.surveyName }}</td>
      <td class="roles-td">{{ feedback.content }}</td>
      <td>
        <a :data-bs-target="`#deleteFeedback_${feedback._id}`" data-bs-toggle="modal" href="javascript:void(0);">
          <span class="material-icons-outlined text-danger" title="Delete Feedback">delete</span>
        </a>
        <!-- Modal -->
        <div :id="`deleteFeedback_${feedback._id}`" aria-hidden="true" class="modal fade" tabindex="-1">
          <div class="modal-dialog">
            <div class="modal-content">

              <div class="modal-body text-danger">
                Are you sure you want to delete?
              </div>
              <div class="modal-footer">
                <button class="btn btn-danger" data-bs-dismiss="modal" type="button"
                        @click="handleDeleteFeedback(feedback._id)">Yes
                </button>
                <button class="btn btn-secondary" data-bs-dismiss="modal" type="button">No</button>
              </div>
            </div>
          </div>
        </div>
      </td>
    </tr>
    </tbody>
  </table>
</template>

<script>
import ComponentHeader from "@/components/ComponentHeader";
import {mapActions, mapGetters} from "vuex";
import AlertBox from "@/components/util/AlertBox";
import businessUnitList from "@/store/modules/business-unit/business-unit-list";

export default {
  name: "FeedbacksComponent",
  components: {
    ComponentHeader,
    AlertBox
  },
  methods: {
    ...mapActions(['fetchFeedback', 'deleteFeedback', 'downloadFeedbacks', 'filterFeedback', 'resetFilters']),
    handleDeleteFeedback(feedbackId) {
      this.deleteFeedback(feedbackId);
      return true;
    },
  },
  mounted() {
    this.fetchFeedback();
  },

  computed: {
      businessUnitList() {
          return businessUnitList
      },
    ...mapGetters(['allFeedbacks', 'businessUnitList']),
    selectedFactory: {
      get() {
        return this.$store.state.feedbackList.selectedFactory
      },
      set(value) {
        this.$store.commit('UPDATE_SELECTED_BUSINESS_UNIT', value)
      }
    }
  }
}
</script>

<style scoped>

</style>