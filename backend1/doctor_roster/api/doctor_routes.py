from fastapi import APIRouter
from config.db import db

from doctor_roster.scheduler.doctor_scheduler import (
    generate_doctor_schedule
)

router = APIRouter(
    prefix="/api/doctor-roster",
    tags=["Doctor Roster"]
)


# -----------------------------------
# TEST
# -----------------------------------
@router.get("/test")
def test():

    return {
        "message": "Doctor roster working"
    }


# -----------------------------------
# CREATE DOCTOR
# -----------------------------------
@router.post("/doctors")
def create_doctor(data: dict):

    existing = db.doctors.find_one({

        "doctorId": data["doctorId"]

    })

    if existing:

        return {
            "message": "Doctor already exists"
        }

    db.doctors.insert_one(data)

    return {
        "message": "Doctor created"
    }


# -----------------------------------
# GET DOCTORS
# -----------------------------------
@router.get("/doctors")
def get_doctors():

    doctors = list(

        db.doctors.find(
            {},
            {"_id": 0}
        )

    )

    return doctors


# -----------------------------------
# GENERATE SINGLE DOCTOR ROSTER
# -----------------------------------
@router.post("/generate")
def generate(data: dict):

    doctor_id = data["doctorId"]

    doctor = db.doctors.find_one(

        {
            "doctorId": doctor_id
        },

        {
            "_id": 0
        }

    )

    if not doctor:

        return {
            "message": "Doctor not found"
        }

    schedule = generate_doctor_schedule(
        doctor
    )

    roster = {

        "doctorId": doctor["doctorId"],

        "doctorName": doctor["name"],

        "department": doctor["department"],

        "schedule": schedule

    }

    # -----------------------------------
    # UPSERT
    # -----------------------------------
    db.doctor_rosters.update_one(

        {

            "doctorId": doctor["doctorId"]

        },

        {

            "$set": roster

        },

        upsert=True

    )

    return {

        "message": "Roster generated",

        "doctorId": doctor["doctorId"],

        "doctorName": doctor["name"]

    }


# -----------------------------------
# GENERATE ENTIRE DEPARTMENT
# -----------------------------------
@router.post(

    "/generate-department/{department}"

)
def generate_department_roster(

    department: str

):

    doctors = list(

        db.doctors.find(

            {

                "department": department

            },

            {

                "_id": 0

            }

        )

    )

    generated = []

    for doctor in doctors:

        schedule = generate_doctor_schedule(
            doctor
        )

        roster = {

            "doctorId": doctor["doctorId"],

            "doctorName": doctor["name"],

            "department": doctor["department"],

            "schedule": schedule

        }

        db.doctor_rosters.update_one(

            {

                "doctorId": doctor["doctorId"]

            },

            {

                "$set": roster

            },

            upsert=True

        )

        generated.append(

            doctor["doctorId"]

        )

    return {

        "department": department,

        "generated_count": len(generated),

        "generated_doctors": generated

    }


# -----------------------------------
# GET SINGLE ROSTER
# -----------------------------------
@router.get("/roster/{doctor_id}")
def get_roster(
    doctor_id: str
):

    roster = db.doctor_rosters.find_one(

        {
            "doctorId": doctor_id
        },

        {
            "_id": 0
        }

    )

    return roster


# -----------------------------------
# DEPARTMENT DOCTOR ROSTER
# -----------------------------------
@router.get(

    "/department-roster/{department}"

)
def get_department_roster(

    department: str

):

    # -----------------------------------
    # GET ALL DOCTORS
    # -----------------------------------
    doctors = list(

        db.doctors.find(

            {

                "department": department

            },

            {

                "_id": 0

            }

        )

    )

    final_roster = []

    # -----------------------------------
    # FETCH SCHEDULES
    # -----------------------------------
    for doctor in doctors:

        doctor_id = doctor["doctorId"]

        roster = db.doctor_rosters.find_one(

            {

                "doctorId": doctor_id

            },

            {

                "_id": 0

            }

        )

        if roster:

            final_roster.append(

                {

                    "doctorId": doctor_id,

                    "doctorName": doctor["name"],

                    "department": doctor["department"],

                    "schedule": roster.get(

                        "schedule",

                        []

                    )

                }

            )

    return final_roster

# -----------------------------------
# GENERATE ALL DOCTOR ROSTERS
# -----------------------------------
@router.post("/generate-all")
def generate_all_rosters():

    doctors = list(

        db.doctors.find(

            {},

            {

                "_id": 0

            }

        )

    )

    db.doctor_rosters.delete_many({})

    for doctor in doctors:

        schedule = generate_doctor_schedule(

            doctor

        )

        roster = {

            "doctorId": doctor["doctorId"],

            "doctorName": doctor["name"],

            "department": doctor["department"],

            "schedule": schedule

        }

        db.doctor_rosters.insert_one(

            roster

        )

    return {

        "message": "All doctor rosters generated"

    }