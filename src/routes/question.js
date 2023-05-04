import QuestionComponent from "@/components/question/QuestionComponent.vue";
import QuestionList from "@/components/question/QuestionList.vue";
import QuestionForm from "@/components/question/QuestionForm.vue";
import QuestionFramework from "@/components/question/framework/QuestionFramework.vue";
import QuestionCategory from "@/components/question/category/QuestionCategory.vue";
import QuestionFrameworkList from "@/components/question/framework/QuestionFrameworkList.vue";

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
        },
        {
            path: 'framework',
            name: 'QuestionFramework',
            component: QuestionFramework,
            children: [
                {
                    path: '',
                    name: 'QuestionFrameworkList',
                    component: QuestionFrameworkList
                },
            ]
        },
        {
            path: 'category',
            name: 'QuestionCategory',
            component: QuestionCategory
        }
    ]
};