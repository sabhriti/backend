const Feedback = require("../model/feedbackModel");
const {promises: fs} = require("fs");
const Survey = require("../model/surveyModel");
const Factory = require("../model/factoryModel");

exports.downloadAll = async function (req, res) {
    try {
        const feedbackList = await Feedback.find();
        const fileName = `${__dirname}/feedbacks.json`;
        fs.writeFile(fileName, JSON.stringify(feedbackList), 'utf8')
            .finally(async () => res.sendFile(fileName, async () => await fs.unlink(fileName)));
    } catch (error) {
        res
            .status(500)
            .json({
                status: "error",
                message: "Failed downloading file. Please contact your administrator."
            });
    }
};

exports.index = async function (req, res) {
    try {
        const allFeedbacks = await Feedback.find();

        const updated = allFeedbacks.map(async feedback => {
            const factory = await Factory.findById(feedback.factoryId);
            return {
                lang: feedback.lang,
                content: feedback.content,
                surveyId: feedback.surveyId,
                survey: await Survey.findById(feedback.surveyId),
                factory: factory,
                factoryCode: feedback.factoryCode
            };
        });

        res.json({
            status: "success",
            message: `Total ${updated.length} feedbacks retrieved`,
            data: await Promise.all(updated)
        });
    } catch
        (error) {
        console.error(error)
        res
            .status(500)
            .json({
                status: "error",
                message: "Failed fetching feedbacks from database."
            });
    }
}


exports.post = async function (req, res) {
    try {
        const feedback = await Feedback.create(req.body);
        res
            .status(201)
            .json(
                {
                    status: "success",
                    message: 'feedback stored',
                    data: feedback
                }
            )
    } catch (error) {
        console.log(error)
        res.sendStatus(500)
    }
};
exports.delete = async function (req, res) {
    const feedbackId = req.params.id;

    try {
        const existingFeedback = await Feedback.findById(feedbackId);
        if (existingFeedback) {
            await Feedback.findByIdAndRemove(feedbackId);
            res
                .status(200)
                .json({
                    status: "success",
                    message: "Feedback with provided id: " + feedbackId + ' was deleted from the database.'
                });
        } else {
            res
                .status(404)
                .json({
                    status: "error",
                    message: "Feedback with provided id: " + feedbackId + ' not found in database.'
                });
        }
    } catch (error) {
        res.sendStatus(500).message(error);
    }
}


exports.filteredFeedbackList = async function (req, res) {
        const factoryId = req.body.factoryId;

        try {
            const filteredFeedbacks = await Feedback.find(
                {
                    factoryId: factoryId
                }
            );

            const updated = filteredFeedbacks.map(async feedback => {
                const factory = await Factory.findById(feedback.factoryId);
                return {
                    lang: feedback.lang,
                    content: feedback.content,
                    surveyId: feedback.surveyId,
                    survey: await Survey.findById(feedback.surveyId),
                    factory: factory,
                    factoryCode: feedback.factoryCode
                };
            });

            res.json({
                status: "success",
                message: `Total ${updated.length} feedbacks retrieved`,
                data: await Promise.all(updated)
            });
        } catch
            (error) {
            console.error(error)
            res
                .status(500)
                .json({
                    status: "error",
                    message: "Failed fetching feedbacks from database."
                });
        }
}

exports.downloadForFactory = async function (req, res) {
    const factoryId = req.params.factoryId;
    try {
        const feedbackList = await Feedback.find({factoryId: factoryId});
        const fileName = `${__dirname}/feedbacks_${factoryId} .json`;
        fs.writeFile(fileName, JSON.stringify(feedbackList), 'utf8')
            .finally(async () => res.download(fileName, async () => await fs.unlink(fileName)));
    } catch (error) {
        res
            .status(500)
            .json({
                status: "error",
                message: "Failed downloading file. Please contact your administrator."
            });
    }
};
