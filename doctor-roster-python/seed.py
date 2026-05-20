from pymongo import MongoClient

client = MongoClient("mongodb://127.0.0.1:27017")
db = client.doctor_roster

# -----------------------------------------
# Department List
# -----------------------------------------
sample_departments = [
    "General Medicine",
    "General Surgery",
    "Obstetrics & Gynaecology (OBG)",
    "Pediatrics",
    "Orthopedics",
    "Dermatology (DVL)",
    "Psychiatry",
    "Dentistry",
    "Emergency & Trauma Care",
]

# -----------------------------------------
# Department Type Mapping
# -----------------------------------------
department_types = {
    "General Medicine": "Minor",
    "General Surgery": "Major",
    "Obstetrics & Gynaecology (OBG)": "Major",
    "Pediatrics": "Minor",
    "Orthopedics": "Major",
    "Dermatology (DVL)": "Minor",
    "Psychiatry": "Minor",
    "Dentistry": "Minor",
    "Emergency & Trauma Care": "Major",
}

# -----------------------------------------
# Psychiatry Doctors (from your image)
# -----------------------------------------
psychiatry_doctors = [
    "Dr. Keya Das",
    "Dr. Bhavyasree",
    "Dr. Madhu Sekhar",
    "Dr. Nishanth Reddy A",
    "Dr. S. Nandhana",
    "Dr. Ramesh Aravind",
    "Dr. Jaffer Sadiq",
    "Ms. Delna Joseph",
    "Mr. Jesu Maria Dass",
]

# -----------------------------------------
# Generate Doctors List
# -----------------------------------------
sample_doctors = []

# Psychiatry doctors
for index, name in enumerate(psychiatry_doctors, start=1):
    sample_doctors.append({
        "doctorId": f"PSY{index:03}",
        "name": name,
        "department": "Psychiatry",
        "departmentType": "Minor",
        "specialization": "Psychiatry"
    })

# Sample doctors for other departments
other_departments = [
    ("General Medicine", "Dr. Priya Nair"),
    ("General Surgery", "Dr. Arun Kumar"),
    ("Obstetrics & Gynaecology (OBG)", "Dr. Kavita Rao"),
    ("Pediatrics", "Dr. Sunita Patel"),
    ("Orthopedics", "Dr. Anil Singh"),
    ("Dermatology (DVL)", "Dr. Neha Sharma"),
    ("Dentistry", "Dr. Farhan Khan"),
    ("Emergency & Trauma Care", "Dr. Amit Desai"),
]

for index, (department, name) in enumerate(other_departments, start=1):
    sample_doctors.append({
        "doctorId": f"DOC{index:03}",
        "name": name,
        "department": department,
        "departmentType": department_types[department],
        "specialization": department
    })

# -----------------------------------------
# Seed Database
# -----------------------------------------
def seed():
    db.departments.delete_many({})
    db.doctors.delete_many({})
    db.rosters.delete_many({})

    db.departments.insert_many([
        {"name": dept}
        for dept in sample_departments
    ])

    db.doctors.insert_many(sample_doctors)

    print("✅ Departments inserted:", len(sample_departments))
    print("✅ Doctors inserted:", len(sample_doctors))
    print("🎉 Database seeded successfully.")

if __name__ == "__main__":
    seed()