const { HomeDisplay } = require("../models/HomeDisplay");
// const Blog = require("../models/Blog");
const { blockkHelper } = require("./helper/Helper");

const getHomeDisplay = async (req, res) => {
  try {

    // const indexToInsert = 1;

    // // Create the new document
    // const newData = {
    //   _id: "661d466161d659488fb1031f",
    //   order: indexToInsert + 1,
    // };
    
    // // Insert the new document at the specified position in the array
    // insertflied.splice(indexToInsert, 0, newData);
    // let insertflied = await HomeDisplay.find({}).sort({order: 1});
    
    // // Update the order of the following documents in the array
    // for (let index = 1; index < insertflied.length; index++) {
    //   const data = await HomeDisplay.findByIdAndUpdate(
    //     insertflied[index]._id,
    //     { order: index + 1 },
    //     {
    //       new: true, // return the modified document rather than the original
    //     }
    //   );
    // }

    const query = req.query.SectionName;
    let mydata;
    if (query) {
      mydata = await HomeDisplay.find({ SectionName: query });
    } 
    else{

        mydata = await HomeDisplay.find({}).sort({order: 1});
    }
    

    res.status(200).json(mydata);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "error created successfully", error });
  }
};

const postHomeDisplay = async (req, res) => {
  try {
    console.log(req.body);
    const items = req.body;
    let totaldoc = await HomeDisplay.countDocuments({});

    const itemsdata = {
        ...items,
        order: totaldoc+ 1 , // Use totaldoc + i for the order field
    };

    const data = new HomeDisplay(itemsdata);
    const result = await data.save();
    console.log(result);
    res.status(200).json(result);
  } catch (error) {
    console.log(error)
    res.status(200).json({ message: "error created successfully", error });
  }
};

const EditHomeDisplay = async (req, res) => {
  console.log(req.body.SectionName);
  const categoriesquery = req.body.SectionName;
  try {
    const data = blockkHelper(req);
    console.log(data);
    const itemId = req.params.id;
    const exitsdata = await HomeDisplay.findById(itemId);
    const updatedItem = await HomeDisplay.findByIdAndUpdate(itemId, data, {
      new: true, // return the modified document rather than the original
    });

    if (categoriesquery) {
      console.log("change categorie");
      const docs = await Blog.find({
        Category: { $regex: `${exitsdata.SectionName}` },
      });

      const result = await Blog.updateMany(
        { Category: { $regex: `${exitsdata.SectionName}` } },
        { $set: { "Category.$[]": `${categoriesquery}` } },
        { arrayFilters: [{ element: `${exitsdata.SectionName}]` }] }
      );

      console.log(`${result.nModified} documents updated.`);
    }

    res.json(updatedItem);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const DeleteHomeDisplay = async (req, res) => {
  const Id = req.params.id;

  try {
    // Use deleteOne to delete a document by its ID
    const result = await HomeDisplay.deleteOne({ _id: Id });
    // Check if the product was found and deleted
    if (result.deletedCount === 0) {
      return res.status(404).json({ error: "Product not found" });
    }

    let insertflied = await HomeDisplay.find({}).sort({order: 1});
    
    // Update the order of the following documents in the array
    for (let index = 1; index < insertflied.length; index++) {
      const data = await HomeDisplay.findByIdAndUpdate(
        insertflied[index]._id,
        { order: index + 1 },
        {
          new: true, // return the modified document rather than the original
        }
      );
    }
    // Respond with a success message
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const MultiEditHomeDisplay = async (req, res) => {
  const { ids, status } = req.body;
  console.log(req.body);
  try {
    // Update the status of multiple items using updateMany
    const result = await HomeDisplay.updateMany(
      { _id: { $in: ids } }, // Match items with IDs in the provided array
      { $set: { Status: status } } // Set the new status
    );

    if (result.nModified === 0) {
      return res
        .status(404)
        .json({ error: "No products found with the provided IDs" });
    }

    res.status(200).json({ message: "Status updated successfully" });
  } catch (error) {
    console.error("Error updating status:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const MultiDeleteHomeDisplay = async (req, res) => {
  const { ids } = req.body;
  console.log(ids);
  try {
    // Use a loop to iterate through each ID and delete the corresponding item
    for (const id of ids) {
      // Perform deletion operation for each ID
      const result = await HomeDisplay.findByIdAndDelete(id); // Assuming Rajiyo is your Mongoose model
      if (result.deletedCount === 0) {
        // If the item with the specified ID is not found, return a 404 error
        return res
          .status(404)
          .json({ error: `Product with ID ${id} not found` });
      }
    }
    let insertflied = await HomeDisplay.find({}).sort({order: 1});
    
    // Update the order of the following documents in the array
    for (let index = 1; index < insertflied.length; index++) {
      const data = await HomeDisplay.findByIdAndUpdate(
        insertflied[index]._id,
        { order: index + 1 },
        {
          new: true, // return the modified document rather than the original
        }
      );
    }
    // If all items are deleted successfully, send a success response
    res.status(200).json({ message: "Products deleted successfully" });
  } catch (error) {
    // If an error occurs during deletion, handle it and send an error response
    console.error("Error deleting products:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  getHomeDisplay,
  postHomeDisplay,
  EditHomeDisplay,
  DeleteHomeDisplay,
  MultiEditHomeDisplay,
  MultiDeleteHomeDisplay,
};
