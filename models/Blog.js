const mongoose = require("mongoose")

const BlogSchema = new mongoose.Schema({
    Category: {
        type: Array,
        required: false,
    },
    Position: {
        type: [String],
        required: true,
    },
    StateName: {
        type: [String],
        required: false,
    },
    ReporterImage: {
        type: String,
        required: false,
    },
    ReporterName: {
        type: String,
        required: false,
    },
    Designation: {
        type: String,
        required: false,
    },
    DatePlace: {
        type: String,
        required: false,
    },
    Capton:{
        type: String,
        required: false,
    },
    Status: {
        type: String,
        enum: ['active', 'inactive', 'pending'], // Define allowed values
        default: 'active',
    },
    Heading: {
        type: String,
        required: false,
    },
    Subheading: {
        type: String,
        required: false,
    },
    Image: {
        type: String,
        required: false,
    },
    Video: {
        type: String,
        required: false,
    },
    Audio: {
        type: String,
        required: false,
    },
    Matter: {
        type: String,
        required: false,
    },
    CreationDate: {
        type: Date,
        default: new Date()
    }
})

// Middleware to parse Position array as JSON before saving
BlogSchema.pre('save', function(next) {
    if (this.Position && Array.isArray(this.Position)) {
        this.Position = this.Position.map(position => JSON.parse(position));
    }
    next();
});


module.exports = mongoose.model("blog", BlogSchema);