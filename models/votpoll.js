const mongoose = require("mongoose")

const VotPollSchema = new mongoose.Schema({
    heading: {
        type: String,
        required: true,
    },
    option1: {
        type: String,
        required: false,
    },
    option2: {
        type: String,
        required: false,
    },
    option3: {
        type: String,
        required: false,
    },
})

module.exports =  mongoose.model("votpoll", VotPollSchema);
