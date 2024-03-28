const { HomeDisplay } = require("../models/HomeDisplay");
const Blog = require('../models/Blog');
const { blockkHelper } = require("./helper/Helper");


const getHomeDisplay = async (req, res) => {
    const mydata = await HomeDisplay.find(req.query);
    // console.log(mydata)
    res.status(200).json(mydata);
};

const postHomeDisplay = async (req, res) => {
    try {
        console.log(req.body)
        const items = req.body;
        const data = new HomeDisplay(items);
        const result = await data.save();
        console.log(result)
        res.status(200).json(result);
    } catch (error) {
        res.status(200).json({ message: 'error created successfully', error });
    }
}

const EditHomeDisplay = async (req, res) => {
    console.log(req.body.SectionName)
    const categoriesquery = req.body.SectionName;
    // const categoriesquery = req.query.SectionName;
    const iscategories = categoriesquery;
    try {
        
        const data = blockkHelper(req);
        console.log(data)
        console.log(req.body)
        const itemId = req.params.id;
        console.log(itemId)
        const exitsdata = await HomeDisplay.findById(itemId);
        const updatedItem = await HomeDisplay.findByIdAndUpdate(itemId, data, {
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
            { arrayFilters: [{ "element":  `${exitsdata.SectionName}]` }] } // Apply array filters to match elements in the Category array
        );

        
        console.log(`${result.nModified} documents updated.`);
        // const result = await Blog.updateMany(
        //     { "Category": exitsdata.SectionName },
        //     { $set: { "Category.$": `["${categoriesquery}"]` } }
        // );

        // console.log(`${result.nModified} documents updated.`);

        // const change = await Blog.find();
        // console.log(req.body);
        res.json(updatedItem);
    }

    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }

}

const DeleteHomeDisplay = async (req, res) => {
    const Id = req.params.id;

    try {
        // Use deleteOne to delete a document by its ID
        const result = await HomeDisplay.deleteOne({ _id: Id });
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


module.exports = { getHomeDisplay, postHomeDisplay, EditHomeDisplay, DeleteHomeDisplay };
