import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import UserContext from '../context/User/UserContext';

export default function Home() {


    const [formValues, setFormValues] = useState({ "e_id": "", "password": "" });
    let navigate = useNavigate();

    const userContext = useContext(UserContext);
    const {handleSetUserData} = userContext;

    const handleLoginValueChange = (event) => {
        const { name, value } = event.target;
        setFormValues({ ...formValues, [name]: value });
    }


    const handleLoginSubmit = async (event) => {


        try {
            const response = await fetch("http://localhost:8000/login-user",
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*',
                    },
                    body: JSON.stringify(formValues)
                });

            const json = await response.json();

            if (json) {

                handleSetUserData("Fuck");
                sessionStorage.setItem('user', JSON.stringify(json['Employee'][0]));
                
                navigate("/schedule", { state: json });
                // window.location.reload();

            }

        } catch(error) {
            alert(error);
        }

    }

    return (
            <div className="bg-light d-flex align-items-center" style={{ minHeight: "calc(100vh - 70px)" }}>
                <div className="container">
                    <div className="row g-5 align-items-center">

                        <div className="col-lg-6 mb-5 mb-lg-0">
                            <span className="badge bg-orange-soft text-orange px-3 py-2 rounded-pill fs-6 mb-3 tracking-wider">WELCOME BACK</span>
                            <h1 className='display-3 fw-bolder mb-4' style={{ color: '#1e3050', letterSpacing: '-1px' }}>PESU Rostering System</h1>
                            <p className="fs-4 text-secondary mb-5" style={{ maxWidth: "500px", lineHeight: "1.6" }}>
                                A scalable and brilliant approach to managing your entire clinical team schedule and patient operations.
                            </p>
                            
                            <div className="d-flex gap-4">
                                <div className="d-flex align-items-center gap-3">
                                    <div className="rounded-circle bg-white shadow-sm d-flex justify-content-center align-items-center" style={{ width: '50px', height: '50px' }}>
                                        <i className="fas fa-user-md text-orange fs-4"></i>
                                    </div>
                                    <span className="fw-bold text-navy">Smart Staffing</span>
                                </div>
                                <div className="d-flex align-items-center gap-3">
                                    <div className="rounded-circle bg-white shadow-sm d-flex justify-content-center align-items-center" style={{ width: '50px', height: '50px' }}>
                                        <i className="fas fa-clock text-orange fs-4"></i>
                                    </div>
                                    <span className="fw-bold text-navy">24/7 Rosters</span>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-5 ms-auto">
                            {sessionStorage.getItem('user') ? (
                                <div className="card shadow-lg border-0 rounded-4 overflow-hidden" style={{ backgroundColor: '#1e3050' }}>
                                    <div className="card-body p-5">
                                        <span className="badge bg-orange px-3 py-2 rounded-pill mb-3">SYSTEM ACTIVE</span>
                                        <h3 className="fw-bold text-white mb-4">Dashboard Overview</h3>
                                        
                                        <div className="d-flex flex-column gap-3">
                                            <div className="bg-white bg-opacity-10 rounded-3 p-3 d-flex justify-content-between align-items-center">
                                                <div className="d-flex gap-3 align-items-center">
                                                    <i className="fas fa-user-md text-orange fs-4"></i>
                                                    <div>
                                                        <h6 className="text-white mb-0 fw-bold">Active Staff</h6>
                                                        <p className="text-white opacity-50 small mb-0">Currently on premises</p>
                                                    </div>
                                                </div>
                                                <h4 className="fw-bold text-white mb-0">124</h4>
                                            </div>
                                            
                                            <div className="bg-white bg-opacity-10 rounded-3 p-3 d-flex justify-content-between align-items-center">
                                                <div className="d-flex gap-3 align-items-center">
                                                    <i className="fas fa-procedures text-orange fs-4"></i>
                                                    <div>
                                                        <h6 className="text-white mb-0 fw-bold">Bed Capacity</h6>
                                                        <p className="text-white opacity-50 small mb-0">Total utilization</p>
                                                    </div>
                                                </div>
                                                <h4 className="fw-bold text-white mb-0">87%</h4>
                                            </div>
                                        </div>
                                        
                                        <div className="mt-4 pt-4 border-top border-secondary">
                                            <button className="btn w-100 text-white fw-bold py-3" style={{ backgroundColor: '#f47b2c', borderRadius: '12px' }} onClick={() => navigate('/schedule')}>
                                                View My Schedule <i className="fas fa-arrow-right ms-2"></i>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="card shadow-lg border-0 rounded-4 overflow-hidden">
                                    <div className="card-header bg-white border-bottom-0 pt-5 pb-0 px-5">
                                        <h2 className="fw-bold mb-1" style={{ color: '#1e3050' }}>Secure Login</h2>
                                        <p className="text-secondary small tracking-wider text-uppercase">Authorized Personnel Only</p>
                                    </div>
                                    <div className="card-body p-5 pt-4">
                                        <form>
                                            <div className="mb-4">
                                                <label className="form-label text-navy fw-bold small">EMPLOYEE ID</label>
                                                <input type="text" id="form2Example18" className="form-control form-control-lg bg-light border-0 px-4" placeholder='e.g., Emp_01' value={formValues.e_id} name='e_id' onChange={handleLoginValueChange} style={{ borderRadius: '12px' }} />
                                            </div>

                                            <div className="mb-5">
                                                <label className="form-label text-navy fw-bold small d-flex justify-content-between">
                                                    <span>PASSWORD</span>
                                                    <a href="#!" className="text-orange text-decoration-none" onClick={(e) => { e.preventDefault(); alert("Please contact your system administrator to reset your password."); }}>Forgot?</a>
                                                </label>
                                                <input type="password" id="form2Example28" className="form-control form-control-lg bg-light border-0 px-4" placeholder='••••••••' value={formValues.password} name='password' onChange={handleLoginValueChange} style={{ borderRadius: '12px' }} />
                                            </div>

                                            <button className="btn w-100 btn-lg text-white mb-4 fw-bold shadow-sm transition-all hover-translate-y" type="button" onClick={handleLoginSubmit} style={{ backgroundColor: '#f47b2c', borderRadius: '12px' }}>
                                                Log In securely <i className="fas fa-arrow-right ms-2"></i>
                                            </button>

                                            <div className="text-center">
                                                <p className="text-secondary small mb-0">Don't have an account? <a href="#!" className="text-navy fw-bold text-decoration-none" onClick={(e) => { e.preventDefault(); navigate('/register'); }}>Register here</a></p>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            )}
                        </div>

                    </div>
                </div>
            </div>
        )
    }
