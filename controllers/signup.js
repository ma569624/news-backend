// const SignupSchema = require("../../models/signup/Signup");
const SignupSchema = require('../models/signup')


const postSign = async (req, res) => {
  let profile;
 

  if (req.files.profile) {
    profile = req.files.profile[0].path.substring(
      req.files.profile[0].path.indexOf("\\images")
    );
  }
    try{
        
        const userdetails = req.body;
        const itemdata = {
          ...userdetails,
          profile: profile,
        }
        console.log(req.body)
        const data = new SignupSchema(itemdata);
        const result = await data.save();
        console.log(result)
        res.status(200).json(result);
      } catch (error) { 
        if (error.code === 11000 && error.keyPattern && error.keyPattern.email) {
          // Handle duplicate key error for the email field
          console.error('Duplicate email value:', error.keyValue.email);
        
          res.status(401).json({message: 'Duplicate email'});
        } else {
          // Handle other errors
          console.error('Error inserting document:', error);
          res.status(500).json({message : 'Error inserting document'});
        }
      }
    
}


module.exports = postSign;