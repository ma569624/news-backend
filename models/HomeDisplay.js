const mongoose = require("mongoose")

const HomeDisplaySchema = new mongoose.Schema({
    SectionName: {
        type: String,
        required: true,
    },
    SecondSection: {
        type: String,
        required: false,
    },
    Image1: {
        type: String,
        required: false,
    },
    Image2: {
        type: String,
        required: false,
    },
    background1:{
        type: String,
        required: false,
    },
    background2:{
        type: String,
        required: false,
    },
    isHeader: {
        type: Boolean,
        default: false,
    },
    Status: {
        type: String,
        enum: ['active', 'inactive', 'pending'], // Define allowed values
        default: 'active',
    },
    
})
const RajiyoSchema = new mongoose.Schema({
    
    StateName: {
        type: String,
        required: true,
    },
    SecondSection: {
        type: String,
        required: false,
    },
    Image1: {
        type: String,
        required: false,
    },
    Image2: {
        type: String,
        required: false,
    },
    background1:{
        type: String,
        required: false,
    },
    background2:{
        type: String,
        required: false,
    },
    FirstLink: {
        type: String,
        required: false,
    },
    Status: {
        type: String,
        enum: ['active', 'inactive'], // Define allowed values
        default: 'active',
    },
    order: {
        type: Number,
        require: false,
    },
    CreationDate: {
        type: Date,
        default: new Date()
    }
   
})

const HomeDisplay = mongoose.model("displayblogs", HomeDisplaySchema);
const Rajiyo =  mongoose.model("rajiya", RajiyoSchema);

module.exports =  {HomeDisplay, Rajiyo}
