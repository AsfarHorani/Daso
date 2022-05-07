const mongoose = require('mongoose')
const Schema = mongoose.Schema;


const userSchema = new Schema({
    name: {
        type: String
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        req: true

    },
    imageUrl: {
        type: String,

    },
    status:{
        type: String,
        default:""
    }

})


module.exports = mongoose.model('User', userSchema);
