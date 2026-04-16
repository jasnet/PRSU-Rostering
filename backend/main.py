import psycopg2
from fastapi import FastAPI, HTTPException
from fastapi.security import HTTPBasic, HTTPBasicCredentials
# from models.employee import Employee
from fastapi.middleware.cors import CORSMiddleware
import datetime

app = FastAPI()
origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

security = HTTPBasic()

try:
    # Establish database connection
    connection = psycopg2.connect(
       database="hospital",
        user='postgres',
        password='abcd1234',
        host='localhost',
        port= '5432'
    )
    cursor = connection.cursor()
except Exception as e:
    print("WARNING: Could not connect to the database. The server will start but endpoints requiring the DB will fail.", e)
    connection = None
    cursor = None

month2idx = {"Jan" : "01", "Feb" : "02", "Mar" : "03", "Apr" : "04", "May" : "05", "Jun" : "06", "July" : "07", "Aug" : "08", "Sept" : "09", "Oct" : 10, "Nov" : 11, "Dec" : 12}

@app.get('/')
async def root():
    return {"Hello" : "World"}

@app.post('/login-user')
def login(emp: dict):

    if cursor is None:
        raise HTTPException(status_code=503, detail="Database not available")

    sql = 'select * from employees where e_id = %s and password = %s';

    cursor.execute(sql , (emp['e_id'], emp['password'], ))
    col_names = [desc[0] for desc in cursor.description]

    # Fetch all rows as a list of tuples
    rows = cursor.fetchall()

    # Create a dictionary with column names as keys and query results as values
    user = []
    for row in rows:
        result = {}
        for i in range(len(col_names)):
            result[col_names[i]] = row[i]
        user.append(result)

    return {"Employee" : user}


@app.post('/register-user')
def register(emp: dict):

    if cursor is None:
        raise HTTPException(status_code=503, detail="Database not available")

    # Check if employee ID already exists
    check_sql = 'select e_id from employees where e_id = %s'
    cursor.execute(check_sql, (emp['e_id'],))
    existing = cursor.fetchone()

    if existing:
        raise HTTPException(status_code=400, detail="Employee ID already exists")

    # Insert new employee
    insert_sql = '''INSERT INTO employees (e_id, e_name, e_type, primary_specialization, secondary_specialization, location, password)
                    VALUES (%s, %s, %s, %s, %s, %s, %s)'''

    try:
        cursor.execute(insert_sql, (
            emp['e_id'],
            emp['e_name'],
            emp.get('e_type', 'Staff'),
            emp.get('primary_specialization', ''),
            emp.get('secondary_specialization', ''),
            emp.get('location', ''),
            emp['password']
        ))
        connection.commit()
        return {"message": "Employee registered successfully", "e_id": emp['e_id']}
    except Exception as e:
        connection.rollback()
        raise HTTPException(status_code=500, detail=str(e))


@app.post('/send-leave')
async def leave(data: dict):

    sql = 'select * from schedule as sc inner join shifts as sh on sc.shift_id = sh.shift_id where e_id = %s and day = %s';

    day = str(data['date'].split(' ')[0])
    day = day[0].upper() + day[1 : ] + "day"

    # print(data['e_id'], day)

    cursor.execute(sql, (data['e_id'], day, ))
    connection.commit()

    rows = cursor.fetchall()

    sql2 = 'insert into leaves values (%s, %s, %s, %s, %s)'
    sql3 = 'select count(*) from leaves'

    cursor.execute(sql3)
    connection.commit()

    index = cursor.fetchone()[0]

    data_list = []

    for row in rows:
        index += 1
        index_id = "LE" + str(index2id(index))
        date = get_date(data['date'])
        data_list.append((index_id, row[0], date, data['reason'], None))

    cursor.executemany(sql2, data_list)
    connection.commit()

    return data_list



def index2id(n):
    length = len(str(n))
    return str((4 - length) * "0" + str(n))

def get_date(date):
    date = date.split(" ")
    d = "{}-{}-{}".format((date[3]), month2idx[date[1]], int(date[2]))
    return d
# Trigger reload
