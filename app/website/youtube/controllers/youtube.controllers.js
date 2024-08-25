exports.getyoutube = async (req, res) => {

  try {
    console.log(req.models)
    const {youtube} = req.models
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 12;

    let skip = (page - 1) * limit;
    let sortQuery;

    const data = await youtube.find(sortQuery)
      .sort({ "snippet.publishedAt": -1 })
      .skip(skip)
      .limit(limit);
    const totalCount = await youtube.countDocuments();

    res.status(200).json({ data, nbHits: totalCount });
    
  } catch (error) {
    console.log(error)
    res.status(500).json({message : error});
  }
};

