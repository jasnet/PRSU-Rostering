from pymongo import MongoClient

client = MongoClient('mongodb://127.0.0.1:27017')
db = client['doctor_roster']
print('doctors:', sorted(db.doctors.distinct('doctorId')))
print('rosters:', sorted(db.rosters.distinct('doctorId')))
