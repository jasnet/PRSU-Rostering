import React, {

    useEffect,

    useState

} from 'react';

import {

    fetchMyNurseRoster

} from '../../api/dashboardApi';


export default function MyRoster() {


    // -----------------------------------
    // USER
    // -----------------------------------
    const user = JSON.parse(

        sessionStorage.getItem("user")

    );

    const nurseId = user?.nurse_id;


    // -----------------------------------
    // STATES
    // -----------------------------------
    const [roster, setRoster] = useState([]);

    const [loading, setLoading] = useState(false);


    // -----------------------------------
    // LOAD
    // -----------------------------------
    useEffect(() => {

        loadRoster();

    }, []);


    // -----------------------------------
    // FETCH ROSTER
    // -----------------------------------
    const loadRoster = async () => {

        try {

            setLoading(true);

            const data = await fetchMyNurseRoster(

                nurseId

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

                    background: '#fef3c7',

                    color: '#d97706'

                };

            case "N":

                return {

                    background: '#fee2e2',

                    color: '#dc2626'

                };

            case "G":

                return {

                    background: '#dcfce7',

                    color: '#15803d'

                };

            case "WO":

                return {

                    background: '#f3f4f6',

                    color: '#6b7280'

                };

            case "NO":

                return {

                    background: '#ede9fe',

                    color: '#7c3aed'

                };

            case "L":

                return {

                    background: '#fecaca',

                    color: '#991b1b'

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

                    My Monthly Roster

                </h2>

                <p className="text-muted">

                    Personal duty schedule

                </p>

            </div>


            {/* LOADING */}

            {

                loading && (

                    <div className="alert alert-info">

                        Loading roster...

                    </div>

                )

            }


            <div className="card border-0 shadow-sm">

    <div className="card-body">


        <div

            style={{

                display: 'grid',

                gridTemplateColumns:

                    'repeat(7, 1fr)',

                gap: '16px'

            }}

        >

            {

                roster.map((item, index) => (

                    <div

                        key={index}

                        className="p-3 rounded"

                        style={{

                            border: '1px solid #e5e7eb',

                            minHeight: '120px',

                            background: '#fff'

                        }}

                    >

                        {/* DAY */}

                        <div

                            style={{

                                fontWeight: '700',

                                marginBottom: '12px',

                                color: '#1e3050'

                            }}

                        >

                            <div>

                            <div>

                                {

                                    item.fullDate

                                }

                            </div>

                            <small

                                style={{

                                    color: '#6b7280'

                                }}

                            >

                                {

                                    item.weekday

                                }

                            </small>

                        </div>

                        </div>


                        {/* SHIFT */}

                        <div

                            className="px-3 py-2 rounded text-center"

                            style={{

                                fontWeight: '700',

                                ...getShiftStyle(

                                    item.shift

                                )

                            }}

                        >

                            {

                                item.shift

                            }

                        </div>


                        {/* STATUS */}

                        <div

                            className="mt-3"

                            style={{

                                fontSize: '13px',

                                color: '#6b7280'

                            }}

                        >

                            {

                                item.status

                            }

                        </div>

                    </div>

                ))

            }

        </div>

    </div>

</div>
</div>


    );

}