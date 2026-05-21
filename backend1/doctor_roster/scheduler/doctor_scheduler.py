import random

from datetime import datetime, timedelta


DAYS = [

    "Monday",

    "Tuesday",

    "Wednesday",

    "Thursday",

    "Friday",

    "Saturday",

    "Sunday"

]


CLASS_TIMES = [

    "10:00 AM - 11:00 AM",

    "11:00 AM - 12:00 PM",

    "02:00 PM - 03:00 PM",

    "03:00 PM - 04:00 PM"

]


# ------------------------------------
# CREATE SLOT
# ------------------------------------
def create_slot(

    day,

    full_date,

    duty_type,

    activity,

    on_duty=False

):

    # --------------------------------
    # DUTY TIMINGS
    # --------------------------------
    if duty_type in ["OPD", "OT"]:

        start_time = "09:00 AM"
        end_time = "04:30 PM"

    else:

        start_time = "09:00 AM"
        end_time = "09:00 PM"

    return {

        "day": day,

        "fullDate": full_date,

        "dutyType": duty_type,

        "activity": activity,

        "startTime": start_time,

        "endTime": end_time,

        "classSchedule": None,

        "onDuty": on_duty

    }


# ------------------------------------
# ADD CLASSES
# ------------------------------------
def add_classes(

    schedule,

    department_type

):

    if department_type == "Major":

        opd_days = [

            slot

            for slot in schedule

            if slot["dutyType"] == "OPD"

        ]

        selected = random.sample(

            opd_days,

            min(2, len(opd_days))

        )

    else:

        selected = random.sample(

            schedule,

            min(2, len(schedule))

        )

    for slot in selected:

        slot["classSchedule"] = random.choice(

            CLASS_TIMES

        )


# ------------------------------------
# MAJOR DEPARTMENT
# ------------------------------------
def generate_major_schedule():

    schedule = []

    working_days = DAYS.copy()

    # --------------------------------
    # RANDOMLY SELECT 2 OT DAYS
    # --------------------------------
    ot_days = random.sample(

        [

            day

            for day in working_days

            if day not in [

                "Saturday",

                "Sunday"

            ]

        ],

        2

    )

    remaining_days = [

        day

        for day in working_days

        if day not in ot_days
    ]

    # --------------------------------
    # 1 OTHER DAY
    # --------------------------------
    other_day = random.choice(

        [

            day

            for day in remaining_days

            if day not in [

                "Saturday",

                "Sunday"

            ]

        ]

    )

    # --------------------------------
    # GENERATE SLOTS
    # --------------------------------
    for index, day in enumerate(DAYS):

        current_date = datetime.now() + timedelta(

            days=index

        )

        formatted_date = current_date.strftime(

            "%d-%m-%Y"

        )

        # --------------------------------
        # SUNDAY = OFF
        # --------------------------------
        if day == "Sunday":

            schedule.append(

                create_slot(

                    day,

                    formatted_date,

                    "OFF",

                    "Weekly Off"

                )

            )

        # --------------------------------
        # SATURDAY = ON DUTY
        # --------------------------------
        elif day == "Saturday":

            schedule.append(

                create_slot(

                    day,

                    formatted_date,

                    "ONDUTY",

                    "Emergency On Duty",

                    True

                )

            )

        # --------------------------------
        # OT DAYS
        # --------------------------------
        elif day in ot_days:

            schedule.append(

                create_slot(

                    day,

                    formatted_date,

                    "OT",

                    "Operation Theatre"

                )

            )

        # --------------------------------
        # OTHER DAY
        # --------------------------------
        elif day == other_day:

            schedule.append(

                create_slot(

                    day,

                    formatted_date,

                    "OTHER",

                    "Research / Personal Agenda"

                )

            )

        # --------------------------------
        # OPD
        # --------------------------------
        else:

            schedule.append(

                create_slot(

                    day,

                    formatted_date,

                    "OPD",

                    "Outpatient Department"

                )

            )

    add_classes(

        schedule,

        "Major"

    )

    return schedule


# ------------------------------------
# MINOR DEPARTMENT
# ------------------------------------
def generate_minor_schedule():

    schedule = []

    for index, day in enumerate(DAYS):

        current_date = datetime.now() + timedelta(

            days=index

        )

        formatted_date = current_date.strftime(

            "%d-%m-%Y"

        )

        # --------------------------------
        # SUNDAY = OFF
        # --------------------------------
        if day == "Sunday":

            schedule.append(

                create_slot(

                    day,

                    formatted_date,

                    "OFF",

                    "Weekly Off"

                )

            )

        # --------------------------------
        # SATURDAY = ON DUTY
        # --------------------------------
        elif day == "Saturday":

            schedule.append(

                create_slot(

                    day,

                    formatted_date,

                    "ONDUTY",

                    "Emergency On Duty",

                    True

                )

            )

        # --------------------------------
        # GENERAL OPD
        # --------------------------------
        else:

            schedule.append(

                create_slot(

                    day,

                    formatted_date,

                    "OPD",

                    "General OPD"

                )

            )

    add_classes(

        schedule,

        "Minor"

    )

    return schedule


# ------------------------------------
# MAIN GENERATOR
# ------------------------------------
def generate_doctor_schedule(

    doctor

):

    department_type = doctor.get(

        "departmentType",

        "Minor"

    )

    if department_type == "Major":

        return generate_major_schedule()

    return generate_minor_schedule()