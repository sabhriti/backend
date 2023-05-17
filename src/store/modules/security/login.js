import ApiConfig from "@/config/ApiConfig";

import axios from "axios";
import router from '@/routes';
import LocalStorage from "@/util/local_storage";
import CryptoJS from "crypto-js";
import SecurityConfig from "@/config/SecurityConfig";

export default {
    namespaced: true,
    state: {
        username: '',
        password: '',
        rememberMe: false,
        redirectedFrom: ''
    },
    actions: {
        async loginAction({dispatch, state}) {

            if ('' === state.username) {
                dispatch('showError', "Please enter username.", {root: true});
                return false;
            }
            if ('' === state.password) {
                dispatch('showError', "Please enter password.", {root: true});
                return false;
            }

            const encryptedPassword = CryptoJS.AES.encrypt(
                state.password,
                SecurityConfig.PASSWORD_ENCRYPTION_SECRET
            ).toString();

            if (state.rememberMe === true) {
                const rememberMe = {
                    username: state.username,
                    password: encryptedPassword
                };

                LocalStorage.remove("remember_me");
                LocalStorage.setWithoutTtl("remember_me", rememberMe);
            } else {
                LocalStorage.remove("remember_me");
            }
            const payload = {
                username: state.username,
                password: state.password
            } ;


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
                    token: response.data.token,
                    username: payload.username
                };

                LocalStorage.set("session", sessionData, 900);

                await router.push({path: state.redirectedFrom.fullPath});
            } catch (error) {
                console.log(error);
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
        REMEMBER_ME: (state, rememberMe) => state.rememberMe = rememberMe,
        REDIRECTED_FROM: (state, url) => state.redirectedFrom = url
    }
};
