import ApiConfig from "@/config/ApiConfig";

const axios = require('axios');

export default {
    state: {
        factoryList: [],
    },

    actions: {
        async fetchAllFactories({commit, dispatch}) {
            const config = {
                method: 'get',
                url: `${ApiConfig.API_BASE_URL}/factory`,
                headers: {}
            };

            try {
                const response = await axios(config);
                commit('UPDATE_ALL_FACTORIES', response.data.data);
            } catch (error) {
                dispatch('showError', " Failed fetching factories.", {root: true});
            }
        },
        async deleteFactory({commit, state, dispatch}, factoryId) {
            const config = {
                method: 'delete',
                url: `${ApiConfig.API_BASE_URL}/factory/${factoryId}`
            };

            try {
                const response = await axios(config);
                if (response.status === 200) {
                    const newFactoryList = state.factoryList.filter(factory => factory._id !== factoryId);
                    dispatch('showInfo', "Factory successfully deleted.", {root: true});
                    commit('UPDATE_ALL_FACTORIES', newFactoryList);
                }
                if (response.status === 404) {
                    dispatch('showError', "Failed deleting factory.", {root: true});
                }
            } catch (error) {
                dispatch('showError', "Failed deleting factory.", {root: true});
            }
        },
    },
    getters: {
        allFactories: (state) => state.factoryList,
    },
    mutations: {
        UPDATE_ALL_FACTORIES: (state, factoryList) => state.factoryList = factoryList,
    }
}