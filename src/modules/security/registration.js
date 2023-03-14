const axios = require('axios');
import router from '../../routes';
import ApiConfig from "@/config/ApiConfig";
import ValidateEmail from '@/util/FormValidation';

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

            if ('' === state.name) {
                dispatch('showError', "Name of the user cannot be empty.", {root: true});
                return false;
            } else if (!ValidateEmail.validateEmail(state.email)) {
                dispatch('showError', "Please enter a valid email address. e.g. email@example.com", {root: true});
                return false;
            } else if ('' === state.username) {
                dispatch(
                    'showError',
                    "Please enter a valid username. You will be using this to login to system.",
                    {root: true}
                );
                return false;
            }
            if (state.password.length < 6) {
                dispatch('showError', "Please enter a valid password. The password must be at-least 6 characters long.", {root: true});
                return false;
            } else if (state.password !== state.passwordRepeat) {
                dispatch(
                    'showError',
                    "The passwords do not match. Please make sure you have password in both fields correct.",
                    {root: true}
                );
                return false;
            }


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

                console.log(response)

                if (200 === response.status) {
                    await router.push('registration-success');
                } else {
                    dispatch('showWarning', "Looks like not everything went well. You might have to try again in case everything isn't in order.", {root: true});
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
