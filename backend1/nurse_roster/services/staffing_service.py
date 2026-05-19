from nurse_roster.simulator.ratio_engine import calculate_required_nurses

def get_staffing_status(

    patient_count,
    available_nurses,
    severity

):

    required = calculate_required_nurses(
        patient_count,
        severity
    )

    shortage = max(
        required - available_nurses,
        0
    )

    return {

        "patients": patient_count,

        "available_nurses": available_nurses,

        "required_nurses": required,

        "shortage": shortage,

        "status": (
            "critical"
            if shortage > 0
            else "balanced"
        )
    }