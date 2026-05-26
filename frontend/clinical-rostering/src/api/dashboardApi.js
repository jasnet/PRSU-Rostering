import axios from './axios';


// -----------------------------------
// TOTAL NURSES
// -----------------------------------
export const getNurses = async () => {

    const response = await axios.get(
        '/api/nurse-roster/nurses'
    );

    return response.data;

};


// -----------------------------------
// TOTAL DOCTORS
// -----------------------------------
export const getDoctors = async () => {

    const response = await axios.get(
        '/api/doctor-roster/doctors'
    );

    return response.data;

};

// -----------------------------------
// DEPARTMENT STAFFING
// -----------------------------------
export const getDepartmentStaffing = async () => {

    // -----------------------------------
    // MOCK LIVE HOSPITAL DATA
    // -----------------------------------

    const departments = [

        {
            department: "General Medicine",
            patients: 40,
            nurses: 5,
            severity: "normal"
        },

        {
            department: "ICU",
            patients: 12,
            nurses: 10,
            severity: "critical"
        },

        {
            department: "Pediatrics",
            patients: 24,
            nurses: 3,
            severity: "semi_critical"
        },

        {
            department: "Psychiatry",
            patients: 18,
            nurses: 2,
            severity: "normal"
        }

    ];

    // -----------------------------------
    // CALL STAFFING API
    // -----------------------------------

    const staffingResults = await Promise.all(

        departments.map(

            async (dept) => {

                const response = await axios.get(

                    `/api/nurse-roster/staffing?department=${dept.department}&patients=${dept.patients}&nurses=${dept.nurses}&severity=${dept.severity}`

                );

                return response.data;

            }

        )

    );

    return staffingResults;

};

// -----------------------------------
// TODAY DOCTOR ACTIVITY
// -----------------------------------
export const getDoctorActivity = async () => {

    return [

        {

            department: "General Medicine",

            doctor: "Dr. Rahul Sharma",

            duty: "OPD"

        },

        {

            department: "OBG",

            doctor: "Dr. Priya Nair",

            duty: "OT"

        },

        {

            department: "Pediatrics",

            doctor: "Dr. Sneha Rao",

            duty: "OnDuty"

        },

        {

            department: "Orthopedics",

            doctor: "Dr. Arjun Kumar",

            duty: "OPD"

        }

    ];

};

// -----------------------------------
// MONTHLY NURSE ROSTER
// -----------------------------------
export const getMonthlyRoster = async () => {

    // -----------------------------------
    // FIRST GENERATE
    // -----------------------------------
    await axios.post(

        '/api/nurse-roster/generate-roster',

        {

            department: "General Medicine",

            days: 30

        }

    );


    // -----------------------------------
    // THEN FETCH
    // -----------------------------------
    const response = await axios.get(

        '/api/nurse-roster/roster/General Medicine'

    );

    return response.data;

};

// -----------------------------------
// GENERATE ROSTER
// -----------------------------------
export const generateRoster = async (

    department,

    days

) => {

    const response = await axios.post(

        '/api/nurse-roster/generate-roster',

        {

            department,

            days

        }

    );

    return response.data;

};


// -----------------------------------
// FETCH ROSTER
// -----------------------------------
export const fetchRoster = async (

    department

) => {

    const response = await axios.get(

        `/api/nurse-roster/roster/${department}`

    );

    return response.data;

};

// -----------------------------------
// GENERATE DOCTOR ROSTER
// -----------------------------------
export const generateDoctorRoster = async (

    doctorId

) => {

    const response = await axios.post(

        '/api/doctor-roster/generate',

        {

            doctorId

        }

    );

    return response.data;

};

// -----------------------------------
// FETCH DOCTOR ROSTER
// -----------------------------------
export const fetchDoctorRoster = async (

    doctorId

) => {

    const response = await axios.get(

        `/api/doctor-roster/roster/${doctorId}`

    );

    return response.data;

};

// -----------------------------------
// FETCH DEPARTMENT DOCTOR ROSTER
// -----------------------------------
export const fetchDepartmentDoctorRoster = async (

    department

) => {

    const response = await axios.get(

        `/api/doctor-roster/department-roster/${department}`

    );

    return response.data;

};

// -----------------------------------
// GENERATE ENTIRE DEPARTMENT
// -----------------------------------
export const generateDepartmentDoctorRoster = async (

    department

) => {

    const response = await axios.post(

        `/api/doctor-roster/generate-department/${department}`

    );

    return response.data;

};

// -----------------------------------
// FETCH MY NURSE ROSTER
// -----------------------------------
export const fetchMyNurseRoster = async (

    nurseId

) => {

    const response = await axios.get(

        `/api/nurse-roster/my-roster/${nurseId}`

    );

    return response.data;

};

// -----------------------------------
// FRONTDESK DASHBOARD
// -----------------------------------
export const fetchFrontdeskDashboard = async () => {

    const response = await axios.get(

        '/api/frontdesk/dashboard'

    );

    return response.data;

};

export const getFrontdeskDashboard = async () => {

    const response = await fetch(

        'http://localhost:8000/api/frontdesk/dashboard'

    );

    return await response.json();

};

// -----------------------------------
// GENERATE ALL ROSTERS
// -----------------------------------
export const generateAllRosters = async () => {

    const response = await axios.post(

        '/api/nurse-roster/generate-all'

    );

    return response.data;

};