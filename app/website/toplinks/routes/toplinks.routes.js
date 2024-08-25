const express = require('express');
const { gettoplinks } = require('../controllers/toplinks.controllers');
const Toplinksrouter = express.Router();
const upload = require("../../../middleware/uploader");   

Toplinksrouter.route('/toplinks').get(gettoplinks)

module.exports = Toplinksrouter