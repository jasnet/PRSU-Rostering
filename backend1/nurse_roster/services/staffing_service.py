from nurse_roster.simulator.ratio_engine import (

    calculate_required_nurses

)


def get_staffing_status(

    department,

    patient_count,

    available_nurses,

    severity="normal"

):

    # -----------------------------------
    # REQUIRED NURSES
    # -----------------------------------
    required = calculate_required_nurses(

        department,

        patient_count,

        severity

    )


    # -----------------------------------
    # SHORTAGE
    # -----------------------------------
    shortage = max(

        required - available_nurses,

        0

    )


    # -----------------------------------
    # STATUS
    # -----------------------------------
    status = (

        "Balanced"

        if shortage == 0

        else "Shortage"

    )


    return {

        "department": department,

        "patients": patient_count,

        "available_nurses": available_nurses,

        "required_nurses": required,

        "shortage": shortage,

        "status": status

    }