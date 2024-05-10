const mongoose = require("mongoose")

const CategorySchema = new mongoose.Schema({
    category: {
        type: String,
        required: true,
    },
    heading: {
        type: String,
        required: false,
    },

    categorylogo: {
        type: String,
        required: false,
    },
    headinglogo: {
        type: String,
        required: false,
    },
    categorybackground:{
        type: String,
        required: false,
    },
    headingbackground:{
        type: String,
        required: false,
    },
    isHeader: {
        type: Boolean,
        default: false,
    },
    location:{
        type: String,
        required: false,
    },
    order: {
        type: Number,
        require: false,
    },
    Status: {
        type: Boolean,
        default: false,
    },
})

const Category = mongoose.model("categorie", CategorySchema);

module.exports = Category