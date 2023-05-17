import SecurityIndex from "@/components/security/SecurityIndex.vue";
import UserLoginPage from "@/components/security/LoginPage.vue";
import NewPasswordForm from "@/components/security/NewPasswordForm.vue";
import UserForgetPassword from "@/components/security/ForgetPassword.vue";
import RegistrationForm from "@/components/security/RegistrationForm.vue";
import PasswordResetMessage from "@/components/security/PasswordResetMessage.vue";
import RegistrationSuccess from "@/components/security/RegistrationSuccess.vue";

export default {
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
};
