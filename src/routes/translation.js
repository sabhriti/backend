import TranslationComponent from "@/components/translation/TranslationComponent.vue";
import TranslationList from "@/components/translation/TranslationList.vue";
import TranslationForm from "@/components/translation/TranslationForm.vue";
import TranslationKeyForm from "@/components/translation/TranslationKeyForm.vue";

export default {
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
};
