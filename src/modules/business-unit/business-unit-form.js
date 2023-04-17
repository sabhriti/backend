import ApiConfig from "@/config/ApiConfig";
import axios from "axios";
import router from "@/routes";

export default {
    namespaced: true,
    state: {
        id: null,
        name: null,
        location: {
            street: null,
            houseNumber: null,
            zipCode: null,
            city: null,
            country: null
        }
    },
    actions: {
        async fetchBusinessUnitById({commit, dispatch}, unitId) {
            if (unitId) {
                try {
                    const config = {
                        method: 'get',
                        url: `${ApiConfig.NEW_API_BASE_URL}/business-units/${unitId}`,
                        headers: {}
                    };

                    const response = await axios(config);

                    if (response.data.data) {
                        commit('UPDATE_BUSINESS_UNIT_NAME', response.data.data.name);
                        commit('UPDATE_BUSINESS_UNIT_CODE', response.data.data.code);
                        commit('UPDATE_BUSINESS_UNIT_CITY', response.data.data.city);
                        commit('UPDATE_BUSINESS_UNIT_COUNTRY', response.data.data.country);
                        commit('UPDATE_BUSINESS_UNIT_ID', response.data.data._id);
                    }
                } catch (error) {
                    dispatch('showError', " Failed fetching the business unit to edit.", {root: true});
                }
            } else {
                commit('UPDATE_BUSINESS_UNIT_NAME', null);
                commit('UPDATE_BUSINESS_UNIT_CODE', null);
                commit('UPDATE_BUSINESS_UNIT_ID', null);
            }
        },
        async saveBusinessUnit({ state, dispatch}) {
            try {
                const dataToStore =  {
                    name: state.name,
                    city: state.location.city,
                    country: state.location.country,
                    id: state.id
                };

                const config = {
                    method: 'post',
                    url: `${ApiConfig.NEW_API_BASE_URL}/factories/`,
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    data: dataToStore
                };

                await axios(config);

                await router.push("/business-unit");

                dispatch('showInfo', "New business unit successfully added", {root: true});
            } catch (error) {
                dispatch('showError', "Failed saving business unit in database.", {root: true});
            }
        },
    },
    getters: {
        businessUnitName: (state) => state.businessUnitName,
    },
    mutations: {
        UPDATE_BUSINESS_UNIT_NAME: (state, value) => state.businessUnitName = value,
        UPDATE_BUSINESS_UNIT_ID: (state, value) => state.id = value,
        UPDATE_BUSINESS_UNIT_STREET: (state, value) => state.location.street = value,
        UPDATE_BUSINESS_UNIT_HOUSE_NUMBER: (state, value) => state.location.houseNumber = value,
        UPDATE_BUSINESS_UNIT_ZIP_CODE: (state, value) => state.location.zipCode = value,
        UPDATE_BUSINESS_UNIT_CITY: (state, value) => state.location.city = value,
        UPDATE_BUSINESS_UNIT_COUNTRY: (state, value) => state.city.country = value,
    }
}