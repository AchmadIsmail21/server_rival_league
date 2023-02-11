// import cors from "cors"
import express from "express";
import dotenv from "dotenv";
import db from "./src/models/index.js";
import user_routes from "./src/routes/UserRoutes/userRoutes.js";
dotenv.config()

/* Configuration */
//import PORT from env
const {PORT} = process.env || 6001;
const app = express();

//middleware
app.use(express.json())
// app.use(cors())

/* End Configuration */
db.sequelize.authenticate()
    .then(() => {
        console.log("Synced db")
    })
    .catch((err) => {
        console.log(err.message)
    });

//call routes
app.use(user_routes)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})

export default app;