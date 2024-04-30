const Founder = require("../models/Founder");
const { FounderHelper } = require("./helper/Helper");

const getFounder = async (req, res) => {
  try {
    const mydata = await Founder.find(req.query);
    return res.status(200).json(mydata);
  } catch (error) {
    return res.status(500).json({ message: "Error occurred", error });
  }
};

const postFounder = async (req, res) => {
  try {
    
    console.log(req.body);
    const items = FounderHelper(req);
    console.log(items);
    const data = new Founder(items);
    const result = await data.save();
    console.log(result);
    res.status(200).json(result);
    // res.send(items)
  } catch (error) {
    res.status(200).json({ message: "error created successfully", error });
  }
};

const EditFounder = async (req, res) => {
  try {
    console.log(req.files);
    const data = FounderHelper(req);
    const itemId = req.params.id;
    const updatedItem = await Founder.findByIdAndUpdate(itemId, data, {
      new: true, // return the modified document rather than the original
    });
    res.json(updatedItem);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const DeleteFounder = async (req, res) => {
  const Id = req.params.id;

  try {
    // Use deleteOne to delete a document by its ID
    const result = await Founder.deleteOne({ _id: Id });
    // Check if the product was found and deleted
    if (result.deletedCount === 0) {
      return res.status(404).json({ error: "Product not found" });
    }
    // Respond with a success message
    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { getFounder, postFounder, EditFounder, DeleteFounder };
