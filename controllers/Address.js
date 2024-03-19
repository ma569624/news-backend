const Address = require("../models/Address");


const getAddress = async (req, res) => {
    const mydata = await Address.find(req.query);
    console.log(mydata)
    res.status(200).json(mydata);
};

const postAddress = async (req, res) => {

    try {
        // console.log(req.body)
        const items = req.body
        // console.log(items)
        const data = new Address(items);
        const result = await data.save();
        res.status(200).json(result);
        // res.send(items)
    } catch (error) {
        res.status(200).json({ message: 'error created successfully', error });
    }
}

const EditAddress = async (req, res) => {
    try {
        const data = req.body;
        const itemId = req.params.id;
        const updatedItem = await Address.findByIdAndUpdate(itemId, data, {
            new: true, // return the modified document rather than the original
        });
        res.json(updatedItem);
    }

    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports = {getAddress, EditAddress , postAddress};
