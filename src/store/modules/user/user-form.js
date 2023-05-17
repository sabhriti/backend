import ApiConfig from "@/config/ApiConfig";
import axios from "axios";
import router from "@/routes";
import FormValidation from "@/util/FormValidation";

export default {
    namespaced: true,
    state: {
        username: '',
        email: '',
        name: '',
        roles: [],
        activationStatus: '',
        id: ''
    },
    actions: {
        async fetchUserById({commit, dispatch}, userId) {
            if (userId) {
                try {
                    const config = {
                        method: 'get',
                        url: `${ApiConfig.NEW_API_BASE_URL}/users/id=${userId}`
                    };
                    const response = await axios(config);
                    if (response.data) {
                        commit('UPDATE_USERNAME', response.data.username);
                        commit('UPDATE_EMAIL', response.data.email);
                        commit('UPDATE_NAME', response.data.name);
                        commit('UPDATE_ROLES', response.data.roles);
                        commit('UPDATE_STATUS', response.data.activationStatus);
                        commit('UPDATE_USER_ID', response.data.id);
                    }
                } catch (error) {
                    dispatch('showError', "Failed fetching the user to edit.", {root: true});
                }
            } else {
                commit('UPDATE_USERNAME', '');
                commit('UPDATE_EMAIL', '');
                commit('UPDATE_NAME', '');
                commit('UPDATE_ROLES', []);
                commit('UPDATE_STATUS', '');
                commit('UPDATE_USER_ID', '');
            }
        },
        async saveUser({state, dispatch}) {
            if (!FormValidation.validateEmail(state.email)) {
                dispatch('showError', "A valid email address is required.", {root: true});
                return false;
            }

            try {
                const dataToStore = {
                    username: state.username,
                    email: state.email,
                    name: state.name,
                    roles: state.roles,
                    status: state.activationStatus
                };

                if (state.id !== '') {
                    dataToStore.id = state.id;
                }

                const config = {
                    method: 'post',
                    url: `${ApiConfig.NEW_API_BASE_URL}/users`,
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    data: dataToStore
                };

                await axios(config);

                await router.push("/users");

                dispatch('showInfo', "New user successfully added", {root: true});
            } catch (error) {
                if (error.response.status === 500) {
                    dispatch('showError', "Failed saving user in database.", {root: true});
                } else {
                    dispatch('showError', error.response.data.message, {root: true});
                }
            }
        },
    },

    mutations: {
        UPDATE_USERNAME: (state, username) => state.username = username,
        UPDATE_EMAIL: (state, email) => state.email = email,
        UPDATE_NAME: (state, name) => state.name = name,
        UPDATE_ROLES: (state, role) => state.roles = role,
        UPDATE_STATUS: (state, activationStatus) => state.activationStatus = activationStatus,
        UPDATE_USER_ID: (state, id) => state.id = id,
    }
}