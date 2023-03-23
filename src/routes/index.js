import {createRouter, createWebHashHistory} from 'vue-router';
import LocalStorage from "@/util/local_storage";

import UserLoginPage from "@/components/security/LoginPage";
import UserForgetPassword from "@/components/security/ForgetPassword";
import RegistrationForm from "@/components/security/RegistrationForm";
import DashboardHome from "@/components/home/DashboardHome";
import UserComponent from "@/components/user/UserComponent";
import SurveysComponent from "@/components/survey/SurveysComponent";
import QuestionComponent from "@/components/question/QuestionComponent";
import QuestionForm from "@/components/question/QuestionForm";
import FeedbacksComponent from "@/components/feedback/FeedbacksComponent";
import AdminIndex from "@/components/admin/AdminIndex";
import QuestionList from "@/components/question/QuestionList";
import SurveyList from "@/components/survey/SurveyList";
import SurveyAnswerList from "@/components/survey/SurveyAnswerList";
import FactoryComponent from "@/components/factory/FactoryComponent";
import FactoryList from "@/components/factory/FactoryList";
import FactoryForm from "@/components/factory/FactoryForm";
import SurveyForm from "@/components/survey/SurveyForm";
import AnswerTypeComponent from "@/components/answer/type/AnswerTypeComponent";
import AnswerTypeList from "@/components/answer/type/AnswerTypeList";
import AnswerTypeForm from "@/components/answer/type/AnswerTypeForm";
import LanguageComponent from "@/components/language/LanguageComponent";
import LanguageForm from "@/components/language/LanguageForm";
import LanguageList from "@/components/language/LanguageList";
import TranslationList from "@/components/translation/TranslationList";
import TranslationForm from "@/components/translation/TranslationForm";
import TranslationComponent from "@/components/translation/TranslationComponent";
import TranslationKeyForm from "@/components/translation/TranslationKeyForm";
import SecurityIndex from "@/components/security/SecurityIndex.vue";
import UserList from "@/components/user/UserList.vue";
import PageNotFound from "@/components/util/PageNotFound.vue";
import UserProfile from "@/components/setting/UserProfile.vue";
import UserPreferences from "@/components/setting/UserPreferences.vue";
import SettingComponent from "@/components/setting/SettingComponent.vue";
import UserForm from "@/components/user/UserForm.vue";
import UserProfileForm from "@/components/setting/UserProfileForm.vue";
import NewPasswordForm from "@/components/security/NewPasswordForm.vue";
import RegistrationSuccess from "@/components/security/RegistrationSuccess.vue";
import PasswordResetMessage from "@/components/security/PasswordResetMessage.vue";

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
    {
        path: '/admin',
        component: AdminIndex,
        name: 'adminHome',
        meta: {
            requiresAuth: true,
            requiredRoles: ['ADMIN', 'USER']
        },
        children: [
            {
                path: '/surveys/',
                name: 'SurveysComponent',
                component: SurveysComponent,
                children: [
                    {
                        path: '',
                        name: 'SurveyList',
                        component: SurveyList
                    },
                    {
                        path: 'answers/surveyId=:surveyId',
                        name: 'SurveyAnswerList',
                        component: SurveyAnswerList
                    },
                    {
                        path: 'form/id=:id?',
                        name: 'SurveyForm',
                        component: SurveyForm
                    },
                ]
            },
            {
                path: '/question/',
                name: 'QuestionComponent',
                component: QuestionComponent,
                children: [
                    {
                        path: '',
                        name: 'QuestionList',
                        component: QuestionList
                    },
                    {
                        path: 'form/id=:id?',
                        name: 'QuestionForm',
                        component: QuestionForm
                    }
                ]
            },
            {
                path: '/answer-type/',
                name: 'AnswerTypeComponent',
                component: AnswerTypeComponent,
                children: [
                    {
                        path: '',
                        name: 'AnswerTypeList',
                        component: AnswerTypeList
                    },
                    {
                        path: 'form/id=:id?',
                        name: 'AnswerTypeForm',
                        component: AnswerTypeForm
                    }
                ]
            },
            {
                path: '/feedbacks',
                name: 'FeedbacksComponent',
                component: FeedbacksComponent,
            },
            {
                path: '/users',
                name: 'UserComponent',
                component: UserComponent,
                children: [
                    {
                        path: '',
                        name: 'UserList',
                        component: UserList
                    },
                    {
                        path: 'form/id=:id?',
                        name: 'UserForm',
                        component: UserForm
                    },
                ]
            },
            {
                path: '/factory/',
                name: 'FactoryComponent',
                component: FactoryComponent,
                children: [
                    {
                        path: '',
                        name: 'FactoryList',
                        component: FactoryList
                    },
                    {
                        path: 'form/id=:id?',
                        name: 'FactoryForm',
                        component: FactoryForm
                    }
                ]
            },
            {
                path: '/language/',
                name: 'LanguageComponent',
                component: LanguageComponent,
                meta: {
                    requiresAuth: false,
                    requiredRoles: ['ADMIN']
                },
                children: [
                    {
                        path: '',
                        name: 'LanguageList',
                        component: LanguageList
                    },
                    {
                        path: 'form/id=:id?',
                        name: 'LanguageForm',
                        component: LanguageForm
                    }
                ]
            },
            {
                path: '/translation/',
                name: 'TranslationComponent',
                component: TranslationComponent,
                children: [
                    {
                        path: '',
                        name: 'TranslationList',
                        component: TranslationList
                    },
                    {
                        path: 'form/id=:id?',
                        name: 'TranslationForm',
                        component: TranslationForm
                    },
                    {
                        path: 'key/form',
                        name: 'TranslationKeyForm',
                        component: TranslationKeyForm
                    }
                ]
            },
            {
                path: '/setting/',
                name: 'SettingComponent',
                component: SettingComponent,
                children: [
                    {
                        path: 'profile',
                        name: 'UserProfile',
                        component: UserProfile
                    },
                    {
                        path: 'profile/edit',
                        name: 'UserProfileForm',
                        component: UserProfileForm
                    },
                    {
                        path: 'preferences',
                        name: 'UserPreferences',
                        component: UserPreferences
                    }
                ]
            },
            {
                path: "/:pathMatch(.*)*",
                component: PageNotFound
            }
        ]
    },
    {
        path: '/security/',
        component: SecurityIndex,
        meta: {
            requiresAuth: false,
            requiredRoles: []
        },
        children: [
            {
                path: 'login',
                name: 'userLoginPage',
                component: UserLoginPage
            },
            {
                path: 'create-password/token=:token?',
                name: 'NewPasswordForm',
                component: NewPasswordForm

            },
            {
                path: 'forget-password',
                name: 'userForgetPassword',
                component: UserForgetPassword
            },
            {
                path: 'register',
                name: 'userRegistrationForm',
                component: RegistrationForm
            },
            {
                path: 'password-reset-success',
                name: 'passwordResetSuccess',
                component: PasswordResetMessage,
                props: {message: 'Your password has been successfully changed.'}
            }, {
                path: 'password-reset-requested',
                name: 'passwordResetRequested',
                component: PasswordResetMessage,
                props: {message: 'Thank you very much. An email with next step has been sent to the provided address.'}
            },
            {
                path: 'registration-success',
                name: 'userRegistrationSuccess',
                component: RegistrationSuccess
            }
        ]
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
                console.log("Unauthorized");
                return next({name: 'home'});
            }
        }
    }

    return next();
});


export default router;
