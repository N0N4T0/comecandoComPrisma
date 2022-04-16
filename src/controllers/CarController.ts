import { Request, Response } from "express"
import { prismaClient } from "../database/prismaClient"

export class CarController{
    // Create many cars
    async creteManyCars(request: Request, response: Response){
        const {carList} = request.body
    
        const cars = await prismaClient.car.createMany({
            data: carList
        })
    
        return response.json(cars)
    }
}