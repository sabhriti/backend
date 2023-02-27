exports.deleteUserById = async function (req, res) {
    const userId =req.params.userId;
    const deletedItems = await User.deleteOne({_id: userId});

    if (deletedItems <= 0) {
        res
            .status(404)
            .json({
                status: "error",
                message: `User with id ${userId} not found in the database.`
            });
    } else {
        res
            .status(200)
            .json(
                {
                    status: "success",
                    message: `User with id ${userId} removed from database.`
                }
            )
    }
}

const User = require("../model/userModel");
const {Transaction} = require("mongodb");

exports.getAllUsers = async function (req, res) {

    try {
        const allUsers = await User.find();
        res
            .status(200)
            .json(
                {
                    status: "success",
                    message: `Total [${allUsers.length}] users received`,
                    data: allUsers
                }
            )
    } catch (error) {
        res
            .status(404)
            .json({
                status: "error",
                message: `Error occurred while fetching the users from database [${error}}].`
            });
    }
};

exports.getUserStatus = async function (req, res) {
    const userId = req.params.userId;

    try {
        const user = await User.findById(userId);
        res.status(201)
            .json(
                {
                    status: "success",
                    message: `Retrieved status for user with id: ${userId}`,
                    data: {status: user.isActive ? "active" : "inactive"}
                }
            );
    } catch (error) {
        res
            .status(404)
            .json({
                status: "error",
                message: `User with provided id ${userId} not found in the database.`
            });
    }
}

exports.changeUserStatus = async function (req, res) {
    const userId = req.params.userId;
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
        const filter = {_id: userId};
        const toBeUpdated = await Transaction.findOneAndUpdate(filter, update);

        if (!toBeUpdated) {
            return res
                .status(404)
                .send({
                    status: "error",
                    message: `User with provided id [${userId}] not found in database`
                });
        } else {
            const updated = await User.findOne(filter);
            return res.status(201)
                .send(
                    {
                        status: "success",
                        message: `status for user with id: ${userId} has been successfully changed.`,
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
                message: `Problem occurred while updating the status of the user. [${error.message}].`
            });
    }
};