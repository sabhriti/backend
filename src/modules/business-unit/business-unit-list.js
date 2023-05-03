import ApiConfig from "@/config/ApiConfig";
import axios from "axios";

export default {
    namespaced: true,
    state: {
        businessUnitList: [],
    },

    actions: {
        async fetchAllBusinessUnits({commit, dispatch}) {
            const config = {
                method: 'get',
                url: `${ApiConfig.NEW_API_BASE_URL}/business-units`,
                headers: {}
            };

            try {
                const response = await axios(config);
                console.log(response.data)
                commit('UPDATE_ALL_BUSINESS_UNITS', response.data);
            } catch (error) {
                dispatch('showError', " Failed fetching business units.", {root: true});
            }
        },
        async deleteBusinessUnit({commit, state, dispatch}, unitId) {
            const config = {
                method: 'delete',
                url: `${ApiConfig.NEW_API_BASE_URL}/business-units/${unitId}`
            };

            try {
                const response = await axios(config);
                if (response.status === 200) {
                    const newUnitList = state.unitList.filter(unit => unit._id !== unitId);
                    dispatch('showInfo', "Business unit successfully deleted.", {root: true});
                    commit('UPDATE_ALL_BUSINESS_UNITS', newUnitList);
                }
                if (response.status === 404) {
                    dispatch('showError', "Failed deleting Business unit.", {root: true});
                }
            } catch (error) {
                dispatch('showError', "Failed deleting Business unit.", {root: true});
            }
        },
    },
    getters: {
        allBusinessUnits: (state) => state.businessUnitList,
    },
    mutations: {
        UPDATE_ALL_BUSINESS_UNITS: (state, businessUnitList) => state.businessUnitList = businessUnitList,
    }
}