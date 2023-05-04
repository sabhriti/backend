import ApiConfig from "@/config/ApiConfig";
import axios from "axios";
import FormValidation from "@/util/FormValidation";
import router from "@/routes";
import LocalStorage from "@/util/local_storage";
export default {
    namespaced: true,
    state: {
        id: '',
        username: '',
        name: '',
        email: '',
        phone: '',
        roles: [],
        status: ''
    },

    actions: {
        async fetchProfileDetails({commit, dispatch}) {
            const username = LocalStorage.get("session").username;

            const config = {
                method: 'get',
                url: `${ApiConfig.NEW_API_BASE_URL}/users/username=${username}`,
                headers: {}
            };

            try {
                const response = await axios(config);

                const profileData = response.data;

                if (!profileData.roles) {
                    profileData.roles = [];
                }

                commit('UPDATE_PROFILE', profileData);
            } catch (error) {
                dispatch('showError', " Failed fetching profile details.", {root: true});
            }
        },

        async updateProfile({ state, dispatch}) {
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
                    id: state.id,
                    phone: state.phone,
                    roles: state.roles,
                    activationStatus: state.status
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

                await router.push("/setting/profile");

                dispatch('showInfo', "Profile successfully updated", {root: true});
            } catch (error) {
                dispatch('showError', "Failed updating profile. Please try again.", {root: true});
            }
        }
    },

    mutations: {
        UPDATE_PROFILE: (state, user) => {
            state.id = user.id;
            state.username = user.username;
            state.name = user.name;
            state.email = user.email;
            state.phone = user.phone;
            state.roles = user.roles;
            state.status = user.activationStatus;
        },
        UPDATE_NAME: (state, value) => state.name = value,
        UPDATE_USERNAME: (state, value) => state.username = value,
        UPDATE_EMAIL: (state, value) => state.email = value,
        UPDATE_PHONE: (state, value) => state.phone = value
    },

    getters: {
        profileDetails: (state) => {
            return state
        }
    }
};
