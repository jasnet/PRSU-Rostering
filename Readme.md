# PESU IMSR – Smart Hospital Rostering System

A full-stack hospital workforce management and rostering system developed for managing nurses, doctors Scheduling.

---

## Overview

PESU IMSR provides automated scheduling, department-wise staffing analysis, doctor schedules, nurse shift tracking, and real-time operational dashboards.

Modules included:

- Admin
- Nurse
- Doctor
- Frontdesk

---

# Features

## Admin Module

### Nurse Roster Generation
- Monthly nurse scheduling
- Morning / Evening / Night / General shifts
- Leave handling
- Week offs
- Night offs

### Doctor Schedule Generation
- OPD schedules
- OT schedules
- Class schedules
- On-duty assignments

### Staffing Analytics
- Department staffing overview
- Nurse-patient ratio
- Shift-wise staffing
- Shortage detection

---

## Nurse Module

### My Monthly Roster
- Personal schedule
- Calendar view
- Leave visibility
- Week offs

### Dashboard
- Today's duty
- Upcoming shifts
- Schedule overview

---

## Doctor Module

### Weekly Schedule
- OPD schedule
- OT schedule
- Class timings
- On-duty schedule

### Dashboard
- Today's assignment
- Upcoming OPD
- Upcoming OT

---

## Frontdesk Module

### Doctor Availability
Department-wise:
- OPD availability
- OT availability
- Class timings

### Nurse Staffing
- Shift-wise active nurses
- Department-wise staffing
- Real-time staffing overview

### Staffing Alerts
- Balanced departments
- Shortage detection

---

# Tech Stack

### Frontend
- React.js
- CSS
- Axios
- React Router

### Backend
- FastAPI
- Python

### Database
- MongoDB

---

# 📂 Project Structure

```plaintext
PRSU-Rostering/
│
├── backend1/
│   ├── doctor_roster/
│   ├── nurse_roster/
│   ├── frontdesk/
│   ├── config/
│   └── main.py
│
├── frontend/
│   └── clinical-rostering/
│       ├── src/
│       │   ├── components/
│       │   ├── api/
│       │   ├── pages/
│       │   └── App.js
│
└── README.md
```

---

# Installation Guide

## 1. Clone Repository

```bash
git clone https://github.com/jasnet/PRSU-Rostering.git
cd PRSU-Rostering
```

---

## 2. Backend Setup

Navigate to backend:

```bash
cd backend1
```

Create virtual environment:

### Windows

```bash
python -m venv venv
venv\Scripts\activate
```

### Mac/Linux

```bash
python3 -m venv venv
source venv/bin/activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Run backend:

```bash
uvicorn main:app --reload
```

Backend runs at:

```plaintext
http://localhost:8000
```

Swagger Docs:

```plaintext
http://localhost:8000/docs
```

---

## 3. Frontend Setup

Open new terminal.

Navigate to frontend:

```bash
cd frontend/clinical-rostering
```

Install packages:

```bash
npm install
```

Run frontend:

```bash
npm start
```

Frontend runs at:

```plaintext
http://localhost:3000
```

---

## 4. MongoDB Setup

Ensure MongoDB is installed and running locally.

Default connection:

```plaintext
mongodb://localhost:27017
```

---

## 5. Seed Database

Run seed script.

Example:

```bash
python seed_mongodb.py
python seed_hospital.py
```

# Demo Login Credentials

## Admin

```plaintext
ID: EMP_ADMIN_001
Password: admin123
```

## Nurse

```plaintext
ID: EMP_NUR_001
Password: nurse123
```

## Doctor

```plaintext
ID: EMP_DOC_001
Password: doctor123
```

## Frontdesk

```plaintext
ID: EMP_FRONT_001
Password: front123
```
