const User = require("../models/User");
const Slot = require("../models/Slot");
const userSchema = require("../validators/userValidator");

const createUser = async (req, res) => {
    try {
        // Validating request body
        const { error } = userSchema.validateAsync(req.body);
        if (error) return res.status(400).json({ message: error.details[0].message.replace(/"/g, '') });

        const { slot_id, first_name, last_name, phone } = req.body;

        const existingUser = await User.findOne({ slot_id });

        if (existingUser) {
            // Update the user
            await User.updateOne(
                { slot_id },
                { $set: { first_name, last_name, phone } }
            );

            return res.status(200).json({ message: "User updated successfully!" });
        } else {
            // Creating a new user
            const newUser = new User(req.body);
            await newUser.save();

            // Marking the slot as booked
            await Slot.updateOne({ _id: slot_id }, { $set: { is_booked: 1 } });

            return res.status(201).json({ message: "Slot booked successfully!", user: newUser });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

module.exports = { createUser };
