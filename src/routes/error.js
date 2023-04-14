import ErrorPage from "@/components/util/ErrorPage.vue";

export default {
    path: "/error",
    name: "ErrorPage",
    meta: {
        requiresAuth: false,
        requiredRoles: []
    },
    component: ErrorPage
};
