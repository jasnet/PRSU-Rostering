import { useState } from "react";
import departments from "../data/departments";
import { createDoctor } from "../api/doctorApi";
import { generateRoster } from "../api/rosterApi";

const departmentTypes = {
  "General Medicine": "Minor",
  "General Surgery": "Major",
  "Obstetrics & Gynaecology (OBG)": "Major",
  "Pediatrics": "Major",
  "Orthopedics": "Major",
  "Dermatology (DVL)": "Minor",
  "Psychiatry": "Minor",
  "ENT (Ear, Nose, Throat)": "Major",
  "Ophthalmology": "Major",
  "Anaesthesiology": "Major",
  "Radio Diagnosis (Radiology)": "Minor",
  "Dentistry": "Minor",
  "Emergency & Trauma Care": "Major"
};

function DoctorForm() {
  const [formData, setFormData] = useState({
    doctorId: "",
    name: "",
    department: "",
    departmentType: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "department") {
      setFormData({
        ...formData,
        department: value,
        departmentType: departmentTypes[value] || ""
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    (async () => {
      try {
        const res = await createDoctor(formData);
        alert(`Doctor saved: ${res.data.name}`);

        // auto-generate roster after save
        const gen = await generateRoster(formData.doctorId);
        console.log('Generated roster', gen.data);
        alert('Roster generated for ' + gen.data.doctorName);
      } catch (err) {
        console.error(err);
        alert(err.response?.data?.message || err.message);
      }
    })();
  };

  return (
    <div style={{ maxWidth: "600px", margin: "30px auto" }}>
      <h2>Add Doctor</h2>

      <form onSubmit={handleSubmit}>
        {/* Doctor ID */}
        <div style={{ marginBottom: "15px" }}>
          <label>Doctor ID</label>
          <br />
          <input
            type="text"
            name="doctorId"
            value={formData.doctorId}
            onChange={handleChange}
            required
          />
        </div>

        {/* Doctor Name */}
        <div style={{ marginBottom: "15px" }}>
          <label>Doctor Name</label>
          <br />
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        {/* Department */}
        <div style={{ marginBottom: "15px" }}>
          <label>Department</label>
          <br />
          <select
            name="department"
            value={formData.department}
            onChange={handleChange}
            required
          >
            <option value="">Select Department</option>
            {departments.map((dept, index) => (
              <option key={index} value={dept}>
                {dept}
              </option>
            ))}
          </select>
        </div>

        {/* Department Type */}
        <div style={{ marginBottom: "15px" }}>
          <label>Department Type</label>
          <br />
          <input
            type="text"
            value={formData.departmentType}
            readOnly
          />
        </div>

        <button type="submit">Save Doctor</button>
      </form>
    </div>
  );
}

export default DoctorForm;