const mongoose = require('mongoose');
const Doctor = require('../models/Doctor');

async function run() {
  await mongoose.connect('mongodb://127.0.0.1:27017/doctor_roster');

  const doc = await Doctor.findOneAndUpdate(
    { doctorId: 'D001' },
    {
      doctorId: 'D001',
      name: 'Test Doctor',
      department: 'General Medicine',
      departmentType: 'Major',
      specialization: 'General'
    },
    { upsert: true, new: true }
  );

  console.log('Upserted doctor:', doc);
  await mongoose.disconnect();
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
