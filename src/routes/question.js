import QuestionComponent from "@/components/question/QuestionComponent.vue";
import QuestionList from "@/components/question/QuestionList.vue";
import QuestionForm from "@/components/question/QuestionForm.vue";

export default  {
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
};