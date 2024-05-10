const loginSchema = require("../models/login");
const SignupSchema = require("../models/signup");

const getloginlogs = async (req, res) => {
  try {
    const mydata = await loginSchema.find(req.query).limit(25);
    return res.status(200).json(mydata);
  } catch (error) {
    return res.status(500).json({ message: "Error occurred", error });
  }
};

const postlogin = async (req, res) => {
  console.log("hits");
  const { User_name, password } = req.body;

  try {
    const user = await SignupSchema.findOne({ User_name });

    const block = user.user_block;

    const { name, access_delete, type, Place, profile, Destination } = user;

    const sendinfo = {
      profile: profile,
      Destination: Destination,
      Place: Place,
      name: name,
      access_delete: access_delete,
      type: type === undefined ? "user" : type,
    };

    console.warn(sendinfo);
    if (!block) {
      if (!user) {
        console.log("User not found");
        return res.status(404).json({ error: "User not found" });
      }

      const isMatch = await (password === user.password);

      console.log(isMatch);
      if (!isMatch) {
        console.log("password not matched");
        return res.status(401).json({ error: "password invalid" });
      }

      const ip = req.socket.remoteAddress;

      // Log the IP address
      console.log("Client IP:", ip);
      const items = {
        ...req.body,
        ipaddres: ip,
      };

      const rest = new loginSchema(items);
      const restsave = await rest.save();

      return res.status(200).json(sendinfo);
    } else {
      return res.status(403).json({ message: `User is blocked` });
    }
  } catch (error) {
    if (
      error.code === 11000 &&
      error.keyPattern &&
      error.keyPattern.User_name
    ) {
      // Handle duplicate key error for the email field
      console.error("Duplicate email value:", error.keyValue.User_name);

      res.status(200).json({ message: "duplication error" });
    } else {
      // Handle other errors
      console.error("Error inserting document:", error);
      res.status(500).json({ message: "Error inserting document" });
    }
  }
};

module.exports = { postlogin, getloginlogs };
