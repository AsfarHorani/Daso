const mongoose = require('mongoose')
const Schema = mongoose.Schema;


const userSchema = new Schema({
    name: {
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
        type: Array,
        default:[]
    }   

})


module.exports = mongoose.model('User', userSchema);
