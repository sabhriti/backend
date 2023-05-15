import axios from "axios";
import ApiConfig from "@/config/ApiConfig";

export default {
    namespaced: true,
    state: {
        name: "",
        description: "",
        remarks: "",
        categories: []
    },

    actions: {
        async saveFramework({state}) {
            try {
                const payload = {
                    name: state.name,
                    description: state.description,
                    remarks: state.remarks
                } ;

                const config = {
                    method: 'post',
                    url: `${ApiConfig.NEW_API_BASE_URL}/questions/framework`,
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    data: JSON.stringify(payload)
                };

                await axios(config);
            } catch (error) {
                console.log(error);
            }
        }
    },

    mutations: {
        UPDATE_FRAMEWORK_NAME: (state, value) => state.name = value,
        UPDATE_FRAMEWORK_DESCRIPTION: (state, value) => state.description = value,
        UPDATE_FRAMEWORK_REMARKS: (state, value) => state.remarks = value
    }
}
