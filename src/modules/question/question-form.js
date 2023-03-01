import ApiConfig from "@/config/ApiConfig";
import axios from "axios";
import router from "@/routes";

export default {
    namespaced: true,
    state: {
        questionNumber: null,
        supportedLanguages: [],
        questionTitles: [
            {
                lang: 'en',
                content: ''
            }
        ],
        additionalInformationList: [
            {
                lang: 'en',
                content: ''
            }
        ],
        questionType: null,
        questionCategory: null,
        answers: {},
        allAnswerTypes: [],
        answerValues: []
    },
    getters: {
        supportedLanguages: (state) => state.supportedLanguages,
        questionTitles: (state) => state.questionTitles,
        additionalInformationList: (state) => state.additionalInformationList,
        selectedAnswer: (state) => {
            const filtered = state.answers.filter(answer => answer.type === state.questionType);
            if (filtered.length >= 1) {
                return filtered[0];
            }
            return {
                type: '',
                values: []
            }
        },
        answers: (state) => state.answers,
        allAnswerTypes: (state) => {
            return state.allAnswerTypes
        },
        questionType: (state) => state.questionType,
        questionCategory: (state) => state.questionCategory,
        answerValues: (state) => state.answerValues
    },
    actions: {
        prepareAnswerValues({commit, state}) {
            const answersValues = state.allAnswerTypes.filter(answerType =>
                state.questionCategory === answerType.answerCategory
            );

            commit('UPDATE_ANSWER_VALUES', answersValues);
        },
        handleAnswerTypeChange({commit, dispatch}, event) {
            commit('UPDATE_QUESTION_CATEGORY', event.currentTarget.selectedOptions[0].text.toLowerCase());
            dispatch('prepareAnswerValues');
        },
        languagesChanged: ({commit, state}) => {
            state.supportedLanguages
                .forEach(supportedLanguage => {
                    if (supportedLanguage.isSelected) {
                        const titleForSelectedLanguage = state.questionTitles.filter(title => title.lang === supportedLanguage.code);
                        if (titleForSelectedLanguage.length < 1) {
                            commit('ADD_TO_QUESTION_TITLE', {
                                lang: supportedLanguage.code,
                                content: ''
                            });

                            commit('ADD_TO_ADDITIONAL_INFORMATION', {
                                lang: supportedLanguage.code,
                                content: ''
                            });
                        }
                    } else {
                        commit('REMOVE_QUESTION_TITLE_BY_LANGUAGE', supportedLanguage.code);
                        commit('REMOVE_ADDITIONAL_INFORMATION_BY_LANGUAGE', supportedLanguage.code);
                    }
                });
        },


        async fetchLanguages({dispatch, commit}) {
            try {
                const config = {
                    method: 'get',
                    url: `${ApiConfig.API_BASE_URL}/language/`,
                    headers: {}
                };

                const response = await axios(config);

                commit(
                    'UPDATE_SUPPORTED_LANGUAGES',
                    response.data.data.map(lang => {
                        let isSelected = false;
                        if (lang.name === 'English') {
                            isSelected = true;
                        }

                        return {
                            text: lang.name,
                            value: lang.name.toLowerCase(),
                            code: lang.code,
                            isSelected: isSelected
                        }
                    })
                )
            } catch (error) {
                dispatch('showError', " Failed deleting the question to edit.", {root: true});
            }
        },

        async fetchQuestionById({commit, dispatch}, questionId) {
            try {
                const config = {
                    method: 'get',
                    url: `${ApiConfig.API_BASE_URL}/question/${questionId}`,
                    headers: {}
                };

                const response = await axios(config);
                const questionFromApi = response.data.data;

                commit('SET_SELECTED_LANGUAGES', questionFromApi.titles.map(info => info.lang));

                commit('UPDATE_QUESTION_NUMBER', questionFromApi.number);
                commit(
                    'UPDATE_QUESTION_TITLES',
                    questionFromApi.titles.map(apiQuestionTitle => {
                        return {
                            lang: apiQuestionTitle.lang,
                            content: apiQuestionTitle.content
                        }
                    })
                );

                commit(
                    'UPDATE_QUESTION_ADDITIONAL_INFORMATION',
                    questionFromApi.additionalInformation.map(info => {
                        return {
                            lang: info.lang,
                            content: info.content,
                        };
                    })
                );

                commit('UPDATE_QUESTION_TYPE', questionFromApi.questionType);
                commit('UPDATE_ANSWERS', questionFromApi.answers);
                if (questionFromApi.answers.length > 0 ) {
                    commit('UPDATE_QUESTION_CATEGORY', questionFromApi.answers[0].answerCategory);
                }

                dispatch('prepareAnswerValues');
            } catch (error) {
                dispatch('showError', " Failed deleting the question to edit.", {root: true});
            }
        },

        async fetchAnswerTypes({commit, dispatch}) {
            try {
                const config = {
                    method: 'get',
                    url: `${ApiConfig.API_BASE_URL}/answer-type/`,
                    headers: {}
                };

                const response = await axios(config);

                commit('UPDATE_ALL_ANSWERS_TYPES', response.data.data);
            } catch (error) {
                dispatch('showError', " Failed deleting the question to edit.", {root: true});
            }
        },

        async saveQuestion({state, dispatch}) {

            const questionToSave = {
                number: state.questionNumber,
                questionType: state.answerValues[0].answerType,
                titles: state.questionTitles.map(questionTitle => {
                    return {
                        lang: questionTitle.lang,
                        content: questionTitle.content
                    }
                }),
                additionalInformation: state.additionalInformationList.map(info => {
                    return {
                        lang: info.lang,
                        content: info.content
                    }
                }),
                answers: state.answerValues
            }

            try {
                const config = {
                    method: 'post',
                    url: `${ApiConfig.API_BASE_URL}/question/`,
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    data: questionToSave
                };

                await axios(config);

                await router.push("/question");

                dispatch('showInfo', "New question successfully added", {root: true});

            } catch (error) {
                dispatch('showError', " Failed saving the User. Please try again.", {root: true});
            }
        }
    },
    mutations: {
        ADD_TO_QUESTION_TITLE: (state, questionTitle) => state.questionTitles.push(questionTitle),
        UPDATE_QUESTION_TITLES: (state, questionTitles) => state.questionTitles = questionTitles,
        REMOVE_QUESTION_TITLE_BY_LANGUAGE: (state, language) => {
            state.questionTitles = state.questionTitles
                .filter(questionTitle => questionTitle.lang !== language);
        },
        ADD_TO_ADDITIONAL_INFORMATION: (state, additionalInformation) => state.additionalInformationList.push(additionalInformation),
        UPDATE_QUESTION_ADDITIONAL_INFORMATION: (state, additionalInformationList) => state.additionalInformationList = additionalInformationList,
        REMOVE_ADDITIONAL_INFORMATION_BY_LANGUAGE: (state, language) => {
            state.additionalInformationList = state.additionalInformationList
                .filter(additionalInformation => additionalInformation.lang !== language);
        },
        UPDATE_ANSWERS: (state, answers) => state.answers = answers,
        UPDATE_ALL_ANSWERS_TYPES: (state, allAnswerTypes) => state.allAnswerTypes = allAnswerTypes,
        UPDATE_QUESTION_TYPE: (state, questionType) => state.questionType = questionType,
        UPDATE_QUESTION_NUMBER: (state, questionNumber) => state.questionNumber = questionNumber,
        SET_SELECTED_LANGUAGES: (state, languages) => {
            state.supportedLanguages = state.supportedLanguages.map(supportedLanguage => {

                if (languages.includes(supportedLanguage.code)) {
                    supportedLanguage.isSelected = true
                }
                return supportedLanguage;
            })
        },

        UPDATE_SUPPORTED_LANGUAGES: (state, languages) => {
            state.supportedLanguages = languages
        },

        UPDATE_ANSWER_VALUES: (state, answers) => state.answerValues = answers,
        UPDATE_QUESTION_CATEGORY: (state, category) => state.questionCategory = category
    }
}
