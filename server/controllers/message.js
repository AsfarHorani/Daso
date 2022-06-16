const Message = require("../models/message");
const { validationResult } = require("express-validator/check");
const io = require('../socket');
exports.sendMessage = async (req, res, next) => {

    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {

            const error = new Error(errors.array()[0].msg || 'Validation failed.');
            error.statusCode = 422;
            error.data = errors.array();

            throw error;
        }
        const text = req.body.text;
        const sender = req.body.senderId;
        const convId = req.params.convId;
        let imageUrl =null
        console.log(22,req.body)

        if(req.file){
            imageUrl = req.file.path
        }else{
            imageUrl = null;
        }

        const message = new Message({
            text: text,
            sender: sender,
            convId: convId,
            imageUrl:imageUrl
        });



        const messageRes = await message.save();
        io.getIO().emit("message", { action: 'send', message: message })
        res.status(200).json(messageRes);
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500
        }
        next(err)
    }


}

exports.sendImage = async (req, res, next) => {
     
     const file =null
     if(!file){
        return;
     }
     console.log(file)
     file = req.file.path;
     
    try {
          
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

            res.status(200).json({
                message: "Success!",
                messages: messages
            })
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err)

        })
}
