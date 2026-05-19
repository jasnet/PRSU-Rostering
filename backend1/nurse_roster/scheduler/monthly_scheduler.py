from nurse_roster.services.leave_service import (
    get_nurse_leaves
)

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

            current_date = day + 1

            week_number = day // 7

            # --------------------------------
            # LEAVE
            # --------------------------------
            if current_date in leave_dates:

                roster.append({

                    "nurse_id": nurse["nurse_id"],

                    "department": nurse["department"],

                    "date": current_date,

                    "shift": "L",

                    "status": "Leave"

                })

                continue

            # --------------------------------
            # MINOR DEPARTMENTS
            # --------------------------------
            if nurse["shift_pattern"] == "general":

                # Weekly off on Sunday
                if day % 7 == 6:

                    roster.append({

                        "nurse_id": nurse["nurse_id"],

                        "department": nurse["department"],

                        "date": current_date,

                        "shift": "WO",

                        "status": "Week Off"

                    })

                    continue

                roster.append({

                    "nurse_id": nurse["nurse_id"],

                    "department": nurse["department"],

                    "date": current_date,

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

                    "date": current_date,

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

                    "date": current_date,

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

                "date": current_date,

                "shift": weekly_shift,

                "status": "Assigned"

            })

    return roster