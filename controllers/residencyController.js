import Residency from "../models/Residency.js";

export const createResidency = async (req, res) => {
  const { title, description, price, address, city, country, image, facilities, userEmail } = req.body;

  try {
    const owner = await User.findOne({ email: userEmail });
    if (!owner) {
      return res.status(404).send({ message: "Owner not found" });
    }

    const newResidency = new Residency({
      title, description, price, address, city, country, image, facilities, owner: owner._id
    });
    await newResidency.save();

    res.send({ message: "Residency created successfully" });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

export const getAllResidencies = async (req, res) => {
  try {
    const residencies = await Residency.find().sort({ createdAt: -1 });
    res.send(residencies);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

export const getResidency = async (req, res) => {
  const { id } = req.params;

  try {
    const residency = await Residency.findById(id);
    if (!residency) {
      return res.status(404).send({ message: "Residency not found" });
    }
    res.send(residency);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};
