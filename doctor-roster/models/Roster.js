const mongoose = require("mongoose");

const rosterSchema = new mongoose.Schema({
    doctorId: String,
    doctorName: String,
    weekStartDate: Date,
    schedule: [
        {
            day: String,
            activity: String,
            startTime: String,
            endTime: String,
            details: String
        }
    ]
});

module.exports = mongoose.model("Roster", rosterSchema);