import ApiConfig from "@/config/ApiConfig";
import axios from "axios";
import router from "@/routes";

export default {
    namespaced: true,
    state: {
        keyName: '',
        defaultText: '',
        isActive: true
    },
    actions: {
        saveKey: async ({state, dispatch}) => {
            try {
                const dataToStore = {
                    keyName: state.keyName,
                    defaultText: state.defaultText,
                    isActive: state.isActive
                };

                const config = {
                    method: 'post',
                    url: `${ApiConfig.API_BASE_URL}/translation-key/`,
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    data: dataToStore
                };

                await axios(config);

                await router.push("/translation");

                dispatch('showInfo', "New translation key successfully added", {root: true});
            } catch (error) {
                const errorMessage = error.response.data.message;
                if (errorMessage) {
                    dispatch('showError', `Failed saving translation key. ${errorMessage}`, {root: true});
                } else {
                    dispatch('showError', "Failed saving translation key in database.", {root: true});
                }

                state.keyName = '';
                state.defaultText = '';
            }
        }
    },
    getters: {
        keyName: (state) => state.keyName,
    },
    mutations: {
        UPDATE_KEY_NAME: (state, keyName) => state.keyName = keyName,
        UPDATE_DEFAULT_TEXT: (state, defaultText) => state.defaultText = defaultText,
        UPDATE_IS_ACTIVE: (state, isActive) => state.isActive = isActive
    }
}