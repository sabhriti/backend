const {getAllQuestionsResponse, addQuestionResponse, deleteQuestionResponse} = require('./question');
const {getAllFactoriesResponse, addFactoryResponse, deleteFactoryResponse} = require('./factory');
const {getAllSurveyResponse} = require('./survey');
const {getAllAnswerResponse} = require('./answer');


module.exports = {
    components: {
        schemas: {
            GetAllQuestionsResponse: getAllQuestionsResponse,
            AddQuestionResponse: addQuestionResponse,
            DeleteQuestionResponse: deleteQuestionResponse,
            GetAllFactoriesResponse: getAllFactoriesResponse,
            AddFactoryResponse: addFactoryResponse,
            DeleteFactoryResponse: deleteFactoryResponse,
            GetAllSurveyResponse: getAllSurveyResponse,
            GetAllAnswerResponse: getAllAnswerResponse,

        }
    }
};