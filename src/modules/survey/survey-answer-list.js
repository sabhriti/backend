import ApiConfig from "@/config/ApiConfig";

const axios = require('axios');

export default {
    state: {
        surveyAnswerList: []
    },
    actions: {
        async fetchAnswersBySurveyCode({commit, dispatch}, surveyCode) {
            const config = {
                method: 'get',
                url: `${ApiConfig.API_BASE_URL}/surveys/answers/${surveyCode}`,
                headers: {}
            };

            try {
                const response = await axios(config);
                commit('UPDATE_ALL_SURVEY_ANSWERS', response.data.data);
            } catch (error) {
                dispatch('showError', " Failed loading answers. Please try again.", {root: true});
            }
        }
    },
    getters: {
        allSurveyAnswers: (state) => state.surveyAnswerList
    },
    mutations: {
        UPDATE_ALL_SURVEY_ANSWERS: (state, surveyAnswerList) => state.surveyAnswerList = surveyAnswerList
    }
}
