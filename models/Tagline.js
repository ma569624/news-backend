const mongoose = require("mongoose")

const TaglineSchema = new mongoose.Schema({
   
    Heading: {
        type: String,
        required: false,
    },
    Status: {
        type: String,
        enum: ['active', 'inactive', 'pending'], // Define allowed values
        default: 'active',
    },
    
})

const Tagline = mongoose.model("tagline", TaglineSchema);

module.exports = Tagline