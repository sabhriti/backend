<template>
    <AlertBox/>
    <router-link class="btn btn-success mb-3 " style="float: right;" to="/question/framework/form/id=">Add</router-link>
    <div v-if="frameworkList.length !== 0" class="container-fluid text-start">
        <div class="row">
            <div v-for="framework in frameworkList"
                 :key="framework.id" class="col-3 card bg-transparent rounded-0 me-4 mb-4 framework-container">
                <div class="card-header">
                    <div class="framework-title">
                        <span class="material-icons header-icon">crop_din</span>
                        <span class="h5 ms-2">{{ framework.title }}</span>
                    </div>
                    <div class="action-buttons">
                        <span class="material-icons-outlined text-success">edit</span>
                        <span class="material-icons-outlined text-danger">delete</span>
                    </div>
                </div>
                <div class="card-body">
                    <div class="mb-3">{{ framework.description }}</div>
                    <button :data-bs-target="`#viewCategories_${framework.id}`" class="btn btn-sm btn-outline-success"
                            data-bs-toggle="modal" type="button">
                        Categories <span class="badge text-bg-secondary">{{ framework.categories.length }}</span>
                    </button>
                </div>

                <!-- View Categories Model -->
                <div :id="`viewCategories_${framework.id}`" aria-hidden="true" class="modal fade " tabindex="-1">
                    <div class="modal-dialog">
                        <div class="modal-content bg-transparent">
                            <div class="modal-header bg-dark">
                                <span>Categories for {{ framework.title }}</span>
                                <a class="link-danger text-decoration-none material-icons-outlined"
                                   data-bs-dismiss="modal" href="javascript:void(0);">close</a>
                            </div>
                            <div class="modal-body bg-dark">
                                <table class="table table-borderless table-dark">
                                    <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Title</th>
                                        <th>Description</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr v-for="(category, index) in framework.categories" :key="category.id">
                                        <td>{{ index + 1 }}</td>
                                        <td>{{ category.title }}</td>
                                        <td>{{ category.description }}</td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>

                            <div class="modal-footer bg-dark">
                                <button class="btn btn-danger" data-bs-dismiss="modal" type="button">Close</button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>
    <EmptyListComponent v-else/>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import AlertBox from "@/components/util/AlertBox.vue";
import EmptyListComponent from "@/components/util/EmptyListComponent.vue";

export default {
    name: "QuestionFrameworkList",
    components: {EmptyListComponent, AlertBox},
    computed: {
        ...mapGetters(
            {frameworkList: "questionFrameworkList/frameworkList"}
        )
    },
    methods: {
        ...mapActions(
            {fetchAllQuestionFrameworks: 'questionFrameworkList/fetchAllQuestionFrameworks'}
        ),
    },
    mounted() {
        this.fetchAllQuestionFrameworks();
    }
}
</script>

<style scoped>

.framework-container {
    border: 1px solid #000306;
    min-height: 150px;
}

.header-icon {
    position: relative;
    top: 5px;
}

.card-header {
    color: #bde1d5;
}

.card-body {
    color: #bde1d5;
}

.framework-title {
    float: left;
}

.action-buttons {
    float: right;
}
</style>