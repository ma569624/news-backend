const mongoose = require('mongoose');

const toplinksSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    link: {
        type: String,
        unique: true,
        require: false
    },
    Position: {
        type: String,
        require: false
    },
    background: {
        type: String,
        require: false
    },
    Image:{
        type: String,
        require: false
    },
    createdate: {
        type: Date,
        default: new Date()
    }
})

module.exports = mongoose.model('toplinks', toplinksSchema);