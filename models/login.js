const mongoose = require('mongoose');

const loginSchema = new mongoose.Schema({
    User_name: {
        type: String,
        require: true
    },
    logindate: {
        type: Date,
        default: new Date()
    },
    ipaddres: {
        type: String,
        require: false
    }
})

module.exports = mongoose.model('login', loginSchema);