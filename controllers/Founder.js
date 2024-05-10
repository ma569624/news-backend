const Founder = require("../models/Founder");

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
    
    let EmployeeImage;
  
    if (req.files.Image1) {
      EmployeeImage = req.files.Image1[0].path.replace(/\\/g, '/');
      EmployeeImage = EmployeeImage.substring(EmployeeImage.indexOf("/images"));
    }
    const items = req.body;
    const itemsdata = {
      ...items,
      EmployeeImage: EmployeeImage,
    };
    const data = new Founder(itemsdata);
    const result = await data.save();
    console.log(result);
    res.status(200).json(result);
  } catch (error) {
    res.status(200).json({ message: "error created successfully", error });
  }
};

const EditFounder = async (req, res) => {
  try {
    let EmployeeImage;
  
    if (req.files.Image1) {
      EmployeeImage = req.files.Image1[0].path.replace(/\\/g, '/');
      EmployeeImage = EmployeeImage.substring(EmployeeImage.indexOf("/images"));
    }
    const items = req.body;
    const itemsdata = {
      ...items,
      categorylogo: categorylogo,
      headinglogo: headinglogo,
    };
    const itemId = req.params.id;
    const updatedItem = await Founder.findByIdAndUpdate(itemId, itemsdata, {
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
