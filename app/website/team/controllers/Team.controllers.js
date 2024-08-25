exports.getTeam = async (req, res) => {
  try {
    const {Team} = req.models
  const Id = req.query._id;

  if (Id) {
    result = await Team.find({ _id: Id }).sort({ CreationDate: 1 });
  } 
  else if(req.query.Status) {
    result = await Team.find({Status: req.query.Status}).sort({ CreationDate: 1 });
  }
  else {
    result = await Team.find({}).sort({ CreationDate: 1 });
  }
  res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error);
  }
};

