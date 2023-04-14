import AnswerTypeComponent from "@/components/answer/type/AnswerTypeComponent.vue";
import AnswerTypeList from "@/components/answer/type/AnswerTypeList.vue";
import AnswerTypeForm from "@/components/answer/type/AnswerTypeForm.vue";

export default  {
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
};
