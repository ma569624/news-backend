const express = require('express');
const BlogRouter = express.Router();

const upload = require("../middleware/uploader");
const { getBlog, postBlog, EditBlog, DeleteBlog, MultiDeleteBlog, MultiEditBlog, getAllBlog } = require('../controllers/Blog');

BlogRouter.route('/blogs').get(getBlog);
BlogRouter.route('/blogs').post(upload, postBlog);
BlogRouter.route('/blogs/:id').put(upload, EditBlog);
BlogRouter.route('/blogs/:id').delete(DeleteBlog);


BlogRouter.route('/allblogs').get(getAllBlog);
BlogRouter.route('/blogs').delete(MultiDeleteBlog);
BlogRouter.route('/blogs').put(MultiEditBlog);

module.exports = BlogRouter;