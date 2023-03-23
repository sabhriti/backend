import axios from "axios";
import LocalStorage from "@/util/local_storage";
import store from '../store'

export default {
    // Use this when local
    API_BASE_URL: "http://localhost:4000/api",
    NEW_API_BASE_URL: "http://localhost:9090"
}

// add authentication headers to each http request.
axios.interceptors.request.use(function (config) {
    store.dispatch('fullPageSpinner/showSpinner');

    const session = LocalStorage.get('session');


    if (session && session.token) {
        config.headers.Authorization = `Bearer ${session.token}`;
    }

    return config;
});


// Hides the spinner once the response is received.
axios.interceptors.response.use(function (response) {
    store.dispatch('fullPageSpinner/hideSpinner');

    return response;
}, function (error) {
    return Promise.reject(error);
});