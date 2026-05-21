import React, {

    useEffect,

    useState

} from 'react';

import {

    getDoctors,

    getNurses,

    getDepartmentStaffing,

    getDoctorActivity

} from '../../api/dashboardApi';

export default function AdminDashboard() {

    const [doctorCount, setDoctorCount] = useState(0);

    const [nurseCount, setNurseCount] = useState(0);

    const [loading, setLoading] = useState(true);

    const [staffingData, setStaffingData] = useState([]);

    const [doctorActivity, setDoctorActivity] = useState([]);


    // -----------------------------------
    // LOAD DASHBOARD
    // -----------------------------------
    useEffect(() => {

        loadDashboard();

    }, []);


    // -----------------------------------
    // FETCH DATA
    // -----------------------------------
    const loadDashboard = async () => {

        try {

            const nurses = await getNurses();

            const doctors = await getDoctors();

            setNurseCount(
                nurses.length
            );

            setDoctorCount(
                doctors.length
            );


            // -----------------------------------
            // STAFFING DATA
            // -----------------------------------

            const staffingOverview = await getDepartmentStaffing();

            setStaffingData(

                staffingOverview

            );

            const doctorActivityData = await getDoctorActivity();

            setDoctorActivity(

                doctorActivityData

            );

            setLoading(false);

        }

        catch (error) {

            console.error(error);

        }

    };


    // -----------------------------------
    // LOADING
    // -----------------------------------
    if (loading) {

        return (

            <div className="p-4">

                <h3>Loading Dashboard...</h3>

            </div>

        );

    }


    return (

        <div className="container-fluid p-4">

            {/* ----------------------------------- */}
            {/* HEADER */}
            {/* ----------------------------------- */}

            <div className="mb-4">

                <h1

                    style={{

                        fontWeight: '700',

                        color: '#1e3050'

                    }}

                >

                    Admin Dashboard

                </h1>

                <p className="text-muted">

                    Hospital overview and staffing analytics

                </p>

            </div>


            {/* ----------------------------------- */}
            {/* STATS CARDS */}
            {/* ----------------------------------- */}

            <div className="row g-4">

                {/* DOCTORS */}

                <div className="col-md-6">

                    <div

                        className="card border-0 shadow-sm h-100"

                        style={{

                            borderRadius: '20px'

                        }}

                    >

                        <div className="card-body p-4">

                            <div className="d-flex justify-content-between align-items-center">

                                <div>

                                    <p className="text-muted mb-2">

                                        Total Doctors

                                    </p>

                                    <h1

                                        style={{

                                            color: '#1e3050',

                                            fontWeight: '700'

                                        }}

                                    >

                                        {doctorCount}

                                    </h1>

                                </div>

                                <div

                                    style={{

                                        width: '70px',

                                        height: '70px',

                                        borderRadius: '18px',

                                        background: '#eef3ff',

                                        display: 'flex',

                                        alignItems: 'center',

                                        justifyContent: 'center'

                                    }}

                                >

                                    <i

                                        className="fas fa-user-md"

                                        style={{

                                            fontSize: '30px',

                                            color: '#1e3050'

                                        }}

                                    ></i>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>


                {/* NURSES */}

                <div className="col-md-6">

                    <div

                        className="card border-0 shadow-sm h-100"

                        style={{

                            borderRadius: '20px'

                        }}

                    >

                        <div className="card-body p-4">

                            <div className="d-flex justify-content-between align-items-center">

                                <div>

                                    <p className="text-muted mb-2">

                                        Total Nurses

                                    </p>

                                    <h1

                                        style={{

                                            color: '#1e3050',

                                            fontWeight: '700'

                                        }}

                                    >

                                        {nurseCount}

                                    </h1>

                                </div>

                                <div

                                    style={{

                                        width: '70px',

                                        height: '70px',

                                        borderRadius: '18px',

                                        background: '#fff3e8',

                                        display: 'flex',

                                        alignItems: 'center',

                                        justifyContent: 'center'

                                    }}

                                >

                                    <i

                                        className="fas fa-user-nurse"

                                        style={{

                                            fontSize: '30px',

                                            color: '#f47b2c'

                                        }}

                                    ></i>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>
                {/* ----------------------------------- */}
                {/* STAFFING ALERTS */}
                {/* ----------------------------------- */}

                <div className="row mt-4">

                    {

                        staffingData

                            .filter(

                                dept => dept.status === "Shortage"

                            )

                            .map(

                                (dept, index) => (

                                    <div

                                        className="col-md-6 mb-3"

                                        key={index}

                                    >

                                        <div

                                            className="card border-0 shadow-sm"

                                            style={{

                                                borderLeft: '6px solid #dc3545',

                                                borderRadius: '16px'

                                            }}

                                        >

                                            <div className="card-body">

                                                <div className="d-flex align-items-center">

                                                    <div

                                                        className="me-3"

                                                        style={{

                                                            width: '50px',

                                                            height: '50px',

                                                            borderRadius: '14px',

                                                            background: '#ffe9ea',

                                                            display: 'flex',

                                                            alignItems: 'center',

                                                            justifyContent: 'center'

                                                        }}

                                                    >

                                                        <i

                                                            className="fas fa-exclamation-triangle"

                                                            style={{

                                                                color: '#dc3545',

                                                                fontSize: '22px'

                                                            }}

                                                        ></i>

                                                    </div>

                                                    <div>

                                                        <h5

                                                            className="mb-1"

                                                            style={{

                                                                fontWeight: '700',

                                                                color: '#1e3050'

                                                            }}

                                                        >

                                                            Staffing Shortage

                                                        </h5>

                                                        <p className="mb-0 text-muted">

                                                            {dept.department} requires {

                                                                dept.shortage

                                                            } more nurses.

                                                        </p>

                                                    </div>

                                                </div>

                                            </div>

                                        </div>

                                    </div>

                                )

                            )

                    }

                </div>
                {/* ----------------------------------- */}
                {/* STAFFING OVERVIEW */}
                {/* ----------------------------------- */}

                <div className="mt-5">

                    <div className="card border-0 shadow-sm">

                        <div className="card-body p-4">

                            <div className="mb-4">

                                <h3

                                    style={{

                                        color: '#1e3050',

                                        fontWeight: '700'

                                    }}

                                >

                                    Department Staffing

                                </h3>

                                <p className="text-muted mb-0">

                                    Real-time staffing overview

                                </p>

                            </div>

                            <div className="table-responsive">

                                <table className="table align-middle">

                                    <thead>

                                        <tr>

                                            <th>Department</th>

                                            <th>Patients</th>

                                            <th>Nurses</th>

                                            <th>Required</th>

                                            <th>Status</th>

                                        </tr>

                                    </thead>

                                    <tbody>

                                        {

                                            staffingData.map(

                                                (dept, index) => (

                                                    <tr key={index}>

                                                        <td>

                                                            <strong>

                                                                {dept.department}

                                                            </strong>

                                                        </td>

                                                        <td>

                                                            {dept.patients}

                                                        </td>

                                                        <td>

                                                            {dept.available_nurses}

                                                        </td>

                                                        <td>

                                                            {dept.required_nurses}

                                                        </td>

                                                        <td>

                                                            <span

                                                                className={`badge ${dept.status === "Balanced"

                                                                    ?

                                                                    "bg-success"

                                                                    :

                                                                    "bg-danger"

                                                                    }`}

                                                            >

                                                                {dept.status}

                                                            </span>

                                                        </td>

                                                    </tr>

                                                )

                                            )

                                        }

                                    </tbody>

                                </table>

                            </div>

                        </div>

                    </div>

                </div>

            </div>
            {/* ----------------------------------- */}
            {/* DOCTOR ACTIVITY */}
            {/* ----------------------------------- */}

            <div className="mt-5">

                <div className="card border-0 shadow-sm">

                    <div className="card-body p-4">

                        <div className="mb-4">

                            <h3

                                style={{

                                    color: '#1e3050',

                                    fontWeight: '700'

                                }}

                            >

                                Doctor Activity Today

                            </h3>

                            <p className="text-muted mb-0">

                                OPD, OT and OnDuty monitoring

                            </p>

                        </div>

                        <div className="table-responsive">

                            <table className="table align-middle">

                                <thead>

                                    <tr>

                                        <th>Department</th>

                                        <th>Doctor</th>

                                        <th>Duty</th>

                                    </tr>

                                </thead>

                                <tbody>

                                    {

                                        doctorActivity.map(

                                            (doc, index) => (

                                                <tr key={index}>

                                                    <td>

                                                        <strong>

                                                            {doc.department}

                                                        </strong>

                                                    </td>

                                                    <td>

                                                        {doc.doctor}

                                                    </td>

                                                    <td>

                                                        <span

                                                            className={`badge ${doc.duty === "OT"

                                                                    ?

                                                                    "bg-danger"

                                                                    :

                                                                    doc.duty === "OnDuty"

                                                                        ?

                                                                        "bg-warning text-dark"

                                                                        :

                                                                        "bg-primary"

                                                                }`}

                                                        >

                                                            {doc.duty}

                                                        </span>

                                                    </td>

                                                </tr>

                                            )

                                        )

                                    }

                                </tbody>

                            </table>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    );

}