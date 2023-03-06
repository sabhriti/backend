import ApiConfig from "@/config/ApiConfig";

const axios = require('axios');
import router from '../../routes';

export default {
    namespaced: true,
    state: {
        username: '',
        password: '',
        rememberMe: false
    },
    actions: {

        handleUsernameChange: ({commit}, newUsername) => {
            if (newUsername) {
                commit('USERNAME', newUsername.currentTarget.value);
            }
        },

        handlePasswordChange: ({commit}, newPassword) => {
            if (newPassword) {
                commit('PASSWORD', newPassword.currentTarget.value);
            }
        },

        async loginAction({dispatch}, payload) {
            const config = {
                method: 'post',
                url: `${ApiConfig.NEW_API_BASE_URL}/security/login`,
                headers: {
                    'Content-Type': 'application/json'
                },
                data: JSON.stringify(payload)
            };
            try {
                const response = await axios(config);

                const sessionData = {
                    token: response.data,
                    username: payload.username
                };

                localStorage.setItem("session", JSON.stringify(sessionData));

                await router.push({name: 'home'});
            } catch (error) {
                console.log("errors")
                dispatch('showError', error.response.data, {root: true});
            }
        }
    },
    getters: {
        username: (state) => state.username,
        password: (state) => state.password,
        rememberMe: (state) => state.rememberMe,
    },

    mutations: {
        USERNAME: (state, username) => state.username = username,
        PASSWORD: (state, password) => state.password = password,
        REMEMBER_ME: (state, rememberMe) => state.rememberMe = rememberMe
    }
};
