const JaraIdhar = require('../models/JaraIdhar');
const { ShubhkamnnaHelper } = require('./helper/Helper');
const path = require('path');

const getJaraIdhar = async (req, res) => {
    const mydata = await JaraIdhar.find(req.query);
    // console.log(mydata)
    res.status(200).json(mydata);
};

const postJaraIdhar = async (req, res) => {
    try {
        // console.log(req.body)
        // const items = BlogHelper(req);
        // console.log(items)
        const data = new JaraIdhar(req.body);
        const result = await data.save();
        console.log(result)
        res.status(200).json(result);
        // res.send(items)
    } catch (error) {
        res.status(200).json({ message: 'error created successfully', error });
    }
}

const EditJaraIdhar = async (req, res) => {
    try {
        const data = req.body;
        const itemId = req.params.id;
        const updatedItem = await JaraIdhar.findByIdAndUpdate(itemId, data, {
            new: true, // return the modified document rather than the original
        });
        res.status(200).json(updatedItem);
    }

    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }

}

const DeleteJaraIdhar = async (req, res) => {
    const Id = req.params.id;

    try {
        // Use deleteOne to delete a document by its ID
        const result = await JaraIdhar.deleteOne({ _id: Id });
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



module.exports = {getJaraIdhar, postJaraIdhar, EditJaraIdhar, DeleteJaraIdhar };
