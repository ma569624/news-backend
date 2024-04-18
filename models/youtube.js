const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
    kind: String,
    etag: String,
    id: {
        type: [],
        required: false,
    },
    snippet: {
        type: [],
        required: false,
    },
});


// Create and export the YouTubeData model
const YouTubeData = mongoose.model('YouTubeData', videoSchema);
module.exports = YouTubeData;
