const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema({
    doctorId: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    departmentType: {
        type: String,
        enum: ["Major", "Minor"],
        required: true
    }
});

module.exports = mongoose.model("Doctor", doctorSchema);