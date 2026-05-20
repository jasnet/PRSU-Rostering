const Doctor = require("../models/Doctor");
const Roster = require("../models/Roster");
const { generateDoctorRoster } = require("../services/doctorRosterService");

exports.generateRoster = async (req, res) => {
    try {
        const { doctorId } = req.params;

        const doctor = await Doctor.findOne({ doctorId });

        if (!doctor) {
            return res.status(404).json({ message: "Doctor not found" });
        }

        const schedule = generateDoctorRoster(doctor);

        // create and save roster document
        const roster = new Roster({
            doctorId: doctor.doctorId,
            doctorName: doctor.name,
            department: doctor.department,
            schedule
        });

        await roster.save();

        return res.status(200).json(roster);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
