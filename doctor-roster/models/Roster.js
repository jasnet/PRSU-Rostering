const mongoose = require("mongoose");

const slotSchema = new mongoose.Schema({
    day: String,
    activity: String,
    startTime: String,
    endTime: String,
    details: String
});

const rosterSchema = new mongoose.Schema({
    doctorId: String,
    doctorName: String,
    department: String,
    weekStartDate: {
        type: Date,
        default: Date.now
    },
    schedule: [slotSchema]
});

module.exports = mongoose.model("Roster", rosterSchema);