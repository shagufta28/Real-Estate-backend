import asynchHandler from 'express-async-handler'
import { prisma } from "../config/prismaConfig.js"

export const createResidency = asynchHandler(async (req, res) => {
    const { title, description, price, address, city, country, image, facilities, userEmail } = req.body;

    console.log("Incoming Residency Data:", req.body); // Debugging log

    if (!title || !description || !price || !address || !city || !country || !image || !userEmail) {
        res.status(400).json({ message: "All fields are required." });
        return;
    }

    try {
        // Check if user exists
        const user = await prisma.user.findUnique({ where: { email: userEmail } });
        if (!user) {
            return res.status(404).json({ message: "User not found. Cannot assign residency." });
        }

        // Create the residency
        const residency = await prisma.residency.create({
            data: {
                title,
                description,
                price: parseFloat(price),
                address,
                city,
                country,
                image,
                facilities,
                owner: { connect: { email: userEmail } }, // Connect to owner by email
            },
        });

        res.status(201).json({ message: "Residency created successfully!", residency });
    } catch (err) {
        console.error("Error Creating Residency:", err);
        if (err.code === "P2002") {
            res.status(400).json({ message: "A residency with the same address already exists." });
        } else {
            res.status(500).json({ message: "Failed to create residency.", error: err.message });
        }
    }
});



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