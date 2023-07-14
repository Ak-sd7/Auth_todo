import User from "../models/user.js";
import ErrorHandler from "../middlewares/error.js";
import bcrypt from "bcrypt"
import { sendcookie } from "../utils/features.js";

// export const All = async (req, res)=>{}

export const Login = async(req, res, next)=>{
    try {
        const {email, password} = req.body;
        const user = await User.findOne({email}).select("+password");
        if(!user)
            return next(new ErrorHandler("Invalid Email/Password", 404));
        // if(!user)
        //     return res.status(404).json({
        //         success :  false,
        //         message : "Invalid Email/Password"
        // }) 

        const same = await bcrypt.compare(password, user.password);

        if(!same)
            return next(new ErrorHandler("Invalid Email/Password", 404));

        sendcookie(user, res, `Welcome back ${user.name}`);
    } catch (error) {
        next(error);
    }
}

export const Register = async (req, res, next)=>{
    try {
        const {name, email, password} = req.body;
        let user = await User.findOne({email});
        if(user)
            return next(new ErrorHandler("User already exist", 404));
        // if(user)
        //     return res.status(404).json({
        //         success :  false,
        //         message : "User already exist"
        // })

        const hashedPass = await bcrypt.hash(password, 10);

        user = await User.create({ name, email, password : hashedPass})

        sendcookie(user, res, "Registered Successfully", 201);
    } catch (error) {
        next(error);
    }
};

export const GetDetail = (req, res)=>{

    // const id = "";
    res.status(200).json({
        success:true,
        user:req.user
    })

}

export const Logout = (req, res)=>{
    res.status(200)
        .cookie("token", "", {
            expires:new Date(Date.now()),
            sameSite: process.env.NODE_ENV==="Development" ? "lax" : "none",
            secure: process.env.NODE_ENV==="Development" ? false : true,
        })
        .json({
        success:true,
        user:req.user
    })
}


// import User from "../models/user.js";

// export const All = async (req, res)=>{

//     const users  = await User.find({});

//     res.json({
//         success:true, 
//         users 
//     })
// }

// export const Login = (req, res)=>{

// }

// export const Register = async (req, res)=>{
//     const {name, email, password} = req.body;
//     await User.create({
//         name, 
//         email, 
//         password
//     });

//     res.cookie("temp", "anime").json({
//         success:true, 
//         message:"Registered"
//     })
// }

// export const ID = async(req, res)=>{
//     // const {id} = req.body;
//     const {id} = req.params;
//     const user = await User.findById(id);

//     res.json({
//         success: true,
//         user
//     })

// }