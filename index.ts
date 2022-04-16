import express, {Request, Response} from "express"
import {PrismaClient} from "@prisma/client"

const app = express()
app.use(express.json())

// usaremos essa variável para manipulara tabela
const prisma = new PrismaClient()

app.post("/", async(req: Request, res: Response) => {
    const {username, password} = req.body

    const user = await prisma.user.create({
        data: {
            username: username,
            password: password
        }
    })

    res.json(user)
})

app.get("/", async (req: Request, res: Response) => {
    const users = await prisma.user.findMany()

    res.json(users)
})

app.put("/", async (req: Request, res: Response) => {
    const {id, username} = req.body

    const updateUser = await prisma.user.update({
        where:{
            id: id
        },
        data: {
            username: username
        }
    })

    res.json(updateUser)
})

app.delete("/:id", async (req: Request, res: Response) => {
    const id = req.params.id

    const deletedUser = await prisma.user.delete({
        where: {
            id: Number(id)
        },
    })

    res.json(deletedUser)
})




app.listen(3001, ()=> {
    console.log("SERVER RUNNING ON PORT 3001")
})