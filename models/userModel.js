const mongoose = require("mongoose");
const { isEmail } = require("validator");

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, "please enter your fullname"],
      unique: true,
    },
    email: {
      type: String,
      required: [true, "please enter your email"],
      unique: true,
      lowercase: true,
      validate: [isEmail, "please enter a valid email"],
    },
    password: {
      type: String,
      required: [true, "please enter a password"],
      unique: true,
      minlength: [8, "minimum password length is 8 character"],
    },
    countryOfResidence: {
      type: String,
      required: [true, "please enter your country of residence"],
    },
    recyclingHabits: {
      type: String,  
      enum: ["I recycle often", "I recycle occationally", "I don't recycle at all",],
      default: "I recycle often", 
    },
    signupOptions: {
      type: String,  
      enum: ["I'm a user", "I'm a representative of a recycling center", "I don't recycle at all"],
      default: "I'm a user",  
    },
  },
 
  {
    timestamps: true,
  }
);
const User = mongoose.model("User", userSchema);
module.exports = { User };
