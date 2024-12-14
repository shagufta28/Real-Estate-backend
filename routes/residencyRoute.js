import express from 'express';
import { createResidency, getAllResidencies , getResidency, bookVisit } from '../controllers/residencyController.js';
import jwtCheck from '../config/auth0Config.js';


const router = express.Router()

const Property = require('../models/Property.js'); // Assuming Property model exists

// Route to create a new property
router.post('/create', async (req, res) => {
    const { title, description, price, location } = req.body; // Property data sent from the frontend

    try {
        const newProperty = new Property({
            title,
            description,
            price,
            location,
            createdAt: new Date(),
        });

        await newProperty.save();
        res.status(201).json({ message: 'Property created successfully', property: newProperty });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to create property' });
    }
});

// Route to get all properties
router.get('/allresd', async (req, res) => {
    try {
        const properties = await Property.find(); // Fetch all properties from the database
        res.status(200).json(properties);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to fetch properties' });
    }
});
router.get("/:id", getResidency)
router.post('/bookVisit', bookVisit);

export {router as residencyRoute }
