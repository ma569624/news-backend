const mongoose = require("mongoose")

const BlogSchema = new mongoose.Schema({
    Category: {
        type: String,
        required: false,
    },
    Headline:{
        type: Boolean,
        required: false,
    },

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
    Capton:{
        type: String,
        required: false,
    },
    
    Status: {
        type: Boolean,
        default: true,
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
    Video: {
        type: String,
        required: false,
    },
    Audio: {
        type: String,
        required: false,
    },
    Matter: {
        type: String,
        required: false,
    },
    order: {
        type: Number,
        required: false,
        unique: true
    },
    CreationDate: {
        type: Date,
        default: new Date()
    }
})




module.exports = mongoose.model("blog", BlogSchema);