from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from config.db import db

# -----------------------------------
# NURSE ROSTER
# -----------------------------------
from nurse_roster.api import nurse_routes

# -----------------------------------
# DOCTOR ROSTER
# -----------------------------------
from doctor_roster.api.doctor_routes import (
    router as doctor_roster_router
)

from frontdesk.api.frontdesk_routes import (
    router as frontdesk_router
)

# -----------------------------------
# FASTAPI APP
# -----------------------------------
app = FastAPI(

    docs_url=None,

    redoc_url=None

)

from fastapi.openapi.docs import get_swagger_ui_html


@app.get("/docs", include_in_schema=False)

async def custom_swagger_ui_html():

    return get_swagger_ui_html(

        openapi_url=app.openapi_url,

        title=app.title + " - Swagger UI"

    )

# -----------------------------------
# CORS
# -----------------------------------
origins = ["*"]

app.add_middleware(

    CORSMiddleware,

    allow_origins=origins,

    allow_credentials=True,

    allow_methods=["*"],

    allow_headers=["*"],

)

# -----------------------------------
# ROUTERS
# -----------------------------------
app.include_router(
    nurse_routes.router
)

app.include_router(
    doctor_roster_router
)

app.include_router(
    frontdesk_router
)

# -----------------------------------
# ROOT
# -----------------------------------
@app.get("/")
async def root():

    return {

        "message": "Clinical Rostering Backend Running"

    }


# -----------------------------------
# LOGIN
# -----------------------------------
@app.post("/login-user")

def login(
    emp: dict
):

    user = db.employees.find_one(

        {

            "e_id": emp["e_id"],

            "password": emp["password"]

        },

        {

            "_id": 0

        }

    )

    if not user:

        return {

            "message": "Invalid credentials"

        }

    return {

        "message": "Login successful",

        "employee": user

    }


# -----------------------------------
# REGISTER
# -----------------------------------
@app.post("/register-user")

def register(
    emp: dict
):

    existing = db.employees.find_one(

        {
            "e_id": emp["e_id"]
        }

    )

    if existing:

        return {

            "message": "Employee already exists"

        }

    db.employees.insert_one(emp)

    return {

        "message": "Employee registered"

    }