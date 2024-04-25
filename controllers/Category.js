const Category = require("../models/Category");
const { HomeDisplay } = require("../models/HomeDisplay");
const { Rajiyo } = require("../models/HomeDisplay");

const getCategory = async (req, res) => {
  // console.log(mydata)

  // const homeDisplayData = await Rajiyo.find({});
  //   const totalCount = await Category.countDocuments({});
  //   let order = totalCount;
  // homeDisplayData.forEach(async (item) => {
  // Transform each item from HomeDisplaySchema into the schema of CategorySchema
  //   const categoryItem = new Category({
  //     category: "प्रमुख समाचार",
  //     heading: "इस सेक्शन से जुड़ी और ख़बरें",
  //     categorylogo: "/image/à¤ªà¥à¤°à¤®à¥à¤ à¤¸à¤®à¤¾à¤à¤¾à¤°.jpeg",
  //     //   headinglogo: ,
  //     //   categorybackground: ,
  //     //   headingbackground: ,
  //     location: "title",
  //     order: ++order,
  //   });

  // Save the transformed data to CategorySchema
  //   const resp = await categoryItem.save();
  //   });

  try {
    const Status = req.query.Status || "";
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 8;
    const Query = req.query.location;
    const category = req.query.category || "";
    let skip = (page - 1) * limit;
    console.log(req.query);
    let sortQuery;
    if (category) {
      sortQuery = { category: category };
    }
    if (Query) {
      sortQuery = { location: { $regex: Query, $options: "i" } };
    }
    if (Status) {
      sortQuery = {
        Status: Status,
      };
    }
    let filterdata = [];
    if (!sortQuery) {
      let filterdataTitle = await Category.find({
        location: { $regex: "title", $options: "i" },
      }).sort({ order: -1 });

      let filterdatablocks = await Category.find({
        location: { $regex: "block", $options: "i" },
      }).sort({ order: 1 });

      let filterdatastate = await Category.find({
        location: { $regex: "state", $options: "i" },
      }).sort({ order: 1 });
      filterdata = [
        ...filterdataTitle,
        ...filterdatablocks,
        ...filterdatastate,
      ];
      res.status(200).json(filterdata);
    } else {
      console.log(sortQuery);
      // const totalCount = await Category.countDocuments(sortQuery);
      const data = await Category.find(sortQuery).sort({ order: 1 });
      console.log(data);
      console.log("Data transferred successfully");
      res.status(200).json(data);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const postCategory = async (req, res) => {
  try {
    let categorylogo;
    let headinglogo;
    if (req.files.categorylogo) {
      categorylogo = req.files.categorylogo[0].path.substring(
        req.files.categorylogo[0].path.indexOf("\\images")
      );
    }
    if (req.files.headinglogo) {
      headinglogo = req.files.headinglogo[0].path.substring(
        req.files.headinglogo[0].path.indexOf("\\images")
      );
    }

    const items = req.body;
    let totaldoc = await Category.countDocuments({});
    const itemsdata = {
      ...items,
      categorylogo: categorylogo,

      headinglogo: headinglogo,
      order: totaldoc + 1, // Use totaldoc + i for the order field
    };
    const data = new Category(itemsdata);
    const result = await data.save();
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "error created successfully", error });
  }
};

const EditCategory = async (req, res) => {
  try {
    const categorylogo = req.files.categorylogo[0].path.substring(
      req.files.categorylogo[0].path.indexOf("\\images")
    );
    const headinglogo = req.files.headinglogo[0].path.substring(
      req.files.headinglogo[0].path.indexOf("\\images")
    );
    const items = req.body;
    const itemsdata = {
      ...items,
      categorylogo: categorylogo,
      headinglogo: headinglogo,
    };

    const itemId = req.params.id;
    const updatedItem = await Category.findByIdAndUpdate(itemId, itemsdata, {
      new: true, // return the modified document rather than the original
    });
    res.status(200).json(updatedItem);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const DeleteCategory = async (req, res) => {
  const Id = req.params.id;

  try {
    const result = await Category.deleteOne({ _id: Id });
    if (result.deletedCount === 0) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const MultiEditCategory = async (req, res) => {
  const { ids, status } = req.body;
  console.log(req.body);
  try {
    // Update the status of multiple items using updateMany
    const result = await Category.updateMany(
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

const MultiDeleteCategory = async (req, res) => {
  const { ids } = req.body;
  console.log(ids);
  try {
    // Use a loop to iterate through each ID and delete the corresponding item
    for (const id of ids) {
      // Perform deletion operation for each ID
      const result = await Category.findByIdAndDelete(id); // Assuming Rajiyo is your Mongoose model
      if (result.deletedCount === 0) {
        // If the item with the specified ID is not found, return a 404 error
        return res
          .status(404)
          .json({ error: `Product with ID ${id} not found` });
      }
    }
    let insertflied = await Category.find({}).sort({ order: 1 });

    // Update the order of the following documents in the array
    for (let index = 1; index < insertflied.length; index++) {
      const data = await Category.findByIdAndUpdate(
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
  getCategory,
  postCategory,
  EditCategory,
  DeleteCategory,
  MultiEditCategory,
  MultiDeleteCategory,
};
