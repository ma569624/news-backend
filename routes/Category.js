const express = require('express');
const categoriesRouter = express.Router();

const upload = require("../middleware/uploader");

const { getCategory, postCategory, EditCategory, DeleteCategory, MultiDeleteCategory, MultiEditCategory } = require('../controllers/Category');

categoriesRouter.route('/categories').get(getCategory);
categoriesRouter.route('/categories').post(upload, postCategory);
categoriesRouter.route('/categories/:id').put(upload, EditCategory);
categoriesRouter.route('/categories/:id').delete(DeleteCategory);

categoriesRouter.route('/multicategories').delete(MultiDeleteCategory);
categoriesRouter.route('/multicategories').put(MultiEditCategory);

module.exports = categoriesRouter;