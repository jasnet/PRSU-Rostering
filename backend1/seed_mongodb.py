from pymongo import MongoClient

def seed_db():
    print("Connecting to MongoDB...")
    client = MongoClient("mongodb://localhost:27017/")
    db = client["clinical_rostering"]

    # 1. Seed Employees
    print("Seeding employees...")
    employees = [
        {
            "e_id": "Emp_01", "e_name": "Dr. John Smith", "e_type": "Doctor", 
            "primary_specialization": "Cardiology", "secondary_specialization": "Internal Medicine", 
            "location": "Cardiology", "password": "password123"
        },
        {
            "e_id": "Emp_02", "e_name": "Sarah Lee", "e_type": "Nurse", 
            "primary_specialization": "Pediatrics", "secondary_specialization": "Neonatal Care", 
            "location": "Pediatrics", "password": "password456"
        },
        {
            "e_id": "Emp_03", "e_name": "James Kim", "e_type": "Radiology Technician", 
            "primary_specialization": "MRI Scanning", "secondary_specialization": "CT Scanning", 
            "location": "Radiology", "password": "password789"
        },
        {
            "e_id": "Emp_04", "e_name": "Lisa Chen", "e_type": "Pharmacist", 
            "primary_specialization": "Oncology", "secondary_specialization": "Geriatrics", 
            "location": "Oncology", "password": "passwordabc"
        },
        {
            "e_id": "Emp_05", "e_name": "Michael Davis", "e_type": "Admin Assistant", 
            "primary_specialization": "Medical Billing and Coding", "secondary_specialization": "Medical Transcription", 
            "location": "Medical Records", "password": "passworddef"
        }
    ]

    # Clear existing to avoid duplicates if run multiple times
    db.employees.delete_many({})
    db.employees.insert_many(employees)
    print(f"Inserted {len(employees)} employees.")

    # 2. Seed Shifts
    print("Seeding shifts...")
    days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
    times = [('08:00:00', '16:00:00'), ('16:00:00', '00:00:00'), ('00:00:00', '08:00:00')]
    locations = ["ICU", "Emergency", "Cardiology", "Neurology"]
    
    shifts = []
    sft_count = 1
    for day in days:
        for time in times:
            for loc in locations:
                sft_id = f"SFT{sft_count:03d}"
                shifts.append({
                    "shift_id": sft_id,
                    "day": day,
                    "time_slot_start": time[0],
                    "time_slot_end": time[1],
                    "location": loc
                })
                sft_count += 1
    
    db.shifts.delete_many({})
    db.shifts.insert_many(shifts)
    print(f"Inserted {len(shifts)} shifts.")

    # 3. Seed Schedule
    print("Seeding schedules...")
    schedules = []
    sch_count = 1
    for emp in employees:
        for i in range(1, 6): # Assign to 5 random-ish shifts
            sft_id = f"SFT{i:03d}" 
            sch_id = f"SCH{sch_count:03d}"
            schedules.append({
                "schedule_id": sch_id,
                "shift_id": sft_id,
                "e_id": emp["e_id"]
            })
            sch_count += 1

    db.schedule.delete_many({})
    db.schedule.insert_many(schedules)
    print(f"Inserted {len(schedules)} schedules.")

    print("Database seeded successfully!")

if __name__ == "__main__":
    seed_db()
