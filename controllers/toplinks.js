const toplinks = require('../models/toplinks');
const { ToplinkHelper } = require('./helper/Helper');

const gettoplinks = async (req, res) => {
    const mydata = await toplinks.find(req.query);
    // console.log(mydata)
    res.status(200).json(mydata);
};

const posttoplinks = async (req, res) => {

    try {
        
        const data = new toplinks(req.body);
        const result = await data.save();
        // console.log(result)
        res.status(200).json(result);
    } catch (error) {
        res.status(200).json({ message: 'error created successfully',error });
    }
}

const Edittoplinks = async (req, res) => {
    try {
        const topdata = ToplinkHelper(req);
        
        console.log(topdata)
        // const data = req.body;
        const itemId = req.params.id;
        const updatedItem = await toplinks.findByIdAndUpdate(itemId, topdata, {
            new: true, // return the modified document rather than the original
        });
        console.log(updatedItem)
        res.json(updatedItem);
    }

    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }

}

const Deletetoplinks = async (req, res) => {
    const Id = req.params.id;

    try {
        // Use deleteOne to delete a document by its ID
        const result = await toplinks.deleteOne({ _id: Id });
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


module.exports = { gettoplinks, posttoplinks, Edittoplinks, Deletetoplinks };
