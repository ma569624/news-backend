exports.gettoplinks = async (req, res) => {
  const {toplinks} = req.models
  const mydata = await toplinks.find(req.query);
  // console.log(mydata)
  res.status(200).json(mydata);
};

