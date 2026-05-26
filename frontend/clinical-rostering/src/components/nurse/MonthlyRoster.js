import React, {

    useEffect,

    useState

} from 'react';

import {

    generateRoster,

    generateAllRosters,

    fetchRoster

} from '../../api/dashboardApi';

export default function MonthlyRoster() {


    // -----------------------------------
    // STATES
    // -----------------------------------
    const [roster, setRoster] = useState([]);

    const [loading, setLoading] = useState(false);

    const [department, setDepartment] = useState(

        "General Medicine"

    );


    // -----------------------------------
    // DEPARTMENTS
    // -----------------------------------
    const departments = [

    "General Medicine",

    "General Surgery",

    "Pediatrics",

    "OBG",

    "Orthopedics",

    "Psychiatry",

    "Dermatology",

    "Dentistry",

    "ENT",

    "Radiology",

    "Emergency & Trauma Care",

    "Ophthalmology"

];


    // -----------------------------------
    // INITIAL LOAD
    // -----------------------------------
    useEffect(() => {

        loadRoster();

    }, [department]);


    // -----------------------------------
    // LOAD ROSTER
    // -----------------------------------
    const loadRoster = async () => {

        try {

            setLoading(true);

            console.log(

                "Fetching:",

                department

            );

            const response = await fetchRoster(

                department

            );

            console.log(

                "Roster response:",

                response

            );

            setRoster(

                response || []

            );

            setLoading(false);

        }

        catch(error){

            console.error(

                "FETCH ERROR:",

                error

            );

            setLoading(false);

        }

    };


    // -----------------------------------
    // GENERATE ALL DEPARTMENTS
    // -----------------------------------
    const handleGenerateAll = async () => {

        try {

            setLoading(true);

            console.log(

                "Generating ALL departments..."

            );

            await generateAllRosters();

            alert(

                "All departments generated!"

            );

            await loadRoster();

            setLoading(false);

        }

        catch(error){

            console.error(error);

            alert(

                "Generation failed"

            );

            setLoading(false);

        }

    };

    // -----------------------------------
    // SHOW SCHEDULE
    // -----------------------------------
    const handleGenerate = async () => {

        try {

            setLoading(true);

            await loadRoster();

            setLoading(false);

        }

        catch (error) {

            console.error(error);

            setLoading(false);

        }

    };

    // -----------------------------------
    // GROUP BY NURSE
    // -----------------------------------
    const groupedRoster = {};

    roster.forEach((entry) => {

        if (!groupedRoster[entry.nurse_id]) {

            groupedRoster[entry.nurse_id] = {

                department: entry.department,

                shifts: {}

            };

        }

        groupedRoster[entry.nurse_id]

            .shifts[entry.date] = entry.shift;

    });


    // -----------------------------------
    // SHIFT COLORS
    // -----------------------------------
    const getShiftStyle = (shift) => {

        switch (shift) {

            case "M":

                return {

                    background: '#dbeafe',

                    color: '#1d4ed8'

                };

            case "E":

                return {

                    background: '#ffedd5',

                    color: '#ea580c'

                };

            case "N":

                return {

                    background: '#1e293b',

                    color: 'white'

                };

            case "G":

                return {

                    background: '#f3f4f6',

                    color: '#111827'

                };

            case "WO":

                return {

                    background: '#dcfce7',

                    color: '#15803d'

                };

            case "NO":

                return {

                    background: '#e5e7eb',

                    color: '#374151'

                };

            default:

                return {

                    background: 'white',

                    color: '#111827'

                };

        }

    };


    // -----------------------------------
    // LEGEND CARD
    // -----------------------------------
    const legendCard = (

        title,

        shift,

        timing,

        style

    ) => (

        <div className="col-md-2">

            <div

                className="card border-0 shadow-sm"

                style={{

                    borderRadius: '18px'

                }}

            >

                <div className="card-body">

                    <small className="text-muted">

                        {title}

                    </small>

                    <div className="d-flex justify-content-between align-items-center mt-2">

                        <h3

                            style={{

                                fontWeight: '700',

                                ...style

                            }}

                        >

                            {shift}

                        </h3>

                        <span className="text-muted small">

                            {timing}

                        </span>

                    </div>

                </div>

            </div>

        </div>

    );


    return (

        <div

            className="container-fluid p-4"

            style={{

                overflowX: 'hidden',

                width: '100%',

                maxWidth: '100vw'

            }}

        >


            {/* ----------------------------------- */}
            {/* HEADER */}
            {/* ----------------------------------- */}

            <div className="d-flex justify-content-between align-items-center mb-4">

                <div>

                    <h1

                        style={{

                            color: '#1e3050',

                            fontWeight: '700'

                        }}

                    >

                        Monthly Nurse Roster

                    </h1>

                    <p className="text-muted">

                        Department-wise nurse scheduling

                    </p>

                </div>

            </div>


            {/* ----------------------------------- */}
            {/* CONTROLS */}
            {/* ----------------------------------- */}

            <div className="card border-0 shadow-sm mb-4">

                <div className="card-body">

                    <div className="row align-items-end">


                        {/* DEPARTMENT */}

                        <div className="row mb-4">

                        {/* Generate All */}

                        <div className="col-md-12 mb-3">

                            <button

                                className="btn btn-success"

                                onClick={handleGenerateAll}

                            >

                                Generate Roster

                            </button>

                        </div>

                        {/* Department */}

                        <div className="col-md-8">

                            <label className="form-label">

                                Department

                            </label>

                            <select

                                className="form-select"

                                value={department}

                                onChange={(e)=>

                                    setDepartment(

                                        e.target.value

                                    )

                                }

                            >

                                {

                                    departments.map(

                                        dept => (

                                            <option

                                                key={dept}

                                                value={dept}

                                            >

                                                {dept}

                                            </option>

                                        )

                                    )

                                }

                            </select>

                        </div>

                        {/* Show Schedule */}

                        <div className="col-md-4 d-flex align-items-end">

                            <button

                                className="btn btn-primary w-100"

                                onClick={handleGenerate}

                            >

                                Show Schedule

                            </button>

                        </div>

                    </div>

                    </div>

                </div>

            </div>


            {/* ----------------------------------- */}
            {/* LEGENDS */}
            {/* ----------------------------------- */}

            <div className="row g-3 mb-4">

                {

                    legendCard(

                        "Morning",

                        "M",

                        "08:00 - 14:00",

                        {

                            color: '#1d4ed8'

                        }

                    )

                }

                {

                    legendCard(

                        "Evening",

                        "E",

                        "14:00 - 20:00",

                        {

                            color: '#ea580c'

                        }

                    )

                }

                {

                    legendCard(

                        "Night",

                        "N",

                        "20:00 - 08:00",

                        {

                            color: '#1e293b'

                        }

                    )

                }

                {

                    legendCard(

                        "General",

                        "G",

                        "09:00 - 17:00",

                        {

                            color: '#111827'

                        }

                    )

                }

                {

                    legendCard(

                        "Week Off",

                        "WO",

                        "Off Day",

                        {

                            color: '#15803d'

                        }

                    )

                }

            </div>


            {/* ----------------------------------- */}
            {/* ROSTER TABLE */}
            {/* ----------------------------------- */}

            <div

                className="card border-0 shadow-sm"

                style={{

                    borderRadius: '20px'

                }}

            >

                <div className="card-body p-0">


                    <div

                        style={{

                            overflowX: 'auto',

                            overflowY: 'hidden',

                            width: '100%',

                            maxWidth: '100%'

                        }}

                    >

                        <table

                            className="table align-middle mb-0"

                            style={{

                                minWidth: '1600px',

                                whiteSpace: 'nowrap',

                                tableLayout: 'nowrap'

                            }}

                        >

                            <thead>

                                <tr>

                                    <th

                                        style={{

                                            minWidth: '320px',

                                            position: 'sticky',

                                            left: 0,

                                            background: 'white',

                                            zIndex: 5

                                        }}

                                    >

                                        Nurse ID

                                    </th>

                                    {

                                        Array.from(

                                            {

                                                length: 30

                                            },

                                            (_, i) => (

                                                <th

                                                    key={i}

                                                    className="text-center"

                                                >

                                                    {i + 1}

                                                </th>

                                            )

                                        )

                                    }

                                </tr>

                            </thead>


                            <tbody>

                                {

                                    Object.entries(

                                        groupedRoster

                                    ).map(

                                        ([nurseId, nurse]) => (

                                            <tr key={nurseId}>


                                                {/* NURSE */}

                                                <td

                                                    style={{

                                                        position: 'sticky',

                                                        left: 0,

                                                        background: 'white',

                                                        zIndex: 4,

                                                        minWidth: '320px',

                                                        boxShadow: '4px 0 8px rgba(0,0,0,0.04)'

                                                    }}

                                                >

                                                    <div className="d-flex align-items-center">

                                                        <div

                                                            className="rounded-circle d-flex align-items-center justify-content-center me-3"

                                                            style={{

                                                                width: '40px',

                                                                height: '40px',

                                                                background: '#e0e7ff',

                                                                color: '#1e3a8a',

                                                                fontWeight: '700'

                                                            }}

                                                        >

                                                            {

                                                                nurseId.slice(

                                                                    -2

                                                                )

                                                            }

                                                        </div>

                                                        <div

                                                            style={{

                                                                lineHeight: '1.2'

                                                            }}

                                                        >

                                                            <div

                                                                style={{

                                                                    fontWeight: '700'

                                                                }}

                                                            >

                                                                {nurseId}

                                                            </div>

                                                            <small className="text-muted">

                                                                {

                                                                    nurse.department

                                                                }

                                                            </small>

                                                        </div>

                                                    </div>

                                                </td>


                                                {/* SHIFTS */}

                                                {

                                                    Array.from(

                                                        {

                                                            length: 30

                                                        },

                                                        (_, i) => {

                                                            const shift =

                                                                nurse.shifts[i + 1]

                                                                || "-";


                                                            return (

                                                                <td

                                                                    key={i}

                                                                    className="text-center"

                                                                >

                                                                    <div

                                                                        style={{

                                                                            width: '38px',

                                                                            height: '38px',

                                                                            borderRadius: '12px',

                                                                            display: 'flex',

                                                                            alignItems: 'center',

                                                                            justifyContent: 'center',

                                                                            margin: 'auto',

                                                                            fontWeight: '700',

                                                                            fontSize: '14px',

                                                                            ...getShiftStyle(

                                                                                shift

                                                                            )

                                                                        }}

                                                                    >

                                                                        {

                                                                            shift

                                                                        }

                                                                    </div>

                                                                </td>

                                                            );

                                                        }

                                                    )

                                                }

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