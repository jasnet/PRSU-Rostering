const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema({
    doctorId: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    department: { type: String, required: true },
    departmentType: {
        type: String,
        enum: ["Major", "Minor"],
        required: true
    },
    specialization: String
});

module.exports = mongoose.model("Doctor", doctorSchema);