const { Rajiyo } = require("../models/HomeDisplay");
const Blog = require('../models/Blog');

const getRajiyo = async (req, res) => {
    const mydata = await Rajiyo.find(req.query);
    // console.log(mydata)
    res.status(200).json(mydata);
};

const postRajiyo = async (req, res) => {
    try {
        console.log(req.body)
        const items = req.body;
        const data = new Rajiyo(items);
        const result = await data.save();
        console.log(result)
        res.status(200).json(result);
    } catch (error) {
        res.status(200).json({ message: 'error created successfully', error });
    }
}

const EditRajiyo = async (req, res) => {
    const categoriesquery = req.body.SectionName;
    // const categoriesquery = req.query.SectionName;
    const iscategories = categoriesquery;
    try {
        const data = req.body;
        const itemId = req.params.id;
        const exitsdata = await HomeDisplay.findById(itemId);

        const updatedItem = await Rajiyo.findByIdAndUpdate(itemId, data, {
            new: true, // return the modified document rather than the original
        });

        console.log(exitsdata.SectionName)
        console.log(categoriesquery)

        // Find blogs where Category array contains "अपराध समाचार"
        const docs = await Blog.find({ Category: { $regex: `${exitsdata.SectionName}` } });
        console.log('Filtered Data:', docs);

        // Update the category name in all matching blogs
        const result = await Blog.updateMany(
            { "Category": { $regex: `${exitsdata.SectionName}` } }, // Filter for documents where the Category field matches the old category name
            { $set: { "Category.$[]": `["${categoriesquery}"]` } }, // Update the value in the Category array
            { arrayFilters: [{ "element": `${exitsdata.SectionName}]` }] } // Apply array filters to match elements in the Category array
        );

        console.log(`${result.nModified} documents updated.`);
        res.json(updatedItem);
    }

    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

const DeleteRajiyo = async (req, res) => {
    const Id = req.params.id;

    try {
        // Use deleteOne to delete a document by its ID
        const result = await Rajiyo.deleteOne({ _id: Id });
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


module.exports = { getRajiyo, postRajiyo, EditRajiyo, DeleteRajiyo };
