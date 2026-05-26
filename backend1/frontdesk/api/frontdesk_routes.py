from fastapi import APIRouter

from config.db import db

from datetime import datetime

import random

from frontdesk.services.live_patient_simulator import (
    get_live_patients
)

from nurse_roster.simulator.ratio_engine import (
    calculate_required_nurses
)


router = APIRouter(

    prefix="/api/frontdesk",

    tags=["Frontdesk"]

)


# -----------------------------------
# GET DASHBOARD DATA
# -----------------------------------
@router.get("/dashboard")
def get_dashboard_data():

    # -----------------------------------
    # TODAY
    # -----------------------------------
    today_index = datetime.now().weekday()

    days = [

        "Monday",

        "Tuesday",

        "Wednesday",

        "Thursday",

        "Friday",

        "Saturday",

        "Sunday"

    ]

    today_name = days[today_index]


    # -----------------------------------
    # TODAY'S CONSULTANTS
    # -----------------------------------
    consultants = []


    doctor_rosters = list(

        db.doctor_rosters.find(

            {},

            {

                "_id": 0

            }

        )

    )


    for roster in doctor_rosters:

        doctor_name = roster.get(

            "doctorName",

            "Unknown"

        )

        department = roster.get(

            "department",

            "Unknown"

        )

        schedule = roster.get(

            "schedule",

            []

        )


        today_schedule = next(

            (

                slot

                for slot in schedule

                if slot["day"] == today_name

            ),

            None

        )


        if today_schedule:

            consultants.append({

                "department": department,

                "doctor": doctor_name,

                "duty": today_schedule.get(

                    "dutyType",

                    "-"

                ),

                "time": (

                    f"{today_schedule.get('startTime')}"

                    f" - "

                    f"{today_schedule.get('endTime')}"

                ),

                "class": today_schedule.get(

                    "classSchedule"

                )

            })


    # -----------------------------------
    # TODAY DATE
    # -----------------------------------
    today_date = datetime.now().day


    # -----------------------------------
    # NURSE COUNTS DEPARTMENT-WISE
    # -----------------------------------
    nurse_counts = {}


    today_rosters = list(

        db.nurse_rosters.find(

            {

                "date": today_date

            },

            {

                "_id": 0

            }

        )
        
    )
    
    for nurse in today_rosters:

        department = nurse.get(

            "department",

            "Unknown"

        )

        shift = nurse.get(

            "shift"

        )


        if department not in nurse_counts:

            nurse_counts[department] = {

                "M": 0,

                "E": 0,

                "N": 0,

                "G": 0

            }


        if shift in ["M", "E", "N","G"]:

            nurse_counts[department][shift] += 1


    # -----------------------------------
    # CURRENT SHIFT
    # -----------------------------------
    current_hour = datetime.now().hour
    


    if 8 <= current_hour < 14:

        active_shift = "M"

    elif 14 <= current_hour < 20:

        active_shift = "E"

    else:

        active_shift = "N"


    # -----------------------------------
    # STAFFING OVERVIEW
    # -----------------------------------
    patient_ratio = []
    live_data = get_live_patients()

    for department, counts in nurse_counts.items():

        # -----------------------------------
        # ACTIVE NURSES
        # -----------------------------------
        active_nurses = counts.get(

            active_shift,

            0

        )

        # Minor departments use GENERAL shift
        if active_nurses == 0:

            active_nurses = counts.get(

                "G",

                0

            )


        patients = live_data[
            department
        ]["patients"]


        # Required nurses
        required_nurses = calculate_required_nurses(

            department,

            patients

        )


        # STATUS
        status = (

            "Balanced"

            if active_nurses >= required_nurses

            else "Shortage"

        )


        patient_ratio.append({

            "department": department,

            "patients": patients,

            "nurses": active_nurses,

            "required": required_nurses,

            "status": status,

            "shift": (

                active_shift

                if counts.get(active_shift, 0) > 0

                else "G"

            )

        })


    return {

        "consultants": consultants,

        "nurseCounts": nurse_counts,

        "patientRatio": patient_ratio

    }