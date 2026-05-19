const mongoose = require('mongoose');
const Doctor = require('./models/Doctor');

async function seed() {
    await mongoose.connect('mongodb://127.0.0.1:27017/doctor_roster');

    await Doctor.deleteMany({});

    await Doctor.insertMany([
        {
            doctorId: 'DOC001',
            name: 'Dr. Keya Das',
            departmentType: 'Minor'
        },
        {
            doctorId: 'DOC002',
            name: 'Dr. Ramesh Aravind',
            departmentType: 'Major'
        }
    ]);

    console.log('Sample doctors inserted');
    process.exit();
}

seed();