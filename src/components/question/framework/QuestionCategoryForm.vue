<script>
import {defineComponent} from 'vue'
import {mapActions, mapGetters} from "vuex";
import AlertBox from "@/components/util/AlertBox.vue";

export default defineComponent({
    name: "QuestionCategoryForm",
    components: {AlertBox},
    methods: {
        ...mapActions({
            addNewCategory: 'questionCategoryForm/addNewCategory',
            hideForm: 'questionCategoryForm/hideForm'
        })
    },
    computed: {
        ...mapGetters({
            id: "questionCategoryForm/id",
            title: "questionCategoryForm/title",
            description: "questionCategoryForm/description",
        }),
        categoryTitle: {
            get() {
                return this.id;
            },
            set(value) {
                this.$store.commit('questionCategoryForm/UPDATE_QUESTION_CATEGORY_TITLE', value)
            }
        },
        categoryDescription: {
            get() {
                return this.description;
            },
            set(value) {
                this.$store.commit('questionCategoryForm/UPDATE_QUESTION_CATEGORY_DESCRIPTION', value)
            }
        },
    }
})
</script>

<template>
    <div class="card mb-3">
        <div class="card-body">
            <div class="container-fluid">
                <AlertBox/>
                <div class="row mb-2">
                    <input v-model="categoryTitle" aria-label="Category Title" class="form-control"
                           placeholder="Category Title"
                           type="text">
                </div>
                <div class="row mb-3">
                <textarea aria-label="Category Description" class="form-control" name="categoryDescription"
                          placeholder="Category Description"
                          rows="3"></textarea>
                </div>
                <div class="row text-start p-0">
                    <div class="col-1">
                        <button class="btn btn-sm btn-outline-success m-0" type="submit" @click="addNewCategory">Add
                        </button>
                    </div>
                    <div class="col-11">
                        <button class="btn btn-sm btn-outline-danger" type="submit" @click="hideForm">Cancel</button>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>

<style scoped>

</style>