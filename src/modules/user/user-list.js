import axios from "axios";

import ApiConfig from "@/config/ApiConfig";

export default {
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

                console.log( response.data)
                commit('UPDATE_ALL_USERS', response.data);
            } catch (error) {
                dispatch('showError', "Failed loading users from database.", {root: true});
            }
        },

        async deleteUser({commit, dispatch}, userId) {
            const config = {
                method: 'delete',
                url: `${ApiConfig.NEW_API_BASE_URL}/users/${userId}`,
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
        },

        async toggleUserStatus({commit, dispatch}, user) {
            commit('ADD_USER_ID_TO_ACTIVE_TOGGLE_REQUEST', user._id);

            const config = {
                method: 'post',
                url: `${ApiConfig.NEW_API_BASE_URL}/users/status/${user._id}`,
                headers: {
                    'Content-Type': 'application/json'
                },
                data: {
                    "status": user.isActive ? "inactive" : "active"
                }
            };

            try {
                await axios(config);
                user.isActive = !user.isActive;
                commit('UPDATE_SINGLE_USER', user);
                commit('REMOVE_USER_ID_FROM_ACTIVE_TOGGLE_REQUEST', user._id);
            } catch (error) {
                dispatch('showError', " Failed activating user. Please try again.", {root: true});
            }
        }
    },

    getters: {
        allUsers: (state) => state.allUsers,
        activeToggleRequests: (state) => state.activeToggleRequests,
    },

    mutations: {
        UPDATE_ALL_USERS: (state, userList) => state.allUsers = userList,
        UPDATE_SINGLE_USER: (state, userToUpdate) => {
            const index = state.allUsers.findIndex((user => user._id === userToUpdate._id));
            state.allUsers[index] = userToUpdate;
        },
        ADD_USER_ID_TO_ACTIVE_TOGGLE_REQUEST: (state, userId) => state.activeToggleRequests.push(userId),
        REMOVE_USER_ID_FROM_ACTIVE_TOGGLE_REQUEST: (state, userId) => state.activeToggleRequests = state.activeToggleRequests.filter(id => userId !== id),
        REMOVE_USER_FROM_THE_LIST_BY_ID: (state, userId) => state.allUsers = state.allUsers.filter(user => userId !== user._id),
    }
}
