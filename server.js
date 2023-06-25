import { app } from "./app.js";
import { connectDB } from "./data/database.js";

connectDB();

app.listen(process.env.PORT, ()=>{
    console.log(`Server working on ${process.env.PORT} in ${process.env.NODE_env} mode`);
})