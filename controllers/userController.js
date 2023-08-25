const { User } = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { handleErrors } = require("../errors/errorResponse");



module.exports.signUp_post = async (req, res) => {
  try {
    const { fullName, email, password, countryOfResidence, recyclingHabits, signupOptions} = req.body;

    //check if user already exists
    const userEmail = await User.findOne({ email: req.body.email });

    if (userEmail) {
      return res.status(400).json({
        status: "fail",
        message: "user already exists",
      });
    }

    //hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    
    
    //store code with user's data in database
    const user = await User.create({
      fullName,
      email,
      password: hashedPassword,
      countryOfResidence,
      recyclingHabits, 
      signupOptions
    });
    
    res.status(201).json({
      status: "success",
      message: "user created successfully",
      data: user,
    });
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
}; 


module.exports.login = async (req, res) => {
  try {
    //find user
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(400).json({
        status: "fail",
        message: "user does not exist",
      });
    }
    //if user found compare password
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );

    //if password is not valid
    if (!validPassword) {
      return res.status(400).json({
        status: "fail",
        message: "invalid password",
      });
    }
    //if password is valid create token
    const token = jwt.sign({ _id: user._id }, process.env.MY_SECRET, {
      expiresIn: "2 days",
    });
    //send token to client
    res.cookie("jwt", token, { httpOnly: true, maxAge: 2 * 24 * 60 * 60 * 1000 });
    
    res.status(200).json({
      status: "success",
      message: "user logged in successfully",
      data: user,
    });
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
};

module.exports.logout = (req, res) => {
  res.cookie("jwt", "", { maxAge: 1 });
  res.status(200).json({
    status: "success",
    message: "user logged out successfully",
  });
};
