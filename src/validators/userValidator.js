const Joi = require("joi");
const Slot = require("../models/Slot");

const userSchema = Joi.object({
    slot_id: Joi.string()
        .required()
        .external(async (value, helpers) => {
            const slot = await Slot.findById(value);
            if (!slot) {
                throw new Error("Slot does not exist.");
            }
            return value;
        }),
    first_name: Joi.string().min(3).max(30).required(),
    last_name: Joi.string().min(3).max(30).required(),
    phone: Joi.string()
        .pattern(/^[0-9]{10}$/) // Allow only 10-digit numbers
        .required()
        .messages({
            "string.pattern.base": "Phone number must be exactly 10 digits."
        }),
});

module.exports = userSchema;
