from pymongo import MongoClient

client = MongoClient("mongodb://localhost:27017/")

db = client["clinical_rostering"]

print("Initializing Nurse Roster Database",flush=True)

# -----------------------------------
# CREATE COLLECTIONS
# -----------------------------------

collections = [

    "nurses",
    "nurse_rosters",
    "nurse_leaves",
    "patients",
    "patient_assignments",
    "department_config",
    "shift_config"

]

existing = db.list_collection_names()

for collection in collections:

    if collection not in existing:

        db.create_collection(collection)

        print(f"Created collection: {collection}")

# -----------------------------------
# SHIFT CONFIG
# -----------------------------------

shift_config = [

    {
        "shift_code": "M",
        "name": "Morning",
        "start": "08:00",
        "end": "14:00"
    },

    {
        "shift_code": "E",
        "name": "Evening",
        "start": "14:00",
        "end": "20:00"
    },

    {
        "shift_code": "N",
        "name": "Night",
        "start": "20:00",
        "end": "08:00"
    },

    {
        "shift_code": "G",
        "name": "General",
        "start": "09:00",
        "end": "16:30"
    }

]

if db.shift_config.count_documents({}) == 0:

    db.shift_config.insert_many(shift_config)

    print("Shift config inserted")

# -----------------------------------
# DEPARTMENT CONFIG
# -----------------------------------

departments = [

    {
        "department": "General Medicine",
        "type": "major",
        "shift_pattern": "rotational"
    },

    {
        "department": "General Surgery",
        "type": "major",
        "shift_pattern": "rotational"
    },

    {
        "department": "OBG",
        "type": "major",
        "shift_pattern": "rotational"
    },

    {
        "department": "Pediatrics",
        "type": "major",
        "shift_pattern": "rotational"
    },

    {
        "department": "Orthopedics",
        "type": "major",
        "shift_pattern": "rotational"
    },

    {
        "department": "Emergency & Trauma Care",
        "type": "major",
        "shift_pattern": "rotational"
    },

    {
        "department": "Psychiatry",
        "type": "minor",
        "shift_pattern": "general"
    },

    {
        "department": "Dermatology",
        "type": "minor",
        "shift_pattern": "general"
    },

    {
        "department": "Dentistry",
        "type": "minor",
        "shift_pattern": "general"
    }

]

if db.department_config.count_documents({}) == 0:

    db.department_config.insert_many(departments)

    print("Department config inserted")

# -----------------------------------
# CREATE INDEXES
# -----------------------------------

db.nurses.create_index(
    "nurse_id",
    unique=True
)

db.nurse_rosters.create_index([
    ("nurse_id", 1),
    ("date", 1)
])

print("Indexes created")

print("Database initialized successfully")