from fastapi import APIRouter
from config.db import db

from nurse_roster.services.staffing_service import (
    get_staffing_status
)

from nurse_roster.scheduler.monthly_scheduler import (
    generate_monthly_roster
)

router = APIRouter(
    prefix="/api/nurse-roster",
    tags=["Nurse Roster"]
)

# -----------------------------------
# TEST
# -----------------------------------
@router.get("/test")
async def test():

    return {
        "message": "Nurse roster working"
    }

# -----------------------------------
# CREATE NURSE
# -----------------------------------
@router.post("/nurses")
def create_nurse(data: dict):

    existing = db.nurses.find_one({
        "nurse_id": data["nurse_id"]
    })

    if existing:

        return {
            "message": "Nurse already exists"
        }

    db.nurses.insert_one(data)

    return {
        "message": "Nurse created successfully"
    }

# -----------------------------------
# GET ALL NURSES
# -----------------------------------
@router.get("/nurses")
def get_nurses():

    nurses = list(
        db.nurses.find({}, {"_id": 0})
    )

    return nurses

# -----------------------------------
# GENERATE MONTHLY ROSTER
# -----------------------------------
@router.post("/generate-roster")
def generate_roster(data: dict):

    department = data["department"]

    total_days = data["days"]

    nurses = list(

        db.nurses.find(
            {"department": department},
            {"_id": 0}
        )

    )

    if not nurses:

        return {
            "message": "No nurses found"
        }

    roster = generate_monthly_roster(
        nurses,
        total_days
    )

    if roster:

        db.nurse_rosters.delete_many(

            {

                "department": department

            }

        )

        db.nurse_rosters.insert_many(

            roster

        )
        db.nurse_rosters.delete_many({})
        db.nurse_rosters.insert_many(roster)

    return {

        "message": "Roster generated",

        "entries": len(roster)

    }

# -----------------------------------
# GET ROSTER
# -----------------------------------
@router.get("/roster/{department}")
def get_roster(department: str):

    roster = list(

        db.nurse_rosters.find(
            {"department": department},
            {"_id": 0}
        )

    )

    return roster

# -----------------------------------
# STAFFING STATUS
# -----------------------------------
@router.get("/staffing")
def staffing(

    department: str,

    patients: int,

    nurses: int,

    severity: str = "normal"

):

    return get_staffing_status(

        department,

        patients,

        nurses,

        severity

    )

# -----------------------------------
# GET MY ROSTER
# -----------------------------------
@router.get(

    "/my-roster/{nurse_id}"

)
def get_my_roster(

    nurse_id: str

):

    roster = list(

        db.nurse_rosters.find(

            {

                "nurse_id": nurse_id

            },

            {

                "_id": 0

            }

        )

    )

    return roster

# -----------------------------------
# GENERATE ALL NURSE ROSTERS
# -----------------------------------
@router.post("/generate-all")
def generate_all_nurse_rosters():

    departments = db.nurses.distinct(

        "department"

    )

    # clear once ONLY
    db.nurse_rosters.delete_many({})

    all_rosters = []

    for department in departments:

        nurses = list(

            db.nurses.find(

                {

                    "department": department

                },

                {

                    "_id": 0

                }

            )

        )

        if not nurses:

            continue

        roster = generate_monthly_roster(

            nurses,

            30

        )

        all_rosters.extend(

            roster

        )

    if all_rosters:

        db.nurse_rosters.insert_many(

            all_rosters

        )

    return {

        "message": "All nurse rosters generated",

        "entries": len(all_rosters)

    }


