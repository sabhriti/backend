import ApiConfig from "@/config/ApiConfig";
import axios from "axios";

export default {
    namespaced: true,
    state: {
        frameworkList: [
            {
                name: "",
                description: "",
                remarks: '',
                categories: []
            }
        ]
    },
    getters: {
        frameworkList: (state) => state.frameworkList
    },
    actions: {
        async fetchAllQuestionFrameworks({commit}) {
            const config = {
                method: 'get',
                url: `${ApiConfig.NEW_API_BASE_URL}/questions/framework`,
                headers: {
                    'Content-Type': 'application/json'
                }
            };
            try {
                const response = await axios(config);
                const frameworks = response.data;

                if (frameworks.length <= 0) {
                    commit('UPDATE_ALL_FRAMEWORKS', frameworks);
                }
            } catch (error) {
                console.log(error);
            }
        }
    },
    mutations: {
        UPDATE_ALL_FRAMEWORKS: (state, frameworkList) => {
            state.frameworkList = frameworkList
        }
    }
}