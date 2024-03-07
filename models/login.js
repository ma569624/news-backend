const mongoose = require('mongoose');

const loginSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        require: true
    },
    logindate: {
        type: Date,
        default: new Date()
    }
})

module.exports = mongoose.model('login', loginSchema);