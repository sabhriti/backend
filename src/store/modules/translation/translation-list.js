import ApiConfig from "@/config/ApiConfig";

const axios = require('axios');

export default {
    namespaced: true,
    state: {
        translations: [],
        activeToggleRequests: [],
    },
    actions: {
        async fetchAllTranslations({commit, dispatch}) {
            const config = {
                method: 'get',
                url: `${ApiConfig.API_BASE_URL}/translation`,
                headers: {}
            };

            try {
                const response = await axios(config);
                commit('UPDATE_ALL_TRANSLATIONS', response.data.data);
            } catch (error) {
                dispatch('showError', " Failed fetching translations.", {root: true});
            }
        },
        async deleteTranslation({commit, state, dispatch}, translationId) {
            const config = {
                method: 'delete',
                url: `${ApiConfig.API_BASE_URL}/translation/${translationId}`
            };

            try {
                const response = await axios(config);
                if (response.status === 200) {
                    const newTranslationList = state.translations.filter(translation => translation._id !== translationId);
                    dispatch('showInfo', "Translation successfully deleted.", {root: true});
                    commit('UPDATE_ALL_TRANSLATIONS', newTranslationList);
                }
                if (response.status === 404) {
                    dispatch('showError', "Failed deleting translation.", {root: true});
                }
            } catch (error) {
                console.log(error);
                dispatch('showError', "Failed deleting translation.", {root: true});
            }
        },

        async toggleTranslationStatus({commit, dispatch}, translation) {
            commit('ADD_TRANSLATION_ID_TO_ACTIVE_TOGGLE_REQUEST', translation._id);

            const config = {
                method: 'post',
                url: `${ApiConfig.API_BASE_URL}/translation-status/${translation._id}`,
                headers: {
                    'Content-Type': 'application/json'
                },
                data: {
                    "status": translation.isActive ? "inactive" : "active"
                }
            };

            try {
                await axios(config);
                translation.isActive = !translation.isActive;
                commit('UPDATE_SINGLE_TRANSLATION', translation);
                commit('REMOVE_USER_ID_FROM_ACTIVE_TOGGLE_REQUEST', translation._id);
            } catch (error) {
                dispatch('showError', " Failed activating translation. Please try again.", {root: true});
            }
        }
    },
    getters: {
        translations: (state) => state.translations,
        activeToggleRequests: (state) => state.activeToggleRequests,
    },
    mutations: {
        UPDATE_ALL_TRANSLATIONS: (state, translations) => state.translations = translations,
        UPDATE_SINGLE_TRANSLATION: (state, translationToUpdate) => {
            const index = state.translations.findIndex((user => user._id === translationToUpdate._id));
            state.translations[index] = translationToUpdate;
        },
        ADD_TRANSLATION_ID_TO_ACTIVE_TOGGLE_REQUEST: (state, translationId) => state.activeToggleRequests.push(translationId),
        REMOVE_USER_ID_FROM_ACTIVE_TOGGLE_REQUEST: (state, translationId) => state.activeToggleRequests = state.activeToggleRequests.filter(id => translationId !== id),
    }
}
