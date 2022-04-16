import { Request, Response } from "express"
import { prismaClient } from "../database/prismaClient"

export class UserController{
    // Create user
    async createOneUser(request: Request, response: Response){
        const {username, password} = request.body

        const user = await prismaClient.user.create({
            data: {
                username: username,
                password: password
            }
        })

        return response.json(user)
    }

    // Create many users
    async createUsers(request: Request, response: Response){
        const {userList} = request.body

        const users = await prismaClient.user.createMany({
            data: userList
        })

        return response.json(users)
    }

    // Get user
    async showUserById(request: Request, response: Response){
        const id = request.params.id

        const user = await prismaClient.user.findUnique({
            where: {
                id: Number(id),
            }
        })

        response.json(user)
    }

    // Get all users
    async showUsers(request: Request, response: Response){
        const users = await prismaClient.user.findMany()

        return response.json(users)
    }

    // Get all users with cars
    async showUsersWithCars(req: Request, res: Response){
        const users = await prismaClient.user.findMany({
            include: {
                cars: true
            }
        })

        return res.json(users)
    }

    // Update user
    async updateUserById(request: Request, response: Response){
        const {id, username} = request.body

        const updateUser = await prismaClient.user.update({
            where:{
                id: id
            },
            data: {
                username: username
            }
        })

        return response.json(updateUser)
    }
    
    // Delete user
    async deleteUserById(request: Request, response: Response){
        const id = request.params.id

        const deletedUser = await prismaClient.user.delete({
            where: {
                id: Number(id)
            },
        })

        return response.json(deletedUser)
    }
}