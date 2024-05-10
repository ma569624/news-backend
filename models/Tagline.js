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
const TajaSamacharSchema = new mongoose.Schema({
    Heading: {
        type: String,
        required: false,
    },
    Status: {
        type: Boolean,
        default: true,
    },
})

const Tagline = mongoose.model("tagline", TaglineSchema);
const TajaSamachar = mongoose.model("tajasamachar", TajaSamacharSchema);

module.exports = {Tagline, TajaSamachar}