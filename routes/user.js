import express from "express"; 
import { GetDetail, Login, Register, Logout } from "../controllers/user.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

// router.get("/all", All)

router.post("/new", Register)

router.post("/login", Login)

router.get("/logout", Logout)

router.get("/me", isAuthenticated, GetDetail)


export default router; 