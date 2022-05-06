const mongoose = require('mongoose')
const Schema = mongoose.Schema;


const userSchema = new Schema({
    name: {
        type: String
    },
    username: {
        type: String
    },
    email: {
        type: String,
        required: true
    },
    password:{
        type: String,
        req: true
       
    },
    contacts: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        default:[]
    }   

})


module.exports = mongoose.model('User', userSchema);
