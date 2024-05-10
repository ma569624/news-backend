const express = require('express');
const Taglineroute = express.Router();

const { getTagline, postTagline, EditTagline, DeleteTagline, getTajaSamachar, postTajaSamachar, EditTajaSamachar, DeleteTajaSamachar } = require('../controllers/Tagline');

Taglineroute.route('/tagline').get(getTagline);
Taglineroute.route('/tagline').post(postTagline);
Taglineroute.route('/tagline/:id').put(EditTagline);
Taglineroute.route('/tagline/:id').delete(DeleteTagline);

Taglineroute.route('/tajasamachar').get(getTajaSamachar);
Taglineroute.route('/tajasamachar').post(postTajaSamachar);
Taglineroute.route('/tajasamachar/:id').put(EditTajaSamachar);
Taglineroute.route('/tajasamachar/:id').delete(DeleteTajaSamachar);

module.exports = Taglineroute;