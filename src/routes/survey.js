import SurveysComponent from "@/components/survey/SurveysComponent.vue";
import SurveyList from "@/components/survey/SurveyList.vue";
import SurveyAnswerList from "@/components/survey/SurveyAnswerList.vue";
import SurveyForm from "@/components/survey/SurveyForm.vue";

export default {
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
}
