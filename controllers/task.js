import ErrorHandler from "../middlewares/error.js";
import Task from "../models/task.js";


export const newTask = async(req, res, next)=>{
    try {
        const { title, discription, } = req.body;
        // same as task.create
        // const task = new Task({title, discription});
        // await task.save();

        await Task.create({
            title,
            discription,
            user: req.user
        });
        res.status(201).json({
            success: true,
            message: "Task added successfully"
        })
    } catch (error) {
        next(error);
    }
}

export const allTasks = async(req, res, next) => {
    try {
        const userId = req.user._id;

        const tasks = await Task.find({user: userId})

        res.status(200).json({
            success: true,
            tasks
        })
    } catch (error) {
        next(error);
    }
}
export const UpdateTasks = async(req, res, next) => {
    try {
        const {id} = req.params;

        const tasks = await Task.findById(id);

        tasks.isCompleted = !tasks.isCompleted;

        if(!tasks)
            return next(new ErrorHandler("Invalid Id", 404));

        await tasks.save();

        res.status(200).json({
            success: true,
            message: "Task Updated"
        })
    } catch (error) {
        next(error);
    }
    
}
export const deleteTasks = async(req, res, next) => {
    try {
        const {id} = req.params;
        const task = await Task.findById(id);

        if(!task)
            return next(new ErrorHandler("Invalid Id", 404));


        await task.deleteOne();

        res.status(200).json({
            success: true,
            message: "Task deleted"
        })
    } catch (error) {
        next(error);
    }
}