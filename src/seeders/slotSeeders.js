const { MongoClient } = require("mongodb");
require("dotenv").config(); // Load environment variables

const uri = process.env.MONGO_URI;
const client = new MongoClient(uri);

const seedSlots = async () => {
    try {
        await client.connect();
        console.log("Connected to MongoDB");

        const db = client.db();
        const slotsCollection = db.collection("slots");

        // Deleting existing slots
        await slotsCollection.deleteMany({});
        console.log("Existing slots deleted.");

        // Saving slot data
        await slotsCollection.insertMany([
            { from_time: "09:00", to_time: "10:00", is_booked: 0 },
            { from_time: "10:00", to_time: "11:00", is_booked: 0 },
            { from_time: "11:00", to_time: "12:00", is_booked: 0 },
            { from_time: "12:00", to_time: "13:00", is_booked: 0 },
            { from_time: "13:00", to_time: "14:00", is_booked: 0 },
            { from_time: "14:00", to_time: "15:00", is_booked: 0 },
            { from_time: "15:00", to_time: "16:00", is_booked: 0 },
            { from_time: "16:00", to_time: "17:00", is_booked: 0 }
        ]);

        console.log("Slots inserted successfully!");
    } catch (error) {
        console.error("Error inserting slots:", error);
    } finally {
        await client.close();
        console.log("MongoDB connection closed.");
    }
};

// Running the seeder
seedSlots();
