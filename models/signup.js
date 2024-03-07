const mongoose = require('mongoose');

const SignupSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    // username: {
    //     type: String,
    //     require: true

    // },
    email: {
        type: String,
        unique: true,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    Signupdate: {
        type: Date,
        default: new Date()
    }
})

module.exports = mongoose.model('Signup', SignupSchema);