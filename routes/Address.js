const express = require('express');
const { getAddress, EditAddress, postAddress } = require('../controllers/Address');
const AddressRouter = express.Router();

AddressRouter.route('/address').get(getAddress);
AddressRouter.route('/address').post(postAddress);
AddressRouter.route('/address/:id').put(EditAddress);

module.exports = AddressRouter;