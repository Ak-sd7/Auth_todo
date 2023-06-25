import express from "express"; 
import { UpdateTasks, allTasks, deleteTasks, newTask } from "../controllers/task.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();
  
router.post("/new", isAuthenticated, newTask)

router.get("/my", isAuthenticated, allTasks)

router
    .route("/:id")
    .put(isAuthenticated, UpdateTasks)
    .delete(isAuthenticated, deleteTasks)

export default router;