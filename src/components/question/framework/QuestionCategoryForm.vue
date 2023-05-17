<script>
import {defineComponent} from 'vue'
import {mapActions, mapGetters} from "vuex";
import AlertBox from "@/components/util/AlertBox.vue";

export default defineComponent({
    name: "QuestionCategoryForm",
    components: {AlertBox},
    methods: {
        ...mapActions({
            saveCategory: 'questionCategoryForm/saveCategory',
            hideForm: 'questionCategoryForm/hideForm'
        })
    },
    computed: {
        ...mapGetters({
            formMode: 'questionCategoryForm/formMode'
        }),
        title: {
            get() {
                return this.$store.state.questionCategoryForm.title;
            },
            set(value) {
                this.$store.commit('questionCategoryForm/UPDATE_QUESTION_CATEGORY_TITLE', value)
            }
        },
        description: {
            get() {
                return this.$store.state.questionCategoryForm.description;
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
            <AlertBox/>
            <form class="container-fluid" @submit.prevent="saveCategory">
                <div class="row mb-2">
                    <input v-model="title" aria-label="Category Title" class="form-control"
                           placeholder="Category Title"
                           required type="text">
                </div>
                <div class="row mb-3">
                <textarea v-model="description" aria-label="Category Description" class="form-control"
                          name="categoryDescription" placeholder="Category Description"
                          required rows="3"></textarea>
                </div>
                <div class="row text-start p-0">
                    <div class="col-1">
                        <button class="btn btn-sm btn-outline-success m-0" type="submit">{{ formMode }}</button>
                    </div>
                    <div class="col-11">
                        <button class="btn btn-sm btn-outline-danger" type="submit" @click="hideForm">Cancel</button>
                    </div>
                </div>
            </form>
        </div>
    </div>

</template>

<style scoped>

</style>