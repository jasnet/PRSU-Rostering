from config.db import db

nurses = [

    {
        "nurse_id": "N001",
        "name": "Anitha",
        "department": "General Medicine",
        "role": "Staff Nurse",
        "shift_pattern": "rotational"
    },

    {
        "nurse_id": "N002",
        "name": "Megha",
        "department": "Psychiatry",
        "role": "Staff Nurse",
        "shift_pattern": "general"
    }
]

db.nurses.insert_many(nurses)

print("Mock nurses inserted")