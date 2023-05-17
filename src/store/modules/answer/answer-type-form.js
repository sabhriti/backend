import ApiConfig from "@/config/ApiConfig";
import axios from "axios";
import router from "@/routes";

export default {
    state: {
        answerTypeId: null,
        answerType: '',
        answerValue: '',
        answerCategory: '',
        answerValues: [],
    },
    actions: {
        async saveAnswerType({state, dispatch}) {
            try {
                if (state.answerType === ''){
                    dispatch('showError', "Answer type is empty.", {root: true});
                } else if (state.answerValues === []){
                    dispatch('showError', "Answer value is empty.", {root: true});
                } else {
                    dispatch('hideAlert', {root: true});

                    const dataToStore = {
                        _id: state.answerTypeId,
                        answerType: state.answerType,
                        answerCategory: state.answerCategory,
                        answerValues: state.answerValues,
                    };
                    const config = {
                        method: 'post',
                        url: `${ApiConfig.API_BASE_URL}/answer-type/`,
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        data: dataToStore
                    };
                    await axios(config);

                    await router.push("/answer-type/");
                    dispatch('showInfo', "answers type successfully added", {root: true});
                }

            } catch (error) {
                dispatch('showError', "Failed saving answer type in database. Please tra again.", {root: true});
            }
        },

        async fetchAnswerTypeById({commit, dispatch}, answerTypeId) {
            if (answerTypeId) {

                try {
                    const config = {
                        method: 'get',
                        url: `${ApiConfig.API_BASE_URL}/answer-type/${answerTypeId}`,
                        headers: {}
                    };

                    const response = await axios(config);
                    const answerType = response.data.data;

                    if (response.data.data) {
                        commit('UPDATE_ANSWER_TYPE_ID', answerTypeId);
                        commit('UPDATE_ANSWER_TYPE', answerType.answerType);
                        commit('UPDATE_ANSWER_CATEGORY', answerType.answerCategory);
                        commit('UPDATE_ANSWER_VALUES', answerType.answerValues);
                    }
                } catch (error) {
                    dispatch('showError', " Failed fetching the answer type to edit.", {root: true});
                }
            } else {
                commit('UPDATE_ANSWER_TYPE', '');
                commit('UPDATE_ANSWER_VALUES', []);
            }
        }
    },
    mutations: {
        UPDATE_ANSWER_TYPE_ID: (state, id) => state.answerTypeId = id,
        UPDATE_ANSWER_TYPE: (state, answerType) => state.answerType = answerType,
        UPDATE_ANSWER_VALUE: (state, answerValue) => state.answerValue = answerValue,
        UPDATE_ANSWER_CATEGORY: (state, answerCategory) => state.answerCategory = answerCategory,
        UPDATE_ANSWER_VALUES: (state, answerValues) => state.answerValues = answerValues,
        REMOVE_ANSWER_VALUE: (state, answerValue) => state.answerValues = state.answerValues.filter(ans => ans !== answerValue),
        UPDATE_ANSWER_TYPE_VALUES: (state) => {

            if (!state.answerValues.includes(state.answerValue) && '' !== state.answerValue) {
                state.answerValues.push(state.answerValue);
            }

            state.answerValue = '';
        }
    },
    getters: {
        answerType: (state) => state.answerType,
        answerValue: (state) => state.answerValue,
        answerCategory: (state) => state.answerCategory,
        answerValues: (state) => state.answerValues
    }
}