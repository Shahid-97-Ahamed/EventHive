import app from "./app";
import { pool } from "./config/db";
import config from "./config/env";

const main =async()=>{
    await pool.query("SELECT * FROM users") //this is DB connection check test
    console.log("Database connected")

    app.listen(config.port,()=>{
    console.log(`Server is running on port ${config.port}`)
})
}


main()