const express = require('express');
const Address = require('../controllers/Address.controllers');
const router = express.Router();

router.get('/address', Address.getAddress);

module.exports = router;