import { Request, Response } from "express"
import { prismaClient } from "../database/prismaClient"

export class UserController{
    // Create user
    async createOneUser(request: Request, response: Response){
        try {
            const {username, password} = request.body

            const user = await prismaClient.user.create({
                data: {
                    username: username,
                    password: password
                }
            })
    
            return response.status(201).json(user)
        } catch (error) {
            console.log(error)
            return response.status(400)
        }
    }

    // Create many users
    async createUsers(request: Request, response: Response){
        try {
            const {userList} = request.body

            const users = await prismaClient.user.createMany({
                data: userList
            })
    
            return response.status(201).json(users)
        } catch (error) {
            console.log(error)
            return response.status(400)
        }
    }

    // Get user
    async showUserById(request: Request, response: Response){
        try {
            const id = request.params.id

            const user = await prismaClient.user.findUnique({
                where: {
                    id: Number(id),
                }
            })

            // Caso usuário não seja encontrado
            if(user == null){
                return response.status(400).json('User not founded!')
            }
    
            response.status(200).json(user)
        } catch (error) {
            console.log(error)
            return response.status(400)
        }
    }

    // Get all users
    async showUsers(request: Request, response: Response){
        try {
            const users = await prismaClient.user.findMany()

            return response.status(200).json(users)
        } catch (error) {
            console.log(error)
            return response.status(400)
        }
    }

    // Get all users with cars
    // Bug retorna tbm quem não tem carro
    async showUsersWithCars(request: Request, response: Response){
        try {
            const users = await prismaClient.user.findMany({
                include: {
                    cars: true
                }
            })
            return response.status(200).json(users)
        } catch (error) {
            console.log(error)
            return response.status(400)
        }
    }

    // Update user
    async updateUserById(request: Request, response: Response){
        try {
            const {id, username} = request.body

            const updateUser = await prismaClient.user.update({
                where:{
                    id: id
                },
                data: {
                    username: username
                }
            })

            return response.status(200).json(updateUser)
        } catch (error) {
            console.log(error)
            return response.status(400)
        }
        
    }
    
    // Delete user
    async deleteUserById(request: Request, response: Response){
        try {
            const id = request.params.id

            const deletedUser = await prismaClient.user.delete({
                where: {
                    id: Number(id)
                },
            })
    
            return response.status(200).json(deletedUser)
        } catch (error) {
            console.log(error)
            return response.status(400)
        }
    }
}