const Colors = require("../models/Colors");


const getColors = async (req, res) => {
    const mydata = await Colors.find(req.query);
    // console.log(mydata)
    res.status(200).json(mydata);
};

const postColors = async (req, res) => {

    try {
        // console.log(req.body)
        const items = req.body
        // console.log(items)
        const data = new Colors(items);
        const result = await data.save();
        res.status(200).json(result);
        // res.send(items)
    } catch (error) {
        res.status(200).json({ message: 'error created successfully', error });
    }
}

const EditColors = async (req, res) => {
    try {
        const data = req.body;
        const itemId = req.params.id;
        const updatedItem = await Colors.findByIdAndUpdate(itemId, data, {
            new: true, // return the modified document rather than the original
        });
        res.json(updatedItem);
    }

    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports = {getColors, EditColors , postColors};
