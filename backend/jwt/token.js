const jwt = require("jsonwebtoken");
const User = require("../model/user.model");

const generateTokenAndSaveInCookies = async (userId,res) =>{
    const token = jwt.sign({userId},process.env.JWT_SECRET_KEY,{
        expiresIn:"10d"
    });

    res.cookie("jwt",token,{
        httpOnly:true,
        secure:false,
        sameSite:"lax",
        path:"/"


    })

    await User.findByIdAndUpdate(userId,{token:token});
    return token;
}




module.exports = generateTokenAndSaveInCookies;