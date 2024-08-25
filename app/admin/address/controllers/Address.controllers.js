const Address = require("../models/Address.models");

const getAddress = async (req, res) => {
  try {
    const mydata = await Address.find(req.query);
    res.status(200).json(mydata);
  } catch (error) {
    res.status(200).json({ message: "error created successfully", error });
  }
};

const postAddress = async (req, res) => {
  try {
    const items = req.body;
    const data = new Address(items);
    const result = await data.save();
    res.status(200).json(result);
    // res.send(items)
  } catch (error) {
    res.status(200).json({ message: "error created successfully", error });
  }
};

const EditAddress = async (req, res) => {
  try {
    const data = req.body;
    const itemId = req.params.id;
    const updatedItem = await Address.findByIdAndUpdate(itemId, data, {
      new: true, // return the modified document rather than the original
    });
    res.json(updatedItem);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { getAddress, EditAddress, postAddress };
