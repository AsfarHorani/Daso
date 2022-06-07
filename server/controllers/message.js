const Message = require("../models/message");
const { validationResult } = require("express-validator/check");

exports.sendMessage =async  (req, res, next) => {
    try {
    const errors = validationResult(req);
    console.log(errors)
    if (!errors.isEmpty()) {
        
        const error = new Error(errors.array()[0].msg||'Validation failed.');
        error.statusCode = 422;
        error.data = errors.array();
  
        throw error;
    }
    const text = req.body.text;
    const sender = req.body.senderId;
    //const reciever = req.body.recieverId;
    const convId = req.params.convId;

    const message = new Message({
        text: text,
        sender: sender,
       // reciever: reciever,
        convId: convId
    });
    
        const messageRes = await message.save();
        res.status(200).json(messageRes);
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500
        }
        next(err)
    }


}


exports.getMessages = (req, res, next) => {
    const convId = req.params.convId;
    Message.find({ convId: convId })
        .then(messages => {
            console.log(41,messages)
            res.status(200).json({
                message: "Success!",
                messages: messages
            })
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode=500;
            }
            next(err)

        })
}
