const mongoose = require("mongoose")


const TeamSchema = new mongoose.Schema({
    
    heading: {
        type: String,
        required: false,
    },
    Status: {
        type: String,
        enum: ['active', 'inactive', 'pending'], // Define allowed values
        default: 'active',
    },
    EmployeeImage: {
        type: String,
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
    Place: {
        type: String, 
        required: false,
    },
    EmployeeDetails: {
        type: String,
        required: false,
    },
    CreationDate: {
        type: Date,
        default: new Date()
    }

})




module.exports = mongoose.model("team", TeamSchema);