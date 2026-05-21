from pymongo import MongoClient
from faker import Faker
import random

fake = Faker()


# -----------------------------------
# DB
# -----------------------------------
client = MongoClient(

    "mongodb://localhost:27017/"

)

db = client["clinical_rostering"]


# -----------------------------------
# CLEAR OLD DATA
# -----------------------------------
collections = [

    "employees",

    "doctors",

    "nurses",

    "doctor_rosters",

    "nurse_rosters"

]

for collection in collections:

    db[collection].delete_many({})


print("Old data cleared...")


# -----------------------------------
# DEPARTMENTS
# -----------------------------------
departments = [

    "General Medicine",

    "General Surgery",

    "OBG",

    "Pediatrics",

    "Orthopedics",

    "Emergency & Trauma Care",

    "Psychiatry",

    "Dermatology",

    "ENT",

    "Ophthalmology",

    "Dentistry",

    "Radiology"

]


# -----------------------------------
# ADMIN USERS
# -----------------------------------
admins = [

    {

        "e_id": "EMP_ADMIN_001",

        "e_name": "System Admin",

        "e_type": "Admin",

        "department": "Administration",

        "password": "admin123"

    }

]

db.employees.insert_many(admins)


# -----------------------------------
# FRONTDESK USERS
# -----------------------------------
frontdesk_users = []

for i in range(1, 6):

    frontdesk_users.append({

        "e_id": f"EMP_FRONT_{i:03}",

        "e_name": fake.name(),

        "e_type": "FrontDesk",

        "department": "Reception",

        "password": "front123"

    })

db.employees.insert_many(frontdesk_users)


# -----------------------------------
# DOCTORS
# -----------------------------------
doctor_employees = []

doctor_profiles = []

doctor_counter = 1


for dept in departments:

    for i in range(10):

        doctor_id = f"DOC{doctor_counter:03}"

        emp_id = f"EMP_DOC_{doctor_counter:03}"


        name = fake.name()


        doctor_employees.append({

            "e_id": emp_id,

            "e_name": name,

            "e_type": "Doctor",

            "department": dept,

            "doctor_id": doctor_id,

            "password": "doctor123"

        })


        doctor_profiles.append({

    "doctorId": doctor_id,

    "employeeId": emp_id,

    "name": name,

    "department": dept,

    "departmentType": (

        "Major"

        if dept in [

            "General Medicine",

            "General Surgery",

            "OBG",

            "Pediatrics",

            "Orthopedics",

            "Emergency & Trauma Care"

        ]

        else "Minor"

    )

})


        doctor_counter += 1


db.employees.insert_many(

    doctor_employees

)

db.doctors.insert_many(

    doctor_profiles

)


print(

    f"{len(doctor_profiles)} doctors inserted"

)


# -----------------------------------
# NURSES
# -----------------------------------
nurse_employees = []

nurse_profiles = []

nurse_counter = 1


for dept in departments:

    for i in range(15):

        nurse_id = f"NUR{nurse_counter:03}"

        emp_id = f"EMP_NUR_{nurse_counter:03}"


        name = fake.name()


        nurse_employees.append({

            "e_id": emp_id,

            "e_name": name,

            "e_type": "Nurse",

            "department": dept,

            "nurse_id": nurse_id,

            "password": "nurse123"

        })


        nurse_profiles.append({

    "nurse_id": nurse_id,

    "employee_id": emp_id,

    "name": name,

    "department": dept,

    "shift_pattern": (

        "rotation"

        if dept in [

            "General Medicine",

            "General Surgery",

            "OBG",

            "Pediatrics",

            "Orthopedics",

            "Emergency & Trauma Care"

        ]

        else "general"

    )

})


        nurse_counter += 1


db.employees.insert_many(

    nurse_employees

)

db.nurses.insert_many(

    nurse_profiles

)


print(

    f"{len(nurse_profiles)} nurses inserted"

)


print("Hospital database seeded successfully 😭🔥")