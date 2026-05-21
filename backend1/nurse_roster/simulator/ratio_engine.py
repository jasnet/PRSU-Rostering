import math


# -----------------------------------
# STAFFING ENGINE
# -----------------------------------
def calculate_required_nurses(

    department,

    patient_count,

    severity="normal"

):

    # -----------------------------------
    # ICU / OT
    # -----------------------------------
    if department in [

        "ICU",

        "OT",

        "Emergency & Trauma Care"

    ]:

        required = patient_count


    # -----------------------------------
    # MAJOR WARDS
    # -----------------------------------
    elif department in [

        "General Medicine",

        "General Surgery",

        "Pediatrics",

        "OBG",

        "Orthopedics"

    ]:

        if severity == "semi_critical":

            required = math.ceil(
                patient_count / 5
            )

        else:

            required = math.ceil(
                patient_count / 8
            )


    # -----------------------------------
    # MINOR / OPD
    # -----------------------------------
    elif department in [

        "Psychiatry",

        "Dermatology",

        "ENT",

        "Ophthalmology",

        "Dentistry"

    ]:

        required = 2


    # -----------------------------------
    # DEFAULT
    # -----------------------------------
    else:

        required = math.ceil(
            patient_count / 8
        )


    return required