const mongoose = require("mongoose");
const Doctor = require("./models/Doctor");

async function seed() {
    await mongoose.connect("mongodb://127.0.0.1:27017/doctor_roster");

    await Doctor.deleteMany({});

    await Doctor.insertMany([
        {
            doctorId: "D001",
            name: "Dr. Keya Das",
            department: "Psychiatry",
            departmentType: "Minor"
        },
        {
            doctorId: "D002",
            name: "Dr. Bhavyasree",
            department: "Psychiatry",
            departmentType: "Minor"
        },