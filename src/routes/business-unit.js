import BusinessUnitComponent from "@/components/business-unit/BusinessUnitComponent.vue";
import BusinessUnitList from "@/components/business-unit/BusinessUnitList.vue";
import BusinessUnitForm from "@/components/business-unit/BusinessUnitForm.vue";

export default {
    path: '/business-unit/',
    name: 'BusinessUnitComponent',
    component: BusinessUnitComponent,
    children: [
        {
            path: '',
            name: 'BusinessUnitList',
            component: BusinessUnitList
        },
        {
            path: 'form/id=:id?',
            name: 'BusinessUnitForm',
            component: BusinessUnitForm
        }
    ]
};
