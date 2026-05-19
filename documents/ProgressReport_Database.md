# Progress Report: Database Team
**Team Member:** Database Engineer  
**Project:** Clinical Rostering System  
**Period:** Sprint 1-4  

---

## 1. Overview

The database team was responsible for designing, implementing, and maintaining the PostgreSQL database schema, data initialization scripts, and database operations for the entire clinical rostering system. Our work formed the foundation upon which all other components relied.

---

## 2. Work Completed

### 2.1 Database Schema Design
- Designed comprehensive relational database schema in `database/schema.py`
- Created tables for:
  - **Employees** - Staff information (ID, name, type, specialization, location)
  - **Shifts** - Shift types and time slots (Morning, Afternoon, Night)
  - **Schedule** - Employee shift assignments with day-wise allocations
  - **Leaves** - Leave request tracking and approval workflow
  - **Time Slots** - Configurable time slot management

### 2.2 Database Initialization
- Implemented automatic initialization scripts:
  - `database/initialize/employees.py` - Seed employee data
  - `database/initialize/shifts.py` - Define shift patterns
  - `database/initialize/schedule.py` - Monthly schedule generation
  - `database/initialize/functions.py` - Helper functions
  - `database/initialize/constraints.py` - Business rule constraints

### 2.3 Database Operations
- Created CRUD operations in:
  - `database/retrieve.py` - Data retrieval queries
  - `database/create.py` - New record creation
  - `database/delete.py` - Record deletion
- Implemented connection pooling and error handling in `database/main.py`

### 2.4 Monthly Schedule Generation
- Built automated monthly roster generation in `database/initialize/monthly.py`
- Implemented fairness algorithms to distribute shifts evenly
- Added logic to respect employee preferences and constraints

---

## 3. Technical Implementation

### Schema Details
```python
# Key Tables Created:
- employees (e_id, e_name, e_type, primary_specialization, secondary_specialization, location, password)
- shifts (shift_id, shift_name, start_time, end_time)
- schedule (schedule_id, e_id, shift_id, day, month, year)
- leaves (leave_id, schedule_id, leave_date, reason, status)
```

### Database Configuration
- PostgreSQL database: `hospital`
- Host: localhost:5432
- User: postgres
- Connection pooling implemented for concurrent requests

---

## 4. Challenges Solved

1. **Handling Database Disconnections**: Added fallback mock data system in `main.py` when DB unavailable
2. **Complex Leave Workflow**: Implemented status tracking (pending/approved/rejected)
3. **Monthly Schedule Conflicts**: Created constraint validation to prevent double-booking
4. **Performance Optimization**: Indexed frequently queried columns (e_id, day, month)

---

## 5. Files Modified/Created

| File | Description |
|------|-------------|
| `database/schema.py` | Core database schema |
| `database/initialize/schema.py` | Schema initialization |
| `database/initialize/employees.py` | Employee data seeding |
| `database/initialize/shifts.py` | Shift definitions |
| `database/initialize/schedule.py` | Schedule generation |
| `database/initialize/monthly.py` | Monthly automation |
| `database/initialize/constraints.py` | Business rules |
| `database/retrieve.py` | Query functions |
| `database/create.py` | Insert operations |
| `database/delete.py` | Delete operations |
| `database/main.py` | DB connection manager |
| `database/init.py` | Initialization script |

---

## 6. Integration Points

- Connected with **Backend API** for all CRUD operations
- Provided data foundation for **Frontend** components
- Supplied schedule data to **OptaPy** for optimization

---

## 7. Status: COMPLETE

All database components are functional and integrated. The database team successfully delivered a robust, scalable data layer that supports all project requirements.