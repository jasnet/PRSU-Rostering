import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '../index.css'
import { useEffect } from 'react';

function LeaveRequest() {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [reason, setReason] = useState('');
    const [submittedDates, setSubmittedDates] = useState([]);


    const [userData, setUserData] = useState({
        "e_id": "", "e_name": "", "e_type": "", "location": "", "password": "",
        "primary_specialization": "", "secondary_specialization": ""
    });

    useEffect(() => {
        const userStr = sessionStorage.getItem('user');
        if (userStr) {
            try {
                const user = JSON.parse(userStr);
                if (user) setUserData(user);
            } catch (err) {
                console.error("Error parsing user data:", err);
            }
        }
    }, [])

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        const data = {
            e_id: userData?.e_id || "",
            date: selectedDate ? selectedDate.toDateString() : "",
            reason: reason
        }

        try {
            const response = await fetch("http://localhost:8000/send-leave",
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*',
                    },
                    body: JSON.stringify(data)
                });

            const json = await response.json();

            if (json) {
                console.log(json);
                alert("Leave request has been sent");
            }

        } catch (error) {
            alert(error);
        }

    };

    const handleTileClick = (value, event) => {

        console.log(value);
        setSelectedDate(value);
    };

    const tileClassName = ({ date, view }) => {
        if (submittedDates.find((d) => d.toDateString() === date.toDateString())) {
            return 'submitted';
        }
        return null;
    };

    const onReasonChange = (event) => {
        const { value } = event.target
        setReason(value);
    }

    return (
        <div className="bg-light pb-5" style={{ minHeight: "calc(100vh - 70px)" }}>
            <div className="container pt-5">
                
                <div className="row mb-4">
                    <div className="col-12">
                        <p className="text-warning fw-bold small mb-1 tracking-wider">EMPLOYEE PORTAL</p>
                        <h1 className="fw-bolder text-navy mb-3 display-5" style={{ color: "#1e3050", fontWeight: "800" }}>Leave Requests</h1>
                        <p className="text-secondary fs-5" style={{ maxWidth: "700px" }}>
                            Manage your time off. You currently have <span className="fw-bold text-orange">3 leaves</span> remaining for this month.
                        </p>
                    </div>
                </div>

                <div className="card shadow-sm border-0 rounded-4 mt-4">
                    <div className="card-body p-4 p-md-5">
                        <div className="row">
                            <div className="col-md-5 mb-5 mb-md-0 d-flex flex-column align-items-center align-items-md-start">
                                <h5 className='fw-bold text-navy mb-4'><i className="far fa-calendar-alt text-orange me-2"></i> Select Date</h5>
                                <div className="border p-2 rounded-4 shadow-sm bg-white">
                                    <Calendar
                                        onChange={setSelectedDate}
                                        value={selectedDate}
                                        tileClassName={tileClassName}
                                        onClickDay={handleTileClick}
                                        className="border-0"
                                    />
                                </div>
                            </div>

                            <div className="col-md-7 px-md-5">
                                <div className="bg-blue-soft p-4 rounded-4 mb-4">
                                    <div className='row'>
                                        <div className="col-md-6 mb-3 mb-md-0">
                                            <p className="small text-secondary fw-bold mb-1 tracking-wider">NAME</p>
                                            <h5 className="text-navy fw-bold mb-0">{userData?.e_name || "Guest Employee"}</h5>
                                        </div>
                                        <div className="col-md-6">
                                            <p className="small text-secondary fw-bold mb-1 tracking-wider">EMPLOYEE ID</p>
                                            <h5 className="text-navy fw-bold mb-0">{userData?.e_id || "Unregistered"}</h5>
                                        </div>
                                    </div>
                                </div>

                                <div className="mb-4">
                                    <p className="small text-secondary fw-bold mb-2 tracking-wider">SELECTED DATE</p>
                                    <div className="d-inline-block px-4 py-2 rounded-pill bg-orange-soft text-orange fw-bold">
                                        <i className="far fa-calendar-check me-2"></i>
                                        {selectedDate.toDateString()}
                                    </div>
                                </div>

                                <div className="mb-4">
                                    <p className="small text-secondary fw-bold mb-2 tracking-wider">REASON FOR LEAVE</p>
                                    <textarea 
                                        className="form-control bg-light border-0 px-3 py-3" 
                                        rows="4" 
                                        placeholder='Please provide a brief reason for your absence...' 
                                        style={{ resize: "none", borderRadius: '12px' }} 
                                        onChange={onReasonChange} 
                                        value={reason}>
                                    </textarea>
                                </div>

                                <button 
                                    className="btn text-white fw-bold py-3 px-5 rounded-pill shadow-sm transition-all hover-translate-y w-100 w-md-auto" 
                                    onClick={handleFormSubmit}
                                    style={{ backgroundColor: '#f47b2c' }}>
                                    Submit Request <i className="fas fa-paper-plane ms-2"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );

}

export default LeaveRequest;
