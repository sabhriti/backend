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
                await axios({
                    method: 'post',
                    url: `${ApiConfig.NEW_API_BASE_URL}/security/create-password`,
                    data: {
                        oldPassword: state.oldPassword,
                        password: state.newPassword,
                        token: state.token
                    }
                });
                await router.push({name: 'passwordResetSuccess'});
            } catch (error) {
                console.log(error);
            }
        },

        async validateToken({commit}, token) {
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
                console.log(error);
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