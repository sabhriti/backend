const Translation = require("../model/translationModel");
const User = require("../model/userModel");

exports.index = function (req, res) {
    Translation.get(function (err, translations) {
        if (err) {
            res.json({
                status: "error",
                message: err,
            });
        }
        res.json({
            status: "success",
            message: `Total ${translations.length} translations retrieved`,
            data: translations
        });
    });
};

exports.findById = async function (req, res) {
    const translationId = req.params.id;
    try {
        res.json(
            {
                status: "success",
                message: 'Translation found',
                data: await Translation.findById(translationId)
            }
        );
    } catch (error) {
        res
            .status(404)
            .json({
                status: "error",
                message: "Translation with provided id: " + translationId + ' not found in database.'
            });
    }
}

exports.post = async function (req, res) {
    const translation = req.body;

    try {
        const existingTranslation = await Translation.findById(translation.id);

        if (existingTranslation) {
            res.json(
                {
                    status: "success",
                    message: 'translation updated',
                    data: await Translation.findByIdAndUpdate(translation.id, translation)
                }
            );
        } else {
            res.json(
                {
                    status: "success",
                    message: 'translation added',
                    data: await Translation.create(translation)
                }
            );
        }
    } catch (error) {
        res
            .status(500)
            .json({
                status: "error",
                message: "Failed Storing translation in database."
            });
    }
};

exports.addKey = async (req, res) => {
    try {
        const keyName = req.body.keyName.toLowerCase();
        const defaultText = req.body.defaultText;
        const isActive = req.body.isActive;

        const existing = await Translation.findOne({key: keyName});

        if (existing) {
            res
                .status(400)
                .json({
                    status: "error",
                    message: `Translation key [${keyName}] already exists.`
                });
        } else {
            const translation = {
                key: keyName,
                items: [{
                    lang: 'en',
                    content: defaultText,
                }],
                isActive: isActive
            };

            const created = await Translation.create(translation);

            if (created) {
                res.json(
                    {
                        status: "success",
                        message: 'new translation added',
                        data: await created
                    }
                );
            }

        }
    } catch (error) {
        res
            .status(500)
            .json({
                status: "error",
                message: "Failed adding new translation key."
            });
    }
}

exports.getKeys = async function (req, res) {
    const allKey = await Translation.find().then(allTranslations => allTranslations.map(translation => translation.key));

    Translation.get(function (err, translations) {
        if (err) {
            res.json({
                status: "error",
                message: err,
            });
        }
        res.json({
            status: "success",
            message: `Total ${translations.length} translations keys retrieved`,
            data: allKey
        });
    });
}

exports.delete = async function (req, res) {
    const translationId = req.params.id;

    try {
        const existingTranslation = await Translation.findById(translationId);
        if (existingTranslation) {
            await Translation.findByIdAndRemove(translationId);
            res
                .status(200)
                .json({
                    status: "success",
                    message: "Translation with provided id: " + translationId + ' was deleted from the database.'
                });
        } else {
            res
                .status(404)
                .json({
                    status: "error",
                    message: "Translation with provided id: " + translationId + ' not found in database.'
                });
        }
    } catch (error) {
        res
            .status(500)
            .json({
                status: "error",
                message: "Failed deleting translation."
            });
    }
}


exports.changeTranslationStatus = async function (req, res) {
    const translationId = req.params.translationId;
    let update = {isActive: false};

    if ('active' === req.body.status) {
        update.isActive = true;
    } else if ('inactive' === req.body.status) {
        update.isActive = false;
    } else {
        return res
            .status(400)
            .json({
                status: "error",
                message: `Invalid status value provided accepted is ['active', 'inactive'].`
            });
    }

    try {
        const updated = await Translation.findOneAndUpdate({_id: translationId}, update);

        if (!updated) {
            return res
                .status(404)
                .send({
                    status: "error",
                    message: `Translation with provided id [${translationId}] not found in database`
                });
        } else {
            return res.status(200)
                .send(
                    {
                        status: "success",
                        message: `status for translation with id: ${translationId} has been successfully changed.`,
                        data: `new status is ${updated.isActive ? 'active' : 'inactive'}.`
                    }
                );
        }
    } catch (error) {
        console.log(error);
        return res
            .status(404)
            .json({
                status: "error",
                message: `Problem occurred while updating the status of the Translation. [${error.message}].`
            });
    }
};