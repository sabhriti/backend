import {createRouter, createWebHashHistory} from 'vue-router';
import UserLoginPage from "@/components/user/LoginPage";
import UserForgetPassword from "@/components/user/ForgetPassword";
import UserRegistrationPage from "@/components/user/RegistrationPage";
import UserRegistrationSuccess from "@/components/user/RegistrationSuccess";
import DashboardHome from "@/components/home/DashboardHome";
import UserIndex from "@/components/user/UserIndex";
import UsersComponent from "@/components/user/UsersComponent";
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

const routes = [
    {
        path: '/',
        name: 'home',
        component: DashboardHome,
        meta: {requiresAuth: true},

    },
    {
        path: '/admin',
        component: AdminIndex,
        name: 'adminHome',
        meta: {requiresAuth: true},
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
                name: 'UsersComponent',
                component: UsersComponent
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
        ]
    },
    {
        path: '/user/',
        name: 'users',
        component: UserIndex,
        children: [
            {
                path: 'login',
                name: 'userLoginPage',
                component: UserLoginPage
            },
            {
                path: 'forget-password',
                name: 'userForgetPassword',
                component: UserForgetPassword
            },
            {
                path: 'register',
                name: 'userRegistrationPage',
                component: UserRegistrationPage
            },
            {
                path: 'registration-success',
                name: 'userRegistrationSuccess',
                component: UserRegistrationSuccess
            }
        ],
    }
];

const router = createRouter({
    history: createWebHashHistory(),
    routes
});

router.beforeEach((to, from, next) => {
    const session = localStorage.getItem('session');
    if (to.meta.requiresAuth && !session) {
        return next({name: 'userLoginPage'});
    }

    return next();
});


export default router;
