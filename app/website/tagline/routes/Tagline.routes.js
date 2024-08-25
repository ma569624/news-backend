const express = require('express');
const router = express.Router();

const getdata = require('../controllers/Tagline.controllers');

router.get('/tagline',getdata.getTagline);

router.get('/tajasamachar', getdata.getTajaSamachar);

module.exports = router;