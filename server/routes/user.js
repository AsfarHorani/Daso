const express = require('express');
const router = express.Router();
const userRouters = require('../controllers/user');
const isAuth = require('../auth')
const { body, check } = require('express-validator');
const User = require('../models/user')
const convoRoutes = require('../controllers/conversation');
const messageRoutes = require('../controllers/message')
const mongoose = require('mongoose');
const upload = require("../utils/multer");

router.post('/signup', upload.single('image'), [
    body('email', "email has to be valid").isEmail()
        .withMessage('Please enter a valid email address.')
        .normalizeEmail().custom(value => {
            return User.findOne({ email: value }).then(user => {
                if (user) {
                    console.log(user)
                    return Promise.reject('Email already in use');
                }
            })
        }),
    body('password', 'Password has to be valid.')
        .isLength({ min: 8 })
        .trim(),

    body('name', "Name is't correct")
        .trim()
        .isLength({ min: 3 }),
]
    , userRouters.signup);


router.post('/login', [
    body('email')
        .isEmail()
        .withMessage('Please enter a valid email address.')
        .normalizeEmail(),
    body('password', 'Password has to be valid.').isLength({ min: 8 })
], userRouters.login);


router.post('/createConversation', isAuth, [
    body(['user1', 'user2']).custom(val => {
        if (!mongoose.Types.ObjectId.isValid(val)) {
            return Promise.reject('RecieverId isn\'t valid');
        }
    })
], convoRoutes.createConvo)


router.post("/sendMessage/:convId", isAuth, [
    body('text', "Message is not valid")
        .not().isEmpty()
        .withMessage("Message cannot be empty")
], messageRoutes.sendMessage)

router.get("/getMessages/:convId", isAuth, messageRoutes.getMessages);

router.post("/sendImages", upload.array('images', 3), (req, res, next) => {
    console.log(req.files);
    res.json({
        msg: "sucess"
    })
});
router.get('/find-conversations/:query',userRouters.searchUsers);

module.exports = router;