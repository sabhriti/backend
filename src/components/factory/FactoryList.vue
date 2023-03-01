<template>
  <AlertBox/>
  <router-link class="btn btn-success mb-2" style="float: right;" to="/factory/form/id=">Add</router-link>
  <table class="table bg-dark text-info text-lg-start">
    <thead class="table-bordered">
    <tr class="text-white">
      <th scope="col">#</th>
      <th scope="col">Factory Name</th>
      <th scope="col">Location</th>
      <th scope="col">Code</th>
      <th scope="col">Action</th>
    </tr>
    </thead>
    <tbody class="table-bordered">
    <tr v-for="(factory, index) in allFactories" v-bind:key="index">
      <th scope="col">{{ index + 1 }}</th>
      <th scope="col">{{ factory.name }}</th>
      <th scope="col">{{ factory.city }}, {{ factory.country}}</th>
      <th scope="col">{{ factory.code }}</th>
      <th scope="col">
        <router-link :to="`/factory/form/id=${factory._id}`" class="material-icons text-decoration-none text-info" title="Edit Factory">edit</router-link>
        <a :data-bs-target="`#deleteFactory_${factory._id}`" data-bs-toggle="modal" href="javascript:void(0);">
          <span class="material-icons-outlined text-danger" title="Delete Factory">delete</span>
        </a>
        <!-- Modal -->
        <div :id="`deleteFactory_${factory._id}`" aria-hidden="true" class="modal fade" tabindex="-1">
          <div class="modal-dialog">
            <div class="modal-content">

              <div class="modal-body text-danger">
                Are you sure you want to delete?
              </div>
              <div class="modal-footer">
                <button class="btn btn-danger" data-bs-dismiss="modal" type="button"
                        @click="deleteFactory(factory._id)">Yes
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
  name: "FactoryList",
  components: {
    AlertBox
  },
  methods: {
    ...mapActions(['fetchAllFactories', 'deleteFactory']),
  },
  computed: {
    ...mapGetters(['allFactories'])
  },
  mounted() {
    this.$store.dispatch('hideAlert');
    this.fetchAllFactories();
  }
}
</script>

<style scoped>

</style>