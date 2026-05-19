const Doctor = require('../models/Doctor');
const Roster = require('../models/Roster');
const generateDoctorRoster = require('../services/doctorRosterService');

exports.generateRoster = async (req, res) => {
    try {
        const { doctorId } = req.params;

        const doctor = await Doctor.findOne({ doctorId });

        if (!doctor) {
            return res.status(404).json({
                message: 'Doctor not found'
            });
        }

        const schedule = generateDoctorRoster(doctor);

        // Delete old roster for this doctor
        await Roster.deleteMany({ doctorId });

        const roster = await Roster.create({
            doctorId: doctor.doctorId,
            doctorName: doctor.name,
            weekStartDate: new Date(),
            schedule
        });

        res.status(200).json(roster);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getRoster = async (req, res) => {
    try {
        const roster = await Roster.findOne({
            doctorId: req.params.doctorId
        });

        if (!roster) {
            return res.status(404).json({
                message: 'Roster not found'
            });
        }

        res.json(roster);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};