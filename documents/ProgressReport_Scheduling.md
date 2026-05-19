# Progress Report: Attendance & Scheduling Team
**Team Member:** Scheduling Engineer  
**Project:** Clinical Rostering System  
**Period:** Sprint 1-4  

---

## 1. Overview

The Attendance & Scheduling team was responsible for developing the automatic roster generation system using OptaPy (Python wrapper for OptaPlanner). We implemented constraint-based scheduling algorithms that optimize staff assignments while respecting business rules and fairness principles.

---

## 2. Work Completed

### 2.1 OptaPy Domain Modeling
- Created scheduling domain classes in `optapy/domain.py`:
  - **Employee** - Staff with name and skill set
  - **Availability** - Employee availability status (DESIRED, UNDESIRED, UNAVAILABLE)
  - **Shift** - Assignable shift with start/end times, location, required skill
  - **EmployeeSchedule** - Solution class containing all scheduling data
  - **ScheduleState** - Configuration for draft/published schedules

### 2.2 Constraint Implementation
- Built 7 constraint functions in `optapy/constraints.py`:

| Constraint | Description |
|------------|-------------|
| `required_skill` | Ensures employee has required skill for shift |
| `no_overlapping_shifts` | Prevents employee from having overlapping shifts |
| `at_least_10_hours_between_shifts` | Mandates minimum 10-hour rest between shifts |
| `one_shift_per_day` | Allows only one shift per employee per day |
| `unavailable_employee` | Prevents assigning shifts to unavailable employees |
| `desired_day_for_employee` | Rewards scheduling on employee's desired days |
| `undesired_day_for_employee` | Penalizes scheduling on undesired days |

### 2.3 Solver Configuration
- Configured OptaPy solver in `optapy/main.py`:
  - 30-second solving time limit
  - Hard/Soft score configuration
  - Entity classes: Lesson (Shift)
  - Solution class: TimeTable (EmployeeSchedule)

### 2.4 Schedule Generation Logic
- Implemented monthly schedule generation in `database/initialize/monthly.py`
- Created fairness algorithms for even shift distribution
- Added business rule validation

---

## 3. Technical Implementation

### Domain Model Structure
```python
@optapy.problem_fact
class Employee:
    name: str
    skill_set: list[str]

@optapy.planning_entity
class Shift:
    id: int
    start: datetime
    end: datetime
    location: str
    required_skill: str
    employee: Employee  # Planning variable

@optapy.planning_solution
class EmployeeSchedule:
    schedule_state: ScheduleState
    availability_list: list[Availability]
    employee_list: list[Employee]
    shift_list: list[Shift]
    score: HardSoftScore
```

### Constraint Scoring
- **Hard Constraints** (Must satisfy):
  - Required skill match
  - No overlapping shifts
  - 10-hour minimum rest
  - One shift per day
  - No unavailable employees

- **Soft Constraints** (Should satisfy):
  - Desired day preferences (reward)
  - Undesired day avoidance (penalty)

### Solver Configuration
```python
solver_config = SolverConfig() \
    .withEntityClasses(Lesson) \
    .withSolutionClass(TimeTable) \
    .withConstraintProviderClass(define_constraints) \
    .withTerminationSpentLimit(Duration.ofSeconds(30))
```

---

## 4. Scheduling Features

### Availability Types
- **DESIRED** - Employee wants to work (positive score)
- **UNDESIRED** - Employee prefers not to work (negative score)
- **UNAVAILABLE** - Employee cannot work (hard constraint violation)

### Shift Management
- Automatic shift assignment to employees
- Skill-based matching
- Location-specific scheduling
- Date/time range configuration

### Optimization Goals
1. Maximize desired day scheduling
2. Minimize undesired day assignments
3. Maintain fairness across employees
4. Meet all hard constraints

---

## 5. Files Created/Modified

| File | Purpose |
|------|---------|
| `optapy/domain.py` | Domain model definitions |
| `optapy/constraints.py` | Constraint functions |
| `optapy/main.py` | Solver configuration & execution |
| `database/initialize/monthly.py` | Monthly schedule generation |
| `database/initialize/constraints.py` | Business rule constraints |

---

## 6. Integration Points

### Database Integration
- Retrieves employee data for scheduling
- Reads existing shift definitions
- Stores generated schedules

### Backend Integration
- API endpoints for schedule retrieval
- Leave management integration
- Employee availability updates

### Frontend Integration
- Schedule display components
- Timeline visualization
- Admin schedule management

---

## 7. Challenges Solved

1. **Complex Constraints**: Implemented multi-layer constraint system
2. **Performance**: Optimized solver to complete within 30 seconds
3. **Skill Matching**: Built skill-based employee-shift matching
4. **Availability**: Created flexible availability system
5. **Fairness**: Balanced shift distribution across employees

---

## 8. Status: COMPLETE

The Attendance & Scheduling team delivered a fully functional constraint-based scheduling system that automatically generates optimized rosters while respecting all business rules and employee preferences.