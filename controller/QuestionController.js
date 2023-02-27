const Question = require('../model/questionModel');

exports.index = async function (req, res) {
    try {
        const questions = await Question.find().sort({number: 1});

        res.json({
            status: "success",
            message: `Total ${questions.length} questions retrieved`,
            data: questions
        });

    } catch (error) {
        res
            .status(500)
            .json({
                status: "error",
                message: "Failed fetching questions from database."
            });
    }
};

exports.findById = async (req, res) => {
    const questionId = req.params.id;
    try {
        res.json(
            {
                status: "success",
                message: 'Question found',
                data: await Question.findById(questionId)
            }
        );
    } catch (error) {
        res
            .status(404)
            .json({
                status: "error",
                message: "Question with provided id: " + questionId + ' not found in database.'
            });
    }
}

exports.post = async function (req, res) {
    try {

        const question = req.body;

        console.log(question);

        const filter = {number: question.number};

        const existingQuestion = await Question.findOne(filter);

        if (existingQuestion) {
            res.json(
                {
                    status: "success",
                    message: 'Question updated',
                    data: await Question.findOneAndUpdate(filter, question)
                }
            );
        } else {
            res.json(
                {
                    status: "success",
                    message: 'operations created!',
                    data: await Question.create(req.body)
                }
            );
        }
    } catch (error) {
        console.log(error);
        res
            .status(500)
            .json(
                {
                    status: "error",
                    message: error,
                }
            );
    }
};

exports.delete = async function (req, res) {
    const filter = {
        number: req.query.number
    };
    try {
        Question.remove(filter, function (err, question) {
            if (err)
                return res.send(
                    {
                        status: "error",
                        message: err
                    }
                );
            res.json(
                {
                    status: "success",
                    message: question.name + ' operations deleted'
                }
            );
        });
    } catch (error) {
        res.sendStatus(500)
    }
};
