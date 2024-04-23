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
    const sortQuery = req.query.location;
    let skip = (page - 1) * limit;

    const query = { location: sortQuery };
    if (Status !== "") {
      query.Status = Status;
    }

    const totalCount = await Category.countDocuments(query);
    const mydata = await Category.find(query)
      .sort({ order: -1 })
      .skip(skip)
      .limit(limit);
    console.log("Data transferred successfully");
    res.status(200).json({ mydata, nbHits: totalCount });
    console.log(mydata);
  } catch (error) {
    console.log(error);
  }
};

const postCategory = async (req, res) => {
  try {
    console.log(req.body);
    const items = req.body;
    let totaldoc = await Category.countDocuments({});
    const itemsdata = {
      ...items,
      order: totaldoc + 1, // Use totaldoc + i for the order field
    };
    
    const data = new Category(itemsdata);
    const result = await data.save();
    console.log(result);
    res.status(200).json(result);

  } catch (error) {
    console.log(error);
    res.status(200).json({ message: "error created successfully", error });
  }
};

const EditCategory = async (req, res) => {
  try {
    const data = req.body;
    const itemId = req.params.id;
    const updatedItem = await Category.findByIdAndUpdate(itemId, data, {
      new: true, // return the modified document rather than the original
    });
    res.json(updatedItem);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const DeleteCategory = async (req, res) => {
  const Id = req.params.id;

  try {
    // Use deleteOne to delete a document by its ID
    const result = await Category.deleteOne({ _id: Id });
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

module.exports = { getCategory, postCategory, EditCategory, DeleteCategory };
