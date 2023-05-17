<script>
import {defineComponent} from 'vue'
import {mapActions, mapGetters} from "vuex";
import QuestionCategoryForm from "@/components/question/framework/QuestionCategoryForm.vue";

export default defineComponent({
    name: "QuestionCategoryList",
    components: {QuestionCategoryForm},
    computed: {
        ...mapGetters({
            categoryList: "questionCategoryList/categoryList",
            displayForm: "questionCategoryList/displayForm"
        })
    },
    methods: {
        ...mapActions({
            toggleDisplayForm: 'questionCategoryList/toggleDisplayForm',
            showDisplayForm: 'questionCategoryList/showDisplayForm',
            removeCategory: 'questionCategoryList/removeCategory',
            loadCategories: 'questionCategoryForm/loadCategories',
            populateForm: 'questionCategoryForm/populateForm',
        }),
        editCategory(category) {
            this.showDisplayForm();
            this.populateForm(category);
        }
    },

    mounted() {
        this.loadCategories();
    }
});
</script>

<template>

    <p>Categories: </p>

    <table class="table table-secondary table-striped">
        <caption v-if="!displayForm" class="bg-secondary text-white">
            <button class="btn btn-sm btn-danger ms-2" @click="toggleDisplayForm">Add New</button>
        </caption>
        <tbody>
        <tr v-for="category in categoryList" :key="category.title">
            <td>{{ category.title }}</td>
            <td>{{ category.description }}</td>
            <td>
                <a href="javascript:void(0);" @click="editCategory(category)" class="me-3" title="edit category">
                    <span class="material-icons text-success border border-success rounded-1">edit</span>
                </a>

                <a href="javascript:void(0);" @click="removeCategory(category)" title="delete category">
                    <span class="material-icons text-danger  border border-danger rounded-1">delete</span>
                </a>
            </td>
        </tr>
        </tbody>
    </table>

    <QuestionCategoryForm v-if="displayForm"/>
</template>

<style scoped>

</style>
