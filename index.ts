import express, {Request, Response} from "express"
import {PrismaClient} from "@prisma/client"

const app = express()
app.use(express.json())

// usaremos essa variável para manipulara tabela
const prisma = new PrismaClient()

// Create one user
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

// Create many users
app.post("/createManyUsers", async(req: Request, res: Response) => {
    const {userList} = req.body

    const users = await prisma.user.createMany({
        data: userList
    })

    res.json(users)
})

// Create many cars
app.post("/createManyCars", async(req: Request, res: Response) => {
    const {carList} = req.body

    const cars = await prisma.car.createMany({
        data: carList
    })

    res.json(cars)
})

// Get all users
app.get("/", async (req: Request, res: Response) => {
    const users = await prisma.user.findMany()

    res.json(users)
})

// Get all users with cars
app.get("/usersWithCars", async (req: Request, res: Response) => {
    const users = await prisma.user.findMany({
        include: {
            cars: true
        }
    })

    res.json(users)
})

// Get one user
app.get("/byId/:id", async (req: Request, res: Response) => {
    const id = req.params.id

    const user = await prisma.user.findUnique({
        where: {
            id: Number(id),
        }
    })

    res.json(user)
})

// Update one user
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

// Delete one user
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