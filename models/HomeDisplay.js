const mongoose = require("mongoose")

const HomeDisplaySchema = new mongoose.Schema({
    SectionName: {
        type: String,
        required: false,
    },
    SecondSection: {
        type: String,
        required: false,
    },
    StateName: {
        type: String,
        required: false,
    },
    isRajiya: {
        type: Boolean,
        required: false,
    },
    FirstLink: {
        type: String,
        required: false,
    },
    SecondLink:{
        type: String,
        required: true,
    },
    ThirdLink: {
        type: String,
        required: true,
    }, 
    ForthLink: {
        type: String,
        required: true,
    }, 
    FiveLink: {
        type: String,
        required: true,
    },
    New1: {
        type: String,
        required: true,
    },
    New2: {
        type: String,
        required: true,
    },
    New3: {
        type: String,
        required: true,
    },
    New4: {
        type: String,
        required: true,
    },
    New5: {
        type: String,
        required: true,
    },
    New6: {
        type: String,
        required: true,
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
    FirstLink: {
        type: String,
        required: true,
    },
    SecondLink:{
        type: String,
        required: true,
    },
    ThirdLink: {
        type: String,
        required: true,
    }, 
    ForthLink: {
        type: String,
        required: true,
    }, 
    FiveLink: {
        type: String,
        required: true,
    },
    New1: {
        type: String,
        required: true,
    },
    New2: {
        type: String,
        required: true,
    },
    New3: {
        type: String,
        required: true,
    },
    New4: {
        type: String,
        required: true,
    },
    New5: {
        type: String,
        required: true,
    },
    New6: {
        type: String,
        required: true,
    },
})

const HomeDisplay = mongoose.model("displayblogs", HomeDisplaySchema);
const Rajiyo =  mongoose.model("rajiya", RajiyoSchema);

module.exports =  {HomeDisplay, Rajiyo}
