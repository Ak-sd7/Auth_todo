import jwt from "jsonwebtoken";
import User from "../models/user.js";

export const isAuthenticated = async (req, res, next)=>{
    const {token} = req.cookies;

    if(!token)
        return res.status(404).json({
            success :  false,
            message : "Login First"
        })
    
    // helps us to get the data by token 
    const decodedId = jwt.verify(token, process.env.JWT_SECRET)
    // const user = await User.findById(decodedId._id);
    req.user = await User.findById(decodedId._id);
    next(); // when the next function is called then it'll execute the GetDetail function in /me route

}