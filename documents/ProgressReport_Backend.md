# Progress Report: Backend Team
**Team Member:** Backend Developer  
**Project:** Clinical Rostering System  
**Period:** Sprint 1-4  

---

## 1. Overview

The backend team was responsible for developing the server-side logic, RESTful APIs, and business logic for the Clinical Rostering System. We built a robust FastAPI application that handles user authentication, leave management, schedule retrieval, and integrates with the OptaPy optimization engine.

---

## 2. Work Completed

### 2.1 API Framework Setup
- Initialized **FastAPI** application with proper configuration
- Configured **CORS middleware** for cross-origin requests
- Set up logging and error handling infrastructure
- Established connection to PostgreSQL database

### 2.2 Authentication System
- Implemented `/login-user` endpoint for user authentication
- Built credential validation against database
- Created session management with mock user fallback
- Added basic HTTP authentication using `HTTPBasic` security

**API Endpoint:**
```python
@app.post('/login-user')
def login(emp: dict)
```

### 2.3 Leave Management API
- Built `/send-leave` endpoint for leave request submission
- Implemented date parsing and validation
- Created automatic leave ID generation
- Integrated with schedule database for validation

**API Endpoint:**
```python
@app.post('/send-leave')
async def leave(data: dict)
```

### 2.4 Database Integration
- Established PostgreSQL connection with connection pooling
- Implemented proper error handling for DB failures
- Created fallback mechanism with mock data when DB unavailable
- Executed raw SQL queries for complex operations

### 2.5 Data Processing Utilities
- Built `index2id()` function for unique ID generation
- Created `get_date()` function for date string parsing
- Implemented month-to-index mapping dictionary
- Handled date format conversions for API responses

---

## 3. Technical Implementation

### Server Configuration
```python
# FastAPI Setup
app = FastAPI()
security = HTTPBasic()

# Database Connection
connection = psycopg2.connect(
    database="hospital",
    user='postgres',
    password='abcd1234',
    host='localhost',
    port='5432'
)
```

### API Endpoints Summary

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/` | GET | Health check - returns "Hello World" |
| `/login-user` | POST | User authentication |
| `/send-leave` | POST | Submit leave request |

### Data Models
- Employee authentication data (e_id, password)
- Leave request data (e_id, date, reason)
- Schedule lookup (e_id, day)

---

## 4. Business Logic Implementation

### Authentication Flow
1. Receive login credentials from frontend
2. Query database for matching employee
3. Validate password
4. Return employee details if successful
5. Return empty array if authentication fails

### Leave Request Flow
1. Receive leave request with employee ID, date, reason
2. Validate employee has scheduled shift on that day
3. Generate unique leave ID
4. Parse and store leave date
5. Insert into leaves table
6. Return confirmation

### Error Handling
- Database connection failures: Graceful fallback to mock data
- Invalid credentials: Return empty user array
- Missing shift data: Return empty result without crash

---

## 5. Integration Points

### Frontend Integration
- Receives JSON data from React components
- Returns JSON responses for UI rendering
- Handles CORS for localhost:3000 communication

### Database Integration
- Executes SQL queries via psycopg2
- Handles connection lifecycle
- Manages transactions with commit/rollback

### OptaPy Integration
- Provides schedule data from database
- Receives optimized schedules for storage
- Supports constraint-based scheduling results

---

## 6. Security Implementation

### Current Security Measures
- HTTP Basic authentication setup
- Credential verification against database
- Session management on frontend

### Security Considerations
- CORS currently allows all origins (`*`)
- Passwords stored in plain text (needs hashing)
- No JWT token implementation yet
- No rate limiting on endpoints

---

## 7. Files Created/Modified

| File | Description |
|------|-------------|
| `main.py` | FastAPI application with all endpoints |
| `requirements.txt` | Python dependencies |
| `optapy/main.py` | OptaPy scheduling integration |
| `optapy/domain.py` | Scheduling domain models |
| `optapy/constraints.py` | Constraint definitions |

---

## 8. Dependencies Used

```python
fastapi          # Web framework
psycopg2         # PostgreSQL driver
uvicorn          # ASGI server
```

---

## 9. Challenges Solved

1. **Database Unavailable**: Implemented mock user data fallback
2. **Date Parsing**: Created flexible date format handling
3. **CORS Issues**: Configured middleware for frontend-backend communication
4. **Connection Management**: Proper cursor and connection cleanup
5. **Error Recovery**: Graceful error handling without crashes

---

## 10. Status: COMPLETE

The backend team successfully delivered a functional API layer that handles authentication, leave management, and schedule operations. All endpoints are integrated with the frontend and database components.