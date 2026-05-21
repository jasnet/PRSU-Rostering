import React, {

    useEffect,

    useState

} from 'react';

import {

    fetchDoctorRoster

} from '../../api/dashboardApi';


export default function MySchedule() {


    // -----------------------------------
    // USER
    // -----------------------------------
    const user = JSON.parse(

        sessionStorage.getItem("user")

    );

    const doctorId = user?.doctor_id;


    // -----------------------------------
    // STATES
    // -----------------------------------
    const [schedule, setSchedule] = useState([]);

    const [doctor, setDoctor] = useState(null);


    // -----------------------------------
    // LOAD
    // -----------------------------------
    useEffect(() => {

        loadSchedule();

    }, []);


    // -----------------------------------
    // FETCH
    // -----------------------------------
    const loadSchedule = async () => {

        try {

            const data = await fetchDoctorRoster(

                doctorId

            );

            setDoctor(data);

            setSchedule(

                data?.schedule || []

            );

        }

        catch (error) {

            console.error(error);

        }

    };


    // -----------------------------------
    // STYLE
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

        <div className="container-fluid p-4">


            {/* HEADER */}

            <div className="mb-4">

                <h2

                    style={{

                        fontWeight: '700',

                        color: '#1e3050'

                    }}

                >

                    My Weekly Schedule

                </h2>

                <p className="text-muted">

                    Consultant duty overview

                </p>

            </div>


            {/* SUMMARY */}

            <div className="row g-4 mb-4">


                <div className="col-md-4">

                    <div className="card border-0 shadow-sm">

                        <div className="card-body">

                            <p className="text-muted">

                                Department

                            </p>

                            <h4>

                                {

                                    doctor?.department

                                }

                            </h4>

                        </div>

                    </div>

                </div>


                <div className="col-md-4">

                    <div className="card border-0 shadow-sm">

                        <div className="card-body">

                            <p className="text-muted">

                                Next OT

                            </p>

                            <h4>

                                Tuesday

                            </h4>

                        </div>

                    </div>

                </div>


                <div className="col-md-4">

                    <div className="card border-0 shadow-sm">

                        <div className="card-body">

                            <p className="text-muted">

                                Upcoming OPD

                            </p>

                            <h4>

                                Thursday

                            </h4>

                        </div>

                    </div>

                </div>

            </div>


            {/* WEEKLY GRID */}

            <div className="row g-4">

                {

                    schedule.map((slot, index) => (

                        <div

                            className="col-md-3"

                            key={index}

                        >

                            <div className="card border-0 shadow-sm h-100">

                                <div className="card-body">


                                    <h5

                                        style={{

                                            fontWeight: '700',

                                            marginBottom: '20px'

                                        }}

                                    >

                                        <div>

                                        <div>

                                            {

                                                slot.day

                                            }

                                        </div>

                                        <small

                                            style={{

                                                color: '#6b7280',

                                                fontSize: '12px'

                                            }}

                                        >

                                            {

                                                slot.fullDate

                                            }

                                        </small>

                                    </div>

                                    </h5>


                                    <div

                                        className="px-3 py-2 rounded text-center"

                                        style={{

                                            fontWeight: '700',

                                            ...getDutyStyle(

                                                slot.dutyType

                                            )

                                        }}

                                    >

                                        {

                                            slot.dutyType

                                        }

                                    </div>


                                    {

                                        slot.classSchedule && (

                                            <div

                                                className="mt-3"

                                                style={{

                                                    fontSize: '13px',

                                                    color: '#7c3aed',

                                                    fontWeight: '700'

                                                }}

                                            >

                                                CLASS:
                                                {

                                                    slot.classSchedule

                                                }

                                            </div>

                                        )

                                    }


                                    <div className="mt-3">

                                        <small className="text-muted">

                                            {

                                                slot.startTime

                                            }

                                            {" - "}
                                            {

                                                slot.endTime

                                            }

                                        </small>

                                    </div>

                                </div>

                            </div>

                        </div>

                    ))

                }

            </div>

        </div>

    );

}