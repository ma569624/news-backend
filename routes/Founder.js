const express = require('express');
const { getFounder, postFounder, EditFounder, DeleteFounder } = require('../controllers/Founder');
const FounderRouter = express.Router();

const upload = require("../middleware/uploader");

FounderRouter.route('/founder').post(upload, postFounder);
FounderRouter.route('/founder/:id').put(upload, EditFounder);
FounderRouter.route('/founder/:id').delete(DeleteFounder);
FounderRouter.route('/founder').get(getFounder);

module.exports = FounderRouter;