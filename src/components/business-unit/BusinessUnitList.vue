<template>
    <AlertBox/>
    <router-link class="btn btn-success mb-2" style="float: right;" to="/business-unit/form/id=">Add</router-link>
    <table class="table bg-dark text-info text-lg-start">
        <thead class="table-bordered">
        <tr class="text-white">
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Location</th>
            <th scope="col">Action</th>
        </tr>
        </thead>
        <tbody class="table-bordered">
        <tr v-for="(businessUnit, index) in allBusinessUnits" v-bind:key="index">
            <th scope="col">{{ index + 1 }}</th>
            <th scope="col">{{ businessUnit.name }}</th>
            <th scope="col">{{ businessUnit.location.city }}, {{ businessUnit.location.country }}</th>
            <th scope="col">
                <router-link :to="`/business-unit/form/id=${businessUnit.id}`"
                             class="material-icons text-decoration-none text-info"
                             title="Edit Business Unit">edit
                </router-link>
                <a :data-bs-target="`#deleteFactory_${businessUnit.id}`" data-bs-toggle="modal" href="javascript:void(0);">
                    <span class="material-icons-outlined text-danger" title="Delete Business Unit">delete</span>
                </a>
                <!-- Modal -->
                <div :id="`deleteFactory_${businessUnit.id}`" aria-hidden="true" class="modal fade" tabindex="-1">
                    <div class="modal-dialog">
                        <div class="modal-content">

                            <div class="modal-body text-danger">
                                Are you sure you want to delete?
                            </div>
                            <div class="modal-footer">
                                <button class="btn btn-danger" data-bs-dismiss="modal" type="button"
                                        @click="deleteBusinessUnit(businessUnit.id)">Yes
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
    name: "BusinessUnitList",
    components: {
        AlertBox
    },
    methods: {
        ...mapActions({
            fetchAllBusinessUnits: 'businessUnitList/fetchAllBusinessUnits',
            deleteBusinessUnit: 'businessUnitList/deleteBusinessUnit'
        }),
    },
    computed: {
        ...mapGetters({
            allBusinessUnits: 'businessUnitList/allBusinessUnits'
        })
    },
    mounted() {
        this.fetchAllBusinessUnits();
    }
}
</script>

<style scoped>

</style>