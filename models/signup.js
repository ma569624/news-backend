const mongoose = require('mongoose');

const SignupSchema = new mongoose.Schema({
    name: {
        type: String,
        require: false
    },
    profile: {
        type: String,
        require: false
    },
    Destination: {
        type: String,
        require: false
    },
    Destination: {
        type: String,
        require: false
    },
    Place: {
        type: String,
        require: false
    },
    email: {
        type: String,   
        unique: false,
        require: false
    },
    number: {
        type: String,
        require: false
    },
    access_delete:{
        type: Boolean,
        require: false
    },
    User_name: {
        type: String,
        // unique: true,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    user_type: {
        type: String,
        require: false
    },
    user_image: {
        type: String,
        require: false
    },
    user_status: {
        type: String,
        require: false
    },
    user_block: {
        type: Boolean,
        default: false,
    },
    Signupdate: {
        type: Date,
        default: new Date()
    },
    type: {
        type: String,
        require: false,
    }
})

module.exports = mongoose.model('Signup', SignupSchema);