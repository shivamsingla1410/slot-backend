const User = require("../models/User");
const Slot = require("../models/Slot");
const userSchema = require("../validators/userValidator");

const createUser = async (req, res) => {
    try {
        await userSchema.validateAsync(req.body, { abortEarly: false });

        const { slot_id, first_name, last_name, phone } = req.body;

        // Checking if a user already booked this slot
        const existingUser = await User.findOne({ slot_id });

        if (existingUser) {
            await User.updateOne({ slot_id }, { $set: { first_name, last_name, phone } });
            return res.status(200).json({ message: "User updated successfully!" });
        } else {
            const newUser = new User(req.body);
            await newUser.save();

            // Marking slot as booked
            await Slot.updateOne({ _id: slot_id }, { $set: { is_booked: 1 } });

            return res.status(201).json({ message: "Slot booked successfully!", user: newUser });
        }
    } catch (err) {
        if (err.isJoi) {
            return res.status(400).json({ message: err.details[0].message.replace(/"/g, '') });
        }

        res.status(500).json({ message: "Internal Server Error" });
    }
};


module.exports = { createUser };
