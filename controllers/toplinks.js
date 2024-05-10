const toplinks = require("../models/toplinks");

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
    res.status(200).json({ message: "error created successfully", error });
  }
};

const Edittoplinks = async (req, res) => {
  try {
    let Image;

    if (req.files.Image1) {
        Image = req.files.Image1[0].path.replace(/\\/g, "/");
        Image = Image.substring(Image.indexOf("/images"));
    }
    const items = req.body;
    const itemsdata = {
      ...items,
      Image: Image,
    };
    const itemId = req.params.id;
    const updatedItem = await toplinks.findByIdAndUpdate(itemId, itemsdata, {
      new: true, // return the modified document rather than the original
    });
    res.json(updatedItem);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const Deletetoplinks = async (req, res) => {
  const Id = req.params.id;

  try {
    // Use deleteOne to delete a document by its ID
    const result = await toplinks.deleteOne({ _id: Id });
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

module.exports = { gettoplinks, posttoplinks, Edittoplinks, Deletetoplinks };
