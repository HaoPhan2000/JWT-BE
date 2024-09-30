const mongoose = require("mongoose");
const otpSchema = new mongoose.Schema({
  email: { type: String, required: true },
  otp: { type: String, required: true },
  attempts: { type: Number, default: 0 },
  time: { type: Date, default: Date.now, index: { expires: 60 } },
});
const OTP = mongoose.model("OTP", otpSchema);
module.exports = OTP;
