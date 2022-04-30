const User = require('../models/user');
const bcrypt = require('bcrypt');
const { validationResult } = require("express-validator/check");
const jwt = require("jsonwebtoken");



exports.signup = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new Error('Validation failed.');
        error.statusCode = 422;
        error.data = errors.array();
        throw error;
    }
    const name = req.body.name;
    const password = req.body.password;
    const email = req.body.email;

    console.log(req.body)
    bcrypt.hash(password, 12)
        .then(hashedPassword => {
            const user = new User({
                name: name,
                email: email,
                password: hashedPassword,
            })
            return user.save()
        }).then(result => {
            console.log(result)
            res.status(200).json({
                message: 'Sign up successful',
                user: result
            })
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        })


}
exports.login = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new Error('Validation failed.');
        error.statusCode = 422;
        error.data = errors.array();
        throw error;
    }
    console.log(req.body.email, req.body.password)
    const email = req.body.email;
    const password = req.body.password;
    let loadedUser;
    console.log(email, password)
    User.findOne({ email: email })
        .then(user => {

            if (!user) {
                console.log("user doesnt exist")
                const error = new Error("User doesn't exist");
                error.statusCode = 401;
                throw error;
            }

            loadedUser = user;

            return bcrypt.compare(password, user.password)
        })
        .then(doMatch => {
            if (!doMatch) {
                console.log('incorrect password')
                const error = new Error("Password is incorrect");
                error.statusCode = 403;
                throw error;
            }
            console.log(loadedUser)
            const token = jwt.sign({
                email: loadedUser.email,
                userId: loadedUser._id.toString()
            }, 'secret', { expiresIn: '1h' })

            console.log(loadedUser)
            res.status(200).json({
                token: token,
                userId: loadedUser._id,
                message: "Login succesfull"
            })
            console.log('login success')
        })

        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        })


}