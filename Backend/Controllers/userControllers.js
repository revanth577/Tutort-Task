const userModel = require("../models/userModel.js");
const nodemailer = require("nodemailer");

exports.Signup = async (req, res) => {
  try {
    console.log("route called")
    const userData = req.body;
    console.log(userData);

    const user = await userModel.create(userData);
    res.status(200).json({
      status: "success",
      message: "register suucessfull,Please Login...!",
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      status: "failure",
      error: err.message,
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email } = req.body;
    const userExists = await userModel.findOne({ email: email });
    if (userExists) {
      let otp = Math.floor(1000 + Math.random() * 9000);
      const transporter = nodemailer.createTransport({
        service: "gmail",
        host: "smtp.gmail.com",
        auth: {
          user: "tutorttask@gmail.com",
          pass: "bcoelewlpncsycek",
        },
      });

      let info = await transporter.sendMail({
        from: "<tutorttask@gmail.com>", // sender address
        to: email, // list of receivers
        subject: "Tutort AUthentication Confirmation", // Subject line
        text: "", // plain text body
        html: `Your one time password (OTP) for logging into Tutort is ${otp}.Expires in 5 minutes `, // html body
      });

      userExists.otp = otp;
      userExists.otpExpire = new Date().getTime() + 5 * 60 * 1000;

      await userExists.save();
      res.status(200).json({
        status: "success",
        data: "Otp Send Successfully. Expires in 5 minutes",
      });
    } else {
      throw new Error("No User Found");
    }
  } catch (err) {
    res.status(400).json({
      status: "failure",
      error: err.message,
    });
  }
};

exports.verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    const userExists = await userModel.findOne({ email: email, otp: otp });
    console.log(userExists);
    if (!userExists) {
      throw new Error("Otp Expired..");
    }
    let currentTime = new Date().getTime();
    if (currentTime > userExists.otpExpire) {
      throw new Error("Otp Expired..");
    }
    if (userExists) {
      userExists.otp = "";
      await userExists.save();
      res.status(200).json({
        status: "success",
        data: "Logged In Successfully",
      });
    } else {
      throw new Error("Invalid OTP");
    }
  } catch (err) {
    res.status(400).json({
      status: "failure",
      error: err.message,
    });
  }
};
