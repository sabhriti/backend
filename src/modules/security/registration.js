const axios = require('axios');
import router from '../../routes';
import ApiConfig from "@/config/ApiConfig";
//import ValidateEmail from '@/util/FormValidation';

export default {
    namespaced: true,
    state: {
        username: '',
        password: '',
        email: '',
        passwordRepeat: '',

        usernameClass: 'form-control',
        passwordClass: 'form-control',
        emailClass: 'form-control',
        passwordRepeatClass: 'form-control'
    },
    mutations: {
        EMAIL: (state, email) => state.email = email,

        EMAIL_CLASS: (state) => {

            //if (ValidateEmail.validateEmail(state.email)) {
                state.emailClass = 'form-control is-valid';
            //} else {
            //    state.emailClass = 'form-control is-invalid';
            //}
        },

        USERNAME: (state, username) => state.username = username,
        USERNAME_CLASS: (state) => {
            if ('' !== state.username && state.username.length >= 5) {
                state.usernameClass = 'form-control is-valid';
            } else {
                state.usernameClass = 'form-control is-invalid';
            }
        },

        PASSWORD: (state, password) => state.password = password,
        PASSWORD_CLASS: (state) => {
            if ('' !== state.password && state.password.length >= 5) {
                state.passwordClass = 'form-control is-valid';
            } else {
                state.passwordClass = 'form-control is-invalid';
            }
        },

        PASSWORD_REPEAT: (state, passwordRepeat) => state.passwordRepeat = passwordRepeat,
        PASSWORD_REPEAT_CLASS: (state) => {
            if (state.password === state.passwordRepeat) {
                state.passwordRepeatClass = 'form-control is-valid';
            } else {
                state.passwordRepeatClass = 'form-control is-invalid';
            }
        }
    },
    actions: {
        async registerAction({dispatch, state}) {
            const data = JSON.stringify(
                {
                    email: state.email,
                    username: state.username,
                    password: state.password,
                }
            );

            const config = {
                method: 'post',
                url: `${ApiConfig.NEW_API_BASE_URL}/registration`,
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
        }
    },
    getters: {
        userRegistrationErrorMessage: function (state) {
            return state.userRegistrationErrorMessage;
        },

        usernameClass: (state) => state.usernameClass,
        passwordClass: (state) => state.passwordClass,
        emailClass: (state) => state.emailClass,
        passwordRepeatClass: (state) => state.passwordRepeatClass,
    }
};
