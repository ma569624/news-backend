const signup = require("../models/signup");

const nodemailer = require('nodemailer');

// Function to send OTP via email
async function sendOTPviaEmail(email, otp) {
  // Create a nodemailer transporter
  try {
    let transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: 'ms569624@gmail.com', // Replace with your email
        pass: 'qmtq matz agiw jbf' // Replace with your password
      }
    });
  
    // Send mail with defined transport object
    let info = await transporter.sendMail({
      from: 'ms569624@gmail.com', // Replace with your email
      to: email,
      subject: 'Your OTP',
      text: `Your OTP is: ${otp}`
    });
  
  } catch (error) {
    console.error(error)
  }
}

const getuser = async (req, res) => {
  try {
    const mydata = await signup.find(req.query).limit(25);
    return res.status(200).json(mydata);
  } catch (error) {
    return res.status(500).json({ message: "Error occurred", error });
  }
};

const forgetPassword = async (req, res) => {
 try {
  function generateOTP() {
    // Generate a random 4-digit number
    const otp = Math.floor(1000 + Math.random() * 9000);
    return otp.toString(); // Convert number to string
  }
  
  // Example usage:
  const otp = generateOTP();
  sendOTPviaEmail('manish.frontenddeveloper@gmail.com',otp)
  return res.status(200).json(otp);
 } catch (error) {
  return res.status(500).json({ message: "Error occurred", error });
 }
}

const postSign = async (req, res) => {
  let profile;
  if (req.files.profile) {
    profile = req.files.profile[0].path.replace(/\\/g, "/");
    profile = profile.substring(profile.indexOf("/images"));
  }
  try {
    const userdetails = req.body;
    const itemdata = {
      ...userdetails,
      profile: profile,
    };
    const data = new signup(itemdata);
    const result = await data.save();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: "Error inserting document" });
  }
};

const edituser = async (req, res) => {
  let profile;
  if (req.files.profile) {
    profile = req.files.profile[0].path.replace(/\\/g, "/");
    profile = profile.substring(profile.indexOf("/images"));
  }

  try {
    const userdetails = req.body;
    const itemdata = {
      ...userdetails,
      profile: profile,
    };

    const itemId = req.params.id;
    const updatedItem = await signup.findByIdAndUpdate(itemId, itemdata, {
      new: true, // return the modified document rather than the original
    });
    res.status(200).json(updatedItem);
  } catch (error) {
    res.status(500).json({ message: "Error inserting document" });
  }
};

const deleteuser = async (req, res) => {
  const id = req.params.id;
  try {
    const result = await signup.deleteOne({_id: id})
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


module.exports = {postSign, getuser, deleteuser, edituser, forgetPassword};
