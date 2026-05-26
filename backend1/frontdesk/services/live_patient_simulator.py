from datetime import datetime, timedelta
import random

# -----------------------------------
# IN MEMORY LIVE STATE
# -----------------------------------

live_departments = {}

# -----------------------------------
# INITIALIZE
# -----------------------------------

from config.db import db
import random
from datetime import datetime

def initialize_departments():

    departments = db.nurses.distinct(

        "department"

    )

    for dept in departments:

        if dept == "Emergency & Trauma Care":

            patient_count = random.randint(

                4,
                6

            )

        else:

            patient_count = random.randint(

                15,
                35

            )

        live_departments[dept] = {

            "patients": patient_count,

            "lastUpdate": datetime.now()

        }

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
        "Radiology",

    ]

    for dept in departments:

        live_departments[dept] = {

            "patients": random.randint(

                15,
                35

            ),

            "lastUpdate": datetime.now()

        }

# initialize once
initialize_departments()


# -----------------------------------
# UPDATE EVERY 15 MINUTES
# -----------------------------------

def get_live_patients():

    now = datetime.now()

    for dept,data in live_departments.items():

        diff = now - data["lastUpdate"]

        if diff >= timedelta(

            minutes=15

        ):

            movement = random.choice([

                -4,
                -3,
                -2,
                -1,
                1,
                2,
                3,
                4,
                5

            ])

            new_count = (

                data["patients"]

                + movement

            )

            # -----------------------------------
            # EMERGENCY DEPARTMENT RULE
            # -----------------------------------

            if dept == "Emergency & Trauma Care":

                data["patients"] = max(

                    4,

                    min(

                        6,

                        new_count

                    )

                )

            # -----------------------------------
            # NORMAL DEPARTMENTS
            # -----------------------------------

            else:

                data["patients"] = max(

                    15,

                    new_count

                )

            data["lastUpdate"] = now

    return live_departments