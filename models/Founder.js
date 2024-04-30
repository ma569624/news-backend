const mongoose = require("mongoose")


const FounderSchema = new mongoose.Schema({
    Status: {
        type: String,
        enum: ['active', 'inactive', 'pending'], // Define allowed values
        default: 'active',
    },
    heading: {
        type: String,
        required: false,
    },
   
    EmployeeImage: {
        type: Buffer, // Store image as a buffer
        required: false,
    },
    EmployeeName: {
        type: String,
        required: false,
    },
    EmployeeDesignation: {
        type: String,
        required: false,
    },
    EmailAddress: {
        type: String,
        required: false,
    },
    ContactNumber: {
        type: String,
        required: false,
    }

})




module.exports = mongoose.model("founder", FounderSchema);