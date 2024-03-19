const mongoose = require("mongoose")


const RulesSchema = new mongoose.Schema({
    heading: {
        type: String,
        required: false,
    },
    Status: {
        type: String,
        enum: ['active', 'inactive', 'pending'], // Define allowed values
        default: 'active',
    },
    CompleteDetails: {
        type: String,
        required: false,
    },
})



module.exports = mongoose.model("rules", RulesSchema);