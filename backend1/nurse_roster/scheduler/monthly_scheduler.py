from nurse_roster.services.leave_service import (
    get_nurse_leaves
)

from datetime import datetime, timedelta


def generate_monthly_roster(
    nurses,
    total_days
):

    roster = []

    weekly_shifts = ["M", "E", "N"]


    for index, nurse in enumerate(nurses):

        # --------------------------------
        # FETCH LEAVES
        # --------------------------------
        leaves = get_nurse_leaves(
            nurse["nurse_id"]
        )

        leave_dates = [

            leave["date"]

            for leave in leaves

        ]


        # --------------------------------
        # WEEKLY SHIFT ROTATION
        # --------------------------------
        for day in range(total_days):

            base_date = datetime.now()

            current_date = base_date + timedelta(

                days=day

            )

            date_number = current_date.day

            weekday = current_date.strftime(
                "%A"
            )

            formatted_date = current_date.strftime(
                "%d-%m-%Y"
            )

            week_number = day // 7


            # --------------------------------
            # LEAVE
            # --------------------------------
            if date_number in leave_dates:

                roster.append({

                    "nurse_id": nurse["nurse_id"],

                    "department": nurse["department"],

                    "date": date_number,

                    "fullDate": formatted_date,

                    "weekday": weekday,

                    "shift": "L",

                    "status": "Leave"

                })

                continue


            # --------------------------------
            # MINOR DEPARTMENTS
            # --------------------------------
            if nurse["shift_pattern"] == "general":

                # Weekly Off
                if day % 7 == 6:

                    roster.append({

                        "nurse_id": nurse["nurse_id"],

                        "department": nurse["department"],

                        "date": date_number,

                        "fullDate": formatted_date,

                        "weekday": weekday,

                        "shift": "WO",

                        "status": "Week Off"

                    })

                    continue


                roster.append({

                    "nurse_id": nurse["nurse_id"],

                    "department": nurse["department"],

                    "date": date_number,

                    "fullDate": formatted_date,

                    "weekday": weekday,

                    "shift": "G",

                    "status": "Assigned"

                })

                continue


            # --------------------------------
            # ASSIGN WEEKLY SHIFT
            # --------------------------------
            weekly_shift = weekly_shifts[
                (week_number + index) % 3
            ]


            # --------------------------------
            # NIGHT OFF
            # --------------------------------
            if weekly_shift == "N" and day % 7 == 6:

                roster.append({

                    "nurse_id": nurse["nurse_id"],

                    "department": nurse["department"],

                    "date": date_number,

                    "fullDate": formatted_date,

                    "weekday": weekday,

                    "shift": "NO",

                    "status": "Night Off"

                })

                continue


            # --------------------------------
            # WEEK OFF
            # --------------------------------
            if weekly_shift != "N" and day % 7 == 6:

                roster.append({

                    "nurse_id": nurse["nurse_id"],

                    "department": nurse["department"],

                    "date": date_number,

                    "fullDate": formatted_date,

                    "weekday": weekday,

                    "shift": "WO",

                    "status": "Week Off"

                })

                continue


            # --------------------------------
            # REGULAR SHIFT
            # --------------------------------
            roster.append({

                "nurse_id": nurse["nurse_id"],

                "department": nurse["department"],

                "date": date_number,

                "fullDate": formatted_date,

                "weekday": weekday,

                "shift": weekly_shift,

                "status": "Assigned"

            })

    return roster