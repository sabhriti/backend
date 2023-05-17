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
            loadCategories: 'questionCategoryForm/loadCategories',
            populateForm: 'questionCategoryForm/populateForm',
        }),
        addCategory() {
            this.toggleDisplayForm();
        },
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

    <QuestionCategoryForm v-if="displayForm"/>

    <table class="table table-secondary table-striped">
        <caption v-if="!displayForm" class="bg-secondary text-white caption-top">
            <button class="btn btn-sm btn-danger ms-2" @click="addCategory">Add New</button>
        </caption>
        <tbody>
        <tr v-for="category in categoryList" :key="category.title">
            <td>{{ category.title }}</td>
            <td>{{ category.description }}</td>
            <td>
                <a href="javascript:void(0);" @click="editCategory(category)"> <span
                        class="material-icons text-success ">edit</span></a>
                <span class="material-icons text-danger">delete</span>
            </td>
        </tr>
        </tbody>
    </table>

</template>

<style scoped>

</style>
