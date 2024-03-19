const mongoose = require("mongoose")


const AddressSchema = new mongoose.Schema({
    heading: {
        type: String,
        required: false,
    },
    Status: {
        type: String,
        enum: ['active', 'inactive', 'pending'], // Define allowed values
        default: 'active',
    },
    CompleteAddress: {
        type: String,
        required: false,
    },
    heading2: {
        type: String,
        required: false,
    },
    OtherDetails: {
        type: String,
        required: false,
    },
})



module.exports = mongoose.model("addres", AddressSchema);