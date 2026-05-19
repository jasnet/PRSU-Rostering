# Nurse Roster Module

## Features
- Nurse Management
- Monthly Roster Generation
- Nurse-Patient Ratio Simulator
- Staffing Status APIs

## API Base
/api/nurse-roster

## APIs

### GET /test
Check module status

### POST /nurses
Create nurse

### GET /nurses
Get all nurses

### POST /generate-roster
Generate monthly roster

### GET /roster/{department}
Get roster by department

### GET /staffing
Get staffing ratio status

## Shift Codes

M = Morning
E = Evening
N = Night
WO = Week Off
NO = Night Off
G = General
L = Leave

## Major Departments
Rotational shifts:
- General Medicine
- OBG
- Pediatrics
- Orthopedics
- Emergency

## Minor Departments
General shift:
- Psychiatry
- Dermatology
- Dentistry

## Frontend Roles

Admin:
- Full access

Nurse:
- Personal schedule

FrontDesk:
- Department-wise visibility