import axios from "axios";
import router from '../../routes';
import ApiConfig from "@/config/ApiConfig";
import ValidateEmail from '@/util/FormValidation';

export default {
    namespaced: true,
    state: {
        name: '',
        email: '',
        username: '',
        isFormValid: false
    },
    mutations: {
        NAME: (state, name) => state.name = name,
        EMAIL: (state, email) => state.email = email,
        USERNAME: (state, username) => state.username = username,
        IS_FORM_VALID: (state, value) => state.isFormValid = value
    },
    actions: {
        async registerAction({dispatch, commit, state}) {

            if ('' === state.name) {
                dispatch('showError', "Name of the user cannot be empty.", {root: true});
                commit("IS_FORM_VALID", false);
            } else if (!ValidateEmail.validateEmail(state.email)) {
                dispatch('showError', "Please enter a valid email address. e.g. email@example.com", {root: true});
                commit("IS_FORM_VALID", false);
            } else if ('' === state.username) {
                dispatch(
                    'showError',
                    "Please enter a valid username. You will be using this to login to system.",
                    {root: true}
                );
                commit("IS_FORM_VALID", false);
            } else {
                commit("IS_FORM_VALID", true);
            }

            if (state.isFormValid) {
                try {
                    await axios({
                        method: 'post',
                        url: `${ApiConfig.NEW_API_BASE_URL}/security/signup`,
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        data: {
                            name: state.name,
                            email: state.email,
                            username: state.username
                        }
                    });
                    await router.push('registration-success');

                } catch (error) {
                    console.log(error)
                }
            }
        }
    },
    getters: {}
};
