const User = require("../model/userModel");
const bcrypt = require("bcrypt");
const Factory = require("../model/factoryModel");

class UserRegistration {
    createModel(request) {
        return new User({
            fullName: request.body.fullName,
            address: request.body.address,
            telephone: request.body.telephone,
            email: request.body.email,
            password: request.body.password
        });
    }
    async createHash(rawPassword) {
        try {
            const salt = await bcrypt.genSalt(10);
            return await bcrypt.hash(rawPassword, salt);
        } catch (error) {
            console.log(error);
            throw new Error('Failed adding new user [password_hash_problem].');
        }
    }

    validateUser(user) {
        return user.fullName !== '' && user.address !== '' && user.email !== '' && user.password !== '';
    }

    async saveUser(user) {
        try {
            user.password = await this.createHash(user.password);
            return await user.save();
        } catch (error) {
            console.log(error);
            throw new Error("Failed storing the user in database.");
        }
    }

    async userDoesNotExists(user) {
        const existing = await User.findOne({email: user.email});

        if (existing) {
            throw new Error("User already exists.");
        }
        return true;
    }
}

exports.registerUser = async function (request, response) {
    const userRegistration = new UserRegistration();
    const userModel = userRegistration.createModel(request);
    const userValid = userRegistration.validateUser(userModel);

    if (userValid) {
        try {
            const userDoesNotExists = await userRegistration.userDoesNotExists(userModel);

            if (userDoesNotExists) {
                const savedUser = await userRegistration.saveUser(userModel);
                savedUser.password = '';

                response.status(201).json({
                    status: "created",
                    message: "successfully register",
                    data: savedUser
                });
            }
        } catch (error) {
            console.log(error.message);
            response.status(500).json({
                message: error.toString()
            });
        }
    } else {
        response.status(400).json({
            status: "failed",
            message: 'Provided data is not valid.',
        });
    }
}

exports.index = function (req, res) {
    Factory.get(function (err, questions) {
        if (err) {
            res.json({
                status: "error",
                message: err,
            });
        }
        res.json({
            status: "success",
            message: "factories retrieved",
            data: questions
        });
    });
};

