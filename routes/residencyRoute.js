import express from 'express';
import { createResidency, getAllResidencies , getResidency, bookVisit } from '../controllers/residencyController.js';
import jwtCheck from '../config/auth0Config.js';


const router = express.Router()

router.post("/create", jwtCheck, (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  console.log("Received Token:", token);

  // Ensure the token is verified and valid (jwtCheck does this).
  if (!token) {
      return res.status(401).json({ message: "No token provided or invalid." });
  }

  // Call the controller for residency creation
  createResidency(req, res);
});
router.get("/allresd" , getAllResidencies)
router.get("/:id", getResidency)
router.post('/bookVisit', bookVisit);

export {router as residencyRoute }
