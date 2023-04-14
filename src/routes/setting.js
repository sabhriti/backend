import SettingComponent from "@/components/setting/SettingComponent.vue";
import UserProfile from "@/components/setting/UserProfile.vue";
import UserProfileForm from "@/components/setting/UserProfileForm.vue";
import UserPreferences from "@/components/setting/UserPreferences.vue";
import ChangePassword from "@/components/setting/ChangePassword.vue";

export default  {
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
        },
        {
            path: 'change-password',
            name: 'ChangePassword',
            component: ChangePassword
        }
    ]
}
