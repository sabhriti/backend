const Factory = require("../model/factoryModel");
const Survey = require("../model/surveyModel");
const AnswerModel = require("../model/answerModel");
const QuestionModel = require("../model/questionModel");
const fs = require('fs').promises;

exports.findById = async function (req, res) {
    const surveyId = req.params.id;
    try {
        res.json(
            {
                status: "success",
                message: 'Survey found',
                data: await Survey.findById(surveyId)
            }
        );
    } catch (error) {
        res
            .status(404)
            .json({
                status: "error",
                message: "Survey with provided id: " + surveyId + ' was not found in database.'
            });
    }
}


exports.surveyQuestions = async function (req, res) {
    const surveyId = req.params.surveyId;
    try {
        const existingSurvey = await Survey.findOne({_id: surveyId});
        if (!existingSurvey) {
            return res
                .status(404)
                .json({
                    status: "failed",
                    message: 'Provided surveyId does not exists in system.',
                });
        } else {
            const questionList = existingSurvey.questions.map(async questionId => {
                return QuestionModel.findById(questionId);
            });

            res.json({
                status: "success",
                message: `Total ${questionList.length} questions retrieved`,
                data: await Promise.all(questionList)
            });
        }
    } catch (error) {
        console.error(error);
        return res
            .status(500)
            .json({
                status: "failed",
                message: error,
            });
    }
};

exports.startSurvey = async function (req, res) {
    try {
        const factoryCode = req.params.factoryCode;
        const existingFactory = await Factory.findOne({code: factoryCode});

        if (!existingFactory) {
            return res
                .status(404)
                .json({
                    status: "failed",
                    message: 'Factory does not exists to start a survey.',
                });
        } else {
            const survey = await Survey.findOne({factoryId: existingFactory._id});
            if (!survey) {
                return res
                    .status(400)
                    .json({
                        status: "failed",
                        message: 'Survey for the provided factory does not exists to start a survey.',
                    });
            } else {
                res.json(
                    {
                        status: "success",
                        message: 'survey created',
                        data: {
                            "factoryId": existingFactory._id,
                            "factoryCode": factoryCode,
                            "surveyId": survey._id,
                            "surveyDate": Date.now()
                        }
                    }
                );
            }
        }
    } catch (error) {
        console.error(error);
        return res
            .status(500)
            .json({
                status: "failed",
                message: error,
            });
    }
}

exports.addSurvey = async function (req, res) {

    const survey = req.body;

    try {
        const existingSurvey = await Survey.findById(survey.id);

        if (existingSurvey) {
            res.json(
                {
                    status: "success",
                    message: 'Survey updated',
                    data: await Survey.findByIdAndUpdate(survey.id, survey)
                }
            );
        } else {
            res.json(
                {
                    status: "success",
                    message: 'Survey added',
                    data: await Survey.create(survey)
                }
            );
        }
    } catch (error) {
        console.log('error', error)
        res
            .status(500)
            .json({
                status: "error",
                message: "Failed storing survey in database."
            });
    }
};

exports.allSurveys = async function (req, res) {
    try {
        const allSurveys = await Survey.find();
        const surveysToReturn = allSurveys.map(async survey => {
            return {
                _id: survey._id,
                surveyName: survey.surveyName,
                factoryId: survey.factoryId,
                questions: survey.questions,
                factory: await Factory.findOne({_id: survey.factoryId})
            };
        });

        res
            .status(200)
            .json(
                {
                    status: "success",
                    message: `Total [${allSurveys.length}] surveys received`,
                    data: await Promise.all(surveysToReturn)
                }
            )
    } catch (error) {
        console.error(error);
        res
            .status(404)
            .json({
                status: "error",
                message: `Error occurred while fetching the surveys from database [${error}}].`
            });
    }
}

exports.downloadAnswersWithFactory = async function (req, res) {
    const factoryId = req.params.factoryId;

    try {
        let answers, fileName;

        if (!factoryId) {
            answers = await AnswerModel.find();
            fileName = `${__dirname}/survey_answers.json`;
        } else {

            const factory = await Factory.findById(factoryId);

            if (factory) {
                answers = await AnswerModel.find({factoryCode: factory.code});
                fileName = `${__dirname}/${factoryId}.json`;
            } else {
                res
                    .status(404)
                    .json({
                        status: "error",
                        message: `No factory exists for provided ${factoryId}`
                    });
            }
        }

        const resolveData = await Promise.all(answers.map(answer => resolveAnswers(answer)));

        fs
            .writeFile(fileName, JSON.stringify(resolveData), 'utf8')
            .finally(async () => res.sendFile(fileName, async () => await fs.unlink(fileName)));
    } catch (error) {
        console.error(error);
        res
            .status(500)
            .json({
                status: "error",
                message: "Failed downloading file. Please contact your administrator."
            });
    }
}

resolveAnswers = async (answer) => {
    const question = await QuestionModel.findById(answer.questionId);
    let questionTitle = '';

    if (question) {
        const englishQuestionTitle = question.titles.filter(title => title.lang === 'english');

        if (englishQuestionTitle.length >=1) {
            questionTitle = englishQuestionTitle[0].content;
        }
    }

    const factory = await Factory.findOne({code: answer.factoryCode});
    const survey = await Survey.findById(answer.surveyId);

    return {
        questionTitleInEnglish: questionTitle,
        questionNumber: answer.questionNumber,
        answerValue: answer.answerValue,
        answerText: answer.answerText,
        factoryCode: answer.factoryCode,
        factoryName: factory.name,
        surveyName: survey.surveyName,
        answerDate: answer.answerDate
    }
};

exports.downloadAnswers = async function (req, res) {
    const surveyId = req.params.surveyId;

    try {
        let answers, fileName;

        if (!surveyId) {
            answers = await AnswerModel.find();
            fileName = `${__dirname}/survey_answers.json`;
        } else {
            answers = await AnswerModel.find({surveyId: surveyId});
            fileName = `${__dirname}/${surveyId}.json`;
        }

        const resolveData =  await Promise.all(answers.map(answer => resolveAnswers(answer)));

        fs
            .writeFile(fileName, JSON.stringify(resolveData), 'utf8')
            .finally(async () => res.sendFile(fileName, async () => await fs.unlink(fileName)));
    } catch (error) {
        console.error(error);
        res
            .status(500)
            .json({
                status: "error",
                message: "Failed downloading file. Please contact your administrator."
            });
    }
}

exports.surveyAnswersByCode = async function (req, res) {
    const surveyId = req.params.surveyId;

    if (!surveyId) {
        res
            .status(400)
            .json({
                status: "error",
                message: 'Survey id is required to fetch answers.'
            });
    } else {

        try {
            const answers = await AnswerModel.find({surveyId: surveyId});

            res
                .status(200)
                .json(
                    {
                        status: "success",
                        message: `Total [${answers.length}] answers received`,
                        data: answers
                    }
                )
        } catch (error) {
            console.error(error);
            res
                .status(404)
                .json({
                    status: "error",
                    message: `Error occurred while fetching the survey answers from database [${error}}].`
                });
        }
    }
}

exports.filteredSurveyAnswerList = async function (req, res) {
    try {
        const factoryId = req.body.factoryId;
        const filteredSurveys = await Survey.find(
            {
                factoryId: factoryId
            }
        );

        const surveysToReturn = filteredSurveys.map(async survey => {
            return {
                _id: survey._id,
                surveyName: survey.surveyName,
                factoryId: survey.factoryId,
                questions: survey.questions,
                factory: await Factory.findOne({_id: survey.factoryId})
            };
        });

        res
            .status(200)
            .json(
                {
                    status: "success",
                    message: `Total [${filteredSurveys.length}] surveys received`,
                    data: await Promise.all(surveysToReturn)
                }
            )
    } catch (error) {
        console.error(error);
        res
            .status(404)
            .json({
                status: "error",
                message: `Error occurred while fetching the surveys from database [${error}}].`
            });
    }
}
