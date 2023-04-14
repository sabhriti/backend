import DashboardHome from "@/components/home/DashboardHome.vue";

export default  {
    path: '/',
    name: 'home',
    component: DashboardHome,
    meta: {
        requiresAuth: true,
        requiredRoles: ['ADMIN', 'USER']
    },

};
