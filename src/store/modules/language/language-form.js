import ApiConfig from "@/config/ApiConfig";
import axios from "axios";
import router from "@/routes";

export default {
    state: {
        languageCode: null,
        languageName: null,
        languageId: null
    },
    actions: {
        async fetchLanguageById({commit, dispatch}, languageId) {
            if (languageId) {
                try {
                    const config = {
                        method: 'get',
                        url: `${ApiConfig.API_BASE_URL}/language/${languageId}`,
                        headers: {}
                    };
                    const response = await axios(config);

                    if (response.data.data) {
                        commit('UPDATE_LANGUAGE_NAME', response.data.data.name);
                        commit('UPDATE_LANGUAGE_CODE', response.data.data.code);
                        commit('UPDATE_LANGUAGE_ID', response.data.data._id);
                    }
                } catch (error) {
                    console.log('error', error)
                    dispatch('showError', " Failed fetching the business unit to edit.", {root: true});
                }
            } else {
                commit('UPDATE_LANGUAGE_NAME', null);
                commit('UPDATE_LANGUAGE_CODE', null);
                commit('UPDATE_LANGUAGE_ID', null);
            }
        },
        async saveLanguage({state,dispatch}) {
            try {

                const dataToStore = {
                    code: state.languageCode,
                    name: state.languageName,
                    id: state.languageId
                };

                const config = {
                    method: 'post',
                    url: `${ApiConfig.API_BASE_URL}/language/`,
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    data: dataToStore
                };

                await axios(config);

                await router.push("/language");
                dispatch('showInfo', "New language successfully added", {root: true});
            } catch (error) {
                console.log('error', error)
                dispatch('showError', "Failed saving language in database.", {root: true});
            }
        },

    },
    getters: {
        languageName: (state) => state.languageName,
        languageCode: (state) => state.languageCode,
    },
    mutations: {
        UPDATE_LANGUAGE_NAME: (state, languageName) => {
            state.languageName = languageName;
        },
        UPDATE_LANGUAGE_CODE: (state, languageCode) => {
            state.languageCode = languageCode;
        },
        UPDATE_LANGUAGE_ID: (state, languageId) => {
            state.languageId = languageId;
        }
    }
}