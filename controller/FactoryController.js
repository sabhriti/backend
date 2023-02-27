const Factory = require("../model/factoryModel");

exports.index = function (req, res) {
    Factory.get(function (err, factories) {
        if (err) {
            res.json({
                status: "error",
                message: err,
            });
        }
        res.json({
            status: "success",
            message: `Total ${factories.length} factories retrieved`,
            data: factories
        });
    });
};

exports.findById = async function (req, res) {
    const factoryId = req.params.id;
    try {
        res.json(
            {
                status: "success",
                message: 'Factory found',
                data: await Factory.findById(factoryId)
            }
        );
    } catch (error) {
        res
            .status(404)
            .json({
                status: "error",
                message: "Factory with provided id: " + factoryId + ' not found in database.'
            });
    }
}

exports.post = async function (req, res) {
    const factory = req.body;

    try {
        const existingFactory = await Factory.findById(factory.id);

        if (existingFactory) {
            res.json(
                {
                    status: "success",
                    message: 'factory updated',
                    data: await Factory.findByIdAndUpdate(factory.id, factory)
                }
            );
        } else {
            res.json(
                {
                    status: "success",
                    message: 'factory added',
                    data: await Factory.create(factory)
                }
            );
        }
    } catch (error) {
        res
            .status(500)
            .json({
                status: "error",
                message: "Failed Storing factory in database."
            });
    }
};

exports.checkIfExists = async function (req, res) {
    const factoryCode = req.query.code;

    const filter = {code: factoryCode};

    try {
        return Factory.exists(filter, function (err, doc) {
            if (err) {
                console.log(err);
                return res.sendStatus(404);
            } else if (!doc) {
                return res.sendStatus(404);
            } else {
                res.json(
                    {
                        status: "success",
                        message: 'factory exists',
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
    const factoryId = req.params.id;

    try {
        const existingFactory = await Factory.findById(factoryId);
        if (existingFactory) {
            await Factory.findByIdAndRemove(factoryId);
            res
                .status(200)
                .json({
                    status: "success",
                    message: "Factory with provided id: " + factoryId + ' was deleted from the database.'
                });
        } else {
            res
                .status(404)
                .json({
                    status: "error",
                    message: "Factory with provided id: " + factoryId + ' not found in database.'
                });
        }
    } catch (error) {
        res
            .status(500)
            .json({
                status: "error",
                message: "Failed deleting factory."
            });
    }
}
