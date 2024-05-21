const Team = require("../models/Team");

const getTeam = async (req, res) => {
  const Id = req.query._id;
  console.log(Id)
  if (Id) {
    result = await Team.find({ _id: Id }).sort({ CreationDate: 1 });
  } 
  else if(req.query.Status) {
    result = await Team.find({Status: req.query.Status}).sort({ CreationDate: 1 });
  }
  else {
    result = await Team.find({}).sort({ CreationDate: 1 });
  }
  res.status(200).json(result);
};

const postTeam = async (req, res) => {
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
    const data = new Team(itemsdata);
    const result = await data.save();
    res.status(200).json(result);
    // res.send(items)
  } catch (error) {
    res.status(200).json({ message: "error created successfully", error });
  }
};

const EditTeam = async (req, res) => {
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
    
    const itemId = req.params.id;
    const updatedItem = await Team.findByIdAndUpdate(itemId, itemsdata, {
      new: true, // return the modified document rather than the original
    });
    res.status(200).json(updatedItem);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const DeleteTeam = async (req, res) => {
  const Id = req.params.id;

  try {
    // Use deleteOne to delete a document by its ID
    const result = await Team.deleteOne({ _id: Id });
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

module.exports = { getTeam, postTeam, EditTeam, DeleteTeam };
