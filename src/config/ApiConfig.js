import axios from "axios";
import LocalStorage from "@/util/local_storage";
import store from '../store'
import router from "@/routes";

export default {
    // Use this when local
    API_BASE_URL: "http://localhost:4000/api",
    NEW_API_BASE_URL: "http://localhost:9090s"
}

// add authentication headers to each http request.
axios.interceptors.request.use((config) => {
    store.dispatch('fullPageSpinner/showSpinner');

    const session = LocalStorage.get('session');
    if (session && session.token) {
        config.headers.Authorization = `Bearer ${session.token}`;
    }

    return config;
});

/**
 * Hides the spinner once the response is received.
 * Shows the error alert in case of error.
 */
axios.interceptors.response.use(
    (response) => {
        store.dispatch('fullPageSpinner/hideSpinner');

        return response;
    },
    async (error) => {

        if (12 === error.code) {
            await router.push({path: '/error'});
        }

        console.log('error', error.code);


        await store.dispatch('displayHttpResponseErrorMessage', error);
        await store.dispatch('fullPageSpinner/hideSpinner');
        return Promise.reject(error);
    }
);
