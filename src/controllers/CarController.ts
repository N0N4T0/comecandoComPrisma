import { Request, Response } from "express"
import { prismaClient } from "../database/prismaClient"

export class CarController{
    // Create many cars
    async creteManyCars(request: Request, response: Response){
        try {
            const {carList} = request.body
    
            const cars = await prismaClient.car.createMany({
                data: carList
            })
        
            return response.status(201).json(cars)
        } catch (error) {
            console.log(error)
            return response.status(400)
        }
    }
}