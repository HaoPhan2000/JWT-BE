const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  score:{type:Number,default:0},
  role: { type: String, default: "user" },
  refreshToken: { type: String, default: null },
});
const User = mongoose.model("User", userSchema);
module.exports = User;
