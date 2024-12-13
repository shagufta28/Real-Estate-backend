import User from "../models/User.js";
import Residency from "../models/Residency.js";

export const createUser = async (req, res) => {
  const { email } = req.body;

  const userExists = await User.findOne({ email });
  if (userExists) {
    return res.status(400).send({ message: "User already registered" });
  }

  const newUser = new User(req.body);
  await newUser.save();

  res.status(201).send({
    message: "User registered successfully",
    user: newUser,
  });
};

export const bookVisit = async (req, res) => {
  const { email, date, id } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(404).send({ message: "User not found" });
  }

  const alreadyBooked = user.bookedVisites.some((visit) => visit.id.toString() === id);
  if (alreadyBooked) {
    return res.status(400).json({ message: "Already booked" });
  }

  user.bookedVisites.push({ id, date });
  await user.save();

  res.send("Booking is done");
};

export const getAllBookings = async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email }).select('bookedVisites');
  res.status(200).send(user.bookedVisites);
};

export const cancelBooking = async (req, res) => {
  const { email } = req.body;
  const { id } = req.params;

  const user = await User.findOne({ email });

  const bookingIndex = user.bookedVisites.findIndex(visit => visit.id.toString() === id);
  if (bookingIndex === -1) {
    return res.status(404).json({ message: "Booking not found" });
  }

  user.bookedVisites.splice(bookingIndex, 1);
  await user.save();

  res.send("Booking cancelled successfully");
};
