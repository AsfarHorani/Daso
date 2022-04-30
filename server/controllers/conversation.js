const conversation = require('../models/conversation');

exports.createConvo = (req, res, next) => {
    const user1 = req.body.user1;
    const user2 = req.body.user2;
    const convo = new conversation({
        user1: user1,
        user2: user2
    })

    convo.save()
        .then(result => {
            console.log(result)
            res.status(200).json({
                converstaion: result,
                message: "created conversation!"
            })
        })
        .catch(err => {
            console.log(err)
        })
}

exports.getConversations = (req, res, next) => {
    const userId = req.params.userId;
    conversation.find({ $or: [{ userId: user1 }, { userId: user2 }] })
        .then(conversations => {
            res.status(200).json({
                message: "Success!",
                conversations: conversations
            })
        })
        .then(err => {
            console.log(err);
        })
}


