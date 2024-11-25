import express from 'express';
import { createResidency, getAllResidencies , getResidency } from '../controllers/residencyController.js';
import jwtCheck from '../config/auth0Config.js';


const router = express.Router()

router.post("/create", jwtCheck, (req, res) => {
    const token = req.headers.authorization?.split(" ")[1];
    console.log("Received Token:", token);
    res.send("Token received");
  });
router.get("/allresd" , getAllResidencies)
router.get("/:id", getResidency)

export {router as residencyRoute }
