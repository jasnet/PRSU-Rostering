from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient
from datetime import datetime
from services.doctor_roster_service import generate_doctor_roster

app = Flask(__name__)
CORS(app)

# MongoDB Connection
client = MongoClient("mongodb://127.0.0.1:27017")
db = client.doctor_roster


# Remove MongoDB _id field
def sanitize(doc):
    if not doc:
        return None
    doc = dict(doc)
    doc.pop("_id", None)
    return doc


# Home Route
@app.route("/", methods=["GET"])
def home():
    return jsonify({
        "message": "Doctor Roster API is running successfully!"
    }), 200


# Get all doctors
@app.route("/api/doctors", methods=["GET"])
def get_doctors():
    docs = list(db.doctors.find().sort("name", 1))
    result = [sanitize(d) for d in docs]
    return jsonify(result), 200


# Get all departments
@app.route("/api/departments", methods=["GET"])
def get_departments():
    docs = list(db.departments.find().sort("name", 1))
    result = [sanitize(d) for d in docs]
    return jsonify(result), 200


# Create doctor
@app.route("/api/doctors", methods=["POST"])
def create_doctor():
    data = request.get_json()

    if not data or "doctorId" not in data:
        return jsonify({"message": "doctorId required"}), 400

    # Check duplicate
    existing = db.doctors.find_one({"doctorId": data["doctorId"]})
    if existing:
        return jsonify({"message": "Doctor ID already exists"}), 400

    db.doctors.insert_one(data)
    return jsonify(data), 201


# Generate roster
@app.route("/api/rosters/generate/<doctorId>", methods=["GET"])
def generate_roster(doctorId):
    doctor = db.doctors.find_one({"doctorId": doctorId})

    if not doctor:
        return jsonify({"message": "Doctor not found"}), 404

    schedule = generate_doctor_roster(doctor)

    roster = {
        "doctorId": doctor.get("doctorId"),
        "doctorName": doctor.get("name"),
        "department": doctor.get("department"),
        "weekStartDate": datetime.utcnow(),
        "schedule": schedule,
    }

    db.rosters.insert_one(roster)

    roster = sanitize(roster)
    return jsonify(roster), 200


# Get existing roster
@app.route("/api/rosters/<doctorId>", methods=["GET"])
def get_roster(doctorId):
    roster = db.rosters.find_one({"doctorId": doctorId})

    if not roster:
        return jsonify({"message": "Roster not found"}), 404

    roster = sanitize(roster)
    return jsonify(roster), 200


if __name__ == "__main__":
    app.run(port=5000, debug=True)