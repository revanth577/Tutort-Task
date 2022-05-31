const express=require("express");


const router=express.Router();
const {Signup,login,verifyOtp}=require("../Controllers/userControllers.js");


router.post("/signup",Signup);

router.post("/login",login)

router.post("/verifyOtp",verifyOtp)

module.exports=router;