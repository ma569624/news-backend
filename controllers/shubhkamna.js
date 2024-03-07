const { Shubhkamna } = require('../models/Home')
const uri = process.env.URI;
const { MongoClient } = require('mongodb');
const { BannerHelper, ShubhkamnnaHelper } = require('./helper/Helper');
const path = require('path');

const getshubhkamna = async (req, res) => {
    const mydata = await Shubhkamna.find(req.query);
    // console.log(mydata)
    res.status(200).json(mydata);
};

const postshubhkamna = async (req, res) => {

    try {
        console.log(req.body)
        const items = ShubhkamnnaHelper(req);
        console.log(items)
        const data = new Shubhkamna(items);
        const result = await data.save();
        // console.log(result)
        res.status(200).json(result);
    } catch (error) {
        res.status(200).json({ message: 'error created successfully',error });
    }
}

const Editshubhkamna = async (req, res) => {
    try {
        const data = ShubhkamnnaHelper(req);
        const itemId = req.params.id;
        const updatedItem = await Shubhkamna.findByIdAndUpdate(itemId, data, {
            new: true, // return the modified document rather than the original
        });
        res.json(updatedItem);
    }

    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }

}

const Deleteshubhkamna = async (req, res) => {
    const Id = req.params.id;

    try {
        // Use deleteOne to delete a document by its ID
        const result = await Shubhkamna.deleteOne({ _id: Id });
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



module.exports = { getshubhkamna, postshubhkamna, Editshubhkamna, Deleteshubhkamna };
