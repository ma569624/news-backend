// const SignupSchema = require("../../models/signup/Signup");
const SignupSchema = require('../models/signup')


const postSign = async (req, res) => {
   
    console.log(req.body)
    try {
        const data = new SignupSchema(req.body);
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