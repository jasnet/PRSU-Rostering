import React, {

    useEffect,

    useState

} from 'react';

import {

    fetchDepartmentDoctorRoster,

    generateDepartmentDoctorRoster

} from '../../api/dashboardApi';


export default function WeeklySchedule() {


    // -----------------------------------
    // STATES
    // -----------------------------------
    const [department, setDepartment] = useState(

        "General Medicine"

    );

    const [roster, setRoster] = useState([]);

    const [loading, setLoading] = useState(false);


    // -----------------------------------
    // DAYS
    // -----------------------------------
    const weekDays = [

        "Monday",

        "Tuesday",

        "Wednesday",

        "Thursday",

        "Friday",

        "Saturday",

        "Sunday"

    ];


    // -----------------------------------
    // LOAD
    // -----------------------------------
    useEffect(() => {

        loadRoster();

    }, []);


    // -----------------------------------
    // FETCH
    // -----------------------------------
    const loadRoster = async () => {

    try {

        setLoading(true);

        // -----------------------------------
        // GENERATE ENTIRE DEPARTMENT
        // -----------------------------------
        await generateDepartmentDoctorRoster(

            department

        );

        // -----------------------------------
        // FETCH UPDATED ROSTER
        // -----------------------------------
        const data = await fetchDepartmentDoctorRoster(

            department

        );

        setRoster(data);

        setLoading(false);

    }

    catch (error) {

        console.error(error);

        setLoading(false);

    }

};

    // -----------------------------------
    // DUTY STYLE
    // -----------------------------------
    const getDutyStyle = (type) => {

        switch (type) {

            case "OPD":

                return {

                    background: '#dbeafe',

                    color: '#1d4ed8'

                };

            case "OT":

                return {

                    background: '#fee2e2',

                    color: '#dc2626'

                };

            case "CLASS":

                return {

                    background: '#fef3c7',

                    color: '#d97706'

                };

            case "ONDUTY":

                return {

                    background: '#dcfce7',

                    color: '#15803d'

                };

            case "OTHER":

                return {

                    background: '#ede9fe',

                    color: '#7c3aed'

                };

            default:

                return {

                    background: '#f3f4f6',

                    color: '#111827'

                };

        }

    };


    return (

        <div

            className="container-fluid p-4"

            style={{

                overflowX: 'hidden'

            }}

        >


            {/* ----------------------------------- */}
            {/* HEADER */}
            {/* ----------------------------------- */}

            <div className="mb-4">

                <h1

                    style={{

                        color: '#1e3050',

                        fontWeight: '700'

                    }}

                >

                    Weekly Doctor Schedule

                </h1>

                <p className="text-muted">

                    Department-wise consultant scheduling

                </p>

            </div>


            {/* ----------------------------------- */}
            {/* CONTROLS */}
            {/* ----------------------------------- */}

            <div className="card border-0 shadow-sm mb-4">

                <div className="card-body">

                    <div className="row align-items-end">


                        {/* DEPARTMENT */}

                        <div className="col-md-4">

                            <label className="form-label">

                                Department

                            </label>

                            <select

                                className="form-select"

                                value={department}

                                onChange={(e) =>

                                    setDepartment(

                                        e.target.value

                                    )

                                }

                            >

                                <option>

                                    General Medicine

                                </option>

                                <option>

                                    General Surgery

                                </option>

                                <option>

                                    OBG

                                </option>

                                <option>

                                    Pediatrics

                                </option>

                                <option>

                                    Orthopedics

                                </option>

                                <option>

                                    Emergency & Trauma Care

                                </option>

                                <option>

                                    Psychiatry

                                </option>

                                <option>

                                    Dermatology

                                </option>

                                <option>

                                    ENT

                                </option>

                                <option>

                                    Ophthalmology

                                </option>

                                <option>

                                    Dentistry

                                </option>

                                <option>

                                    Radiology

                                </option>

                            </select>

                        </div>


                        {/* BUTTON */}

                        <div className="col-md-3">

                            <button

                                className="btn btn-primary w-100"

                                style={{

                                    height: '45px',

                                    borderRadius: '12px',

                                    fontWeight: '600'

                                }}

                                onClick={loadRoster}

                            >

                                {

                                    loading

                                        ?

                                        "Loading..."

                                        :

                                        "Load Schedule"

                                }

                            </button>

                        </div>

                    </div>

                </div>

            </div>


            {/* ----------------------------------- */}
            {/* LEGENDS */}
            {/* ----------------------------------- */}

            <div className="d-flex gap-3 mb-4 flex-wrap">

                {

                    [

                        "OPD",

                        "OT",

                        "CLASS",

                        "ONDUTY",

                        "OTHER"

                    ].map((item) => (

                        <div

                            key={item}

                            className="px-3 py-2 rounded"

                            style={{

                                fontWeight: '600',

                                fontSize: '13px',

                                ...getDutyStyle(item)

                            }}

                        >

                            {item}

                        </div>

                    ))

                }

            </div>


            {/* ----------------------------------- */}
            {/* TABLE */}
            {/* ----------------------------------- */}

            <div className="card border-0 shadow-sm">


                <div

                    style={{

                        overflowX: 'auto'

                    }}

                >

                    <table

                        className="table align-middle mb-0"

                        style={{

                            minWidth: '1200px',

                            whiteSpace: 'nowrap'

                        }}

                    >


                        {/* HEADER */}

                        <thead

                            style={{

                                background: '#f8fafc'

                            }}

                        >

                            <tr>

                                <th

                                    style={{

                                        minWidth: '260px',

                                        position: 'sticky',

                                        left: 0,

                                        background: '#f8fafc',

                                        zIndex: 5

                                    }}

                                >

                                    Doctor

                                </th>

                                {

                                    weekDays.map((day) => (

                                        <th key={day}>

                                            {day}

                                        </th>

                                    ))

                                }

                            </tr>

                        </thead>


                        {/* BODY */}

                        <tbody>

                            {

                                roster.map((doctor, index) => (

                                    <tr key={index}>


                                        {/* DOCTOR */}

                                        <td

                                            style={{

                                                position: 'sticky',

                                                left: 0,

                                                background: 'white',

                                                zIndex: 4,

                                                minWidth: '260px',

                                                boxShadow: '4px 0 8px rgba(0,0,0,0.04)'

                                            }}

                                        >

                                            <div

                                                className="d-flex align-items-center"

                                            >

                                                <div

                                                    className="rounded-circle d-flex align-items-center justify-content-center me-3"

                                                    style={{

                                                        width: '42px',

                                                        height: '42px',

                                                        background: '#e0e7ff',

                                                        color: '#1e3a8a',

                                                        fontWeight: '700'

                                                    }}

                                                >

                                                    {

                                                        doctor.doctorId.slice(-2)

                                                    }

                                                </div>

                                                <div>

                                                    <div

                                                        style={{

                                                            fontWeight: '700'

                                                        }}

                                                    >

                                                        {

                                                            doctor.doctorName

                                                        }

                                                    </div>

                                                    <small className="text-muted">

                                                        {

                                                            doctor.doctorId

                                                        }

                                                    </small>

                                                </div>

                                            </div>

                                        </td>


                                        {/* DAYS */}

                                        {

                                            weekDays.map((day) => {


                                                const duty =

                                                    doctor.schedule.find(

                                                        (s) => s.day === day

                                                    );


                                                return (

                                                    <td key={day}>


                                                        {

                                                            duty ? (

                                                                <div

                                                                    className="px-3 py-2 rounded text-center"

                                                                    style={{

                                                                        minWidth: '90px',

                                                                        fontWeight: '700',

                                                                        fontSize: '13px',

                                                                        ...getDutyStyle(

                                                                            duty.dutyType

                                                                        )

                                                                    }}

                                                                >

                                                                    <div>

    <div>

        {

            duty.dutyType

        }

    </div>

    {

        duty.classSchedule && (

            <small

                style={{

                    fontSize: '10px',

                    color: '#7c3aed',

                    fontWeight: '700'

                }}

            >

                CLASS

            </small>

        )

    }

</div>

                                                                </div>

                                                            )

                                                                :

                                                                (

                                                                    <div

                                                                        className="px-3 py-2 rounded text-center"

                                                                        style={{

                                                                            background: '#f3f4f6',

                                                                            color: '#9ca3af',

                                                                            fontWeight: '700'

                                                                        }}

                                                                    >

                                                                        OFF

                                                                    </div>

                                                                )

                                                        }

                                                    </td>

                                                );

                                            })

                                        }

                                    </tr>

                                ))

                            }

                        </tbody>

                    </table>

                </div>

            </div>

        </div>

    );

}