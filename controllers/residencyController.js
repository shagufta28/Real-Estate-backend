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

export const bookVisit = asyncHandler(async (req, res) => {
    const { value, propertyId, email } = req.body;

    // Make sure all required data is present
    if (!value || !propertyId || !email) {
        return res.status(400).send({ message: "Missing required fields" });
    }

    try {
        // Save the booking to the database
        const booking = await prisma.booking.create({
            data: {
                visitDate: value,
                propertyId: propertyId,
                userEmail: email,
            }
        });

        res.status(200).send({ message: 'Booking successful', booking });
    } catch (err) {
        res.status(500).send({ message: 'Error booking visit', error: err.message });
    }
});