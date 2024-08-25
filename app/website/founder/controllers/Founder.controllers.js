exports.getFounder = async (req, res) => {
  try {
    const {Founder} = req.models
    const mydata = await Founder.find(req.query);
    return res.status(200).json(mydata);
  } catch (error) {
    return res.status(500).json({ message: "Error occurred", error });
  }
};

