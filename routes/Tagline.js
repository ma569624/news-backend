const express = require('express');
const Taglineroute = express.Router();

const upload = require("../middleware/uploader");
const { getTagline, postTagline, EditTagline, DeleteTagline } = require('../controllers/Tagline');
// const { getbadikhabar, postbadikhabar, Editbadikhabar, Deletebadikhabar } = require('../controllers/badikhabare');

Taglineroute.route('/tagline').get(getTagline);
Taglineroute.route('/tagline').post(upload, postTagline);
Taglineroute.route('/tagline/:id').put(upload, EditTagline);
Taglineroute.route('/tagline/:id').delete(DeleteTagline);

module.exports = Taglineroute;