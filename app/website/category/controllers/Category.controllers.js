exports.getCategory = async (req, res) => {
   const {Category} = req.models
  try {
    const Status = req.query.Status || "";
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 8;
    const Query = req.query.location;
    const category = req.query.category || "";
    const Id = req.query.id;
    let skip = (page - 1) * limit;
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
      if (Id) {
        const data = await Category.find({_id: Id});
        res.status(200).json(data);
      }else{
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
    }
    } else {
      // console.log(sortQuery);
      // const totalCount = await Category.countDocuments(sortQuery);
      const data = await Category.find(sortQuery).sort({ order: 1 });
      // console.log(data);
      res.status(200).json(data);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
};

