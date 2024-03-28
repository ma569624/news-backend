const express = require('express');
const { posttoplinks, gettoplinks, Edittoplinks, Deletetoplinks } = require('../controllers/toplinks');
const Toplinksrouter = express.Router();
const upload = require("../middleware/uploader");   

Toplinksrouter.route('/toplinks').get(gettoplinks)
Toplinksrouter.route('/toplinks').post(posttoplinks)
Toplinksrouter.route('/toplinks/:id').put(upload, Edittoplinks)

Toplinksrouter.route('/toplinks/:id').delete(Deletetoplinks)

module.exports = Toplinksrouter