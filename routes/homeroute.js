const express = require('express');
const router = express.Router();

const {postHomeBanner , getHomeBanner, EditHomeBanner, DeleteHomeBanner} = require('../controllers/home');

const upload = require("../middleware/uploader");


router.route('/banner').get(getHomeBanner);
router.route('/banner').post(upload.array('file', 2), postHomeBanner);
router.route('/banner/:id').put(upload.array('file', 2), EditHomeBanner);
router.route('/banner/:id').delete(DeleteHomeBanner);


module.exports = router;