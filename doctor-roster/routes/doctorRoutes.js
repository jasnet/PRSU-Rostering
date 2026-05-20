const express = require("express");
const router = express.Router();
const Doctor = require("../models/Doctor");

// Add new doctor
router.post("/", async (req, res) => {
  try {
    const doctor = await Doctor.create(req.body);
    res.status(201).json(doctor);
  } catch (error) {
    res.status(400).json({
      message: error.message
    });
  }
});

// Get all doctors
router.get("/", async (req, res) => {
  try {
    const doctors = await Doctor.find().sort({ name: 1 });
    res.json(doctors);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});

module.exports = router;