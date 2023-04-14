import LanguageComponent from "@/components/language/LanguageComponent.vue";
import LanguageList from "@/components/language/LanguageList.vue";
import LanguageForm from "@/components/language/LanguageForm.vue";

export default {
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
}
