const mongoose = require("mongoose");
const validator = require(" ");
const bcrypt = require("bcrypt");

/**
 *  @swagger
 *  definitions:
 *    User:
 *      type: object
 *      properties:
 *        _id: type: string
 *        username: type: string
 *        password: type: string
 *        fullname: type: string
 *        email: type: string
 *        role: type: string
 *      required:
 *         - username
 *        - password
 *        - fullname
 *        - email
 *        - role
 *      methods:
 *        comparePassword
 *        getHash
 *        emailValidator
 */

const emailValidator = [
  val => validator.isEmail(val),
  "Email is Incorrect format",
];
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: "Username is requied",
  },
  password: {
    type: String,
    required: "Username is requied",
  },
  fullname: {
    type: String,
    required: "Fullname is requied",
  },
  email: {
    type: String,
    required: "Email is required",
    validate: emailValidator,
  },
  role: { type: String },
});
userSchema.methods.comparePassword = (password, encode) => bcrypt.compareSync(password, encode);
userSchema.methods.getHash = password => bcrypt.hashSync(password, 10);

module.exports = mongoose.model("User", userSchema);
