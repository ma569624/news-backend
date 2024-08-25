exports.getblogsearch = async (req, res) => {
  try {
    const {Blog, Category} = req.models
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


exports.getBlog = async (req, res) => {
  try {
    const {Blog, Category} = req.models

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

exports.getAllBlog = async (req, res) => {
  try {
    const {Blog, Category} = req.models
    
    const page = req.query.page;
    const sortQuery = req.query.name;
    const limit = 1;

    let skip = (page - 1) * limit;
    
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

exports.getheaderblog = async (req, res) => {
  try {
    const {Blog, Category} = req.models

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
        Status: true,
      })
        .sort({ order: -1 })
        .limit(5);
        const totalnews = await Blog.countDocuments({
          Category: { $regex: item.category, $options: "i" },

        });
      const resultItem = {
        section: item,
        data: data,
        totalnews: totalnews
      };
      result.push(resultItem);
    }

    res.status(200).json({ data: result, nbHits: totalCount });
  } catch (error) {
    res.status(500).json(error);
  }
};
