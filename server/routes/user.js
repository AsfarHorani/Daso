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
        .normalizeEmail().custom(async value => {
            const user = await User.findOne({ email: value });
            if (user) {
                return Promise.reject('Email already in use');
            }
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


router.post('/createConversation',  [
    body(['user1', 'user2']).custom(val => {
        if (!mongoose.Types.ObjectId.isValid(val)) {
            return Promise.reject('RecieverId isn\'t valid');
        }
    })
], convoRoutes.createConvo)


router.post("/sendMessage/:convId", upload.single('image'), isAuth,
 [body('text', "Message cannot be empty").not().isEmpty()], messageRoutes.sendMessage);

router.get("/getMessages/:convId", isAuth, messageRoutes.getMessages);

router.post("/sendImages", upload.array('images', 3), (req, res, next) => {
    res.json({
        msg: "sucess"
    })
});
router.get('/find-conversations/:query',userRouters.searchUsers);

router.get('/get-conversation/:userId', convoRoutes.getConversations);
router.get('/get-user/:userId', userRouters.getUser)

module.exports = router;