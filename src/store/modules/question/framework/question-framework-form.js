import axios from "axios";
import ApiConfig from "@/config/ApiConfig";
import router from "@/routes";

export default {
    namespaced: true,
    state: {
        title: "",
        description: "",
        remarks: "",
        categories: []
    },

    actions: {
        async saveFramework({state, rootGetters, dispatch}) {
            try {
                const payload = {
                    name: state.name,
                    description: state.description,
                    remarks: state.remarks,
                    categories: rootGetters['questionCategoryList/categoryList']
                };

                const config = {
                    method: 'post',
                    url: `${ApiConfig.NEW_API_BASE_URL}/questions/framework`,
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    data: JSON.stringify(payload)
                };


                await axios(config);

                dispatch('questionCategoryList/removeAllCategories', {}, {root: true});
                dispatch('showInfo', "New question framework successfully added", {root: true});

                await router.push({name: 'QuestionFrameworkList'});
            } catch (error) {
                console.log(error);
            }
        }
    },

    mutations: {
        UPDATE_FRAMEWORK_TITLE: (state, value) => state.title = value,
        UPDATE_FRAMEWORK_DESCRIPTION: (state, value) => state.description = value,
        UPDATE_FRAMEWORK_REMARKS: (state, value) => state.remarks = value
    }
}
