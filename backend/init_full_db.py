import psycopg2

def init_db():
    try:
        connection = psycopg2.connect(
            database="hospital",
            user='postgres',
            password='abcd1234',
            host='localhost',
            port='5432'
        )
        cursor = connection.cursor()
        
        # 1. Create Employees table (already exists but adding for completeness/check)
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS employees (
                e_id varchar(15) PRIMARY KEY,
                e_name varchar(100) NOT NULL,
                e_type varchar(50) NOT NULL,
                primary_specialization varchar(100),
                secondary_specialization varchar(100),
                location varchar(100),
                password varchar(100) NOT NULL
            )
        ''')

        # 2. Create Shifts table
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS shifts (
                shift_id varchar(15) PRIMARY KEY,
                day varchar(20) NOT NULL,
                time_slot_start time NOT NULL,
                time_slot_end time NOT NULL,
                location varchar(100)
            )
        ''')

        # 3. Create Schedule table
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS schedule (
                schedule_id varchar(15) PRIMARY KEY,
                shift_id varchar(15) NOT NULL REFERENCES shifts(shift_id),
                e_id varchar(15) NOT NULL REFERENCES employees(e_id)
            )
        ''')

        # 4. Create Leaves table
        # Structure matched to main.py insert: (leave_id, schedule_id, date, reason, shift_allotted_to)
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS leaves (
                leave_id varchar(15) PRIMARY KEY,
                schedule_id varchar(15) NOT NULL REFERENCES schedule(schedule_id),
                leave_date date NOT NULL,
                reason text NOT NULL,
                shift_allotted_to varchar(15) REFERENCES employees(e_id)
            )
        ''')

        connection.commit()
        print("Database tables initialized successfully!")

        # 5. Seed some initial Shift and Schedule data if they are empty
        cursor.execute("SELECT count(*) FROM shifts")
        if cursor.fetchone()[0] == 0:
            print("Seeding shifts...")
            days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
            times = [('08:00:00', '16:00:00'), ('16:00:00', '00:00:00'), ('00:00:00', '08:00:00')]
            locations = ["ICU", "Emergency", "Cardiology", "Neurology"]
            
            sft_count = 1
            for day in days:
                for time in times:
                    for loc in locations:
                        sft_id = f"SFT{sft_count:03d}"
                        cursor.execute("INSERT INTO shifts VALUES (%s, %s, %s, %s, %s)", 
                                     (sft_id, day, time[0], time[1], loc))
                        sft_count += 1
            connection.commit()
            print(f"Seeded {sft_count-1} shifts.")

        # 6. Seed some initial Schedules for existing employees
        cursor.execute("SELECT count(*) FROM schedule")
        if cursor.fetchone()[0] == 0:
            print("Seeding schedules...")
            cursor.execute("SELECT e_id FROM employees")
            employees = [r[0] for r in cursor.fetchall()]
            
            sch_count = 1
            for e_id in employees:
                # Assign to Monday Morning Shift in their location (if possible) or just SFT001
                # To keep it simple, just assign everyone to a few shifts
                for i in range(1, 6): # Assign to 5 random-ish shifts
                    sft_id = f"SFT{i:03d}" 
                    sch_id = f"SCH{sch_count:03d}"
                    cursor.execute("INSERT INTO schedule VALUES (%s, %s, %s)", (sch_id, sft_id, e_id))
                    sch_count += 1
            connection.commit()
            print(f"Seeded {sch_count-1} schedules.")

        cursor.close()
        connection.close()

    except Exception as e:
        print(f"Error initializing database: {e}")

if __name__ == "__main__":
    init_db()
