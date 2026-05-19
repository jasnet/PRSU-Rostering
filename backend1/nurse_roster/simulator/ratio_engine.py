from math import ceil

def calculate_required_nurses(
    patient_count,
    severity="normal"
):

    # ICU ratio
    if severity == "icu":

        return patient_count

    # Semi critical ratio
    if severity == "semi_critical":

        return ceil(patient_count / 5)

    # Normal ward ratio
    return ceil(patient_count / 8)