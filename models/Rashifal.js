const mongoose = require("mongoose")

const RashifalSchema = new mongoose.Schema({
    heading: {
        type: String,
        required: true,
    },
    Status: {
        type: String,
        enum: ['active', 'inactive', 'pending'], // Define allowed values
        default: 'active',
    },
    Name: {
        type: String,
        required: true,
    },
    Image1: {
        type: String,
        required: true,
    },
    Detail: {
        type: String,
        required: true,
    },

})

const JyotishSchema = new mongoose.Schema({
    heading: {
        type: String,
        required: true,
    },
    Status: {
        type: String,
        enum: ['active', 'inactive', 'pending'], // Define allowed values
        default: 'active',
    },
    Name: {
        type: String,
        required: true,
    },
    Image1: {
        type: String,
        required: true,
    },
    Detail: {
        type: String,
        required: true,
    },
    property: {
        type: String,
        required: true,
    },
})

const RashiFal = mongoose.model("rashifal", RashifalSchema);
const Jyotish = mongoose.model("jyotish", JyotishSchema);

module.exports = { RashiFal, Jyotish }