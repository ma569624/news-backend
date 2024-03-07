const express = require('express');
const Badikhabarrouter = express.Router();

const upload = require("../middleware/uploader");
const { getbadikhabar, postbadikhabar, Editbadikhabar, Deletebadikhabar } = require('../controllers/badikhabare');

Badikhabarrouter.route('/badikhabar').get(getbadikhabar);
Badikhabarrouter.route('/badikhabar').post(upload, postbadikhabar);
Badikhabarrouter.route('/badikhabar/:id').put(upload, Editbadikhabar);
Badikhabarrouter.route('/badikhabar/:id').delete(Deletebadikhabar);

module.exports = Badikhabarrouter;