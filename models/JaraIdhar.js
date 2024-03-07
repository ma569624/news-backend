const mongoose = require("mongoose")

const JaraIdharSchema = new mongoose.Schema({
   
    Heading: {
        type: String,
        required: false,
    },
    FirstLink: {
        type: String,
        required: false,
    },
    SecondLink: {
        type: String,
        required: false,
    },
    ThirdLink: {
        type: String,
        required: false,
    },
    ForthLink: {
        type: String,
        required: false,
    },
    FiveLink: {
        type: String,
        required: false,
    },
    youTubeheading: {
        type: String,
        required: false,
    },
    youTubelink: {
        type: String,
        required: false,
    },
    mutimediaheading: {
        type: String,
        required: false,
    },
    
})

const JaraIdhar = mongoose.model("jaraidhar", JaraIdharSchema);

module.exports = JaraIdhar