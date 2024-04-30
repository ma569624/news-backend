// const SignupSchema = require("../../models/signup/Signup");
const SignupSchema = require("../models/signup");

const postSign = async (req, res) => {
  let profile;

  if (req.files.profile) {
    const profilePath = req.files.profile[0].path;
    const index = profilePath.indexOf("\\images");
    profile = profilePath.substring(index !== -1 ? index : 0);
  }
  try {
    const userdetails = req.body;
    const itemdata = {
      ...userdetails,
      profile: profile,
    };
    console.log(req.body);
    const data = new SignupSchema(itemdata);
    const result = await data.save();
    console.log(result);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: "Error inserting document" });
  }
};

module.exports = postSign;
