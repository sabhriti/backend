import ApiConfig from "@/config/ApiConfig";
import axios from "axios";
import router from "@/routes";

export default {
    namespaced: true,
    state: {
        languages: [],
        translation: {
            id: null,
            key: 'key',
            isActive: true,
            items: []
        },
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
                commit('UPDATE_TRANSLATIONS_WITH_LANGUAGES', response.data.data);
            } catch (error) {
                dispatch('showError', " Failed fetching languages.", {root: true});
            }
        },
        async fetchTranslationById({commit, dispatch}, translationId) {
            try {
                const config = {
                    method: 'get',
                    url: `${ApiConfig.API_BASE_URL}/translation/${translationId}`,
                    headers: {}
                };
                const response = await axios(config);

                if (response.data.data) {
                    commit('UPDATE_TRANSLATION', response.data.data);
                    dispatch('fetchAllLanguages');
                }
            } catch (error) {
                console.log('error', error)
                dispatch('showError', " Failed fetching the translation to edit.", {root: true});
            }

        },
        async saveTranslation({dispatch, state}) {
            try {
                const config = {
                    method: 'post',
                    url: `${ApiConfig.API_BASE_URL}/translation`,
                    data: state.translation
                };
                await axios(config);
                await router.push("/translation");

                dispatch('showInfo', "Translation successfully updated", {root: true});
            } catch (error) {
                console.log('error', error);
                dispatch('showError', " Failed updating the translation.", {root: true});
            }
        }
    },

    getters: {
        translations: (state) => state.translation,
        languages: (state) => state.languages,
    },
    mutations: {
        UPDATE_TRANSLATION: (state, translation) => {
            state.translation.key = translation.key;
            state.translation.isActive = translation.isActive;
            state.translation.id = translation._id;
            state.translation.items = translation.items;
        },
        UPDATE_TRANSLATION_KEY: (state, key) => state.key = key,
        UPDATE_STATUS: (state, status) => state.translation.isActive = status,
        UPDATE_TRANSLATIONS_WITH_LANGUAGES: (state, languageList) => {
            const storedLanguage = state.translation.items.map(item => item.lang);
            languageList
                .map(language => language.code)
                .forEach(language => {
                    if (!storedLanguage.includes(language)) {
                        state.translation.items.push({lang: language, content: ''});
                    }
                })

            state.languages = languageList
        }
    }
}