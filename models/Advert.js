const mongoose = require("mongoose")


const AdvertSchema = new mongoose.Schema({

    Status: {
        type: String,
        enum: ['active', 'inactive', 'pending'], // Define allowed values
        default: 'active',
    },
    location: {
        type: [String],
        required: true,
    },
    url: {
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
    Video: {
        type: String,
        required: false,
    },

})




module.exports = mongoose.model("advert", AdvertSchema);