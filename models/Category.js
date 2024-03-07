const mongoose = require("mongoose")

const CategorySchema = new mongoose.Schema({
    CategoryName: {
        type: String,
        required: true,
    },
    Status: {
        type: String,
        enum: ['active', 'inactive', 'pending'], // Define allowed values
        default: 'active',
    },
    CreationDate: {
        type: Date,
        default: new Date()
    }
})

const Category = mongoose.model("categorie", CategorySchema);

module.exports = Category