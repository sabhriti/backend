import ApiConfig from "@/config/ApiConfig";

const axios = require('axios');

export default {
    namespaced: true,
    actions: {
        async fetchAllQuestions({commit, dispatch}) {
            const config = {
                method: 'get',
                url: `${ApiConfig.API_BASE_URL}/question`,
                headers: {}
            };

            try {
                const response = await axios(config);
                commit('UPDATE_ALL_QUESTIONS', response.data.data);
            } catch (error) {
                dispatch('showError', " Failed fetching questions.", {root: true});
            }
        },

    },
    state: {
        questionList: [],
    },

    getters: {
        questionList: (state) => state.questionList,
    },

    mutations: {
        UPDATE_ALL_QUESTIONS: (state, questionList) => state.questionList = questionList,
    }
}
