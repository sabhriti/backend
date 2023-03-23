import ApiConfig from "@/config/ApiConfig";
import axios from "axios";
import router from "@/routes";

export default {
    namespaced: true,
    state: {
        tokenInvalid: false,
        token: '',
        oldPassword: '',
        newPassword: '',
        newPasswordRepeated: ''
    },
    getters: {
        tokenInvalid: (state) => state.tokenInvalid
    },
    actions: {
        async updatePassword({state, dispatch}) {
            if (state.newPassword === state.oldPassword) {
                dispatch('showError', "Old password and new password must be different.", {root: true});
                return false;
            }

            if (state.newPassword !== state.newPasswordRepeated) {
                dispatch('showError', "The new passwords do not match.", {root: true});
                return false;
            }

            if (state.newPassword.length < 6) {
                dispatch('showError', "The new passwords must be at-least 6 characters long.", {root: true});
                return false;
            }

            try {
                console.log('insstate', state.token);
                await axios({
                    method: 'post',
                    url: `${ApiConfig.NEW_API_BASE_URL}/security/create-password`,
                    data: {
                        password: state.newPassword,
                        token: state.token
                    }
                });
                await router.push({name: 'passwordResetSuccess'});
            } catch (error) {
                console.log(error);

                if (error.response) {
                    if (error.response.status === 500) {
                        dispatch('showError', "Something went wrong. Please try again.", {root: true});
                    } else {
                        dispatch('showError', error.response.data.message, {root: true});
                    }
                } else {
                    dispatch('showError', "Something went wrong. Please try again.", {root: true});
                }
            }
        },

        async validateToken({dispatch, commit}, token) {
            try {
                const response = await axios({
                    method: 'get',
                    url: `${ApiConfig.NEW_API_BASE_URL}/user-token/validate/token=${token}`
                });

                if (response.data) {
                    commit('UPDATE_TOKEN', token);
                } else {
                    commit('UPDATE_TOKEN_INVALID', true);
                }
            } catch (error) {
                if (error.response.status === 500) {
                    dispatch('showError', "Something went wrong. Please try again.", {root: true});
                } else {
                    dispatch('showError', error.response.data, {root: true});
                }
            }
        }
    },
    mutations: {
        UPDATE_TOKEN_INVALID: (state, value) => state.tokenInvalid = value,
        UPDATE_TOKEN: (state, value) => state.token = value,
        UPDATE_OLD_PASSWORD: (state, oldPassword) => state.oldPassword = oldPassword,
        UPDATE_NEW_PASSWORD: (state, newPassword) => state.newPassword = newPassword,
        UPDATE_NEW_PASSWORD_REPEATED: (state, newPasswordRepeated) => state.newPasswordRepeated = newPasswordRepeated,
    }
}