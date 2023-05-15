<template>
    <div class="container-fluid text-start">
        <div class="row">
            <div class="col border-end">
                <div class="container-fluid">
                    <div class="mb-3 row">
                        <label class="form-label justify-content-start text-uppercase" for="number">Name</label>
                        <input v-model="name" class="form-control ms-2" name="name" placeholder="Framework Name"
                               type="text">
                    </div>

                    <div class="mb-3 row">
                        <label class="form-label justify-content-start text-uppercase"
                               for="number">Description</label>
                        <textarea v-model="description" class="form-control ms-2" name="description" placeholder="Description"
                                  rows="5"
                                  type="text"></textarea>
                    </div>

                    <div class="mb-3 row">
                        <label class="form-label justify-content-start text-uppercase" for="number">Remarks</label>
                        <textarea v-model="remarks" class="form-control ms-2" name="remarks" placeholder="Remarks"
                                  rows="5"
                                  type="text"></textarea>
                    </div>
                </div>
            </div>
            <div class="col">
                <QuestionCategoryList />
            </div>
        </div>
        <div class="row">
            <div class="col">
                <div class="d-flex justify-content-start border-top border-1 mt-1">
                    <button class="btn btn-success mt-3" type="button" @click="saveFramework">Save</button>&nbsp;&nbsp;
                    <button class="btn btn-danger mt-3" @click="$router.push('/question/framework')">Cancel</button>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
import {defineComponent} from 'vue'
import {mapActions} from "vuex";
import QuestionCategoryList from "@/components/question/framework/QuestionCategoryList.vue";

export default defineComponent({
    name: "QuestionFrameworkForm",
    components: {QuestionCategoryList},
    methods: {
        ...mapActions(
            {saveFramework: 'questionFrameworkForm/saveFramework'}
        ),
    },
    computed: {
        name: {
            get() {
                return this.$store.state.questionFrameworkForm.name
            },
            set(value) {
                this.$store.commit('questionFrameworkForm/UPDATE_FRAMEWORK_NAME', value)
            }
        },
        description: {
            get() {
                return this.$store.state.questionFrameworkForm.description
            },
            set(value) {
                this.$store.commit('questionFrameworkForm/UPDATE_FRAMEWORK_DESCRIPTION', value)
            }
        },
        remarks: {
            get() {
                return this.$store.state.questionFrameworkForm.remarks
            },
            set(value) {
                this.$store.commit('questionFrameworkForm/UPDATE_FRAMEWORK_REMARKS', value)
            }
        }
    }
})
</script>

<style scoped>
</style>