import React, {

    useEffect,

    useState

} from 'react';

import {

    fetchFrontdeskDashboard

} from '../../api/dashboardApi';


export default function FrontdeskDashboard() {


    // -----------------------------------
    // STATES
    // -----------------------------------
    const [dashboard, setDashboard] = useState({

        consultants: [],

        nurseCounts: {},

        patientRatio: []

    });

    const [search, setSearch] = useState('');

    const [selectedDept, setSelectedDept] = useState(
        'All'
    );


    // -----------------------------------
    // LOAD
    // -----------------------------------
    useEffect(() => {

        loadDashboard();

    }, []);


    // -----------------------------------
    // FETCH DATA
    // -----------------------------------
    const loadDashboard = async () => {

        try {

            const data = await fetchFrontdeskDashboard();

            setDashboard(data);

        }

        catch (error) {

            console.error(error);

        }

    };


    // -----------------------------------
    // DEPARTMENTS
    // -----------------------------------
    const departments = [

        'All',

        ...new Set(

            dashboard.consultants.map(

                (item) => item.department

            )

        )

    ];


    return (

        <div className="container-fluid p-4">


            {/* HEADER */}

            <div className="mb-4">

                <h1

                    style={{

                        fontWeight: '700',

                        color: '#1e3050'

                    }}

                >

                    Frontdesk Dashboard

                </h1>

                <p className="text-muted">

                    Hospital operations overview

                </p>

            </div>


            {/* SEARCH */}

            <div className="card border-0 shadow-sm mb-4">

                <div className="card-body">

                    <input

                        type="text"

                        placeholder="Search doctor or department..."

                        className="form-control"

                        value={search}

                        onChange={(e) =>

                            setSearch(

                                e.target.value

                            )

                        }

                        style={{

                            height: '55px',

                            borderRadius: '12px'

                        }}

                    />

                </div>

            </div>


            {/* DEPARTMENT DROPDOWN */}

            <div className="card border-0 shadow-sm mb-4">

                <div className="card-body">

                    <select

                        className="form-select"

                        value={selectedDept}

                        onChange={(e) =>

                            setSelectedDept(

                                e.target.value

                            )

                        }

                        style={{

                            height: '55px',

                            borderRadius: '12px'

                        }}

                    >

                        {

                            departments.map(

                                (dept, index) => (

                                    <option

                                        key={index}

                                        value={dept}

                                    >

                                        {

                                            dept

                                        }

                                    </option>

                                )

                            )

                        }

                    </select>

                </div>

            </div>


            {/* TODAY'S DOCTOR AVAILABILITY */}

            <div className="card border-0 shadow-sm mb-4">

                <div className="card-body">

                    <h5

                        style={{

                            fontWeight: '700',

                            color: '#1e3050'

                        }}

                    >

                        Today's Doctor Availability

                    </h5>


                    <div

                        style={{

                            overflowX: 'auto'

                        }}

                    >

                        <table className="table align-middle mt-4">

                            <thead>

                                <tr>

                                    <th>Department</th>

                                    <th>Doctor</th>

                                    <th>Duty</th>

                                    <th>Time</th>

                                    <th>Class</th>

                                </tr>

                            </thead>


                            <tbody>

                                {

                                    dashboard.consultants

                                        .filter((item) =>

                                            (

                                                selectedDept === 'All'

                                                ||

                                                item.department === selectedDept

                                            )

                                            &&

                                            (

                                                item.department

                                                    .toLowerCase()

                                                    .includes(

                                                        search.toLowerCase()

                                                    )

                                                ||

                                                item.doctor

                                                    .toLowerCase()

                                                    .includes(

                                                        search.toLowerCase()

                                                    )

                                            )

                                        )

                                        .map((item, index) => (

                                            <tr key={index}>


                                                <td>

                                                    {

                                                        item.department

                                                    }

                                                </td>


                                                <td>

                                                    {

                                                        item.doctor

                                                    }

                                                </td>


                                                <td>

                                                    <div

                                                        className="px-3 py-2 rounded text-center"

                                                        style={{

                                                            width: '90px',

                                                            fontWeight: '700',

                                                            background:

                                                                item.duty === 'OPD'

                                                                    ? '#dbeafe'

                                                                    : item.duty === 'OT'

                                                                    ? '#fee2e2'

                                                                    : '#dcfce7',

                                                            color:

                                                                item.duty === 'OPD'

                                                                    ? '#1d4ed8'

                                                                    : item.duty === 'OT'

                                                                    ? '#dc2626'

                                                                    : '#15803d'

                                                        }}

                                                    >

                                                        {

                                                            item.duty

                                                        }

                                                    </div>

                                                </td>


                                                <td>

                                                    {

                                                        item.time

                                                    }

                                                </td>


                                                <td>

                                                    {

                                                        item.class

                                                            ? item.class

                                                            : '-'

                                                    }

                                                </td>

                                            </tr>

                                        ))

                                }

                            </tbody>

                        </table>

                    </div>

                </div>

            </div>


            {/* NURSE COUNTS */}

            <div className="card border-0 shadow-sm mb-4">

                <div className="card-body">

                    <h5

                        style={{

                            fontWeight: '700',

                            color: '#1e3050'

                        }}

                    >

                        Department-wise Nurse Count

                    </h5>


                    <div

                        style={{

                            overflowX: 'auto'

                        }}

                    >

                        <table className="table align-middle mt-4">

                            <thead>

                                <tr>

                                    <th>Department</th>

                                    <th>Morning</th>

                                    <th>Evening</th>

                                    <th>Night</th>

                                    <th>General</th>

                                </tr>

                            </thead>


                            <tbody>

                                {

                                    Object.entries(

                                        dashboard.nurseCounts || {}

                                    ).map(

                                        ([dept, counts], index) => (

                                            <tr key={index}>


                                                <td>

                                                    {

                                                        dept

                                                    }

                                                </td>


                                                <td>

                                                    {

                                                        counts.M

                                                    }

                                                </td>


                                                <td>

                                                    {

                                                        counts.E

                                                    }

                                                </td>


                                                <td>

                                                    {

                                                        counts.N

                                                    }

                                                </td>

                                                <td>

                                                    {

                                                        counts.G

                                                    }

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


            {/* PATIENT RATIO */}

            <div className="card border-0 shadow-sm">

                <div className="card-body">

                    <h5

                        style={{

                            fontWeight: '700',

                            color: '#1e3050'

                        }}

                    >

                        Nurse Patient Ratio

                    </h5>


                    <div

                        style={{

                            overflowX: 'auto'

                        }}

                    >

                        <table className="table align-middle mt-4">

                            <thead>

                                <tr>

                                    <th>Department</th>

                                    <th>Patients</th>

                                    <th>Active Nurses</th>

                                    <th>Required</th>

                                    <th>Shift</th>

                                    <th>Status</th>

                                </tr>

                            </thead>


                            <tbody>

                                {

                                    (dashboard.patientRatio || []).map(

                                        (item, index) => (

                                            <tr key={index}>

                                                <td>

                                                    {

                                                        item.department

                                                    }

                                                </td>


                                                <td>

                                                    {

                                                        item.patients

                                                    }

                                                </td>


                                                <td>

                                                    {

                                                        item.nurses

                                                    }

                                                </td>


                                                <td>

                                                    {

                                                        item.required

                                                    }

                                                </td>


                                                <td>

                                                    {

                                                        item.shift

                                                    }

                                                </td>


                                                <td>

                                                    <span

                                                        className={`badge ${

                                                            item.status === 'Balanced'

                                                            ? 'bg-success'

                                                            : 'bg-danger'

                                                        }`}

                                                    >

                                                        {

                                                            item.status

                                                        }

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

    );

}