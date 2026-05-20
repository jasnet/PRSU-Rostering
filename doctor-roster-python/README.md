# Doctor Roster - Python Backend

Minimal Flask backend mirroring core endpoints from the original Node.js app.

Run (recommended in a virtualenv):

```bash
python -m pip install -r requirements.txt
cd doctor-roster-python
python app.py
```

Endpoints:
- `GET /` - health
- `GET /api/departments` - list department names seeded from the roster departments list
- `GET/POST /api/doctors` - list/create doctors
- `GET /api/rosters/generate/<doctorId>` - generate and save roster
- `GET /api/rosters/<doctorId>` - get roster

MongoDB: expects `mongodb://127.0.0.1:27017/doctor_roster` to be available.
