import React, { useEffect, useState } from 'react'
import UserContext from '../context/User/UserContext';
import { useContext } from 'react';

export default function Profile() {

    // const userContext = useContext(UserContext);

    // const {userData} = userContext;

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


    return (
        <div className="bg-light pb-5" style={{ minHeight: "calc(100vh - 70px)" }}>
            <div className="container pt-5">
                <div className="row mb-4">
                    <div className="col-12">
                        <p className="text-warning fw-bold small mb-1 tracking-wider">EMPLOYEE PORTAL</p>
                        <h1 className="fw-bolder text-navy mb-3 display-5" style={{ color: "#1e3050", fontWeight: "800" }}>Your Profile</h1>
                    </div>
                </div>

                <div className="card shadow-sm border-0 rounded-4 overflow-hidden mb-4">
                    <div className="row g-0">
                        <div className="col-md-4 text-center text-white d-flex flex-column align-items-center justify-content-center p-5" style={{ backgroundColor: '#1e3050' }}>
                            <div className="rounded-circle overflow-hidden border border-4 border-white mb-4 shadow" style={{ width: '120px', height: '120px' }}>
                                <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp" alt="Avatar" className="w-100 h-100 object-fit-cover" />
                            </div>
                            <h3 className="fw-bold mb-1">{userData?.e_name || "Unregistered User"}</h3>
                            <p className="text-orange fw-bold tracking-wider small mb-0">{userData?.e_type || "GUEST"} </p>
                        </div>
                        
                        <div className="col-md-8">
                            <div className="card-body p-4 p-md-5">
                                <h4 className='fw-bold text-navy mb-4'>Professional Information</h4>
                                
                                <div className="row g-4 mb-4">
                                    <div className="col-sm-6">
                                        <p className="small text-secondary fw-bold mb-1 tracking-wider">EMAIL ADDRESS</p>
                                        <p className="text-navy fw-bold mb-0">info@pesuhospital.com</p>
                                    </div>
                                    <div className="col-sm-6">
                                        <p className="small text-secondary fw-bold mb-1 tracking-wider">EMPLOYEE ID</p>
                                        <p className="text-navy fw-bold mb-0 text-uppercase">{userData?.e_id || "N/A"}</p>
                                    </div>
                                    <div className="col-sm-6">
                                        <p className="small text-secondary fw-bold mb-1 tracking-wider">PRIMARY SPECIALIZATION</p>
                                        <span className="badge bg-blue-soft text-navy px-3 py-2 rounded-pill fs-6">{userData?.primary_specialization || "None"}</span>
                                    </div>
                                    <div className="col-sm-6">
                                        <p className="small text-secondary fw-bold mb-1 tracking-wider">SECONDARY SPECIALIZATION</p>
                                        <span className="badge bg-orange-soft text-orange px-3 py-2 rounded-pill fs-6">{userData?.secondary_specialization || "None"}</span>
                                    </div>
                                    <div className="col-sm-6">
                                        <p className="small text-secondary fw-bold mb-1 tracking-wider">LOCATION PORTAL</p>
                                        <p className="text-navy fw-bold mb-0">{userData?.location || "Central Wing"}</p>
                                    </div>
                                </div>

                                <hr className="text-muted opacity-25 my-4" />

                                <h4 className='fw-bold text-navy mb-4'>Quick Actions</h4>
                                <div className="d-flex flex-wrap gap-3">
                                    <button className="btn rounded-pill px-4 fw-bold shadow-sm" style={{ backgroundColor: '#e6ebf5', color: '#1e3050' }}>
                                        <i className="far fa-calendar-alt me-2 text-orange"></i> View Schedule
                                    </button>
                                    <button className="btn rounded-pill px-4 fw-bold shadow-sm" style={{ backgroundColor: '#e6ebf5', color: '#1e3050' }}>
                                        <i className="fas fa-file-medical me-2 text-orange"></i> Leave Request
                                    </button>
                                    <button className="btn rounded-pill px-4 fw-bold shadow-sm" style={{ backgroundColor: '#fcece3', color: '#f47b2c' }}>
                                        <i className="fas fa-headset me-2"></i> Contact IT Support
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
