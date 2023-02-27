const AnswerType = require('../model/answerTypeModel');

exports.getAll = async function (req, res) {
    try {
        const allQuestions = await AnswerType.find();
        res
            .json(
                {
                    status: "success",
                    message: `Total ${allQuestions.length} question types retrieved`,
                    data: allQuestions
                }
            );
    } catch (error) {
        res
            .status(500)
            .json({
                status: "error",
                message: error
            });
    }
}

exports.post = async function (req, res) {
    const answerType = req.body;

    try {
        const existingAnswerType = await AnswerType.findById(answerType._id);

        if (existingAnswerType) {
            res.json(
                {
                    status: "success",
                    message: 'answer type updated',
                    data: await AnswerType.findByIdAndUpdate(existingAnswerType._id, answerType)
                }
            );
        } else {
            res.json(
                {
                    status: "success",
                    message: 'answer type added',
                    data: await AnswerType.create(answerType)
                }
            );
        }
    } catch (error) {
        console.error(error);
        res
            .status(500)
            .json({
                status: "error",
                message: "Failed Storing answer type in database."
            });
    }
};

exports.delete = async function (req, res) {
    const answerTypeId = req.params.id;

    try {
        const existingFactory = await AnswerType.findById(answerTypeId);
        if (existingFactory) {
            await AnswerType.findByIdAndRemove(answerTypeId);
            res
                .status(200)
                .json({
                    status: "success",
                    message: "Answer type with provided id: " + answerTypeId + ' was deleted from the database.'
                });
        } else {
            res
                .status(404)
                .json({
                    status: "error",
                    message: "Answer type with provided id: " + answerTypeId + ' not found in database.'
                });
        }
    } catch (error) {
        console.error(error);
        res
            .status(500)
            .json({
                status: "error",
                message: "Failed deleting answer type."
            });
    }
}


exports.findById = async function (req, res) {
    const answerTypeId = req.params.id;
    try {
        res.json(
            {
                status: "success",
                message: 'Answer type found',
                data: await AnswerType.findById(answerTypeId)
            }
        );
    } catch (error) {
        res
            .status(404)
            .json({
                status: "error",
                message: "Answer type with provided id: " + answerTypeId + ' not found in database.'
            });
    }
}

