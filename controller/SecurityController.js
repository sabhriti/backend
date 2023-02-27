const User = require("../model/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

exports.login = async function (request, response) {
    const email = request.body.email;
    const password = request.body.password;

    if (email === '' || password === '') {
        response.status(400).json({
            status: "failed",
            message: 'Email or password is empty.',
        });
    } else {
        const existingUser = await User.findOne({email: request.body.email});
        if (!existingUser) {
            response.status(401).json({
                status: "failed",
                message: 'Provided email does not exists.',
            });
        } else {
            try {
                const isValid = await bcrypt.compare(password, existingUser.password);

                if (isValid && existingUser.isActive) {
                    jwt.sign({user: existingUser}, 'secretkey', (err, token) => {
                        response.status(200).json({
                            token
                        });
                    });
                } else if(!existingUser.isActive) {
                    response.status(401)
                        .json({
                        status: 'failed',
                        message: 'Provided user is not active yet. Please contact your administrator to activate it. '
                    });
                } else {
                    response.status(400).json({
                        status: 'failed',
                        message: 'Invalid password'
                    });
                }
            } catch (error) {
                console.log(error);
                response.status(500).json({
                    status: 'failed',
                    message: 'failed to perform login'

                });
            }
        }
    }
};
