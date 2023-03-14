import axios from "axios";

import ApiConfig from "@/config/ApiConfig";

export default {
    namespaced: true,
    state: {
        allUsers: [],
        activeToggleRequests: [],
    },

    actions: {
        async fetchAllUsers({commit, dispatch}) {

            try {
                const response = await axios({
                    method: 'get',
                    url: `${ApiConfig.NEW_API_BASE_URL}/users`
                });

                commit('UPDATE_ALL_USERS', response.data);
            } catch (error) {
                dispatch('showError', "Failed loading users from database.", {root: true});
            }
        },

        async deleteUser({commit, dispatch}, userId) {
            const config = {
                method: 'delete',
                url: `${ApiConfig.NEW_API_BASE_URL}/users/id=${userId}`,
                headers: {
                    'Content-Type': 'application/json'
                }
            };

            try {
                await axios(config);
                commit('REMOVE_USER_FROM_THE_LIST_BY_ID', userId);
                dispatch('showInfo', " User successfully deleted.", {root: true});
            } catch (error) {
                dispatch('showError', " Failed deleting the User.", {root: true});
            }
        }
    },

    getters: {
        allUsers: (state) => state.allUsers,
        activeToggleRequests: (state) => state.activeToggleRequests,
    },

    mutations: {
        UPDATE_ALL_USERS: (state, userList) => state.allUsers = userList,
        REMOVE_USER_FROM_THE_LIST_BY_ID: (state, userId) => state.allUsers = state.allUsers.filter(user => userId !== user.id),
    }
}
