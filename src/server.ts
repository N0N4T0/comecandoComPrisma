import express from "express"
import { router } from "./routes"

const app = express()

app.use(express.json())
app.use(router)

app.listen(3001, ()=> {
    console.log("SERVER RUNNING ON PORT 3001")
})