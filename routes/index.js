const express = require('express');
const router = express.Router();
const AnswerTypeController = require("../controller/AnswerTypeController");
const QuestionController = require('../controller/QuestionController');
const SurveyController = require('../controller/SurveyController');
const FactoryController = require('../controller/FactoryController');
const AnswerController = require('../controller/AnswerController');
const SecurityController = require('../controller/SecurityController');
const RegistrationController = require('../controller/RegistrationController');
const FeedbackController = require('../controller/FeedbackController');
const UsersController = require('../controller/UsersController');
const LanguageController = require('../controller/LanguageController')
const TranslationController = require('../controller/TranslationController')

/* SECURITY & LOGIN */
router.route('/registration')
    .post(RegistrationController.registerUser);
router.route('/security/login')
    .post(SecurityController.login);

/* USERS ADMINISTRATION */
router.route('/users/all')
    .get(UsersController.getAllUsers);
router.route('/users/status/:userId')
    .get(UsersController.getUserStatus);
router.route('/users/status/:userId')
    .post(UsersController.changeUserStatus);
router.route('/users/:userId')
    .delete(UsersController.deleteUserById);


/* ANSWERS MANAGEMENT */
router.route('/answer-type/')
    .post(AnswerTypeController.post)
    .get(AnswerTypeController.getAll);

router.route('/answer-type/:id')
    .delete(AnswerTypeController.delete)
    .get(AnswerTypeController.findById)

/* QUESTIONS MANAGEMENT */
router.route('/question/:id')
    .get(QuestionController.findById);

router.route('/question')
    .get(QuestionController.index)
    .post(QuestionController.post);

router.route('/question/:number')
    .delete(QuestionController.delete);

/* FACTORY MANAGEMENT */
router.route('/factory')
    .get(FactoryController.index)
    .post(FactoryController.post);

router.route('/factory/:id')
    .get(FactoryController.findById)
    .delete(FactoryController.delete);

router.route('/factory/exists')
    .get(FactoryController.checkIfExists);

/* LANGUAGE MANAGEMENT*/
 router.route('/language')
     .get(LanguageController.index)
     . post(LanguageController.post);

router.route('/language/:id')
    .get(LanguageController.findById)
    .delete(LanguageController.delete);

router.route('/language/exists')
    .get(LanguageController.checkIfExists);

/* TRANSLATION MANAGEMENT */
router.route('/translation')
    .get(TranslationController.index)
    .post(TranslationController.post);

router.route('/translation/:id')
    .get(TranslationController.findById)
    .delete(TranslationController.delete);

router.route('/translation-status/:translationId')
    .post(TranslationController.changeTranslationStatus);

router.route('/translation-key')
    .get(TranslationController.getKeys)
    .post(TranslationController.addKey)

/* SURVEY MANAGEMENT */
router.route('/surveys/')
    .get(SurveyController.allSurveys);

router.route('/survey/:id')
    .get(SurveyController.findById);

router.route('/surveys/download/answers/:surveyId?')
    .get(SurveyController.downloadAnswers);

router.route('/surveys/download/answers/filtered/:factoryId?')
    .get(SurveyController.downloadAnswersWithFactory);

router.route('/surveys/answers/filtered')
    .post(SurveyController.filteredSurveyAnswerList);

router.route('/surveys/answers/:surveyId')
    .get(SurveyController.surveyAnswersByCode);

router.route('/survey/start/:factoryCode')
    .get(SurveyController.startSurvey);

router.route('/survey/questions/:surveyId')
    .get(SurveyController.surveyQuestions)

router.route('/survey/save')
    .post(SurveyController.addSurvey)

router.route('/answer/storeBulk/')
    .get(AnswerController.index)
    .post(AnswerController.insertBulk);

/* FEEDBACK MANAGEMENT */
router.route('/feedback/download-all')
    .get(FeedbackController.downloadAll)

router.route('/feedback')
    .get(FeedbackController.index)
    .post(FeedbackController.post);

router.route('/feedback/:id')
    .delete(FeedbackController.delete);

router.route('/feedback/filtered')
    .post(FeedbackController.filteredFeedbackList);

router.route('/feedback/download/:factoryId')
    .get(FeedbackController.downloadForFactory);

module.exports = router;
