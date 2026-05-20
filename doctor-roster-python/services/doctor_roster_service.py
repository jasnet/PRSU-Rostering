# services/doctor_roster_service.py

import random

# ==========================================
# Psychiatry Specialty Clinics
# ==========================================
PSYCHIATRY_CLINICS = {
    "Monday": "Psychomotor and Neuropsychiatry Clinic",
    "Tuesday": "De-addiction Clinic",
    "Wednesday": "Child Psychiatry Clinic",
    "Thursday": "Family Counselling and Marital Therapy",
    "Friday": "Geriatric Mental Health Clinic",
    "Saturday": "General OPD"
}

# ==========================================
# Teaching Classes
# ==========================================
TEACHING_CLASSES = [
    "UG Teaching Class",
    "PG Seminar",
    "Case Discussion",
    "Journal Club",
    "Clinical Demonstration"
]

# ==========================================
# OT Surgery Types
# ==========================================
SURGERIES = [
    "Elective Surgery",
    "Major Procedure",
    "Emergency Surgery",
    "Scheduled OT"
]

# ==========================================
# Utility Function
# ==========================================
def create_slot(day, activity, details, start_time, end_time):
    return {
        "day": day,
        "activity": activity,
        "details": details,      # OPD / OT / Other / On Duty
        "startTime": start_time,
        "endTime": end_time
    }

# ==========================================
# Add Teaching Class to 1 or 2 OPD Days
# ==========================================
def add_teaching_classes(schedule, max_classes=2):
    opd_indices = [
        i for i, slot in enumerate(schedule)
        if slot["details"] == "OPD"
    ]

    if not opd_indices:
        return schedule

    num_classes = random.randint(1, min(max_classes, len(opd_indices)))
    selected = random.sample(opd_indices, num_classes)

    for idx in selected:
        class_name = random.choice(TEACHING_CLASSES)
        schedule[idx]["activity"] += f" + {class_name} (2:00 PM - 4:00 PM)"

    return schedule

# ==========================================
# Major Department Roster
# 3 OPD + 2 OT + 1 Other (Friday)
# ==========================================
def generate_major_roster():
    schedule = [
        create_slot(
            "Monday",
            "Outpatient Department",
            "OPD",
            "09:00 AM",
            "04:30 PM"
        ),
        create_slot(
            "Tuesday",
            random.choice(SURGERIES),
            "OT",
            "08:00 AM",
            "02:00 PM"
        ),
        create_slot(
            "Wednesday",
            "Outpatient Department",
            "OPD",
            "09:00 AM",
            "04:30 PM"
        ),
        create_slot(
            "Thursday",
            random.choice(SURGERIES),
            "OT",
            "08:00 AM",
            "02:00 PM"
        ),
        create_slot(
            "Friday",
            "Personal Agenda / Research / Meetings",
            "Other",
            "10:00 AM",
            "01:00 PM"
        ),
        create_slot(
            "Saturday",
            "Outpatient Department",
            "OPD",
            "09:00 AM",
            "04:30 PM"
        )
    ]

    return add_teaching_classes(schedule, 2)

# ==========================================
# Psychiatry Roster
# Specialty Clinics are OPD
# 1 or 2 teaching classes
# ==========================================
def generate_psychiatry_roster():
    schedule = []

    for day in [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
    ]:
        clinic = PSYCHIATRY_CLINICS.get(day, "General OPD")

        schedule.append(
            create_slot(
                day,
                clinic,
                "OPD",
                "09:00 AM",
                "04:30 PM"
            )
        )

    return add_teaching_classes(schedule, 2)

# ==========================================
# Minor Department Roster
# Mostly OPD + Friday Other
# 1 or 2 teaching classes
# ==========================================
def generate_minor_roster():
    schedule = [
        create_slot(
            "Monday",
            "Outpatient Department",
            "OPD",
            "09:00 AM",
            "04:30 PM"
        ),
        create_slot(
            "Tuesday",
            "Outpatient Department",
            "OPD",
            "09:00 AM",
            "04:30 PM"
        ),
        create_slot(
            "Wednesday",
            "Outpatient Department",
            "OPD",
            "09:00 AM",
            "04:30 PM"
        ),
        create_slot(
            "Thursday",
            "Outpatient Department",
            "OPD",
            "09:00 AM",
            "04:30 PM"
        ),
        create_slot(
            "Friday",
            "Personal Agenda / Research / Meetings",
            "Other",
            "10:00 AM",
            "01:00 PM"
        ),
        create_slot(
            "Saturday",
            "Outpatient Department",
            "OPD",
            "09:00 AM",
            "04:30 PM"
        )
    ]

    return add_teaching_classes(schedule, 2)

# ==========================================
# On-Duty Doctor Assignment
# One doctor every day
# ==========================================
def generate_on_duty_schedule():
    days = [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
    ]

    on_duty = []

    for day in days:
        on_duty.append({
            "day": day,
            "activity": "On Call Duty",
            "details": "On Duty",
            "startTime": "04:30 PM",
            "endTime": "09:00 AM (Next Day)"
        })

    return on_duty

# ==========================================
# Main Function
# ==========================================
def generate_doctor_roster(doctor):
    department = doctor.get("department", "")
    department_type = doctor.get("departmentType", "Minor")

    # Psychiatry-specific schedule
    if department == "Psychiatry":
        return generate_psychiatry_roster()

    # Major departments
    if department_type == "Major":
        return generate_major_roster()

    # Minor departments
    return generate_minor_roster()