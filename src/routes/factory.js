import FactoryComponent from "@/components/factory/FactoryComponent.vue";
import FactoryList from "@/components/factory/FactoryList.vue";
import FactoryForm from "@/components/factory/FactoryForm.vue";

export default {
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
};
