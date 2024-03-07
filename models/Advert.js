const mongoose = require("mongoose")


const AdvertSchema = new mongoose.Schema({
    
    location: {
        type: String,
        required: true,
    },
    Status: {
        type: String,
        enum: ['active', 'inactive', 'pending'], // Define allowed values
        default: 'active',
    },
    url: {
        type: String,
        required: true,
    },
    Image1: {
        type: String,
        required: true,
    },
    Image2: {
        type: String,
        required: true,
    },

})




module.exports = mongoose.model("advert", AdvertSchema);