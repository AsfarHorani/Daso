const mongoose = require('mongoose');


const Schema = mongoose.Schema;

const messageSchema = new Schema({

    text: {
        type: String,
        require: true

    },
    sender: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true

    },
    reciever: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true

    },
    imageUrl: {
        type: String
    },


    convId: {
        type: Schema.Types.ObjectId,
        ref: 'Conversation',
        required: true

    }

}, { timestamps: true, })

module.exports = mongoose.model('Message', messageSchema);
