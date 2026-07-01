const { default: mongoose } = require("mongoose");

//Schema
const userSchema=new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
     role: {
  type: String,
  enum: ["user", "admin"],
  default: "user"
  },
});

const User=mongoose.model('user',userSchema);    //It is use to create a collection or folder named "user" in database and "User" is do changes in our database folder.

module.exports = User;