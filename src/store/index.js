import {createStore} from 'vuex'

import login from './modules/security/login';
import registration from "./modules/security/registration";
import passwordResetForm from "./modules/security/password-reset-form";
import passwordForgetForm from "./modules/security/password-forget-form";
import userProfile from "./modules/setting/user-profile";
import changePassword from "./modules/setting/change-password";
import feedbackList from "./modules/feedback/feedback-list";
import questionList from "./modules/question/question-list";
import questionForm from "./modules/question/question-form";
import questionFrameworkList from "./modules/question/framework/question-framework-list";
import answerTypeForm from "./modules/answer/answer-type-form";
import answerTypeList from "./modules/answer/answer-type-list";
import userList from "./modules/user/user-list";
import userForm from "./modules/user/user-form";
import alertBox from "./modules/util/alert-box";
import fullPageSpinner from "./modules/util/full-page-spinner";
import surveyList from "./modules/survey/survey-list";
import surveyAnswerList from "./modules/survey/survey-answer-list";
import surveyForm from "./modules/survey/survey-form";
import businessUnitList from "./modules/business-unit/business-unit-list";
import businessUnitForm from "./modules/business-unit/business-unit-form";
import languageForm from "./modules/language/language-form";
import languageList from "./modules/language/language-list";
import translationList from "./modules/translation/translation-list";
import translationForm from "./modules/translation/translation-form";
import translationKeyForm from "./modules/translation/translation-key-form";

export default createStore({
    modules: {
        login,
        registration,
        passwordResetForm,
        passwordForgetForm,
        userProfile,
        changePassword,
        feedbackList,
        questionList,
        questionForm,
        questionFrameworkList,
        answerTypeForm,
        answerTypeList,
        surveyList,
        surveyAnswerList,
        surveyForm,
        businessUnitList,
        businessUnitForm,
        userList,
        userForm,
        alertBox,
        fullPageSpinner,
        languageForm,
        languageList,
        translationList,
        translationForm,
        translationKeyForm
    }
});
