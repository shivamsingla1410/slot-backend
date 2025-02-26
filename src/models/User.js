const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    slot_id: { type: mongoose.Schema.Types.ObjectId, ref: "Slot", required: true },
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    phone: { type: Number, required: true, unique: true },
});

const User = mongoose.model("User", UserSchema);
module.exports = User;
