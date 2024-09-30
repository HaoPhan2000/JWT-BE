const otpGenerator = require("otp-generator");
const Otp = require("../models/otpModel");
const bcrypt = require("bcrypt");
const saltRounds = 10;
class CustomMessageEC {
  constructor(EC, EM) {
    this.EC = EC;
    this.EM = EM;
  }
}

const otpService = {
  get: async (email) => {
    const OTP = otpGenerator.generate(6, {
      digits:true,
      lowerCaseAlphabets:false,
      upperCaseAlphabets: false,
      specialChars: false,
    });
    try {
      const hashOTP = await bcrypt.hash(OTP, saltRounds);
      await Otp.create({
        email,
        otp: hashOTP,
      });
      return { code: 1, otp: OTP };
    } catch (error) {
      console.log(error);
      return { code: 0 };
    }
  },
  verify: async ({ otp, email }) => {
    try {
      const otpHolder = await Otp.find({
        email,
      });
      if (!otpHolder.length)
        throw new CustomMessageEC(101, "Email không tồn tại");
      const lastOtp = otpHolder[otpHolder.length - 1];
      const isMatch = await bcrypt.compare(otp, lastOtp.otp);
      if (!isMatch) {
        if (lastOtp.attempts + 1 >= 3) {
          throw new CustomMessageEC(102, "Đã vượt quá số lần thử nhập OTP");
        }
        lastOtp.attempts += 1;
        await lastOtp.save();
        throw new CustomMessageEC(101, "Mã OTP không chính xác");
      }
      return new CustomMessageEC(1, "Thành công");
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
};
module.exports = otpService;
