const YouTubeData = require("../models/youtube");

const getyoutube = async (req, res) => {
  console.log(req.query);

  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 8;

    let skip = (page - 1) * limit;
    let sortQuery;

    const data = await YouTubeData.find(sortQuery).skip(skip).limit(limit);

    res.status(200).json({ data, nbHits: data.length });
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = getyoutube;
