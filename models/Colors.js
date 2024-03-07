const mongoose = require("mongoose")

const ColorsSchema = new mongoose.Schema({
    BackgroundColor1: {
        type: String,
        default: 'Black',
    },
    BackgroundColor2: {
        type: String,
        default: 'red',
    },
    TextColor1: {
        type: String,
        default: 'white',
    },
    TextColor2: {
        type: String,
        default: 'white',
    }
})


module.exports = mongoose.model("color", ColorsSchema);