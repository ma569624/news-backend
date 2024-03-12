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
    New1: {
        type: String,
        required: false,
    },
    New2: {
        type: String,
        required: false,
    },
    New3: {
        type: String,
        required: false,
    },
    New4: {
        type: String,
        required: false,
    },
    New5: {
        type: String,
        required: false,
    },
    New6: {
        type: String,
        required: false,
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
        required: false,
    },
    SecondLink:{
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
    New1: {
        type: String,
        required: false,
    },
    New2: {
        type: String,
        required: false,
    },
    New3: {
        type: String,
        required: false,
    },
    New4: {
        type: String,
        required: false,
    },
    New5: {
        type: String,
        required: false,
    },
    New6: {
        type: String,
        required: false,
    },
})

const HomeDisplay = mongoose.model("displayblogs", HomeDisplaySchema);
const Rajiyo =  mongoose.model("rajiya", RajiyoSchema);

module.exports =  {HomeDisplay, Rajiyo}
