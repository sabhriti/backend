const Language = require("../model/languageModel");

exports.index = function (req, res) {
    Language.get(function (err, languages) {
        if (err) {
            res.json({
                status: "error",
                message: err,
            });
        }
        res.json({
            status: "success",
            message: "language retrieved",
            data: languages
        });
    });
};
exports.findById = async function (req, res) {
    const languageId = req.params.id;
    try {
        res.json(
            {
                status: "success",
                message: 'Language found',
                data: await Language.findById(languageId)
            }
        );
    } catch (error) {
        res
            .status(404)
            .json({
                status: "error",
                message: "Language with provided id: " + languageId + ' not found in database.'
            });
    }
}

exports.post = async function (req, res) {
    const language = req.body;

    try {
        const existingLanguage = await Language.findById(language.id);

        if (existingLanguage) {
            res.json(
                {
                    status: "success",
                    message: 'language updated',
                    data: await Language.findByIdAndUpdate(language.id, language)
                }
            );
        } else {
            res.json(
                {
                    status: "success",
                    message: 'language added',
                    data: await Language.create(language)
                }
            );
        }
    } catch (error) {
        console.log('error', error)
        res
            .status(500)
            .json({
                status: "error",
                message: "Failed Storing language in database."
            });
    }
};
exports.checkIfExists = async function (req, res) {
    const languageCode = req.query.code;

    const filter = {code: languageCode};

    try {
        return language.exists(filter, function (err, doc) {
            if (err) {
                console.log(err);
                return res.sendStatus(404);
            } else if (!doc) {
                return res.sendStatus(404);
            } else {
                res.json(
                    {
                        status: "success",
                        message: 'language exists',
                        data: filter
                    }
                );
            }
        });
    } catch (error) {
        res.sendStatus(500)
    }
}

exports.delete = async function (req, res) {
    const languageId = req.params.id;

    try {
        const existingLanguage = await Language.findById(languageId);
        if (existingLanguage) {
            await Language.findByIdAndRemove(languageId);
            res
                .status(200)
                .json({
                    status: "success",
                    message: "Language with provided id: " + languageId + ' was deleted from the database.'
                });
        } else {
            res
                .status(404)
                .json({
                    status: "error",
                    message: "Language with provided id: " + languageId + ' not found in database.'
                });
        }
    } catch (error) {
        res
            .status(500)
            .json({
                status: "error",
                message: "Failed deleting language."
            });
    }
}


