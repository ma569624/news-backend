const Blog = require('../models/Blog');
const { BlogHelper } = require('./helper/Helper');

const getBlog = async (req, res) => {
    // const categoriesquery = req.query.Category;
    // const iscategories = categoriesquery;
    // const queryValue = req.query.Position; // Assuming Position is the correct field to query

    console.log(req.query);

    try {
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 8;
        const Category = req.query.Category || '';
        const tajasamachar = req.query.tajasamachar || '';
        const Id = req.query._id || '';

        console.log(page);
        console.log(limit);
        console.log(Id);

        let skip = (page - 1) * limit;
        let sortQuery

        if (Category) {
            sortQuery = { Category: { $regex: Category, $options: 'i' } };
        }
        if (tajasamachar) {
            sortQuery = { tajasamachar: { $regex: tajasamachar, $options: 'i' } };
        }
        if (Id) {
            sortQuery = { _id: Id };
        }

        const data = await Blog.find(sortQuery).skip(skip).limit(limit).sort({ createdAt: 1 });
        res.status(200).json({ data, nbHits: data.length });

    } catch (error) {
        res.status(500).json(error);
    }
};

const postBlog = async (req, res) => {
    try {
        // console.log(req.body)
        const items = BlogHelper(req);
        console.log(items)
        const data = new Blog(items)
        const result = await data.save();
        console.log(result)
        res.status(200).json(result);
        // res.send(items)
    } catch (error) {
        res.status(200).json({ message: 'error created successfully', error });
    }
}

const EditBlog = async (req, res) => {
    try {
        const data = BlogHelper(req)
        console.log(data)
        const itemId = req.params.id;
        updatedItem = await Blog.findByIdAndUpdate(itemId, data, {
            new: true, // return the modified document rather than the original
        });
        // console.log(updatedItem)
        res.status(200).json(updatedItem);
    }

    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

const DeleteBlog = async (req, res) => {
    const splitarray = req.params.id.split('&');
    const Id = splitarray[0];
    const Category = splitarray[1]
    console.log(splitarray)

    try {
        const result = await Blog.deleteOne({ _id: Id });
        // Check if the product was found and deleted
        if (result.deletedCount === 0) {
            return res.status(404).json({ error: 'Product not found' });
        }
        // Respond with a success message
        res.json({ message: 'Product deleted successfully' });
    } catch (error) {
        console.error('Error deleting product:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}


module.exports = { getBlog, postBlog, EditBlog, DeleteBlog };
