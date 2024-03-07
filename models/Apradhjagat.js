const mongoose = require("mongoose")

const ApradhJagatSchema = new mongoose.Schema({
    
    ReporterImage: {
        type: String,
        required: false,
    },
    ReporterName: {
        type: String,
        required: false,
    },
    Designation: {
        type: String,
        required: false,
    },
    DatePlace: {
        type: String,
        required: false,
    },
    Heading: {
        type: String,
        required: false,
    },
    Subheading: {
        type: String,
        required: false,
    },
    Image: {
        type: String,
        required: false,
    },
    Matter: {
        type: String,
        required: false,
    }
})

const ApradhJagat = mongoose.model("apradhjagat", ApradhJagatSchema);

module.exports = ApradhJagat