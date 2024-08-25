const express = require('express');
const router = express.Router();

const upload = require("../../../middleware/uploader");
const blog = require('../controllers/Blog.controllers');

router.get('/blogsearch/:id', blog.getblogsearch)
router.get('/allblogs', blog.getAllBlog)
router.get('/headerblogs', blog.getheaderblog)
router.get('/blogs', blog.getBlog);

module.exports = router;