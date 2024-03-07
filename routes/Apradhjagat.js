const express = require('express');
const ApradhJagatrouter = express.Router();

const upload = require("../middleware/uploader");
const { getApradhjagat, postApradhjagat, EditApradhjagat, DeleteApradhjagat } = require('../controllers/Apradhjagat');

ApradhJagatrouter.route('/apradhjagat').get(getApradhjagat);
ApradhJagatrouter.route('/apradhjagat').post(upload, postApradhjagat);
ApradhJagatrouter.route('/apradhjagat/:id').put(upload, EditApradhjagat);
ApradhJagatrouter.route('/apradhjagat/:id').delete(DeleteApradhjagat);

module.exports = ApradhJagatrouter;