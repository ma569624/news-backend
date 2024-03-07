const express = require('express');
const multer = require('multer');

const app = express();
const upload = multer({ dest: 'uploads/' }); // Destination folder for uploaded files

app.post('/upload', upload.array('files'), (req, res) => {
    // 'files' should match the key used in FormData.append() on the client-side
    console.log(req.files); // Array of uploaded files
    res.send('Files uploaded successfully');
});


const { posttoplinks, gettoplinks, Edittoplinks, Deletetoplinks } = require('../controllers/toplinks');
const Toplinksrouter = express.Router();

Toplinksrouter.route('/toplinks').get(gettoplinks)
Toplinksrouter.route('/toplinks').post(posttoplinks)
Toplinksrouter.route('/toplinks/:id').put(Edittoplinks)
Toplinksrouter.route('/toplinks/:id').delete(Deletetoplinks)

module.exports = Toplinksrouter