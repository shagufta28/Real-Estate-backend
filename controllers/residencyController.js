import asynchHandler from 'express-async-handler'
import { prisma } from "../config/prismaConfig.js"

export const createResidency = asynchHandler(async (req, res) => {
    const { title, description, price, address, city, country, image, facilities, userEmail } = req.body.data;

    // Log incoming data for debugging (remove in production)
    console.log("Residency data received:", req.body.data);

    // Validate required fields
    if (!title || !description || !price || !address || !city || !country || !image || !userEmail) {
        res.status(400);
        throw new Error("All fields are required.");
    }

    try {
        // Create a new residency in the database
        const residency = await prisma.residency.create({
            data: {
                title,
                description,
                price: parseFloat(price), // Ensure price is saved as a number
                address,
                city,
                country,
                image,
                facilities,
                owner: { connect: { email: userEmail } }, // Connect to the owner by email
            },
        });

        // Respond with success
        res.status(201).json({ message: "Residency created successfully!", residency });
    } catch (err) {
        // Handle unique constraint violation (Prisma P2002)
        if (err.code === "P2002") {
            res.status(400);
            throw new Error("A residency with the same address already exists.");
        }

        // Handle other errors
        res.status(500);
        throw new Error(err.message || "Failed to create residency.");
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

export const bookVisit = asynchHandler(async (req, res) => {
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