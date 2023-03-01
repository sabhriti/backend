const axios = require('axios');
import router from '../../routes';
import ApiConfig from "@/config/ApiConfig";

export default {
    state: {
        userRegistrationErrorMessage: ''
    },
    mutations: {
        UPDATE_ERROR_MESSAGE: function (state, message) {
            state.userRegistrationErrorMessage = message;
        }
    },
    actions: {
        async registerAction({dispatch}, payload) {

            const data = JSON.stringify(payload);

            const config = {
                method: 'post',
                url: `${ApiConfig.API_BASE_URL}/registration`,
                headers: {
                    'Content-Type': 'application/json'
                },
                data: data
            };
            try {
                const response = await axios(config);

                if (response.data.data) {
                    await router.push('registration-success');
                } else {
                    dispatch('showError', "Failed registering the user. Please try again.", {root: true});
                }

            } catch (error) {
                console.log(error.response);
                dispatch('showError', "Failed registering the user. Please try again.", {root: true});
            }
        },
        clearErrorMessage({commit}) {
            commit('UPDATE_ERROR_MESSAGE', "");

        },
    },
    getters: {
        userRegistrationErrorMessage: function (state) {
            return state.userRegistrationErrorMessage;
        }
    }
};
