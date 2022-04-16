import { Router } from "express"

import { UserController } from "./controllers/UserController"
import { CarController } from "./controllers/CarController"

const router = Router()

const userController = new UserController()
const carController = new CarController()

// User routes
// Create user
router.post("/", userController.createOneUser)
// Create many users
router.post("/createManyUsers", userController.createUsers)

// Get all users
router.get("/", userController.showUsers)
// Get user
router.get("/byId/:id", userController.showUserById)
// Get all users with cars
router.get("/usersWithCars", userController.showUsersWithCars)

// Update user
router.put("/", userController.updateUserById)

// Delete user
router.delete("/:id", userController.deleteUserById)


// Car routes
// Create many cars
router.post("/createManyCars", carController.creteManyCars)


export {router}