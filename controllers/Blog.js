const Blog = require("../models/Blog");
const Category = require("../models/Category");

const BlogHelper = (req) => {
  let Image, Video, Audio;

  if (req.files.Image2 && req.files.Image2.length > 0) {
    Image = `/image/${req.files.Image2[0].filename}`;
  } else {
    // Handle the case where req.files.Image2 is not defined or empty
  }

  if (req.files.Video && req.files.Video.length > 0) {
    Video = `/image/${req.files.Video[0].filename}`;
  } else {
    // Handle the case where req.files.Image1 is not defined or empty
  }
  if (req.files.Audio && req.files.Audio.length > 0) {
    Audio = `/image/${req.files.Audio[0].filename}`;
  } else {
    // Handle the case where req.files.Image1 is not defined or empty
  }

  const Category = req.body.Category
    ? req.body.Category.replace(/[\[\]"']/g, "").split(/,(?!\s)/)
    : [];
  const Status = req.body.Status;
  const ReporterImage = req.body.ReporterProfile;
  const ReporterName = req.body.ReporterName;
  const Heading = req.body.Heading;

  const Matter = req.body.Matter;
  const DatePlace = req.body.DatePlace;
  const CreationDate = req.body.CreationDate;
  const Capton = req.body.Capton;
  const Subheading = req.body.Subheading;
  const Designation = req.body.Designation;
  const Headline = req.body.Headline;

  const data = {
    Headline,
    CreationDate,
    Status,
    ReporterImage,
    ReporterName,
    Heading,
    Matter,
    DatePlace,
    Capton,
    Subheading,
    Designation,
    Image,
    Video,
    Audio,
  };
  if (Category.length > 0) {
    data.Category = Category;
  }

  return data;
};

// const insertflied = await Blog.find({});
// console.log(insertflied.length)

// for (let index = 0; index < insertflied.length; index++) {
//   // const element = array[index];
//   const data = await Blog.findByIdAndUpdate(insertflied[index]._id, {order: index}, {
//     new: true, // return the modified document rather than the original
//   });
// }

//for update flied
//     const insertFields = await Blog.find({ Category: 'TopKhabare' });

// for (let index = 0; index < insertFields.length; index++) {
//   const updatedData = await Blog.findByIdAndUpdate(
//     insertFields[index]._id,
//     { $set: { Category: ['प्रमुख समाचार'] } }, // Replace all existing values with ['प्रमुख समाचार']
//     {
//       new: true, // Return the modified document rather than the original
//     }
//   );
//   console.log(updatedData); // Log the updated document
// }

// res.status(200).json(insertFields);

const getblogsearch = async (req, res) => {
  try {
    const id = req.params.id;
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    let skip = (page - 1) * limit;
    const totalCount = await Blog.countDocuments({
      Heading: { $regex: new RegExp(id, "i") },
    });
    const data = await Blog.find({ Heading: { $regex: new RegExp(id, "i")}}, { Heading: 1, Image: 1, Category: 1, order: 1 })
      .sort({ order: -1 })
      .skip(skip)
      .limit(limit);
    res.status(200).json({ data, totalCount: totalCount });
  } catch (error) {
    res.status(500).json(error);
    console.error(error);
  }
};
const getBlog = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 8;
    const category = req.query.Category || "";
    const headline = req.query.Headline || "";
    const id = req.query._id || "";
    const status = req.query.Status || "";
    const order = req.query.order || "";
    let skip = (page - 1) * limit;
    let sortQuery = {};

    // Handle category filtering
    if (category) {
      let categoryQuery;
      if (
        category == "title1" ||
        category == "title2" ||
        category == "title3" ||
        category == "title4"
      ) {
        const filterData = await Category.find({ location: category });
        categoryQuery = { $regex: filterData[0].category, $options: "i" };
      } else {
        categoryQuery = { $regex: category, $options: "i" };
      }

      if (status) {
        const filterData = await Category.find({ location: category });
        sortQuery = {
          Status: status,
          Category: categoryQuery,
        };
      } else {
        sortQuery = { Category: categoryQuery };
      }
    }

    // Handle other filters
    if (headline) {
      sortQuery.Headline = headline;
    }
    if (id) {
      sortQuery._id = id;
    }
    if (order) {
      sortQuery.order = order;
    }

    const totalCount = await Blog.countDocuments(sortQuery);
    const totalPages = Math.ceil(totalCount / limit);
    const data = await Blog.find(sortQuery)
      .sort({ order: -1 })
      .skip(skip)
      .limit(limit);
    res.status(200).json({ data, nbHits: totalCount, totalPages: totalPages });
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
};

const getAllBlog = async (req, res) => {
  try {
    const page = req.query.page;
    const sortQuery = req.query.name;
    const limit = 1;

    let skip = (page - 1) * limit;
    // const catpage = 1
    // const catskip = (catpage - 1) * limit;

    // Category
    const categorydata = await Category.find({
      location: { $regex: sortQuery, $options: "i" },
      Status: true,
    })
      .sort({ order: 1 })
      .limit(limit)
      .skip(skip);

    const totalCount = await Category.countDocuments({
      location: { $regex: sortQuery, $options: "i" },
      Status: true,
    });

    const result = [];

    for (const item of categorydata) {
      const data = await Blog.find({
        Category: { $regex: item.category, $options: "i" },
      })
        .sort({ order: -1 })
        .limit(12);
      const resultItem = {
        section: item,
        data: data,
      };
      result.push(resultItem);
    }

    res.status(200).json({ data: result, nbHits: totalCount });
  } catch (error) {
    res.status(500).json(error);
  }
};

const getheaderblog = async (req, res) => {
  try {
    const page = req.query.page;
    const sortQuery = req.query.name;
    const limit = 10;

    let skip = (page - 1) * limit;
    // const catpage = 1
    // const catskip = (catpage - 1) * limit;
    let categorydata;
    if (sortQuery == "block") {
      categorydata = await Category.find({
        location: { $regex: sortQuery, $options: "i" },
        Status: true,
        isHeader: true,
      })
        .sort({ order: 1 })
        .limit(limit)
        .skip(skip);
    } else {
      categorydata = await Category.find({
        location: { $regex: sortQuery, $options: "i" },
        Status: true,
      })
        .sort({ order: 1 })
        .limit(limit)
        .skip(skip);
    }

    // Category

    const totalCount = await Category.countDocuments({
      location: { $regex: sortQuery, $options: "i" },
      Status: true,
    });

    const result = [];

    for (const item of categorydata) {
      const data = await Blog.find({
        Category: { $regex: item.category, $options: "i" },
      })
        .sort({ order: -1 })
        .limit(5);
      const resultItem = {
        section: item,
        data: data,
      };
      result.push(resultItem);
    }

    res.status(200).json({ data: result, nbHits: totalCount });
  } catch (error) {
    res.status(500).json(error);
  }
};

const postBlog = async (req, res) => {
  try {
    const setarray = req.body.Category.replace(/[\[\]"']/g, "").split(/,(?!\s)/);
    console.log(setarray)
    let Image;
    if (req.files.Image2) {
      Image = req.files.Image2[0].path.replace(/\\/g, "/");
      Image = Image.substring(Image.indexOf("/images"));
    }

    const items = req.body;
    delete items.Category;
    let createdBlogs = [];
    const totaldoc = await Blog.countDocuments({});

    for (let i = 0; i < setarray.length; i++) {
      const itemsdata = {
        ...items,
        Image: Image,
        Category: setarray[i],
        order: totaldoc + i + 1,
      };
      const dataschema = new Blog(itemsdata);
      createdBlogs.push(dataschema);
    }

    const result = await Blog.insertMany(createdBlogs);
    res
      .status(200)
      .json({ message: "Blogs created successfully", blogs: result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating blogs", error });
  }
};

const EditBlog = async (req, res) => {
  try {
    const item = req.body;
    let Image, ReporterImage;
    if (req.files.Image1) {
      ReporterImage = req.files.Image1[0].path.replace(/\\/g, "/");
      ReporterImage = ReporterImage.substring(ReporterImage.indexOf("/images"));
    }
    if (req.files.Image2) {
      Image = req.files.Image2[0].path.replace(/\\/g, "/");
      Image = Image.substring(Image.indexOf("/images"));
    }

    const data = {
      ReporterImage: ReporterImage,
      ...item,
      Image: Image,
    };
    const itemId = req.params.id;
    updatedItem = await Blog.findByIdAndUpdate(itemId, data, {
      new: true, // return the modified document rather than the original
    });
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

  try {
    const result = await Blog.deleteOne({ _id: Id });
    // Check if the product was found and deleted
    if (result.deletedCount === 0) {
      return res.status(404).json({ error: "Product not found" });
    }

    const insertflied = await Blog.find({});

    for (let index = 0; index < insertflied.length; index++) {
      // const element = array[index];
      const data = await Blog.findByIdAndUpdate(
        insertflied[index]._id,
        { order: index },
        {
          new: true, // return the modified document rather than the original
        }
      );
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

    for (let index = 0; index < insertflied.length; index++) {
      // const element = array[index];
      const data = await Blog.findByIdAndUpdate(
        insertflied[index]._id,
        { order: index },
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
  getheaderblog,
  getBlog,
  postBlog,
  EditBlog,
  DeleteBlog,
  MultiDeleteBlog,
  MultiEditBlog,
  getAllBlog,
  getblogsearch,
};
