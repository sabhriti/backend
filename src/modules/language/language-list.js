import ApiConfig from "@/config/ApiConfig";
const axios = require('axios');

export default {
    state: {
        languageList:[],
    },

    actions: {
        async fetchAllLanguages({commit, dispatch}) {
            const config = {
                method: 'get',
                url: `${ApiConfig.API_BASE_URL}/language`,
                headers: {}
            };

            try {
                const response = await axios(config);
                commit('UPDATE_ALL_LANGUAGES', response.data.data);
            } catch (error) {
                dispatch('showError', " Failed fetching languages.", {root: true});
            }
        },
        async deleteLanguage({commit, state, dispatch}, languageId) {
            const config = {
                method: 'delete',
                url: `${ApiConfig.API_BASE_URL}/language/${languageId}`
            };

            try {
                const response = await axios(config);
                if (response.status === 200) {
                    const newLanguageList = state.languageList.filter(language => language._id !== languageId);
                    dispatch('showInfo', "language successfully deleted.", {root: true});
                    commit('UPDATE_ALL_LANGUAGES', newLanguageList);
                }
                if (response.status === 404) {
                    dispatch('showError', "Failed deleting language.", {root: true});
                }
            } catch (error) {
                dispatch('showError', "Failed deleting language.", {root: true});
            }
        },
    },
    getters: {
        allLanguages: (state) => state.languageList,
    },
    mutations: {
        UPDATE_ALL_LANGUAGES: (state, languageList) => state.languageList = languageList,
    }
}