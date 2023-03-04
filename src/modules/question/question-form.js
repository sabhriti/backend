import ApiConfig from "@/config/ApiConfig";
import axios from "axios";
import router from "@/routes";

export default {
    namespaced: true,
    state: {
        id: '',
        number: '',
        type: '',
    },
    actions: {
        async fetchQuestionById({commit, dispatch}, questionId) {
            if (questionId) {
                try {
                    const config = {
                        method: 'get',
                        url: `${ApiConfig.API_BASE_URL}/questions/${questionId}`,
                        headers: {}
                    };

                    const response = await axios(config);

                    if (response.data.data) {
                        commit('UPDATE_QUESTION_NUMBER', response.data.data.number);
                        commit('UPDATE_QUESTION_TYPE', response.data.data.code);
                    }
                } catch (error) {
                    dispatch('showError', " Failed fetching the question to edit.", {root: true});
                }
            } else {
                commit('UPDATE_QUESTION_NUMBER', null);
                commit('UPDATE_QUESTION_TYPE',  null);
            }
        },
        async saveQuestion({state, dispatch}) {
            try {

                const dataToStore = {
                    number: state.number,
                    type: state.type,
                    id: state.id
                };

                const config = {
                    method: 'post',
                    url: `${ApiConfig.NEW_API_BASE_URL}/questions/`,
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    data: dataToStore
                };

                await axios(config);

                await router.push("/factory");

                dispatch('showInfo', "New question successfully added", {root: true});
            } catch (error) {
                dispatch('showError', "Failed saving question in database.", {root: true});
            }
        },
    },
    getters: {
        number: (state) => state.number,
        type: (state) => state.type,
    },
    mutations: {
        UPDATE_QUESTION_NUMBER: (state, number) => state.number = number,
        UPDATE_QUESTION_TYPE: (state, type) => state.type = type,
    }
}