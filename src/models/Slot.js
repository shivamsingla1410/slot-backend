const mongoose = require("mongoose");

const SlotSchema = new mongoose.Schema({
    from_time: String,
    to_time: String,
    is_booked: { type: Number, default: 0 } // 0 = Available, 1 = Booked
});

const Slot = mongoose.model("Slot", SlotSchema);
module.exports = Slot;
