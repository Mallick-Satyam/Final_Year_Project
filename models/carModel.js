

const mongoose = require("mongoose");

const carSchema = new mongoose.Schema({
    name: { type: String, required: true },
    image: { type: String, required: true },
    capacity: { type: Number, required: true },
    fuelType: { type: String, required: true },
    carNumber: { type: String, required: true }, // New field
    ownerName: { type: String, required: true }, // New field
    ownerContactNumber: { type: String, required: true }, // New field
    city: { type: String, required: true }, // New field
    bookedTimeSlots: [
        {
            from: { type: String, required: true },
            to: { type: String, required: true }
        }
    ],
    rentPerHour: { type: Number, required: true }
}, { timestamps: true });

const carModel = mongoose.model('cars', carSchema);
module.exports = carModel;
