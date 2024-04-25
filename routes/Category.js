const express = require('express');
const categoriesRouter = express.Router();

const upload = require("../middleware/uploader");

const { getCategory, postCategory, EditCategory, DeleteCategory, MultiDeleteCategory, MultiEditCategory } = require('../controllers/Category');

categoriesRouter.route('/categories').get(getCategory);
categoriesRouter.route('/categories').post(upload, postCategory);
categoriesRouter.route('/categories/:id').put(upload, EditCategory);
categoriesRouter.route('/categories/:id').delete(DeleteCategory);

categoriesRouter.route('/categories').delete(MultiDeleteCategory);
categoriesRouter.route('/categories').put(MultiEditCategory);

module.exports = categoriesRouter;