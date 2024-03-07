const mongoose = require('mongoose');

const toplinksSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    link: {
        type: String,
        unique: true,
        require: true
    },
    Position: {
        type: String,
        require: true
    },
    createdate: {
        type: Date,
        default: new Date()
    }
})

module.exports = mongoose.model('toplinks', toplinksSchema);