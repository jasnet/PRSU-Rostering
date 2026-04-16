from fastapi import APIRouter
from config.db import db

router = APIRouter()

@router.get("/doctors")
def get_doctors():
    doctors = list(db.doctors.find({}, {"_id": 0}))
    return doctors

@router.post("/doctors")
def add_doctor(data: dict):
    db.doctors.insert_one(data)
    return {"message": "Doctor added"}