const axios = require('axios');
import router from '../../routes';
import ApiConfig from "@/config/ApiConfig";
//import ValidateEmail from '@/util/FormValidation';

export default {
    namespaced: true,
    state: {
        name: '',
        username: '',
        password: '',
        email: '',
        passwordRepeat: '',
    },
    mutations: {
        NAME: (state, name) => state.name = name,
        EMAIL: (state, email) => state.email = email,
        USERNAME: (state, username) => state.username = username,
        PASSWORD: (state, password) => state.password = password,
        PASSWORD_REPEAT: (state, passwordRepeat) => state.passwordRepeat = passwordRepeat
    },
    actions: {
        async registerAction({dispatch, state}) {
            const data = JSON.stringify(
                {
                    name: state.name,
                    email: state.email,
                    username: state.username,
                    password: state.password,
                }
            );

            const config = {
                method: 'post',
                url: `${ApiConfig.NEW_API_BASE_URL}/security/signup`,
                headers: {
                    'Content-Type': 'application/json'
                },
                data: data
            };
            try {
                const response = await axios(config);

                if (response.data) {
                    await router.push('registration-success');
                } else {
                    dispatch('showError', "Failed registering the user. Please try again.", {root: true});
                }

            } catch (error) {
                if (error.response.status === 500) {
                    dispatch('showError', "Failed registering the user. Please try again.", {root: true});
                }

                dispatch('showError', error.response.data.message, {root: true});
            }
        }
    },
    getters: {}
};
