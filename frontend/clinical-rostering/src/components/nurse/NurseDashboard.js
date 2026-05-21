import React from 'react';

export default function NurseDashboard() {

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

                    Nurse Dashboard

                </h1>

                <p className="text-muted">

                    Personal scheduling overview

                </p>

            </div>


            {/* SUMMARY CARDS */}

            <div className="row g-4">


                {/* TODAY SHIFT */}

                <div className="col-md-3">

                    <div className="card border-0 shadow-sm h-100">

                        <div className="card-body">

                            <p className="text-muted">

                                Today's Shift

                            </p>

                            <h3

                                style={{

                                    color: '#2563eb',

                                    fontWeight: '700'

                                }}

                            >

                                Morning

                            </h3>

                            <small>

                                08:00 AM - 02:00 PM

                            </small>

                        </div>

                    </div>

                </div>


                {/* NEXT OFF */}

                <div className="col-md-3">

                    <div className="card border-0 shadow-sm h-100">

                        <div className="card-body">

                            <p className="text-muted">

                                Next Week Off

                            </p>

                            <h3

                                style={{

                                    color: '#16a34a',

                                    fontWeight: '700'

                                }}

                            >

                                Day 14

                            </h3>

                            <small>

                                Scheduled Off Day

                            </small>

                        </div>

                    </div>

                </div>


                {/* WORKING DAYS */}

                <div className="col-md-3">

                    <div className="card border-0 shadow-sm h-100">

                        <div className="card-body">

                            <p className="text-muted">

                                Working Days

                            </p>

                            <h3

                                style={{

                                    color: '#ea580c',

                                    fontWeight: '700'

                                }}

                            >

                                24

                            </h3>

                            <small>

                                This Month

                            </small>

                        </div>

                    </div>

                </div>


                {/* DEPARTMENT */}

                <div className="col-md-3">

                    <div className="card border-0 shadow-sm h-100">

                        <div className="card-body">

                            <p className="text-muted">

                                Department

                            </p>

                            <h3

                                style={{

                                    color: '#7c3aed',

                                    fontWeight: '700'

                                }}

                            >

                                General Medicine

                            </h3>

                            <small>

                                Assigned Unit

                            </small>

                        </div>

                    </div>

                </div>

            </div>


            {/* UPCOMING DUTY */}

            <div className="card border-0 shadow-sm mt-4">

                <div className="card-body">

                    <h5

                        style={{

                            fontWeight: '700',

                            color: '#1e3050'

                        }}

                    >

                        Upcoming Duty

                    </h5>


                    <div className="mt-3">

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

                                    Evening Shift

                                </small>

                            </div>


                            <div

                                className="px-3 py-2 rounded"

                                style={{

                                    background: '#fef3c7',

                                    color: '#d97706',

                                    fontWeight: '700'

                                }}

                            >

                                E

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    );

}