import psycopg2
import sys

passwords = ["postgres", "password", "root", "", "admin", "123456", "1234", "abcd1234"]
connected = False
for pwd in passwords:
    try:
        psycopg2.connect(database="postgres", user="postgres", password=pwd, host="localhost", port="5432")
        print(f"SUCCESS login to 'postgres' db with password: '{pwd}'")
        connected = True
        break
    except psycopg2.OperationalError as e:
        pass

if not connected:
    print("ALL PASSWORDS FAILED to connect to default 'postgres' database.")
    sys.exit(1)

# Now check 'hospital' db
try:
    psycopg2.connect(database="hospital", user="postgres", password=pwd, host="localhost", port="5432")
    print(f"SUCCESS login to 'hospital' db.")
except psycopg2.OperationalError as e:
    print(f"FAILED to connect to 'hospital' db: {str(e)}")
