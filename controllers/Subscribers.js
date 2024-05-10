const { Subscribers, WebsiteHit } = require("../models/Subscribers");

const getWebsiteHit = async (req, res) => {
  try {
    // const item = new WebsiteHit({hits: 5000000})
    // const add =  await item.save()
    // console.log(add)

    const mydata = await WebsiteHit.find({});
    console.log(mydata);
    await WebsiteHit.updateOne({}, { $set: { hits: mydata[0].hits + 1 } });
    return res.status(200).json(mydata);
  } catch (error) {
    return res.status(500).json({ message: "Error occurred", error });
  }
};

const getSubscribers = async (req, res) => {
  try {
    const mydata = await Subscribers.find(req.query).limit(25);
    return res.status(200).json(mydata);
  } catch (error) {
    return res.status(500).json({ message: "Error occurred", error });
  }
};

const postSubscribers = async (req, res) => {
  console.log(req.body);

  let profile;
  if (req.files && req.files.profile) {
    profile = req.files.profile[0].path.replace(/\\/g, "/");
    profile = profile.substring(profile.indexOf("/images"));
  }
  try {
    const ip = req.socket.remoteAddress;

      
    const userdetails = req.body;
    const itemdata = {
      ...userdetails,
      ipaddres: ip
    };
    const data = new Subscribers(itemdata);
    const result = await data.save();
    console.log(result);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: "Error inserting document" });
  }
};

const editSubscribers = async (req, res) => {
  console.log(req.body);

  // let profile;
  // if (req.files && req.files.profile) {
  //   profile = req.files.profile[0].path.replace(/\\/g, "/");
  //   profile = profile.substring(profile.indexOf("/images"));
  // }

  try {
    const userdetails = req.body;
    const itemdata = {
      ...userdetails,
      // profile: profile,
    };


    const itemId = req.params.id;
    const updatedItem = await Subscribers.findByIdAndUpdate(itemId, itemdata, {
      new: true, // return the modified document rather than the original
    });
    res.status(200).json(updatedItem);
  } catch (error) {
    res.status(500).json({ message: "Error inserting document" });
  }
};

const deleteSubscribers = async (req, res) => {
  const id = req.params.id;
  try {
    const result = await Subscribers.deleteOne({ _id: id });
    if (result.deletedCount === 0) {
      return res.status(404).json({ error: "Product not found" });
    }
    // Respond with a success message
    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  postSubscribers,
  getSubscribers,
  editSubscribers,
  deleteSubscribers,
  getWebsiteHit,
};
