const express = require('express');
const { getAddress, EditAddress, postAddress } = require('../controllers/Address.controllers');
const router = express.Router();

router.get('/address', getAddress);
router.route('/address').post(postAddress);
router.route('/address/:id').put(EditAddress);

module.exports = router;