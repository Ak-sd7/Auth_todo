import mongoose from "mongoose";
// schemas
const schema = new mongoose.Schema({ 
    title:{
        type: String,
        required: true
    },
    discription:{
        type: String,
        required:true
    },
    isCompleted:{
        type: Boolean,
        default:false,
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    CreatedAt:{
        type: Date,
        default: Date.now,
        required:true
    }
})
//model
const Task = mongoose.model("Task",schema);

export default Task;