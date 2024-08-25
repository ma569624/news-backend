exports.getTagline = async (req, res) => {
  try {
  const { Tagline } = req.models.Tagline;
  const mydata = await Tagline.find(req.query);
  // console.log(mydata)
  res.status(200).json(mydata);
  } catch (error) {
    
  }
};

exports.getTajaSamachar = async (req, res) => {
  try {
    const { TajaSamachar } = req.models.Tagline;
    const mydata = await TajaSamachar.find(req.query);
    console.log(mydata)
    res.status(200).json(mydata);
  } catch (error) {
    console.error(error.message)
    res.status(500).json(error)
  }
};
