const mongoose = require('mongoose');
const message = require('./message');
const Schema = mongoose.Schema;

const ConversationSchema = new Schema({
    user1: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    user2: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
  
   
},
{ timestamps: true }
);


module.exports = mongoose.model('Conversation', ConversationSchema);
