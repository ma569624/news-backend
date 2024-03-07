const express = require('express');
const router = express.Router();

// const {postHomeBanner , getHomeBanner, EditHomeBanner, DeleteHomeBanner} = require('../controllers/home');

const upload = require("../middleware/uploader");
const { getshubhkamna, postshubhkamna, Editshubhkamna, Deleteshubhkamna } = require('../controllers/shubhkamna');


router.route('/shubhkamna').get(getshubhkamna);
router.route('/shubhkamna').post(upload, postshubhkamna);
router.route('/shubhkamna/:id').put(upload, Editshubhkamna);
router.route('/shubhkamna/:id').delete(Deleteshubhkamna);


module.exports = router;