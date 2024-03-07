const Advert = require('../models/Advert');
const { BlogHelper } = require('./helper/Helper');

const getAdvert = async (req, res) => {
    const categoriesquery = req.query.Category;
    const iscategories = categoriesquery;
    const queryValue = req.query.Position; // Assuming Position is the correct field to query

    try {
        if (queryValue) {
            const docs = await Advert.find({ Position: { $regex: queryValue, $options: 'i' } });
            console.log('Filtered Data:', docs);
            return res.status(200).json(docs);
        } else if (iscategories) {
            const docs = await Advert.find({ Category: { $regex: categoriesquery, $options: 'i' } });
            console.log('Filtered Data:', docs);
            return res.status(200).json(docs);
        } else {
            const mydata = await Advert.find(req.query);
            return res.status(200).json(mydata);
        }
    } catch (error) {
        return res.status(500).json({ message: 'Error occurred', error });
    }
};

const postAdvert = async (req, res) => {
    try {
        console.log(req.body)
        const items = BlogHelper(req);
        console.log(items)
        const data = new Advert(items);
        const result = await data.save();
        console.log(result)
        res.status(200).json(result);
        // res.send(items)
    } catch (error) {
        res.status(200).json({ message: 'error created successfully', error });
    }
}

const EditAdvert = async (req, res) => {
    try {
        const data = BlogHelper(req);
        const itemId = req.params.id;
        const updatedItem = await Advert.findByIdAndUpdate(itemId, data, {
            new: true, // return the modified document rather than the original
        });
        res.json(updatedItem);
    }

    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }

}

const DeleteAdvert = async (req, res) => {
    const Id = req.params.id;

    try {
        // Use deleteOne to delete a document by its ID
        const result = await Advert.deleteOne({ _id: Id });
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


module.exports = { getAdvert, postAdvert, EditAdvert, DeleteAdvert };
