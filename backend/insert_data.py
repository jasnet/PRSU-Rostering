import psycopg2

connection = psycopg2.connect(
   database="hospital",
    user='postgres',
    password='abcd1234',
    host='localhost',
    port= '5432'
)
connection.autocommit = True
cursor = connection.cursor()

with open('database/data.txt', 'r') as f:
    lines = f.readlines()

# Remove the first line if it's 'employees\n' or similar
if lines[0].strip() == 'employees':
    lines = lines[1:]

sql = "".join(lines)
try:
    cursor.execute(sql)
    print("Data inserted successfully!")
except Exception as e:
    print(f"Error inserting data: {e}")
