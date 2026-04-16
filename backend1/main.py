from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from config.db import db
from routes import doctor_routes
import datetime

app = FastAPI()
origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(doctor_routes.router)

month2idx = {"Jan": "01", "Feb": "02", "Mar": "03", "Apr": "04", "May": "05", "Jun": "06", "July": "07", "Aug": "08", "Sept": "09", "Oct": "10", "Nov": "11", "Dec": "12"}

def index2id(n):
    length = len(str(n))
    return str((4 - length) * "0" + str(n))

def get_date(date_str):
    date_parts = date_str.split(" ")
    if len(date_parts) >= 4:
        d = "{}-{}-{}".format(date_parts[3], month2idx.get(date_parts[1], "01"), int(date_parts[2]))
        return d
    return date_str

@app.get('/')
async def root():
    return {"Hello": "World", "message": "Backend1 (MongoDB) Running"}

@app.post('/login-user')
def login(emp: dict):
    # Retrieve user from MongoDB, omit _id
    user = list(db.employees.find({"e_id": emp['e_id'], "password": emp['password']}, {"_id": 0}))
    return {"Employee": user}

@app.post('/register-user')
def register(emp: dict):
    # Check if employee ID already exists
    existing = db.employees.find_one({"e_id": emp['e_id']})
    
    if existing:
        raise HTTPException(status_code=400, detail="Employee ID already exists")

    # Insert new employee
    new_emp = {
        "e_id": emp['e_id'],
        "e_name": emp['e_name'],
        "e_type": emp.get('e_type', 'Staff'),
        "primary_specialization": emp.get('primary_specialization', ''),
        "secondary_specialization": emp.get('secondary_specialization', ''),
        "location": emp.get('location', ''),
        "password": emp['password']
    }

    try:
        db.employees.insert_one(new_emp)
        return {"message": "Employee registered successfully", "e_id": emp['e_id']}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post('/send-leave')
async def leave(data: dict):
    day_str = str(data['date'].split(' ')[0])
    day = day_str[0].upper() + day_str[1:] + "day"

    # Find schedule and shifts simulating SQL Inner Join
    user_schedules = list(db.schedule.find({"e_id": data['e_id']}))
    
    matched_shifts = []
    for sc in user_schedules:
        shift = db.shifts.find_one({"shift_id": sc.get("shift_id"), "day": day})
        if shift:
            # Combine to represent 'SELECT *'
            row = sc.copy()
            row.update(shift)
            matched_shifts.append(row)

    index = db.leaves.count_documents({})
    data_list = []

    for row in matched_shifts:
        index += 1
        index_id = "LE" + str(index2id(index))
        date_str = get_date(data['date'])
        
        # Insert leave into MongoDB
        leave_doc = {
            "leave_id": index_id,
            "schedule_id": row.get("schedule_id", ""),
            "date": date_str,
            "reason": data['reason'],
            "shift_allotted_to": None
        }
        db.leaves.insert_one(leave_doc)
        
        # Match postgres output tuple format: (leave_id, schedule_id, date, reason, None)
        data_list.append((index_id, row.get("schedule_id", ""), date_str, data['reason'], None))

    return data_list