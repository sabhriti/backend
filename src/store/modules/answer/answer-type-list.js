import ApiConfig from "@/config/ApiConfig";
import axios from "axios";

export default {
    state: {
        answerTypes: []
    },

    getters: {
        answerTypes: (state) => state.answerTypes
    },

    actions: {
       async fetchAllAnswerTypes({commit, dispatch}) {
            const config = {
                method: 'get',
                url: `${ApiConfig.API_BASE_URL}/answer-type`,
                headers: {}
            };

            try {
                const response = await axios(config);
                commit('UPDATE_ALL_ANSWER_TYPES', response.data.data);
            } catch (error) {
                dispatch('showError', "An error occurred while fetching answer types. Please try again.", {root: true});
            }
        },

        async deleteAnswerType({commit, state, dispatch}, answerTypeId) {
            const config = {
                method: 'delete',
                url: `${ApiConfig.API_BASE_URL}/answer-type/${answerTypeId}`
            };

            try {
                const response = await axios(config);
                if (response.status === 200) {
                    const newAnswerTypes = state.answerTypes.filter(answerType => answerType._id !== answerTypeId);
                    dispatch('showInfo', "Answer type successfully deleted.", {root: true});
                    commit('UPDATE_ALL_ANSWER_TYPES', newAnswerTypes);
                }
                if (response.status === 404) {
                    dispatch('showError', "Failed deleting answer type.", {root: true});
                }
            } catch (error) {
                dispatch('showError', "Failed deleting answer type.", {root: true});
            }
        },
    },

    mutations: {
        UPDATE_ALL_ANSWER_TYPES: (state, answerTypeList) => state.answerTypes = answerTypeList
    }
}