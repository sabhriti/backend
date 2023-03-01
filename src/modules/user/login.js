import ApiConfig from "@/config/ApiConfig";

const axios = require('axios');
import router from '../../routes';
import FormValidation from "@/util/FormValidation";

export default {
    state: {
        email: '',
        password: '',
        rememberMe: false,

        validEmail: false,
        validPassword: false
    },
    actions: {

        handleEmailChange: ({commit, state}, newEmail) => {
            commit('VALID_EMAIL', FormValidation.validateEmail(state.email));
            if (newEmail) {
                commit('EMAIL', newEmail.currentTarget.value);
            }
        },

        handlePasswordChange: ({state, commit}, newPassword) => {
            if (newPassword) {
                commit('PASSWORD', newPassword.currentTarget.value);
            }
            commit('VALID_PASSWORD', state.password !== '');
        },

        async loginAction({dispatch}, payload) {

            const data = JSON.stringify(payload);

            const config = {
                method: 'post',
                url: `${ApiConfig.API_BASE_URL}/security/login`,
                headers: {
                    'Content-Type': 'application/json'
                },
                data: data
            };
            try {
                const response = await axios(config);
                const sessionData = {
                    token: response.data.token,
                    email: payload.email
                };

                localStorage.setItem("session", JSON.stringify(sessionData));

                await router.push({name: 'home'});
            } catch (error) {
                dispatch('showError', error.response.data.message, {root: true});
            }
        }
    },
    getters: {
        email: (state) => state.email,
        password: (state) => state.email,
        rememberMe: (state) => state.rememberMe,
        validEmail: (state) => state.validEmail,
        validPassword: (state) => state.validPassword,
    },

    mutations: {
        EMAIL: (state, email) => state.email = email,
        PASSWORD: (state, password) => state.password = password,
        VALID_EMAIL: (state, validEmail) => state.validEmail = validEmail,
        VALID_PASSWORD: (state, validPassword) => state.validPassword = validPassword,
        REMEMBER_ME: (state, rememberMe) => state.rememberMe = rememberMe
    }
};
