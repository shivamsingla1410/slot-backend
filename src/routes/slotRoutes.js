const express = require("express");
const slotController = require("../controllers/slotController");
const userController = require("../controllers/userController");

const router = express.Router();

router.get("/slots", slotController.getAllSlots);
router.get("/slot/:id", slotController.getSlotById);
router.post("/slot/book", userController.createUser);

module.exports = router;
