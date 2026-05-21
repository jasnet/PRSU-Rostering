import React from 'react';

export default function DoctorDashboard() {

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

                    Doctor Dashboard

                </h1>

                <p className="text-muted">

                    Consultant activity overview

                </p>

            </div>


            {/* SUMMARY CARDS */}

            <div className="row g-4">


                {/* TODAY */}

                <div className="col-md-3">

                    <div className="card border-0 shadow-sm h-100">

                        <div className="card-body">

                            <p className="text-muted">

                                Today's Duty

                            </p>

                            <h3

                                style={{

                                    color: '#2563eb',

                                    fontWeight: '700'

                                }}

                            >

                                OPD

                            </h3>

                            <small>

                                09:00 AM - 04:30 PM

                            </small>

                        </div>

                    </div>

                </div>


                {/* NEXT OT */}

                <div className="col-md-3">

                    <div className="card border-0 shadow-sm h-100">

                        <div className="card-body">

                            <p className="text-muted">

                                Next OT

                            </p>

                            <h3

                                style={{

                                    color: '#dc2626',

                                    fontWeight: '700'

                                }}

                            >

                                Wednesday

                            </h3>

                            <small>

                                Operation Theatre

                            </small>

                        </div>

                    </div>

                </div>


                {/* UPCOMING OPD */}

                <div className="col-md-3">

                    <div className="card border-0 shadow-sm h-100">

                        <div className="card-body">

                            <p className="text-muted">

                                Upcoming OPD

                            </p>

                            <h3

                                style={{

                                    color: '#2563eb',

                                    fontWeight: '700'

                                }}

                            >

                                Thursday

                            </h3>

                            <small>

                                Outpatient Department

                            </small>

                        </div>

                    </div>

                </div>


                {/* CLASS */}

                <div className="col-md-3">

                    <div className="card border-0 shadow-sm h-100">

                        <div className="card-body">

                            <p className="text-muted">

                                Today's Class

                            </p>

                            <h3

                                style={{

                                    color: '#7c3aed',

                                    fontWeight: '700'

                                }}

                            >

                                11:00 AM

                            </h3>

                            <small>

                                Academic Session

                            </small>

                        </div>

                    </div>

                </div>

            </div>


            {/* UPCOMING ACTIVITIES */}

            <div className="card border-0 shadow-sm mt-4">

                <div className="card-body">

                    <h5

                        style={{

                            fontWeight: '700',

                            color: '#1e3050'

                        }}

                    >

                        Upcoming Activities

                    </h5>


                    <div className="mt-3 d-flex flex-column gap-3">


                        {/* ITEM */}

                        <div

                            className="d-flex justify-content-between align-items-center p-3 rounded"

                            style={{

                                background: '#f9fafb'

                            }}

                        >

                            <div>

                                <h6

                                    style={{

                                        marginBottom: '4px',

                                        fontWeight: '700'

                                    }}

                                >

                                    Tomorrow

                                </h6>

                                <small className="text-muted">

                                    OPD Consultation

                                </small>

                            </div>


                            <div

                                className="px-3 py-2 rounded"

                                style={{

                                    background: '#dbeafe',

                                    color: '#1d4ed8',

                                    fontWeight: '700'

                                }}

                            >

                                OPD

                            </div>

                        </div>


                        {/* ITEM */}

                        <div

                            className="d-flex justify-content-between align-items-center p-3 rounded"

                            style={{

                                background: '#f9fafb'

                            }}

                        >

                            <div>

                                <h6

                                    style={{

                                        marginBottom: '4px',

                                        fontWeight: '700'

                                    }}

                                >

                                    Friday

                                </h6>

                                <small className="text-muted">

                                    Operation Theatre

                                </small>

                            </div>


                            <div

                                className="px-3 py-2 rounded"

                                style={{

                                    background: '#fee2e2',

                                    color: '#dc2626',

                                    fontWeight: '700'

                                }}

                            >

                                OT

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    );

}