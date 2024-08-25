const express = require('express');
const router = express.Router();

const Category = require('../controllers/Category.controllers');

router.get('/categories', Category.getCategory)


module.exports = router;