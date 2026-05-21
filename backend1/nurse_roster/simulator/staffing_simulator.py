import math


# -----------------------------------
# STAFFING CALCULATOR
# -----------------------------------
def calculate_staffing(

    department,

    patients,

    nurses,

    semi_critical=False

):

    # -----------------------------------
    # ICU / OT
    # -----------------------------------
    if department in ["ICU", "OT"]:

        required_nurses = patients


    # -----------------------------------
    # WARD
    # -----------------------------------
    elif department == "Ward":

        if semi_critical:

            required_nurses = math.ceil(
                patients / 5
            )

        else:

            required_nurses = math.ceil(
                patients / 8
            )


    # -----------------------------------
    # OPD
    # -----------------------------------
    elif department == "OPD":

        required_nurses = 2


    # -----------------------------------
    # PEDIATRICS
    # -----------------------------------
    elif department == "Pediatrics":

        if semi_critical:

            required_nurses = math.ceil(
                patients / 4
            )

        else:

            required_nurses = math.ceil(
                patients / 6
            )


    # -----------------------------------
    # OBG
    # -----------------------------------
    elif department == "OBG":

        if semi_critical:

            required_nurses = math.ceil(
                patients / 4
            )

        else:

            required_nurses = math.ceil(
                patients / 6
            )


    # -----------------------------------
    # DEFAULT
    # -----------------------------------
    else:

        required_nurses = math.ceil(
            patients / 8
        )


    # -----------------------------------
    # STATUS
    # -----------------------------------
    shortage = required_nurses - nurses

    if shortage <= 0:

        status = "Balanced"

    else:

        status = "Shortage"


    return {

        "department": department,

        "patients": patients,

        "available_nurses": nurses,

        "required_nurses": required_nurses,

        "shortage": max(shortage, 0),

        "status": status

    }