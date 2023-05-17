<template>
    <AlertBox/>

    <div class="mb-3 row">
        <label class="col-sm-2 col-form-label d-flex justify-content-start" for="name">Name</label>
        <input v-model="name" class="form-control-color" name="name" placeholder="Unit Name"
               type="text">
    </div>

    <div class="mb-3 row">
        <div class="mb-3 row">
            <label class="col-sm-2 col-form-label d-flex justify-content-start" for="street">Street</label>
            <input v-model="street" class="form-control-color" name="street" placeholder="Street"
                   type="text">
        </div>
        <div class="mb-3 row">
            <label class="col-sm-2 col-form-label d-flex justify-content-start" for="houseNumber">House Number</label>
            <input v-model="houseNumber" class="form-control-color" name="houseNumber" placeholder="House Number"
                   type="text">
        </div>

        <div class="mb-3 row">
            <label class="col-sm-2 col-form-label d-flex justify-content-start" for="street">Postal Code</label>
            <input v-model="zipCode" class="form-control-color" name="zipCode" placeholder="Postal Code"
                   type="text">
        </div>
        <div class="mb-3 row">
            <label class="col-sm-2 col-form-label d-flex justify-content-start" for="city">City</label>
            <input v-model="city" class="form-control-color" name="city" placeholder="City"
                   type="text">
        </div>
        <div class="mb-3 row">
            <label class="col-sm-2 col-form-label d-flex justify-content-start" for="country">Country</label>
            <input v-model="country" class="form-control-color" name="country" placeholder="Country"
                   type="text">
        </div>
    </div>


    <div class="d-flex justify-content-start border-top border-1 mt-1">
        <button class="btn btn-success mt-3" type="button" @click="saveBusiness">Save</button>&nbsp;&nbsp;
        <button class="btn btn-danger mt-3" @click="$router.push('/business-unit')">Cancel</button>
    </div>

</template>

<script>
import {mapActions} from "vuex";
import AlertBox from "@/components/util/AlertBox";

export default {
    name: "BusinessUnitForm",
    components: {
        AlertBox
    },
    computed: {
        name: {
            get() {
                return this.$store.state.businessUnitForm.name
            },
            set(value) {
                this.$store.commit('businessUnitForm/UPDATE_BUSINESS_UNIT_NAME', value)
            }
        },
        street: {
            get() {
                return this.$store.state.businessUnitForm.location.street
            },
            set(value) {
                this.$store.commit('businessUnitForm/UPDATE_BUSINESS_UNIT_STREET', value)
            }
        },
        houseNumber: {
            get() {
                return this.$store.state.businessUnitForm.location.houseNumber
            },
            set(value) {
                this.$store.commit('businessUnitForm/UPDATE_BUSINESS_UNIT_HOUSE_NUMBER', value)
            }
        },
        zipCode: {
            get() {
                return this.$store.state.businessUnitForm.location.zipCode
            },
            set(value) {
                this.$store.commit('businessUnitForm/UPDATE_BUSINESS_UNIT_ZIP_CODE', value)
            }
        },
        city: {
            get() {
                return this.$store.state.businessUnitForm.location.city
            },
            set(value) {
                this.$store.commit('businessUnitForm/UPDATE_BUSINESS_UNIT_CITY', value)
            }
        },
        country: {
            get() {
                return this.$store.state.businessUnitForm.location.country
            },
            set(value) {
                this.$store.commit('businessUnitForm/UPDATE_BUSINESS_UNIT_COUNTRY', value)
            }
        },
    },
    methods: {
        ...mapActions({
            fetchBusinessById: 'businessUnitForm/fetchBusinessUnitById',
            saveBusiness: 'businessUnitForm/saveBusinessUnit'
        }),
    },
    mounted() {
        this.fetchBusinessById(this.$route.params.id);
    },
}
</script>

<style scoped>
.form-control-color {
    width: 25rem;
}
</style>