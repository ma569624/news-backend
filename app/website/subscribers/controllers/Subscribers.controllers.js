exports.getWebsiteHit = async (req, res) => {
  console.log(req.models.Subscribers)
  try {
      const {WebsiteHit} = req.models.Subscribers

    const mydata = await WebsiteHit.find();
    
    await WebsiteHit.updateOne({}, { $set: { hits: mydata[0].hits + 1 } });
    return res.status(200).json(mydata);
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: "Error occurred", error });
  }
};


