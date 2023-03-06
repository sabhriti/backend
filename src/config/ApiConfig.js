import axios from "axios";

export default {
    // Use this when local
    API_BASE_URL: "http://localhost:4000/api",
    NEW_API_BASE_URL: "http://localhost:9090"
}

// ad authentication headers to each http request.
axios.interceptors.request.use(function (config) {
    config.headers.Authorization = 'Bearer ' + JSON.parse(localStorage.getItem('session')).token;
    return config;
});
