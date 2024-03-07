const mongoose = require("mongoose")

const HomeBannerSchema = new mongoose.Schema({
    banner: {
        type: String,
        required: true,
    },
    subheading: {
        type: String,
        required: true,
    },
    heading: {
        type: String,
        required: true,
    },
    shortdesc: {
        type: String,
        required: true,
    }
})
const ShubhkamnaSchema = new mongoose.Schema({
    Category: {
        type: String,
        required: true,
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
    Status: {
        type: String,
        enum: ['active', 'inactive', 'pending'], // Define allowed values
        default: 'active',
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
    },
   
    CreationDate: {
        type: Date,
        default: new Date()
    }
})

const HomeBanner = mongoose.model("HomeBanner", HomeBannerSchema);
const Shubhkamna = mongoose.model("Shubhkamna", ShubhkamnaSchema);

module.exports = {HomeBanner, Shubhkamna};