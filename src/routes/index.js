import {createRouter, createWebHashHistory} from 'vue-router';
import LocalStorage from "@/util/local_storage";

import DashboardHome from "@/components/home/DashboardHome";
import AdminIndex from "@/components/admin/AdminIndex";
import PageNotFound from "@/components/util/PageNotFound.vue";
import ErrorPage from "@/components/util/ErrorPage.vue";
import survey from "@/routes/survey";
import question from "@/routes/question";
import answerType from "@/routes/answerType";
import setting from "@/routes/setting";
import translation from "@/routes/translation";
import language from "@/routes/language";
import security from "@/routes/security";
import factory from "@/routes/factory";
import user from "@/routes/user";
import feedback from "@/routes/feedback";

const routes = [
    {
        path: '/',
        name: 'home',
        component: DashboardHome,
        meta: {
            requiresAuth: true,
            requiredRoles: ['ADMIN', 'USER']
        },

    },
    security,
    {
        path: '/admin',
        component: AdminIndex,
        name: 'adminHome',
        meta: {
            requiresAuth: true,
            requiredRoles: ['ADMIN', 'USER']
        },
        children: [
            survey,
            question,
            answerType,
            feedback,
            user,
            factory,

            language,
            translation,
            setting,
            {
                path: "/:pathMatch(.*)*",
                name: "pageNotFound",
                component: PageNotFound
            }
        ]
    },
    {
        path: "/error",
        name: "ErrorPage",
        meta: {
            requiresAuth: false,
            requiredRoles: []
        },
        component: ErrorPage
    }
];

// http://localhost:8080/?#/security/create-password/token=xx
// http://127.0.1.1:9090/security/create-password/token=$2a$10$DtMvcUCYU0aV7kUk3pUCHegyXe1wvGM/Rwd1NbeLr.7FZLiwgs8FS
const router = createRouter({
    history: createWebHashHistory(),
    routes
});

router.beforeEach((to, from, next) => {
    const sessionData = LocalStorage.get('session');

    if (to.meta.requiresAuth && !sessionData) {
        return next({name: 'userLoginPage'});
    }

    if (sessionData) {
        if (sessionData.token) {
            const sessionParsed = JSON.parse(atob(sessionData.token.split('.')[1]));
            if (to.meta.requiredRoles.length <= 0) {
                return next();
            } else {
                let canSee = false;

                sessionParsed.ROLES.forEach(role => {
                    if (to.meta.requiredRoles.includes(role)) {
                        canSee = true
                    }
                });

                if (canSee) {
                    return next();
                } else {
                    LocalStorage.remove('session');
                    return next({name: 'home'});
                }
            }
        } else {
            LocalStorage.remove('session');
            return next({name: 'home'});
        }
    }

    return next();
});


export default router;
