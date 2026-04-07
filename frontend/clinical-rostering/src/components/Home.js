import React from 'react'
import { useNavigate } from 'react-router-dom';

export default function Home() {

    let navigate = useNavigate();
    const user = JSON.parse(sessionStorage.getItem('user') || '{}');

    return (
        <div className="bg-light" style={{ minHeight: "calc(100vh - 70px)" }}>
            <div className="container py-5">

                {/* Welcome Banner */}
                <div className="row mb-5">
                    <div className="col-12">
                        <div className="card border-0 rounded-4 overflow-hidden shadow-sm" style={{ background: 'linear-gradient(135deg, #1e3050 0%, #2a4270 100%)' }}>
                            <div className="card-body p-5">
                                <div className="row align-items-center">
                                    <div className="col-lg-8">
                                        <span className="badge bg-orange-soft text-orange px-3 py-2 rounded-pill fs-6 mb-3" style={{ backgroundColor: 'rgba(244,123,44,0.2)', color: '#f47b2c' }}>WELCOME BACK</span>
                                        <h1 className="display-5 fw-bolder text-white mb-3" style={{ letterSpacing: '-0.5px' }}>
                                            Hello, {user.e_name || 'User'} 👋
                                        </h1>
                                        <p className="fs-5 text-white mb-0" style={{ opacity: 0.7 }}>
                                            {user.e_type || 'Staff'} · {user.primary_specialization || 'General'} Department
                                        </p>
                                    </div>
                                    <div className="col-lg-4 text-end d-none d-lg-block">
                                        <div className="rounded-circle d-inline-flex justify-content-center align-items-center" style={{ width: '100px', height: '100px', background: 'rgba(244,123,44,0.2)' }}>
                                            <i className="fas fa-user-md text-white" style={{ fontSize: '2.5rem' }}></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="row g-4 mb-5">
                    <div className="col-lg-3 col-md-6">
                        <div className="card border-0 rounded-4 shadow-sm h-100">
                            <div className="card-body p-4">
                                <div className="d-flex align-items-center gap-3 mb-3">
                                    <div className="rounded-3 d-flex justify-content-center align-items-center" style={{ width: '48px', height: '48px', backgroundColor: 'rgba(244,123,44,0.1)' }}>
                                        <i className="fas fa-user-md" style={{ color: '#f47b2c', fontSize: '1.2rem' }}></i>
                                    </div>
                                    <div>
                                        <p className="text-secondary small mb-0">Active Staff</p>
                                        <h3 className="fw-bold mb-0" style={{ color: '#1e3050' }}>124</h3>
                                    </div>
                                </div>
                                <span className="badge rounded-pill px-2 py-1" style={{ backgroundColor: 'rgba(40,167,69,0.1)', color: '#28a745', fontSize: '0.75rem' }}>
                                    <i className="fas fa-arrow-up me-1"></i>+5% today
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-3 col-md-6">
                        <div className="card border-0 rounded-4 shadow-sm h-100">
                            <div className="card-body p-4">
                                <div className="d-flex align-items-center gap-3 mb-3">
                                    <div className="rounded-3 d-flex justify-content-center align-items-center" style={{ width: '48px', height: '48px', backgroundColor: 'rgba(30,48,80,0.1)' }}>
                                        <i className="fas fa-procedures" style={{ color: '#1e3050', fontSize: '1.2rem' }}></i>
                                    </div>
                                    <div>
                                        <p className="text-secondary small mb-0">Bed Capacity</p>
                                        <h3 className="fw-bold mb-0" style={{ color: '#1e3050' }}>87%</h3>
                                    </div>
                                </div>
                                <span className="badge rounded-pill px-2 py-1" style={{ backgroundColor: 'rgba(255,193,7,0.1)', color: '#ffc107', fontSize: '0.75rem' }}>
                                    <i className="fas fa-minus me-1"></i>Stable
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-3 col-md-6">
                        <div className="card border-0 rounded-4 shadow-sm h-100">
                            <div className="card-body p-4">
                                <div className="d-flex align-items-center gap-3 mb-3">
                                    <div className="rounded-3 d-flex justify-content-center align-items-center" style={{ width: '48px', height: '48px', backgroundColor: 'rgba(40,167,69,0.1)' }}>
                                        <i className="fas fa-calendar-check" style={{ color: '#28a745', fontSize: '1.2rem' }}></i>
                                    </div>
                                    <div>
                                        <p className="text-secondary small mb-0">Shifts Today</p>
                                        <h3 className="fw-bold mb-0" style={{ color: '#1e3050' }}>36</h3>
                                    </div>
                                </div>
                                <span className="badge rounded-pill px-2 py-1" style={{ backgroundColor: 'rgba(40,167,69,0.1)', color: '#28a745', fontSize: '0.75rem' }}>
                                    <i className="fas fa-check me-1"></i>All covered
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-3 col-md-6">
                        <div className="card border-0 rounded-4 shadow-sm h-100">
                            <div className="card-body p-4">
                                <div className="d-flex align-items-center gap-3 mb-3">
                                    <div className="rounded-3 d-flex justify-content-center align-items-center" style={{ width: '48px', height: '48px', backgroundColor: 'rgba(220,53,69,0.1)' }}>
                                        <i className="fas fa-exclamation-triangle" style={{ color: '#dc3545', fontSize: '1.2rem' }}></i>
                                    </div>
                                    <div>
                                        <p className="text-secondary small mb-0">Leave Requests</p>
                                        <h3 className="fw-bold mb-0" style={{ color: '#1e3050' }}>3</h3>
                                    </div>
                                </div>
                                <span className="badge rounded-pill px-2 py-1" style={{ backgroundColor: 'rgba(220,53,69,0.1)', color: '#dc3545', fontSize: '0.75rem' }}>
                                    <i className="fas fa-clock me-1"></i>Pending
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="row g-4">
                    <div className="col-lg-8">
                        <div className="card border-0 rounded-4 shadow-sm">
                            <div className="card-body p-4">
                                <h5 className="fw-bold mb-4" style={{ color: '#1e3050' }}>
                                    <i className="fas fa-bolt me-2" style={{ color: '#f47b2c' }}></i>Quick Actions
                                </h5>
                                <div className="row g-3">
                                    <div className="col-md-6">
                                        <button className="btn w-100 text-start p-3 rounded-3 border-0 d-flex align-items-center gap-3" style={{ backgroundColor: '#f8f9fc' }} onClick={() => navigate('/schedule')}>
                                            <div className="rounded-3 d-flex justify-content-center align-items-center" style={{ width: '42px', height: '42px', backgroundColor: 'rgba(244,123,44,0.15)' }}>
                                                <i className="fas fa-calendar-alt" style={{ color: '#f47b2c' }}></i>
                                            </div>
                                            <div>
                                                <h6 className="mb-0 fw-bold" style={{ color: '#1e3050' }}>View Schedule</h6>
                                                <small className="text-secondary">Check your shifts</small>
                                            </div>
                                        </button>
                                    </div>
                                    <div className="col-md-6">
                                        <button className="btn w-100 text-start p-3 rounded-3 border-0 d-flex align-items-center gap-3" style={{ backgroundColor: '#f8f9fc' }} onClick={() => navigate('/leave-request')}>
                                            <div className="rounded-3 d-flex justify-content-center align-items-center" style={{ width: '42px', height: '42px', backgroundColor: 'rgba(30,48,80,0.1)' }}>
                                                <i className="fas fa-paper-plane" style={{ color: '#1e3050' }}></i>
                                            </div>
                                            <div>
                                                <h6 className="mb-0 fw-bold" style={{ color: '#1e3050' }}>Request Leave</h6>
                                                <small className="text-secondary">Submit a leave request</small>
                                            </div>
                                        </button>
                                    </div>
                                    <div className="col-md-6">
                                        <button className="btn w-100 text-start p-3 rounded-3 border-0 d-flex align-items-center gap-3" style={{ backgroundColor: '#f8f9fc' }} onClick={() => navigate('/nurses')}>
                                            <div className="rounded-3 d-flex justify-content-center align-items-center" style={{ width: '42px', height: '42px', backgroundColor: 'rgba(40,167,69,0.1)' }}>
                                                <i className="fas fa-users" style={{ color: '#28a745' }}></i>
                                            </div>
                                            <div>
                                                <h6 className="mb-0 fw-bold" style={{ color: '#1e3050' }}>Nurse Roster</h6>
                                                <small className="text-secondary">View nurse schedules</small>
                                            </div>
                                        </button>
                                    </div>
                                    <div className="col-md-6">
                                        <button className="btn w-100 text-start p-3 rounded-3 border-0 d-flex align-items-center gap-3" style={{ backgroundColor: '#f8f9fc' }} onClick={() => navigate('/profile')}>
                                            <div className="rounded-3 d-flex justify-content-center align-items-center" style={{ width: '42px', height: '42px', backgroundColor: 'rgba(111,66,193,0.1)' }}>
                                                <i className="fas fa-user-cog" style={{ color: '#6f42c1' }}></i>
                                            </div>
                                            <div>
                                                <h6 className="mb-0 fw-bold" style={{ color: '#1e3050' }}>My Profile</h6>
                                                <small className="text-secondary">Account settings</small>
                                            </div>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-4">
                        <div className="card border-0 rounded-4 shadow-sm h-100" style={{ backgroundColor: '#1e3050' }}>
                            <div className="card-body p-4 d-flex flex-column">
                                <span className="badge px-3 py-2 rounded-pill mb-3 align-self-start" style={{ backgroundColor: 'rgba(244,123,44,0.2)', color: '#f47b2c' }}>YOUR INFO</span>
                                <h5 className="fw-bold text-white mb-4">Employee Details</h5>

                                <div className="d-flex flex-column gap-3 flex-grow-1">
                                    <div className="rounded-3 p-3" style={{ backgroundColor: 'rgba(255,255,255,0.08)' }}>
                                        <p className="text-white small mb-1" style={{ opacity: 0.5 }}>Employee ID</p>
                                        <p className="text-white fw-bold mb-0">{user.e_id || 'N/A'}</p>
                                    </div>
                                    <div className="rounded-3 p-3" style={{ backgroundColor: 'rgba(255,255,255,0.08)' }}>
                                        <p className="text-white small mb-1" style={{ opacity: 0.5 }}>Role</p>
                                        <p className="text-white fw-bold mb-0">{user.e_type || 'N/A'}</p>
                                    </div>
                                    <div className="rounded-3 p-3" style={{ backgroundColor: 'rgba(255,255,255,0.08)' }}>
                                        <p className="text-white small mb-1" style={{ opacity: 0.5 }}>Department</p>
                                        <p className="text-white fw-bold mb-0">{user.location || 'N/A'}</p>
                                    </div>
                                </div>

                                <button className="btn w-100 text-white fw-bold py-3 mt-4" style={{ backgroundColor: '#f47b2c', borderRadius: '12px' }} onClick={() => navigate('/schedule')}>
                                    View My Schedule <i className="fas fa-arrow-right ms-2"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}
