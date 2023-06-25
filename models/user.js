import mongoose from "mongoose";
// schemas
const schema = new mongoose.Schema({
    name:{
        type: String,
        required:true 
    },
    email:{
        type: String,
        unique: true,
        required:true
    },
    password:{
        type: String,
        // select is used so that the developer cannot access the password directly 
        select:false,
        required:true
    },
    CreatedAt:{
        type: Date,
        default: Date.now,
        required:true
    }
})
//model
const User = mongoose.model("User",schema);

export default User;