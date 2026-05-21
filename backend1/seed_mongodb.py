from pymongo import MongoClient

# -----------------------------------
# CONNECT
# -----------------------------------
client = MongoClient(
    "mongodb://localhost:27017/"
)

db = client["clinical_rostering"]

print("Connected to MongoDB")


# -----------------------------------
# CLEAR CONFIG COLLECTIONS
# -----------------------------------
collections = [

    "shifts",

    "shift_config",

    "department_config"

]

for collection in collections:

    db[collection].delete_many({})

print("Old config collections cleared")


# -----------------------------------
# SHIFT CONFIG
# -----------------------------------
shift_config = [

    {

        "shift": "M",

        "name": "Morning",

        "start": "08:00",

        "end": "14:00"

    },

    {

        "shift": "E",

        "name": "Evening",

        "start": "14:00",

        "end": "20:00"

    },

    {

        "shift": "N",

        "name": "Night",

        "start": "20:00",

        "end": "08:00"

    },

    {

        "shift": "G",

        "name": "General",

        "start": "09:00",

        "end": "16:30"

    }

]

db.shift_config.insert_many(
    shift_config
)

print("Shift configs added")


# -----------------------------------
# DEPARTMENT CONFIG
# -----------------------------------
department_config = [

    {
        "department": "General Medicine",
        "type": "Major"
    },

    {
        "department": "General Surgery",
        "type": "Major"
    },

    {
        "department": "OBG",
        "type": "Major"
    },

    {
        "department": "Pediatrics",
        "type": "Major"
    },

    {
        "department": "Orthopedics",
        "type": "Major"
    },

    {
        "department": "Emergency & Trauma Care",
        "type": "Major"
    },

    {
        "department": "Psychiatry",
        "type": "Minor"
    },

    {
        "department": "Dermatology",
        "type": "Minor"
    },

    {
        "department": "ENT",
        "type": "Minor"
    },

    {
        "department": "Ophthalmology",
        "type": "Minor"
    },

    {
        "department": "Dentistry",
        "type": "Minor"
    },

    {
        "department": "Radiology",
        "type": "Minor"
    }

]



db.department_config.insert_many(
    department_config
)

print("Department configs added")

staffing_config = [

    {
        "department": "ICU",
        "staffing_type": "critical",
        "ratio": 1
    },

    {
        "department": "OT",
        "staffing_type": "critical",
        "ratio": 1
    },

    {
        "department": "Ward",
        "staffing_type": "ward",
        "normal_ratio": 8,
        "semi_critical_ratio": 5
    },

    {
        "department": "OPD",
        "staffing_type": "fixed",
        "fixed_nurses": 2
    }

]

db.staffing_config.delete_many({})

db.staffing_config.insert_many(
    staffing_config
)

# -----------------------------------
# SHIFTS
# -----------------------------------
days = [

    "Monday",

    "Tuesday",

    "Wednesday",

    "Thursday",

    "Friday",

    "Saturday",

    "Sunday"

]

shifts = []

shift_count = 1

for day in days:

    for shift in shift_config:

        shifts.append({

            "shift_id": f"SFT{str(shift_count).zfill(3)}",

            "day": day,

            "shift": shift["shift"],

            "start": shift["start"],

            "end": shift["end"]

        })

        shift_count += 1

db.shifts.insert_many(
    shifts
)

print("Shifts added")

print("MongoDB base seeding completed")