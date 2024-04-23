const Blog = require("../models/Blog");
const { BlogHelper } = require("./helper/Helper");
const { HomeDisplay, Rajiyo } = require("../models/HomeDisplay");

const getBlog = async (req, res) => {
  console.log("test");

  try {

    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 8;
    const Category = req.query.Category || "";
    const Headline = req.query.Headline || "";
    const Id = req.query._id || "";
    const Status = req.query.Status || "";
    
    let skip = (page - 1) * limit;
    let sortQuery;
    if (Category) {
      if (Status) {
        sortQuery = {
          Status: Status,
          Category: { $regex: Category, $options: "i" },
        };
      } else {
        sortQuery = { Category: { $regex: Category, $options: "i" } };
      }
    }
    if (Headline) {
      sortQuery = { Headline: Headline };
    }
    if (Id) {
      sortQuery = { _id: Id };
    }

    // const insertflied = await Blog.find({});
    // console.log(insertflied.length)

    // for (let index = 0; index < insertflied.length; index++) {
    //   // const element = array[index];
    //   const data = await Blog.findByIdAndUpdate(insertflied[index]._id, {order: index}, {
    //     new: true, // return the modified document rather than the original
    //   });
    // }

    const totalCount = await Blog.countDocuments(sortQuery);

    console.log(totalCount);
    // const data = await Blog.find(sortQuery).skip(skip).limit(limit);
    const data = await Blog.find(sortQuery)
      .sort({ order: -1 })
      .skip(skip)
      .limit(limit);
    res.status(200).json({ data, nbHits: totalCount });
  } catch (error) {
    console.log(error)
    res.status(500).json(error);
  }
};

const getAllBlog = async (req, res) => {
  try {
    const page = 1;
    const name = req.query.name;
    const limit = 5;

    let skip = (page - 1) * limit;

    const block = await HomeDisplay.find({ Status: "active" }).sort({order: 1}) .limit(limit)
    .skip(skip);

    const rajiya = await Rajiyo.find({ Status: "active" }) .limit(limit)
    .skip(skip);

    const result = [];

    if (name == "rajiya") {
      for (const item of rajiya) {
        const data = await Blog.find({
          Category: { $regex: item.StateName, $options: "i" },
        })
          .sort({ order: -1 })
          .limit(limit)
          .skip(skip);
        // data.reverse();
        //   console.log(data);
        // const resultItem = {};
        // resultItem[item] = data;
        const resultItem = {
          section: item,
          data: data,
        };

        result.push(resultItem);
      }
    }
    if (name == "block") {
      console.log("hi");
      for (const item of block) {
        const data = await Blog.find({
          Category: { $regex: item.SectionName, $options: "i" },
        })
          .sort({ order: -1 })
          .limit(limit)
          .skip(skip);
        // data.reverse();
        //   console.log(data);
        // const resultItem = {};
        // resultItem[item] = data;
        const resultItem = {
          section: item,
          data: data,
        };
        result.push(resultItem);
      }
    }

    res.status(200).json({ data: result, nbHits: result.length });
  } catch (error) {
    res.status(500).json(error);
  }
};

const postBlog = async (req, res) => {
  try {
    const items = BlogHelper(req);
    const categ = items.Category;
    console.log(categ);

    delete items.Category;
    console.log(items);

    const createdBlogs = [];
    const totaldoc = await Blog.countDocuments({});

    for (let i = 0; i < categ.length; i++) {
      const category = categ[i];

      const itemsdata = {
        ...items,
        Category: category,
        order: totaldoc + i + 1 , // Use totaldoc + i for the order field
      };

      const result = await Blog.create(itemsdata);
      console.log(result);
      createdBlogs.push(result);
    }

    res
      .status(200)
      .json({ message: "Blogs created successfully", blogs: createdBlogs });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error creating blogs", error });
  }
};

const EditBlog = async (req, res) => {
  try {
    const data = BlogHelper(req);
    console.log(data);
    const itemId = req.params.id;
    updatedItem = await Blog.findByIdAndUpdate(itemId, data, {
      new: true, // return the modified document rather than the original
    });
    console.log(updatedItem);
    res.status(200).json(updatedItem);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const DeleteBlog = async (req, res) => {
  const splitarray = req.params.id.split("&");
  const Id = splitarray[0];
  const Category = splitarray[1];
  console.log(splitarray);

  try {

    const result = await Blog.deleteOne({ _id: Id });
    // Check if the product was found and deleted
    if (result.deletedCount === 0) {
      return res.status(404).json({ error: "Product not found" });
    }

    const insertflied = await Blog.find({});
    console.log(insertflied.length)

    for (let index = 0; index < insertflied.length; index++) {
      // const element = array[index];
      const data = await Blog.findByIdAndUpdate(insertflied[index]._id, {order: index}, {
        new: true, // return the modified document rather than the original
      });
    }

    // Respond with a success message
    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const MultiEditBlog = async (req, res) => {
  const { ids, status } = req.body;
  console.log(req.body);
  try {
    // Update the status of multiple items using updateMany
    const result = await Blog.updateMany(
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

const MultiDeleteBlog = async (req, res) => {
  const { ids } = req.body;
  console.log(ids);
  try {
    // Use a loop to iterate through each ID and delete the corresponding item
    for (const id of ids) {
      // Perform deletion operation for each ID
      const result = await Blog.findByIdAndDelete(id); // Assuming Rajiyo is your Mongoose model
      if (result.deletedCount === 0) {
        // If the item with the specified ID is not found, return a 404 error
        return res
          .status(404)
          .json({ error: `Product with ID ${id} not found` });
      }
    }

    const insertflied = await Blog.find({});
    console.log(insertflied.length)

    for (let index = 0; index < insertflied.length; index++) {
      // const element = array[index];
      const data = await Blog.findByIdAndUpdate(insertflied[index]._id, {order: index}, {
        new: true, // return the modified document rather than the original
      });
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
  getBlog,
  postBlog,
  EditBlog,
  DeleteBlog,
  MultiDeleteBlog,
  MultiEditBlog,
  getAllBlog,
};
