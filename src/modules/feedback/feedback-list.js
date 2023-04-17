const axios = require('axios');
import ApiConfig from "@/config/ApiConfig";

export default {
    actions: {
        async fetchFeedback({commit, dispatch}) {
            const config = {
                method: 'get',
                url: `${ApiConfig.API_BASE_URL}/feedback`,
                headers: {}
            };

            try {
                const response = await axios(config);

                const feedbackList = response.data.data;

                feedbackList.map(feedback => {
                    commit('ADD_FACTORY_TO_LIST', feedback.businessUnit)
                });

                commit('UPDATE_ALL_FEEDBACKS', feedbackList);
            } catch (error) {
                dispatch('showError', "Failed fetching feedback.", {root: true});
            }
        },

        async deleteFeedback({commit, state, dispatch}, feedbackId) {
            const config = {
                method: 'delete',
                url: `${ApiConfig.API_BASE_URL}/feedback/${feedbackId}`
            };

            try {
                const response = await axios(config);
                if (response.status === 200) {
                    const newFeedbackList = state.feedbackList.filter(feedback => feedback._id !== feedbackId);
                    commit('UPDATE_ALL_FEEDBACKS', newFeedbackList);
                }
                if (response.status === 404) {
                    dispatch('showError', "Failed deleting feedback.", {root: true});
                }
            } catch (error) {
                dispatch('showError', "Failed deleting feedback.", {root: true});
            }
        },
        downloadFeedbacks({state}) {
            if (state.selectedFactory) {
                window.location.href = `${ApiConfig.API_BASE_URL}//feedback/download/${state.selectedFactory}`;
            } else {
                window.location.href = `${ApiConfig.API_BASE_URL}/feedback/download-all`;
            }
        },

        async filterFeedback({state, commit, dispatch}) {
            const config = {
                method: 'post',
                url: `${ApiConfig.API_BASE_URL}/feedback/filtered`,
                headers: {},
                data: {
                    businessUnitId: state.selectedBusinessUnit
                }
            };

            try {
                const response = await axios(config);
                commit('UPDATE_ALL_FEEDBACKS', response.data.data);
            } catch (error) {
                dispatch('showError', " Failed fetching surveys Please try again.", {root: true});
            }
        },

        resetFilters({dispatch, commit}) {
            dispatch('fetchFeedback');
            commit('UPDATE_SELECTED_FACTORY', '');
        },

    },
    state: {
        feedbackList: [],
        businessUnitList: [],
        selectedBusinessUnit: ''
    },

    getters: {
        allFeedbacks: (state) => state.feedbackList,
        businessUnitList: (state) => {
            console.log(state);
            return state.businessUnitList
        }
    },

    mutations: {
        UPDATE_ALL_FEEDBACKS: (state, feedbackList) => state.feedbackList = feedbackList,
        ADD_FACTORY_TO_LIST: (state, businessUnit) => {
            const existingBusinessUnit = state.businessUnitList.find(storedFactory => storedFactory._id === businessUnit._id);
            if (!existingBusinessUnit) {
                state.businessUnitList.push(businessUnit)
            }
        },
        UPDATE_SELECTED_BUSINESS_UNIT: (state, value) => state.selectedBusinessUnit = value
    }
}
