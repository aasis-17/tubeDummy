import dotenv from "dotenv";
import connectDb from "./src/db/index.js";
import {app} from "./src/app.js"

dotenv.config({
    path: './.env'
})
connectDb().then(() => {
    app.listen(process.env.PORT || 8000, () => {
        console.log(`** Server is running at port : ${process.env.PORT}`)
    })

    app.on ("error", (error) =>{
        console.log("error:", error);
        throw error
    })
}).catch((error) => console.log("Database Failed", error) )
    
