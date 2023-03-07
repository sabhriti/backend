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

                    console.log('response: ', response.data)

                    if (response.data) {
                        commit('UPDATE_USERNAME', response.data.username);
                        commit('UPDATE_EMAIL', response.data.email);
                        commit('UPDATE_NAME', response.data.name);
                        commit('UPDATE_ROLES', response.data.roles.map(role => role.name));
                        commit('UPDATE_STATUS', response.data.activationStatus);
                        commit('UPDATE_USER_ID', response.data.id);
                    }

                    console.log(this.state.userForm)
                } catch (error) {
                    dispatch('showError', " Failed fetching the user to edit.", {root: true});
                }
            } else {
                commit('UPDATE_USERNAME', '');
                commit('UPDATE_EMAIL', '');
                commit('UPDATE_USER_ID', '');
            }
        },
        async saveUser({state, dispatch}) {

            try {
                const response = await axios(
                    {
                        method: 'get',
                        url: `${ApiConfig.NEW_API_BASE_URL}/users/username=${state.username}`
                    }
                );

                if (response.data.id !== state.id && response.data.username === state.username) {
                    dispatch('showError', " The use with same username already exists. Please select another username.", {root: true});
                }

            } catch (error) {
                dispatch('showError', " Failed validating username. Please try again.", {root: true});
            }

            if (!FormValidation.validateEmail(state.email)) {
                dispatch('showError', "A valid email address is required.", {root: true});
                return false;
            }

            try {
                const dataToStore = {
                    username: state.username,
                    email: state.email,
                    name: state.name,
                    roles: state.roles.map(role => {
                        return {
                            name: role
                        };
                    }),
                    status: state.activationStatus,
                    id: state.id
                };

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
                dispatch('showError', "Failed saving user in database.", {root: true});
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