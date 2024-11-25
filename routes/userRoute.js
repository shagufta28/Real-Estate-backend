import express from 'express';
import {bookVisit,cancelBooking,createUser,getAllBookings} from "../controllers/userController.js";
import jwtCheck from '../config/auth0Config.js';
const router = express.Router()

router.post('/register',jwtCheck, createUser);
router.post('/bookVisit/:id',jwtCheck, bookVisit);
router.post("/allBookings" ,jwtCheck, getAllBookings)
router.post("/removeBooking/:id",jwtCheck,  cancelBooking);

export {router as userRoute }
