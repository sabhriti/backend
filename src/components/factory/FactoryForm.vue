<template>
  <AlertBox/>

  <div class="mb-3 row">
    <label class="col-sm-2 col-form-label d-flex justify-content-start" for="factoryName">Factory Name</label>
    <input v-model="factoryName" class="form-control-color" name="factoryName" placeholder="Factory Name"
           type="text">
  </div>

  <div class="mb-3 row">
    <label class="col-sm-2 col-form-label d-flex justify-content-start" for="factoryCode">Factory Code</label>
    <input v-model="factoryCode" class="form-control-color" name="factoryCode" placeholder="Factory Code"
           type="text">
  </div>
  <div class="mb-3 row">
    <label class="col-sm-2 col-form-label d-flex justify-content-start" for="factoryCity">City</label>
    <input v-model="factoryCity" class="form-control-color" name="factoryCity" placeholder="City"
           type="text">
  </div>
  <div class="mb-3 row">
    <label class="col-sm-2 col-form-label d-flex justify-content-start" for="factoryCountry">Country</label>
    <input v-model="factoryCountry" class="form-control-color" name="factoryCountry" placeholder="Country"
           type="text">
  </div>

  <div class="d-flex justify-content-start border-top border-1 mt-1">
    <button class="btn btn-success mt-3" type="button" @click="saveFactory">Save</button>&nbsp;&nbsp;
    <button class="btn btn-danger mt-3" @click="$router.push('/factory')">Cancel</button>
  </div>

</template>

<script>
import {mapActions} from "vuex";
import AlertBox from "@/components/util/AlertBox";

export default {
  name: "FactoryForm",
  components: {
    AlertBox
  },
  computed: {
    factoryCode: {
      get () {
        return this.$store.state.factoryForm.factoryCode
      },
      set (value) {
        this.$store.commit('UPDATE_FACTORY_CODE', value)
      }
    },
    factoryName: {
      get () {
        return this.$store.state.factoryForm.factoryName
      },
      set (value) {
        this.$store.commit('UPDATE_FACTORY_NAME', value)
      }
    },
    factoryCity: {
      get () {
        return this.$store.state.factoryForm.factoryCity
      },
      set (value) {
        this.$store.commit('UPDATE_FACTORY_CITY', value)
      }
    },
    factoryCountry: {
      get () {
        return this.$store.state.factoryForm.factoryCountry
      },
      set (value) {
        this.$store.commit('UPDATE_FACTORY_COUNTRY', value)
      }
    },
  },
  methods: {
    ...mapActions(['fetchFactoryById', 'saveFactory']),
  },
  mounted() {
    this.$store.dispatch('hideAlert');
    this.fetchFactoryById(this.$route.params.id);
  },
}
</script>

<style scoped>
.form-control-color {
  width: 25rem;
}
</style>