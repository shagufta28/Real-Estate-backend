import asynchHandler from 'express-async-handler'
import { prisma } from "../config/prismaConfig.js"

export const createResidency = asynchHandler(async (req, res) => {
    const { title, description, price, address, city, country, image, facilities, userEmail } = req.body.data

    console.log(req.body.data);
    try {
        const residency = await prisma.residency.create({
            data: {
                title, description, price, address, city, country, image, facilities, owner: { connect: { email: userEmail } }
            }
        })
        res.send({message : "succesfull"})
    } catch (err) {
        if (err.code === "P2002") {
            throw new Error("a residency with same address exist")
        }
        throw new Error(err.message)
    }
});

export const getAllResidencies =  asynchHandler(async(req,res)=>{
    const residencies = await prisma.residency.findMany({
        orderBy:{
            createdAt:"desc"
        }
    })

    res.send(residencies);
})


export const getResidency = asynchHandler(async(req,res)=>{
    const {id} = req.params;

    try {
        const residency = await prisma.residency.findUnique({
            where : {id}
        })
        res.send(residency)
    } catch (err) {
        throw new Error(err.message)
    }
})
