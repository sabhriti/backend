import ApiConfig from "@/config/ApiConfig";
import router from "@/routes";

const axios = require('axios');

export default {
    namespaced: true,
    state: {
        factoryList: [],
        survey: {
            surveyId: '',
            surveyName: '',
            factoryId: '',
            questions: [{}],
            questionIdList: []
        }
    },
    actions: {
        toggleSelectAllQuestions({commit, state}) {
            if (!state.survey.questions[0].isSelected) {
                commit('ADD_ALL_QUESTIONS_TO_SURVEY');
            } else {
                commit('REMOVE_ALL_QUESTIONS_FROM_SURVEY');
            }
        },

        toggleQuestionToSurvey({commit, state}, questionId) {
            if (state.survey.questions.find(question => question.questionId === questionId && question.isSelected)) {
                commit('REMOVE_QUESTION_FROM_SURVEY', questionId);
            } else {
                commit('ADD_QUESTION_TO_SURVEY', questionId);
            }
        },
        async fetchSurveyById({dispatch, commit}, surveyId) {
            if (surveyId) {
                try {
                    const config = {
                        method: 'get',
                        url: `${ApiConfig.API_BASE_URL}/survey/${surveyId}`,
                        headers: {}
                    };
                    const response = await axios(config);

                    if (response.data.data) {
                        commit('UPDATE_SURVEY_ID_IN_SURVEY', response.data.data._id);
                        commit('UPDATE_SURVEY_NAME_IN_SURVEY', response.data.data.surveyName);
                        commit('UPDATE_FACTORY_ID_IN_SURVEY', response.data.data.factoryId);
                        commit('UPDATE_QUESTION_ID_IN_SURVEY', response.data.data.questions);
                    }
                } catch (error) {
                    console.log('error', error)
                    dispatch('showError', " Failed fetching the survey to edit.", {root: true});
                }
            } else {
                commit('UPDATE_SURVEY_ID_IN_SURVEY', null);
                commit('UPDATE_SURVEY_NAME_IN_SURVEY', null);
                commit('UPDATE_FACTORY_ID_IN_SURVEY', null);
                commit('UPDATE_QUESTION_ID_IN_SURVEY', []);
            }
        },
        async fetchFactories({commit, dispatch}) {
            const config = {
                method: 'get',
                url: `${ApiConfig.API_BASE_URL}/factory`,
                headers: {}
            };

            try {
                const response = await axios(config);
                commit('UPDATE_ALL_FACTORY_CODE', response.data.data);
            } catch (error) {
                dispatch('showError', " Failed loading factories. Please try again.", {root: true});
            }
        },
        async fetchAllQuestions({commit, dispatch}) {
            const config = {
                method: 'get',
                url: `${ApiConfig.API_BASE_URL}/question`,
                headers: {}
            };
            try {
                const response = await axios(config)
                commit('UPDATE_QUESTIONS_LIST', response.data.data);
            } catch (error) {
                dispatch('showError', " Failed loading questions. Please try again.", {root: true})
            }
        },

        async addSurvey({state, dispatch}) {
            const surveyToSave = {
                id: state.survey.surveyId,
                surveyName: state.survey.surveyName,
                factoryId: state.survey.factoryId,
                questions: state.survey.questions.filter(question => question.isSelected).map(question => question.questionId)
            };

            try {
                const config = {
                    method: 'post',
                    url: `${ApiConfig.API_BASE_URL}/survey/save`,
                    header: {
                        'content-Type': 'application/json'
                    },
                    data: surveyToSave
                };

                await axios(config);
                await router.push({name: 'SurveyList'});

                dispatch('showInfo', "A new survey is successfully added.", {root: true});
            } catch (error) {
                dispatch('showError', "Failed saving survey. Please make sure you enter correct data.", {root: true});
            }
        }
    },
    getters: {
        factoryList: (state) => state.factoryList,
        questionList: (state) => state.survey.questions
    },
    mutations: {
        UPDATE_ALL_FACTORY_CODE: (state, factoryList) => {
            state.factoryList = factoryList
        },
        UPDATE_QUESTIONS_LIST: (state, questionList) => {
            state.survey.questions = questionList.map((question) => {
                const englishQuestion = question.titles.filter(title => title.lang === 'english' || title.lang === 'en' || title.lang === '');
                let title = '';
                if (englishQuestion) {
                    title = englishQuestion[0].content
                }

                let isSelected = false;
                if (state.survey.questionIdList.includes(question._id)) {
                    isSelected = true;
                }

                return {
                    questionId: question._id,
                    isSelected: isSelected,
                    title: `${question.number}: ${title}`
                };
            });
        },
        UPDATE_SURVEY_ID_IN_SURVEY: (state, surveyId) => state.survey.surveyId = surveyId,
        UPDATE_FACTORY_ID_IN_SURVEY: (state, factoryId) => state.survey.factoryId = factoryId,
        UPDATE_SURVEY_NAME_IN_SURVEY: (state, surveyName) => state.survey.surveyName = surveyName,
        UPDATE_QUESTION_ID_IN_SURVEY: (state, questionIdList) => state.survey.questionIdList = questionIdList,
        REMOVE_QUESTION_FROM_SURVEY: (state, questionId) => {
            state.survey.questions = state.survey.questions.map(question => {
                if (question.questionId === questionId)
                    question.isSelected = false;
                return question;
            });
        },
        ADD_QUESTION_TO_SURVEY: (state, questionId) => {
            state.survey.questions = state.survey.questions.map(question => {
                if (question.questionId === questionId)
                    question.isSelected = true;
                return question;
            });
        },
        REMOVE_ALL_QUESTIONS_FROM_SURVEY: (state) => {
            state.survey.questions = state.survey.questions.map(question => {
                question.isSelected = false;
                return question;
            });
        },
        ADD_ALL_QUESTIONS_TO_SURVEY: (state) => {
            state.survey.questions = state.survey.questions.map(question => {
                question.isSelected = true;
                return question;
            });
        }
    }
}
