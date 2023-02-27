const AnswerModel = require("../model/answerModel");

exports.index = function (req, res) {
    AnswerModel.get(function (err, questions) {
        if (err) {
            res.json({
                status: "error",
                message: err,
            });
        }
        res.json({
            status: "success",
            message: "answer retrieved",
            data: questions
        });
    });
};

exports.insertBulk = async function (req, res) {
    try {
        const inserted = await  AnswerModel.insertMany(req.body);
        res
            .status(201)
            .json(
                {
                    status: "success",
                    message: 'answers stored',
                    data: inserted
                }
            )
    } catch (error) {
        console.log(error)
        res.sendStatus(500)
    }
};
