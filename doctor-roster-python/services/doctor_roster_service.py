import random

DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

PSYCHIATRY_CLINICS = {
    "Monday": "Psychomotor and Neuropsychiatry Clinic",
    "Tuesday": "De-addiction Clinic",
    "Wednesday": "Child Psychiatry Clinic",
    "Thursday": "Family Counselling and Marital Therapy",
    "Friday": "Geriatric Mental Health Clinic",
    "Saturday": "Outpatient Department"
}

CLASS_TIMES = [
    "10:00 AM - 11:00 AM",
    "11:00 AM - 12:00 PM",
    "02:00 PM - 03:00 PM",
    "03:00 PM - 04:00 PM",
    "02:00 PM - 04:00 PM"
]


def create_slot(day, activity, details):
    start_time = "09:00 AM"
    end_time = "04:30 PM"

    if details == "OT":
        start_time = "08:00 AM"
        end_time = "02:00 PM"

    elif details == "Other":
        start_time = "10:00 AM"
        end_time = "01:00 PM"

    return {
        "day": day,
        "activity": activity,
        "details": details,
        "startTime": start_time,
        "endTime": end_time,
        "classSchedule": None,
        "onDuty": False
    }


def add_classes(schedule):
    opd_slots = [slot for slot in schedule if slot["details"] == "OPD"]

    if not opd_slots:
        return

    num_classes = random.randint(1, 2)
    selected = random.sample(opd_slots, min(num_classes, len(opd_slots)))

    for slot in selected:
        slot["classSchedule"] = random.choice(CLASS_TIMES)


def assign_on_duty(schedule):
    selected = random.choice(schedule)
    selected["onDuty"] = True


def generate_major_roster():
    # Friday fixed as Other
    working_days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Saturday"]

    # Randomly select 2 OT days
    ot_days = random.sample(working_days, 2)

    schedule = []

    for day in DAYS:
        if day == "Friday":
            schedule.append(
                create_slot(day, "Personal Agenda / Research", "Other")
            )
        elif day in ot_days:
            schedule.append(
                create_slot(day, "Scheduled Surgery", "OT")
            )
        else:
            schedule.append(
                create_slot(day, "Outpatient Department", "OPD")
            )

    add_classes(schedule)
    assign_on_duty(schedule)

    return schedule


def generate_psychiatry_roster():
    schedule = []

    for day in DAYS:
        activity = PSYCHIATRY_CLINICS[day]
        schedule.append(
            create_slot(day, activity, "OPD")
        )

    add_classes(schedule)
    assign_on_duty(schedule)

    return schedule


def generate_minor_roster():
    schedule = []

    for day in DAYS:
        if day == "Friday":
            schedule.append(
                create_slot(day, "Personal Agenda / Research", "Other")
            )
        else:
            schedule.append(
                create_slot(day, "Outpatient Department", "OPD")
            )

    add_classes(schedule)
    assign_on_duty(schedule)

    return schedule


def generate_doctor_roster(doctor):
    department = doctor.get("department", "")
    department_type = doctor.get("departmentType", "Minor")

    if department == "Psychiatry":
        return generate_psychiatry_roster()

    if department_type == "Major":
        return generate_major_roster()

    return generate_minor_roster()