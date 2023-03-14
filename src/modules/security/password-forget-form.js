import FormValidation from "@/util/FormValidation";
import axios from "axios";
import ApiConfig from "@/config/ApiConfig";

export default {
    namespaced: true,
    state: {
        email: ''
    },

    actions: {
        async requestPasswordResetToken({state, dispatch}) {
            if (!FormValidation.validateEmail(state.email)) {
                dispatch('showError', "Please enter a valid email address.", {root: true});

                return false;
            }

            try {
                const response = await axios({
                    method: 'get',
                    url: `${ApiConfig.NEW_API_BASE_URL}/security/forget-password/email=${state.email}`
                });

                console.log(response);
            } catch (error) {
                console.log(error.response)
                if (404 === error.response.status || 500 === error.response.status) {
                    dispatch('showError', error.response.data.message, {root: true});
                    return false;
                }
                dispatch('showError', "Something went wrong. Please try again.", {root: true});
            }
        }
    },

    getters: {
        email: (state) => state.email
    },
    mutations: {
        UPDATE_EMAIL: (state, email) => state.email = email
    }
}
