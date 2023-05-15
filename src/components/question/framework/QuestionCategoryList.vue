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
            toggleDisplayForm: 'questionCategoryList/toggleDisplayForm'
        }),
        addCategory() {
            this.toggleDisplayForm();
        }
    }
});
</script>

<template>

    <QuestionCategoryForm v-if="displayForm"/>

    <table class="table table-secondary table-striped">
        <caption class="bg-secondary text-white caption-top" v-if="!displayForm">
            <button class="btn btn-sm btn-danger ms-2" @click="addCategory">Add New</button>
        </caption>
        <tbody>
        <tr v-for="category in categoryList" :key="category.title">
            <td>{{ category.title }}</td>
            <td>{{ category.description }}</td>
            <td>
                <span class="material-icons text-success">edit</span>
                <span class="material-icons text-danger">delete</span>
            </td>
        </tr>
        </tbody>
    </table>

</template>

<style scoped>

</style>
