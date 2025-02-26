const User = require("../models/User");
const Slot = require("../models/Slot");
const userSchema = require("../validators/userValidator");

const getAllSlots = async (req, res) => {
    try {
        const slots = await Slot.find();
        res.status(200).json({ message: "Slots fetched successfully!", slots: slots });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

const getSlotById = async (req, res) => {
    try {
        const { id } = req.params;

        // Fetch the slot by ID and populate user details
        const slot = await Slot.findById(id).lean(); // `lean()` makes the result a plain object
        if (!slot) {
            return res.status(404).json({ message: "Slot not found!" });
        }

        // Fetch user details associated with this slot
        const user = await User.findOne({ slot_id: id }).lean();

        // Combine slot and user into a single object
        const response = { ...slot, user };

        res.status(200).json({ message: "Slot fetched successfully!", slot: response });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

module.exports = { getAllSlots, getSlotById };
