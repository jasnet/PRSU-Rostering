from pymongo import MongoClient

client = MongoClient('mongodb://127.0.0.1:27017')
db = client['doctor_roster']

mapping = {
    'PSY001': 'D001',
    'PSY002': 'D002',
    'GEN001': 'D003'
}

for old, new in mapping.items():
    doc_result = db.doctors.update_many({'doctorId': old}, {'$set': {'doctorId': new}})
    roster_result = db.rosters.update_many({'doctorId': old}, {'$set': {'doctorId': new}})
    print(f"Updated doctors {old}->{new}: {doc_result.modified_count}, rosters {old}->{new}: {roster_result.modified_count}")

print('done')
