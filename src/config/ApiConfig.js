import axios from "axios";

export default {
    // Use this when local
    API_BASE_URL: "http://localhost:4000/api",
    NEW_API_BASE_URL: "http://localhost:9090"
}

// ad authentication headers to each http request.
axios.interceptors.request.use(function (config) {
    const session =   JSON.parse(localStorage.getItem('session'));

    if (session && session.token) {
        config.headers.Authorization = `Bearer ${session.token}`;
    }

    return config;
});
